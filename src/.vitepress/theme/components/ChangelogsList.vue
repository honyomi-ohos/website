<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { data as changelogs } from '../data/changelogs.data'
import { useThemeI18n } from '../utils/i18n'
import { formatChangelog } from '../utils/formatChangelog'
import Contributors from './Contributors.vue'
import LocalizedDate from './LocalizedDate.vue'

const { labels, changelogBase } = useThemeI18n()

const md = new MarkdownIt({ html: true })

function renderMarkdown(string: string | null | undefined) {
  return formatChangelog(md, string, {
    hideAssetSelectionTip: true,
    stripChecksums: true,
    changelogBase: `${changelogBase.value}/`,
  })
}
</script>

<template>
  <div
    v-for="(release, index) of changelogs"
    :key="release.tag_name"
  >
    <h2 :id="index === 0 ? 'latest' : release.tag_name">
      <a
        :href="`${changelogBase}/${release.tag_name}`"
      >
        {{ release.tag_name.substring(1) }}
      </a>
      <Badge v-if="index === 0" type="tip" :text="labels.latest" />
      <a
        class="header-anchor"
        :href="index === 0 ? '#latest' : `#${release.tag_name}`"
        :aria-label="`Permalink to &quot;${release.tag_name}&quot;`"
      />
    </h2>
    <LocalizedDate :value="release.published_at!" />
    <div v-html="renderMarkdown(release.body)" />
    <Contributors
      :body="release.body!"
      :author="release.author.login"
      :tag="release.tag_name"
    />
  </div>
</template>

<style lang="stylus" scoped>
h2 {
  margin-bottom: 0
  display: flex
  align-items: center
  gap: 0.5rem
}

time {
  font-size: 0.875rem
  color: var(--vp-c-text-2)
}
</style>
