<script setup lang="ts">
import { IconChevronRight } from '@iconify-prerendered/vue-mdi'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as newsZh } from '../data/news.data'
import { data as newsEn } from '../data/newsEn.data'
import { useThemeI18n } from '../utils/i18n'
import LocalizedDate from './LocalizedDate.vue'

const { lang } = useData()
const { labels } = useThemeI18n()

const newsList = computed(() => (lang.value.startsWith('zh') ? newsZh : newsEn))
</script>

<template>
  <article
    v-for="news of newsList"
    :key="news.url"
    class="news"
  >
    <div>
      <h3>
        <a :href="news.url">
          <span class="hover" />
          <span class="title">{{ news.title }}</span>
        </a>
        <div class="background" />
      </h3>
      <LocalizedDate :value="news.date" />
    </div>
    <p>{{ news.description }}</p>
    <div class="readPrompt" aria-hidden="true">
      <span>{{ labels.readArticle }}</span>
      <IconChevronRight />
    </div>
  </article>
</template>

<style lang="stylus" scoped>
.news {
  display: flex
  flex-direction: column
  gap: 0.5rem
  position: relative

  &:first-of-type {
    margin-top: 3rem
  }

  & + .news {
    margin-top: 3rem
  }

  time {
    font-size: 0.875rem
    line-height: 1.25rem
    color: var(--vp-c-text-2)
    z-index: 10
  }

  h3,
  p {
    margin: 0
  }

  h3 {
    position: unset
    font-size: 1.125rem
    line-height: 1.75rem
    letter-spacing: -0.025em
  }

  h3 a {
    font-weight: 600
    color: var(--vp-c-text-1)

    &:hover {
      color: var(--vp-c-text-1)
      text-decoration: none
    }

    &:focus {
      outline: none
    }
  }

  .title,
  .readPrompt,
  p,
  time {
    position: relative
  }

  .title {
    z-index: 10
  }

  .readPrompt {
    font-weight: 500
    font-size: 0.875rem
    line-height: 1.25rem
    color: var(--vp-c-brand-1)
    display: flex
    align-items: center
    margin-top: 0.25rem

    svg {
      margin-bottom: -2px
      margin-left: 0.25rem
      width: 1.25rem
      height: 1.25rem
    }
  }

  .hover,
  .background {
    position: absolute
    z-index: 20
    bottom: -1rem
    top: -1rem
    left: -1rem
    right: -1rem
    border-radius: 12px
  }

  .background {
    background-color: var(--vp-c-bg-soft)
    transform: scale(0.95)
    opacity: 0
    z-index: 0
    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)
  }

  &:hover .background,
  &:focus-within .background {
    opacity: 1
    transform: scale(1)
  }
}
</style>
