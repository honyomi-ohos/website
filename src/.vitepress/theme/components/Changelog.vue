<script setup lang="ts">
import type { AppRelease } from '../data/release.data'
import MarkdownIt from 'markdown-it'
import { computed, toRefs } from 'vue'
import { data as release } from '../data/release.data'
import { useThemeI18n } from '../utils/i18n'
import { formatChangelog } from '../utils/formatChangelog'
import Contributors from './Contributors.vue'

const props = withDefaults(defineProps<{
  hideAssetSelectionTip?: boolean
  type: keyof AppRelease
}>(), {
  hideAssetSelectionTip: false,
})
const { type } = toRefs(props)

const { labels, changelogBase } = useThemeI18n()

const md = new MarkdownIt({ html: true })

const currentRelease = computed(() => release[type.value])

const changelog = computed(() => formatChangelog(md, currentRelease.value?.body, {
  hideAssetSelectionTip: props.hideAssetSelectionTip,
  changelogBase: `${changelogBase.value}/`,
}))
</script>

<template>
  <div v-if="currentRelease" class="changelog">
    <header>
      <IconNewspaperVariant />
      <h2>{{ labels.changelog }} <span className="version-name">{{ currentRelease.tag_name }}</span></h2>
    </header>
    <div v-html="changelog" />
    <Contributors
      :body="currentRelease.body!"
      :author="currentRelease.author.login"
      :tag="currentRelease.tag_name"
    />
  </div>
  <div class="fullChangelog">
    <p>
      {{ labels.viewReleasePage }}
      <a :href="`${changelogBase}/${currentRelease?.tag_name}`">
        {{ labels.here }}
      </a>
    </p>
  </div>
</template>

<style lang="stylus">
.changelog {
  display: block
  border: 1px solid var(--vp-c-bg-soft)
  border-radius: 12px
  background-color: var(--vp-c-bg-soft)
  transition: border-color 0.25s, background-color 0.25s
  padding: 24px
  height: 100%
  margin: 1.5em auto 0.5em

  header {
    display: flex
    align-items: baseline
    margin: 0 0 1rem
  }

  svg {
    font-size: 1.2em
    margin-right: 0.5rem
    vertical-align: middle
  }

  h2 {
    font-size: 1.5rem
    margin: 0
    padding: 0
    color: var(--vp-c-text-1)
    border: none

    .version-name {
      font-size: 1rem
      color: var(--vp-c-text-2)
      margin-left: 0.5rem
    }
  }

  div > p {
    margin: 0 0 1rem
    color: var(--vp-c-text-2)
    font-size: 0.9rem
  }

  table {
    border-radius: 8px
    border-collapse: collapse
    border: 1px solid var(--vp-c-divider)

    tr,
    th,
    td {
      border: none
      width: 100%
    }

    tbody tr {
      border-top: 1px solid var(--vp-c-divider)
    }

    tr > td {
      &:first-child {
        color: var(--vp-c-text-2)
      }

      &:last-child {
        font-family: var(--vp-font-family-mono)
        font-size: var(--vp-code-font-size)
      }
    }
  }
}

.fullChangelog {
  margin: 0 0 1rem
  color: var(--vp-c-text-2)
  font-size: 0.9rem
}
</style>
