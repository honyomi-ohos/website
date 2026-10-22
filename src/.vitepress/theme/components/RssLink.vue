<script setup lang="ts">
import { IconRssBox } from '@iconify-prerendered/vue-mdi'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useThemeI18n } from '../utils/i18n'

const { lang } = useData()
const { labels } = useThemeI18n()

const href = computed(() => (lang.value.startsWith('zh') ? '/feed.rss' : '/en/feed.rss'))
</script>

<template>
  <a :href="href" class="rss" :title="labels.rssFeed" target="_blank">
    <IconRssBox />
    <span>{{ labels.rssFeed }}</span>
  </a>
</template>

<style lang="stylus" scoped>
.rss {
  & > * {
    vertical-align: middle
    position: relative
    bottom: 1px
  }

  svg {
    width: 1em
    height: 1em
    display: inline-block
    margin-right: 4px
  }
}
</style>
