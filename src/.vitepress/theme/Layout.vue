<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, provide } from 'vue'
import LatestStableRelease from './components/LatestStableRelease.vue'
import ProductIntro from './components/ProductIntro.vue'

const { frontmatter, isDark } = useData()
const route = useRoute()
const isHomePage = computed(() => frontmatter.value.layout === 'home' && (route.path === '/' || route.path === '/en/'))

provide('toggle-appearance', () => {
  isDark.value = !isDark.value
})
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="isHomePage" #home-hero-actions-after>
      <LatestStableRelease />
    </template>
    <template v-if="isHomePage" #home-features-after>
      <ProductIntro />
    </template>
  </DefaultTheme.Layout>
</template>
