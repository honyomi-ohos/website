<script setup lang="ts">
import { IconDownload } from '@iconify-prerendered/vue-mdi'
import { data as stableRelease } from '../data/latestStableRelease.data'
import { useThemeI18n } from '../utils/i18n'
import LiquidGlass from './LiquidGlass.vue'
import LocalizedDate from './LocalizedDate.vue'

const { labels } = useThemeI18n()
</script>

<template>
  <aside v-if="stableRelease" class="latest-stable-release" aria-label="Latest stable release">
    <LiquidGlass preset="card" class="latest-release-glass">
      <div class="latest-release-summary">
        <span class="release-kicker">{{ labels.latestStableKicker }}</span>
        <strong>{{ stableRelease.name }}</strong>
        <span v-if="stableRelease.publishedAt" class="release-date">
          {{ labels.released }} <LocalizedDate :value="stableRelease.publishedAt" />
        </span>
      </div>

      <div class="latest-release-actions">
        <a class="download-link" href="/download/" aria-label="Download latest stable release">
          <IconDownload aria-hidden="true" />
          <span class="download-label">{{ labels.download }}</span>
        </a>
      </div>
    </LiquidGlass>
  </aside>
</template>

<style lang="stylus" scoped>
.latest-stable-release {
  margin-top: 1.5rem
}

.latest-release-glass {
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: 0.8rem 1.25rem
  width: fit-content
  max-width: 100%
  padding: 0.8rem 0.9rem 0.8rem 1rem
  border-radius: 24px
  box-shadow: inset 0 0 0 1px var(--vp-c-divider), 0 12px 32px rgba(0, 0, 0, 0.14)
}

.latest-release-summary {
  display: grid
  gap: 0.1rem
  min-width: 11rem

  strong {
    color: var(--vp-c-text-1)
    font-size: 0.96rem
  }
}

.release-kicker,
.release-date {
  color: var(--vp-c-text-2)
  font-size: 0.78rem
}

.latest-release-actions {
  display: flex
  align-items: center
  gap: 0.7rem
}

.download-link {
  display: inline-flex
  align-items: center
  gap: 0.4rem
  min-height: 2.3rem
  padding: 0 0.85rem
  border-radius: 12px
  background: var(--vp-c-brand-darker)
  color: var(--vp-button-brand-text)
  font-size: 0.84rem
  font-weight: 600
  text-decoration: none
  transition: background-color 0.2s, transform 0.2s

  &:hover {
    background: var(--vp-c-brand-dark)
    color: var(--vp-button-brand-text)
    transform: translateY(-1px)
  }

  svg {
    font-size: 1rem
  }
}

@media (max-width 640px) {
  .latest-release-glass {
    position: relative
    width: 100%
    align-items: center
    gap: 0.75rem
    padding-right: 10.25rem
  }

  .latest-release-actions {
    position: absolute
    top: 50%
    right: 0.85rem
    width: auto
    gap: 0.35rem
    transform: translateY(-50%)
  }

  .latest-release-summary {
    width: 100%
    text-align: left
  }

  .download-link {
    justify-content: center
    min-height: 2.35rem
    padding: 0 0.75rem
  }
}
</style>
