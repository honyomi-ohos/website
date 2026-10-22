/**
 * Liquid glass manager built on the HTML-in-Canvas API
 * (https://wicg.github.io/html-in-canvas/).
 *
 * Each glass surface hosts a content="drawable" <canvas> whose child is a
 * real drawable backdrop element (the ambient background layer, aligned
 * with the page through CSS custom properties). The canvas `paint` event
 * uploads the backdrop snapshot into a WebGL2 texture via
 * texElementSubImage2D and renders it through the glass shader.
 *
 * Requires Chromium with chrome://flags/#canvas-draw-element and
 * chrome://flags/#enable-experimental-web-platform-features; every other
 * browser gets the CSS backdrop-filter fallback.
 */

import type { GlassRenderParams, HtmlInCanvasElement } from './glassRenderer'
import { GlassRenderer } from './glassRenderer'

export type GlassPreset = 'button' | 'card' | 'bar'
export type GlassMode = 'fixed' | 'flow'
export type GlassTint = 'neutral' | 'brand'

export interface GlassAttachOptions {
  preset?: GlassPreset
  mode?: GlassMode
  radius?: number
  tint?: GlassTint
}

interface GlassParams {
  mode: GlassMode
  radius: number
  refraction: number
  edgeWidth: number
  blurLod: number
  chroma: number
  pad: number
  tint: GlassTint
}

type GlassPalette = Pick<GlassRenderParams, 'tint' | 'rim' | 'sheen' | 'fallbackColor'>

interface GlassInstance {
  root: HTMLElement
  canvas: HtmlInCanvasElement
  backdrop: HTMLElement
  renderer: GlassRenderer
  params: GlassParams
  hasScene: boolean
  uploadRetries: number
  resizeObserver: ResizeObserver
  disposed: boolean
}

const PRESETS: Record<GlassPreset, Omit<GlassParams, 'mode' | 'tint'>> = {
  button: { radius: 20, refraction: 16, edgeWidth: 12, blurLod: 2.0, chroma: 0.06, pad: 56 },
  card: { radius: 24, refraction: 26, edgeWidth: 16, blurLod: 2.5, chroma: 0.09, pad: 80 },
  bar: { radius: 0, refraction: 12, edgeWidth: 10, blurLod: 1.2, chroma: 0.04, pad: 48 },
}

const PALETTES: Record<GlassTint, { light: GlassPalette, dark: GlassPalette }> = {
  neutral: {
    light: {
      tint: [1, 1, 1, 0.34],
      rim: [1, 1, 1, 0.85],
      sheen: [1, 1, 1, 0.22],
      fallbackColor: [1, 1, 1, 0.5],
    },
    dark: {
      tint: [0.09, 0.1, 0.13, 0.44],
      rim: [0.85, 0.9, 1, 0.5],
      sheen: [0.9, 0.95, 1, 0.1],
      fallbackColor: [0.11, 0.12, 0.15, 0.55],
    },
  },
  brand: {
    light: {
      tint: [0.9, 0.29, 0.3, 0.85],
      rim: [1, 0.9, 0.88, 0.7],
      sheen: [1, 0.95, 0.95, 0.2],
      fallbackColor: [0.9, 0.29, 0.3, 0.9],
    },
    dark: {
      tint: [0.52, 0.11, 0.13, 0.66],
      rim: [1, 0.6, 0.55, 0.4],
      sheen: [1, 0.85, 0.83, 0.12],
      fallbackColor: [0.42, 0.09, 0.11, 0.85],
    },
  },
}

const instances = new Set<GlassInstance>()
let listenersBound = false

export function attachGlass(root: HTMLElement, options: GlassAttachOptions = {}): () => void {
  const presetName = options.preset ?? 'button'
  const preset = PRESETS[presetName]
  const mode: GlassMode = options.mode ?? (presetName === 'bar' ? 'fixed' : 'flow')
  const params: GlassParams = {
    mode,
    radius: options.radius ?? preset.radius,
    refraction: preset.refraction,
    edgeWidth: preset.edgeWidth,
    blurLod: preset.blurLod,
    chroma: preset.chroma,
    pad: preset.pad,
    tint: options.tint ?? 'neutral',
  }

  // Marks the surface for CSS fallback styling.
  root.dataset.liquidGlass = presetName

  const renderer = new GlassRenderer()
  const canvas = document.createElement('canvas') as HtmlInCanvasElement
  canvas.className = 'liquid-glass-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  // HTML-in-Canvas: opt the canvas descendants into layout.
  canvas.setAttribute('content', 'drawable')

  const rendererOk = renderer.attach(canvas)
  const apiAvailable = rendererOk
    && 'onpaint' in canvas
    && typeof canvas.requestPaint === 'function'
    && renderer.supportsElementUpload()

  if (!apiAvailable) {
    renderer.dispose()
    root.classList.add('lg-fallback')
    return () => {
      root.classList.remove('lg-fallback')
      delete root.dataset.liquidGlass
    }
  }

  // The drawable backdrop replicates the fixed page ambient layer; its
  // blob gradients are viewport-aligned through --lg-ox / --lg-oy.
  const backdrop = document.createElement('div')
  backdrop.className = 'lg-backdrop lg-ambient-bg'
  backdrop.setAttribute('drawable', '')
  backdrop.setAttribute('aria-hidden', 'true')
  canvas.appendChild(backdrop)

  const pad = params.pad
  const canvasStyle = canvas.style
  canvasStyle.position = 'absolute'
  canvasStyle.left = `${-pad}px`
  canvasStyle.right = `${-pad}px`
  canvasStyle.top = `${-pad}px`
  canvasStyle.bottom = `${-pad}px`
  root.prepend(canvas)

  const instance: GlassInstance = {
    root,
    canvas,
    backdrop,
    renderer,
    params,
    hasScene: false,
    uploadRetries: 0,
    resizeObserver: new ResizeObserver(() => {
      if (!instance.disposed) {
        layoutBackdrop(instance)
        canvas.requestPaint?.()
      }
    }),
    disposed: false,
  }
  instance.resizeObserver.observe(root)
  instances.add(instance)
  bindGlobalListeners()

  canvas.onpaint = () => paintInstance(instance)
  layoutBackdrop(instance)
  canvas.requestPaint?.()

  return () => {
    instance.disposed = true
    instances.delete(instance)
    instance.resizeObserver.disconnect()
    canvas.onpaint = null
    renderer.dispose()
    canvas.remove()
    root.classList.remove('lg-fallback')
    delete root.dataset.liquidGlass
  }
}

