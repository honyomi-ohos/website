<script setup lang="ts">
import { computed } from 'vue'
import LiquidGlass from './LiquidGlass.vue'

// Drop-in replacement for VitePress VPButton, used by VPHero via a
// vite alias. Renders the button content on top of a liquid glass
// surface (WebGL2 refraction with a CSS backdrop-filter fallback).
const props = withDefaults(defineProps<{
  tag?: string
  size?: string
  theme?: string
  text?: string
  href?: string
}>(), {
  tag: 'button',
  size: 'medium',
  theme: 'brand',
  text: '',
  href: undefined,
})

const component = computed(() => props.tag || (props.href ? 'a' : 'button'))
const isExternal = computed(() => typeof props.href === 'string' && /^[a-z]+:/i.test(props.href))
const glassTint = computed(() => (props.theme === 'brand' ? 'brand' : 'neutral'))
</script>

<template>
  <LiquidGlass preset="button" class="glass-button" :class="[size, theme]" :tint="glassTint">
    <component
      :is="component"
      class="VPButton"
      :class="[size, theme]"
      :href="href"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noreferrer' : undefined"
    >
      {{ text }}
    </component>
  </LiquidGlass>
</template>
