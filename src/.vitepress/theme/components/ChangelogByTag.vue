<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed, toRefs } from 'vue'
import { data as changelogs } from '../data/changelogs.data'
import { useThemeI18n } from '../utils/i18n'
import { formatChangelog } from '../utils/formatChangelog'
import Contributors from './Contributors.vue'
import LocalizedDate from './LocalizedDate.vue'

const props = defineProps<{ tag: string }>()
const { tag } = toRefs(props)

const { labels, changelogBase } = useThemeI18n()

const md = new MarkdownIt({ html: true })

function renderMarkdown(string: string | null | undefined) {
  return formatChangelog(md, string, {
    hideAssetSelectionTip: true,
    stripChecksums: true,
    changelogBase: `${changelogBase.value}/`,
  })
}

const release = computed(() => changelogs.find(r => r.tag_name === tag.value))
const latestStableTag = computed(() => {
  const stable = changelogs
    .filter(r => !r.draft && !r.prerelease)
    .toSorted((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime())
  return stable[0]?.tag_name
})
const isLatest = computed(() => latestStableTag.value === tag.value)
</script>

<template>
  <div v-if="release">
    <h1 :id="isLatest ? 'latest' : release.tag_name">
      {{ release.tag_name.substring(1) }}
      <Badge v-if="isLatest" type="tip" :text="labels.latest" />
      <a
        class="header-anchor"
        :href="isLatest ? '#latest' : `#${release.tag_name}`"
        :aria-label="`Permalink to &quot;${release.tag_name}&quot;`"
      />
    </h1>
    <LocalizedDate :value="release!.published_at!" />
    <div v-html="renderMarkdown(release!.body)" />
    <Contributors :body="release!.body!" :author="release!.author.login" :tag="release!.tag_name" />
  </div>
  <div v-else>
    <p>{{ labels.releaseNotFound }}</p>
  </div>
</template>

<style lang="stylus" scoped>
h1 {
  display: flex
  align-items: center
  gap: 0.5rem
}

time {
  font-size: 1rem
  color: var(--vp-c-text-2)
}
</style>
