<script setup lang="ts">
/// <reference types="@types/gtag.js" />

import type { Component } from 'vue'
import {
  IconAlertOutline,
  IconCalendarOutline,
  IconCellphone,
  IconTagOutline,
} from '@iconify-prerendered/vue-mdi'
import { computed } from 'vue'
import { APP_GALLERY_URL } from '../../config/constants'
import { data as release } from '../data/release.data'
import { useThemeI18n } from '../utils/i18n'
import ReleaseDate from './ReleaseDate.vue'

type ReleaseId = 'preview' | 'stable'
type ReleaseDateType = 'preview' | 'stable'
type ButtonTone = 'primary' | 'secondary'

interface DownloadCard {
  id: ReleaseId
  buttonTone: ButtonTone
  dateType?: ReleaseDateType
  description: string
  icon?: Component
  isPrimary?: boolean
  note?: string
  tagName?: string
  title: string
  useAppLogo?: boolean
}

const props = withDefaults(defineProps<{
  group?: 'all' | 'other' | 'primary'
}>(), {
  group: 'all',
})

const { labels } = useThemeI18n()

const downloadCards = computed<DownloadCard[]>(() => {
  const stable = release.stable
  return [{
    id: 'stable',
    tagName: stable?.tag_name,
    buttonTone: 'primary',
    dateType: stable ? 'stable' : undefined,
    description: labels.value.stableDescription,
    isPrimary: true,
    note: labels.value.stableNote,
    title: labels.value.stableTitle,
    useAppLogo: true,
  }]
})

const visibleDownloadCards = computed(() => downloadCards.value.filter((card) => {
  if (props.group === 'primary')
    return card.isPrimary

  if (props.group === 'other')
    return !card.isPrimary

  return true
}))

function handleAnalytics(type: ReleaseId) {
  const label = type[0].toUpperCase() + type.slice(1)
  const version = type === 'stable'
    ? release.stable?.tag_name
    : release.beta?.tag_name

  window.gtag?.('event', 'Download', {
    event_category: 'App',
    event_label: label,
    version,
  })
}
</script>

<template>
  <div>
    <p class="store-note">{{ labels.storeNote }}</p>
    <section class="release-selector" aria-label="Choose your release">
      <div class="release-cards">
        <article
          v-for="card in visibleDownloadCards"
          :key="card.id"
          class="release-card"
          :class="[card.id, { 'is-primary': card.isPrimary }]"
        >
          <div class="release-card-body">
            <div class="release-card-header">
              <span class="release-icon" aria-hidden="true">
                <img v-if="card.useAppLogo" class="app-logo" src="/img/logo-128px.png" alt="">
                <component :is="card.icon" v-else />
              </span>
              <div class="release-card-copy">
                <h3>{{ card.title }}</h3>
                <p>{{ card.description }}</p>
              </div>
            </div>
            <dl v-if="card.dateType" class="release-details">
              <div>
                <IconTagOutline aria-hidden="true" />
                <div class="release-detail-copy">
                  <dt>{{ labels.latestRelease }}</dt>
                  <dd>{{ card.tagName }}</dd>
                </div>
              </div>
              <div>
                <IconCalendarOutline aria-hidden="true" />
                <div class="release-detail-copy">
                  <dt>{{ labels.releasedAt }}</dt>
                  <dd><ReleaseDate :type="card.dateType" /></dd>
                </div>
              </div>
            </dl>
            <span v-if="card.note" class="release-action-note">
              <IconCellphone v-if="card.id === 'stable'" aria-hidden="true" />
              <IconAlertOutline v-else aria-hidden="true" />
              <span>{{ card.note }}</span>
            </span>
          </div>
          <div class="release-actions">
            <div class="download-button-wrap" :class="card.buttonTone">
              <a
                class="download-button"
                :class="card.buttonTone"
                :href="APP_GALLERY_URL"
                target="_blank"
                rel="noopener noreferrer"
                @click="handleAnalytics(card.id)"
              >
                <IconDownload />
                <span class="text">{{ labels.appGallery }}</span>
                <span v-if="card.tagName" class="version">{{ card.tagName }}</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="stylus">