function selectPalette(instance: GlassInstance): GlassPalette {
  const dark = document.documentElement.classList.contains('dark')
  return PALETTES[instance.params.tint][dark ? 'dark' : 'light']
}

/**
 * Size the backdrop to the canvas box (root expanded by the pad outset)
 * and keep its gradients aligned with the viewport-fixed page ambient.
 */
function layoutBackdrop(instance: GlassInstance): void {
  const rect = instance.root.getBoundingClientRect()
  const pad = instance.params.pad
  const style = instance.backdrop.style
  style.width = `${Math.max(1, rect.width + pad * 2)}px`
  style.height = `${Math.max(1, rect.height + pad * 2)}px`
  style.setProperty('--lg-ox', `${-(rect.left - pad)}px`)
  style.setProperty('--lg-oy', `${-(rect.top - pad)}px`)
}

/** canvas `paint` handler: upload the backdrop snapshot and draw the glass. */
function paintInstance(instance: GlassInstance): void {
  if (instance.disposed)
    return
  const canvas = instance.canvas
  const rect = canvas.getBoundingClientRect()
  if (rect.width < 1 || rect.height < 1)
    return

  const dpr = window.devicePixelRatio || 1

  // Texture storage matches the element's default snapshot size.
  let texWidth = Math.round(rect.width * dpr)
  let texHeight = Math.round(rect.height * dpr)
  try {
    const defaults = canvas.getElementImageDefaultSize?.(instance.backdrop)
    if (defaults && defaults.width > 0 && defaults.height > 0) {
      texWidth = Math.round(defaults.width)
      texHeight = Math.round(defaults.height)
    }
  }
  catch { /* keep the estimated size */ }
  instance.renderer.allocateTexture(texWidth, texHeight)

  // The snapshot may not be recorded during the first frames; retry.
  if (!instance.renderer.uploadElement(instance.backdrop)) {
    instance.uploadRetries += 1
    if (instance.uploadRetries <= 90) {
      window.requestAnimationFrame(() => {
        if (!instance.disposed)
          canvas.requestPaint?.()
      })
    }
    else {
      enableFallback(instance)
    }
    return
  }
  instance.uploadRetries = 0
  instance.hasScene = true
  canvas.classList.add('lg-ready')

  renderInstance(instance, rect.width, rect.height)
}

function renderInstance(instance: GlassInstance, cssWidth: number, cssHeight: number): void {
  const pad = instance.params.pad
  const palette = selectPalette(instance)
  instance.renderer.render({
    width: cssWidth,
    height: cssHeight,
    dpr: window.devicePixelRatio || 1,
    // The glass shape sits at (pad, pad) inside the canvas box; the
    // texture v axis starts at the element's top row.
    uvScaleX: (cssWidth - pad * 2) / cssWidth,
    uvScaleY: -(cssHeight - pad * 2) / cssHeight,
    uvOffsetX: pad / cssWidth,
    uvOffsetY: (cssHeight - pad) / cssHeight,
    radius: instance.params.radius,
    refraction: instance.params.refraction,
    edgeWidth: instance.params.edgeWidth,
    blurLod: instance.params.blurLod,
    chroma: instance.params.chroma,
    tint: palette.tint,
    rim: palette.rim,
    sheen: palette.sheen,
    hasScene: instance.hasScene,
    fallbackColor: palette.fallbackColor,
  })
}

function enableFallback(instance: GlassInstance): void {
  instance.canvas.style.display = 'none'
  instance.root.classList.add('lg-fallback')
}

let scrollFrame = 0

function onScroll(): void {
  if (scrollFrame)
    return
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0
    for (const instance of instances) {
      if (instance.disposed)
        continue
      layoutBackdrop(instance)
      instance.canvas.requestPaint?.()
    }
  })
}

function bindGlobalListeners(): void {
  if (listenersBound)
    return
  listenersBound = true
  // Flow surfaces move with the document; their backdrop gradient
  // offsets must track the element's viewport position.
  window.addEventListener('scroll', onScroll, { passive: true })
}
