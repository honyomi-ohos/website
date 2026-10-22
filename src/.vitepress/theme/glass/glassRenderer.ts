/**
 * Per-canvas WebGL2 renderer for a single liquid glass surface.
 *
 * Uses the HTML-in-Canvas API (https://wicg.github.io/html-in-canvas/):
 * the glass background is a real DOM element (a `drawable` descendant of
 * a content="drawable" canvas) whose snapshot is uploaded into a WebGL
 * texture with texElementSubImage2D, then rendered through the glass
 * shader.
 */

import { FRAGMENT_SHADER, VERTEX_SHADER } from './glassShaders'

export interface GlassRenderParams {
  width: number
  height: number
  dpr: number
  uvScaleX: number
  uvScaleY: number
  uvOffsetX: number
  uvOffsetY: number
  radius: number
  refraction: number
  edgeWidth: number
  blurLod: number
  chroma: number
  tint: readonly [number, number, number, number]
  rim: readonly [number, number, number, number]
  sheen: readonly [number, number, number, number]
  hasScene: boolean
  fallbackColor: readonly [number, number, number, number]
}

/** HTML-in-Canvas additions to WebGLRenderingContext (flagged in Chromium). */
type HtmlInCanvasGL = WebGL2RenderingContext & {
  texElementSubImage2D?: (
    target: GLenum,
    level: GLint,
    xoffset: GLint,
    yoffset: GLint,
    element: Element,
    config?: WebGLCopyElementImageConfig,
  ) => void
}

interface WebGLCopyElementImageConfig {
  sx: GLfloat
  sy: GLfloat
  swidth: GLfloat
  sheight: GLfloat
  width: GLsizei
  height: GLsizei
}

/** HTML-in-Canvas additions to HTMLCanvasElement. */
export type HtmlInCanvasElement = HTMLCanvasElement & {
  requestPaint?: () => void
  getElementImageDefaultSize?: (element: Element) => { width: number, height: number }
  onpaint: ((event: Event) => void) | null
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader)
    return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export class GlassRenderer {
  private canvas: HTMLCanvasElement | null = null
  private gl: HtmlInCanvasGL | null = null
  private program: WebGLProgram | null = null
  private vao: WebGLVertexArrayObject | null = null
  private sceneTex: WebGLTexture | null = null
  private texWidth = 0
  private texHeight = 0
  private uniforms = new Map<string, WebGLUniformLocation | null>()

  attach(canvas: HTMLCanvasElement): boolean {
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    }) as HtmlInCanvasGL | null
    if (!gl)
      return false

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader)
      return false

    const program = gl.createProgram()
    if (!program)
      return false
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return false
    }

    this.canvas = canvas
    this.gl = gl
    this.program = program
    gl.useProgram(program)

    const vao = gl.createVertexArray()
    const buffer = gl.createBuffer()
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)
    this.vao = vao

    this.sceneTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    return true
  }

  /** Whether the flagged HTML-in-Canvas WebGL upload API is available. */
  supportsElementUpload(): boolean {
    return typeof this.gl?.texElementSubImage2D === 'function'
  }

  /** (Re)allocate the scene texture storage. */
  allocateTexture(width: number, height: number): void {
    const gl = this.gl
    if (!gl || !this.sceneTex)
      return
    const w = Math.max(1, Math.round(width))
    const h = Math.max(1, Math.round(height))
    if (w === this.texWidth && h === this.texHeight)
      return
    this.texWidth = w
    this.texHeight = h
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  }

  /**
   * Upload the current snapshot of a drawable element into the scene
   * texture. Returns false when the API is missing or no snapshot has
   * been recorded yet (caller may retry after a frame).
   */
  uploadElement(element: Element): boolean {
    const gl = this.gl
    if (!gl || !this.sceneTex || !gl.texElementSubImage2D)
      return false
    try {
      gl.bindTexture(gl.TEXTURE_2D, this.sceneTex)
      gl.texElementSubImage2D(gl.TEXTURE_2D, 0, 0, 0, element)
      gl.generateMipmap(gl.TEXTURE_2D)
      return true
    }
    catch {
      return false
    }
  }

  render(params: GlassRenderParams): void {
    const gl = this.gl
    const canvas = this.canvas
    if (!gl || !canvas || !this.program)
      return

    const bufferWidth = Math.max(1, Math.round(params.width * params.dpr))
    const bufferHeight = Math.max(1, Math.round(params.height * params.dpr))
    if (canvas.width !== bufferWidth)
      canvas.width = bufferWidth
    if (canvas.height !== bufferHeight)
      canvas.height = bufferHeight

    gl.viewport(0, 0, bufferWidth, bufferHeight)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(this.program)
    gl.bindVertexArray(this.vao)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTex)
    this.setUniform('uScene', '1i', 0)
    this.setUniform('uSize', '2f', bufferWidth, bufferHeight)
    this.setUniform('uUvScale', '2f', params.uvScaleX, params.uvScaleY)
    this.setUniform('uUvOffset', '2f', params.uvOffsetX, params.uvOffsetY)
    this.setUniform('uRadius', '1f', params.radius * params.dpr)
    this.setUniform('uRefraction', '1f', params.refraction * params.dpr)
    this.setUniform('uEdgeWidth', '1f', params.edgeWidth * params.dpr)
    this.setUniform('uBlurLod', '1f', params.blurLod)
    this.setUniform('uChroma', '1f', params.chroma)
    this.setUniform('uTint', '4f', params.tint[0], params.tint[1], params.tint[2], params.tint[3])
    this.setUniform('uRim', '4f', params.rim[0], params.rim[1], params.rim[2], params.rim[3])
    this.setUniform('uSheen', '4f', params.sheen[0], params.sheen[1], params.sheen[2], params.sheen[3])
    this.setUniform('uHasScene', '1f', params.hasScene ? 1 : 0)
    this.setUniform('uFallbackColor', '4f', params.fallbackColor[0], params.fallbackColor[1], params.fallbackColor[2], params.fallbackColor[3])

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.bindVertexArray(null)
  }

  dispose(): void {
    const gl = this.gl
    if (!gl)
      return
    if (this.sceneTex)
      gl.deleteTexture(this.sceneTex)
    if (this.vao)
      gl.deleteVertexArray(this.vao)
    if (this.program)
      gl.deleteProgram(this.program)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    this.gl = null
    this.canvas = null
    this.sceneTex = null
    this.uniforms.clear()
  }

  private setUniform(name: string, kind: '1i' | '1f' | '2f' | '4f', ...values: number[]): void {
    const gl = this.gl
    if (!gl || !this.program)
      return
    let location = this.uniforms.get(name)
    if (location === undefined) {
      location = gl.getUniformLocation(this.program, name)
      this.uniforms.set(name, location)
    }
    if (!location)
      return
    switch (kind) {
      case '1i':
        gl.uniform1i(location, values[0])
        break
      case '1f':
        gl.uniform1f(location, values[0])
        break
      case '2f':
        gl.uniform2f(location, values[0], values[1])
        break
      case '4f':
        gl.uniform4f(location, values[0], values[1], values[2], values[3])
        break
    }
  }
}