.store-note {
  margin: 1.25rem 0 0
  color: var(--vp-c-text-2)
}

.release-selector {
  margin: 1.5rem auto 0
  container-type: inline-size
}

.release-cards {
  display: grid
  grid-template-columns: 1fr
  gap: 1rem

  &.has-preview {
    grid-template-columns: repeat(2, minmax(0, 1fr))

    .release-card:not(.is-primary) {
      grid-column: 1 / -1
    }
  }
}

.release-card {
  display: grid
  grid-template-columns: minmax(0, 1fr) auto
  align-items: center
  gap: 0.75rem 1.5rem
  min-width: 0
  border: 1px solid var(--vp-c-divider)
  border-radius: 14px
  padding: 0.9rem 1rem
  background: var(--vp-c-bg-soft)

  &.is-primary {
    grid-template-columns: minmax(0, 1fr) max-content
    align-items: center
    gap: 0.85rem 1.25rem
    padding: 1.15rem 1.25rem
    border-color: var(--vp-c-brand-border)
    background: linear-gradient(135deg, rgba(229, 72, 77, 0.22), rgba(122, 32, 38, 0.16))
    box-shadow: 0 12px 32px rgba(122, 32, 38, 0.18)

    .release-actions {
      margin: 0
      padding: 0
    }

    .download-button-wrap,
    .download-button {
      width: max-content
      max-width: 100%
    }

    .download-button {
      line-height: 3.25rem
    }

    .release-action-note {
      margin: 0.7rem 0 0
    }
  }

  &.preview {
    border-color: #514328
    background: linear-gradient(135deg, rgba(171, 132, 36, 0.12), rgba(105, 78, 21, 0.08))

    .release-actions {
      margin: 0
      padding: 0
    }

    .download-button-wrap,
    .download-button {
      width: max-content
      max-width: 100%
    }
  }
}

