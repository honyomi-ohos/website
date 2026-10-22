/**
 * GLSL ES 3.00 shaders for the liquid glass surface.
 *
 * The fragment shader evaluates a rounded-rect SDF, derives a refraction
 * normal from screen-space derivatives of the SDF, then samples the
 * HTML-in-Canvas element texture (uploaded via texElementSubImage2D)
 * with edge-biased displacement, chromatic aberration and mip-based
 * blur, plus rim sheen and tint.
 */

export const VERTEX_SHADER = /* glsl */ `#version 300 es
layout(location = 0) in vec2 aPos;

out vec2 vUv;

void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uScene;
uniform vec2 uSize;          // canvas size in buffer pixels
uniform vec2 uUvScale;       // maps vUv into the drawable backdrop texture
uniform vec2 uUvOffset;
uniform float uRadius;       // corner radius, buffer px
uniform float uRefraction;   // edge displacement, buffer px
uniform float uEdgeWidth;    // width of the refracting band, buffer px
uniform float uBlurLod;      // mip level used for blur
uniform float uChroma;       // chromatic aberration amount
uniform vec4 uTint;          // rgb tint + blend strength
uniform vec4 uRim;           // rim highlight color + strength
uniform vec4 uSheen;         // top sheen color + strength
uniform float uHasScene;     // 1.0 when a backdrop snapshot exists
uniform vec4 uFallbackColor; // flat color before the snapshot exists

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + vec2(r);
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

void main() {
  vec2 halfSize = uSize * 0.5;
  vec2 p = vUv * uSize - halfSize;
  float radius = min(uRadius, min(halfSize.x, halfSize.y));
  float dist = sdRoundedBox(p, halfSize, radius);

  float aa = 1.25;
  float alpha = 1.0 - smoothstep(-aa, aa, dist);
  if (alpha <= 0.0) discard;

  // Outward normal from screen-space derivatives of the SDF.
  vec2 grad = vec2(dFdx(dist), dFdy(dist));
  float gradLen = length(grad);
  vec2 normal = gradLen > 1e-5 ? grad / gradLen : vec2(0.0);

  // 1.0 at the rim, fading to 0.0 inside beyond the edge band.
  float edge = 1.0 - smoothstep(-uEdgeWidth, 0.0, dist);
  float band = smoothstep(0.0, 1.0, edge);

  vec2 refraction = normal * uRefraction * band;
  vec2 pxToUv = 1.0 / uSize;
  vec2 baseUv = vUv * uUvScale + uUvOffset;

  vec3 col;
  if (uHasScene > 0.5) {
    vec2 offsetR = refraction * (1.0 - uChroma) * pxToUv;
    vec2 offsetG = refraction * pxToUv;
    vec2 offsetB = refraction * (1.0 + uChroma) * pxToUv;
    col.r = textureLod(uScene, baseUv + offsetR, uBlurLod).r;
    col.g = textureLod(uScene, baseUv + offsetG, uBlurLod).g;
    col.b = textureLod(uScene, baseUv + offsetB, uBlurLod).b;
  } else {
    col = uFallbackColor.rgb;
  }

  // Tint.
  col = mix(col, uTint.rgb, uTint.a);

  // Rim sheen, lit from the top-left.
  vec2 lightDir = normalize(vec2(-0.6, 0.8));
  float lit = clamp(dot(normal, lightDir), 0.0, 1.0);
  float sheen = band * pow(lit, 3.0);
  col += uRim.rgb * sheen * uRim.a;

  // Thin bright border line for definition.
  float rimLine = (1.0 - smoothstep(0.0, 1.6, abs(dist + 0.4))) * 0.25;
  col += uRim.rgb * rimLine;

  // Soft inner glow towards the top edge.
  float topMask = clamp((halfSize.y - p.y) / uSize.y * 2.0, 0.0, 1.0);
  col += uSheen.rgb * pow(topMask, 2.5) * uSheen.a;

  outColor = vec4(col * alpha, alpha);
}
`
