<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onBeforeUnmount, onMounted, provide } from 'vue'
import LatestStableRelease from './components/LatestStableRelease.vue'
import { attachGlass } from './glass/glassManager'

const { frontmatter, isDark } = useData()
const route = useRoute()
const isHomePage = computed(() => frontmatter.value.layout === 'home' && (route.path === '/' || route.path === '/en/'))

provide('toggle-appearance', () => {
  isDark.value = !isDark.value
})

let detachHeaderGlass: (() => void) | null = null

onMounted(() => {
  // Fixed ambient blobs behind all content; the glass surfaces replicate
  // the same gradients as their drawable backdrops.
  const ambient = document.createElement('div')
  ambient.className = 'lg-ambient lg-ambient-bg'
  ambient.setAttribute('aria-hidden', 'true')
  document.body.prepend(ambient)

  const nav = document.querySelector('.VPNavBar')
  if (nav instanceof HTMLElement)
    detachHeaderGlass = attachGlass(nav, { preset: 'bar', mode: 'fixed' })
})

onBeforeUnmount(() => {
  detachHeaderGlass?.()
  detachHeaderGlass = null
  document.querySelector('.lg-ambient')?.remove()
})
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="isHomePage" #home-hero-actions-after>
      <LatestStableRelease />
    </template>
  </DefaultTheme.Layout>
</template>