html:not(.dark) {
  .release-card {
    border-color: #d8d8df
    background: #f5f5f7
    box-shadow: 0 1px 2px rgba(31, 35, 45, 0.08)

    &.is-primary {
      border-color: var(--vp-c-brand-border)
      background: linear-gradient(135deg, #ffe0e1, #fff3f3)
      box-shadow: 0 8px 24px rgba(190, 60, 66, 0.16)
    }

    &.preview {
      border-color: #d5c9a1
      background: linear-gradient(135deg, #fff7df, #fffdf6)
    }
  }

  .release-card.is-primary .release-icon {
    color: #7a2026
    background: #ffd0d2
  }

  .release-card.preview .release-icon {
    color: #765d09
    background: #f4e2a5
  }

  .release-card.preview .download-button.secondary {
    color: #765d09
  }
}

.release-card-body {
  min-width: 0
}

.release-card-header {
  display: flex
  align-items: center
  gap: 0.85rem
  min-width: 0

  .release-card-copy {
    flex: 1
    min-width: 0
  }

  h3,
  p {
    margin: 0
  }

  h3 {
    font-size: 1.05rem
  }

  p {
    margin-top: 0.1rem
    color: var(--vp-c-text-2)
    font-size: 0.85rem
    line-height: 1.4
  }

  .is-primary & h3 {
    font-size: 1.5rem
  }

  .is-primary & p {
    font-size: 1rem
  }
}

.release-icon {
  display: grid
  width: 2.5rem
  height: 2.5rem
  flex: 0 0 auto
  place-items: center
  border-radius: 50%
  color: var(--vp-c-text-1)
  background: var(--vp-c-default-soft)

  svg {
    font-size: 1.25rem
  }

  .app-logo {
    width: 1.4rem
    height: 1.4rem
    border-radius: 4px
  }

  .is-primary & {
    width: 4rem
    height: 4rem
    color: #7a2026
    background: rgba(229, 72, 77, 0.2)

    .app-logo {
      width: 2.25rem
      height: 2.25rem
    }
  }
}

.release-details {
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 0.5rem 1rem
  margin: 0

  > div {
    display: flex
    align-items: center
    gap: 0.5rem
    min-width: 0
  }

  svg {
    width: 1.75rem
    height: 1.75rem
    flex: 0 0 auto
    padding: 0.4rem
    border-radius: 50%
    color: var(--vp-c-text-2)
    background: var(--vp-c-default-soft)

    .is-primary & {
      color: var(--vp-c-brand-darker)
      background: var(--vp-c-brand-dimm)
    }
  }

  .release-detail-copy {
    display: flex
    flex-direction: column
    min-width: 0
  }

  dt,
  dd {
    margin: 0
    font-size: 0.78rem
  }

  dt {
    color: var(--vp-c-text-2)
  }

  dd {
    overflow: hidden
    color: var(--vp-c-text-1)
    font-weight: 600
    text-overflow: ellipsis
    white-space: nowrap
  }

  .is-primary & {
    display: grid
    grid-template-columns: 1fr

    .release-detail-copy {
      display: inline-flex
      flex-direction: row
      align-items: baseline
      gap: 0.5rem
    }

    dt,
    dd {
      font-size: 1rem
    }
  }
}

.release-actions {
  margin-top: 0.25rem
  padding-top: 0.25rem
}

.download-button-wrap {
  display: block
  width: 100%
  border-radius: 20px
}

.download-button {
  display: block
  width: 100%
  border-radius: 20px
  padding: 0 0.9rem
  text-align: center
  font-size: 0.9rem
  font-weight: 600
  line-height: 2.6rem
  white-space: nowrap
  cursor: pointer
  text-decoration: none
  transition: color 0.25s, transform 0.25s

  &:hover {
    text-decoration: none !important
    transform: translateY(-1px)
  }

  &.primary {
    color: #fff
    background: var(--vp-c-brand)
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18)
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2)

    &:hover {
      background: var(--vp-c-brand-dark)
    }
  }

  &.secondary {
    color: #6d5420
    background: rgba(138, 106, 34, 0.12)
    box-shadow: inset 0 0 0 1px rgba(138, 106, 34, 0.45)
  }

  svg {
    display: inline-block
    margin-right: 0.4em
    font-size: 1.15em
    vertical-align: middle
  }

  .text {
    margin-right: 0.45rem
  }

  .version {
    font-size: 0.8em
  }
}

html.dark .download-button.secondary {
  color: #ffdf9e
  background: rgba(255, 214, 120, 0.1)
  box-shadow: inset 0 0 0 1px rgba(190, 160, 60, 0.4)
}

.release-action-note {
  display: flex
  align-items: flex-start
  gap: 0.45rem
  margin: 0.6rem 0 0
  color: var(--vp-c-text-2)
  font-size: 0.82rem
  line-height: 1.4

  svg {
    flex: 0 0 auto
    margin-top: 0.05rem
    font-size: 1rem
  }
}

@container (max-width: 36rem) {
  .release-card,
  .release-card.is-primary,
  .release-card.preview {
    grid-template-columns: minmax(0, 1fr)

    .download-button-wrap,
    .download-button {
      width: 100%
    }

    .release-actions {
      margin-top: 0.85rem
    }
  }
}

@media (max-width 640px) {
  .release-cards,
  .release-cards.has-preview {
    grid-template-columns: 1fr
  }

  .release-card,
  .release-card.is-primary,
  .release-card.preview {
    display: flex
    align-items: stretch
    flex-direction: column
    padding: 1.15rem

    .download-button-wrap,
    .download-button {
      width: 100%
    }
  }

  .release-card.is-primary .release-details {
    grid-template-columns: 1fr
    margin: 0.75rem 0
  }

  .release-actions {
    margin-top: 0.85rem
  }

  .download-button {
    line-height: 3rem
  }
}
</style>
