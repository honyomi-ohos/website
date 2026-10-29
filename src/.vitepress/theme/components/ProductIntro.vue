<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { introFor } from '../productIntro'
import ShowcaseShot from './ShowcaseShot.vue'

const { lang } = useData()
const copy = computed(() => introFor(lang.value))
</script>

<template>
  <section class="product-intro" :aria-label="copy.aria">
    <p class="lead">{{ copy.lead }}</p>

    <div class="formats">
      <article v-for="item in copy.formats" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>

    <article
      v-for="band in copy.bands"
      :id="band.id"
      :key="band.id"
      class="band"
      :class="{ flip: band.reverse, wide: band.wide }"
    >
      <div class="copy">
        <p class="kicker">{{ band.kicker }}</p>
        <h2>{{ band.title }}</h2>
        <p class="lede">{{ band.lede }}</p>
        <ul>
          <li v-for="point in band.points" :key="point">{{ point }}</li>
        </ul>
        <a v-if="band.link" class="doc" :href="band.link.href">{{ band.link.text }}</a>
      </div>
      <ShowcaseShot :src="band.image" :alt="band.alt" :wide="band.wide" />
    </article>

    <div class="extra">
      <p class="kicker">{{ copy.extraKicker }}</p>
      <h2>{{ copy.extraTitle }}</h2>
      <p class="lede">{{ copy.extraLede }}</p>
      <div class="cards">
        <article v-for="card in copy.cards" :key="card.title">
          <h3>{{ card.title }}</h3>
          <p>{{ card.text }}</p>
        </article>
      </div>
    </div>

    <div class="cta">
      <div>
        <h2>{{ copy.ctaTitle }}</h2>
        <p>{{ copy.ctaText }}</p>
      </div>
      <div class="cta-actions">
        <a class="primary" :href="copy.ctaPrimaryHref">{{ copy.ctaPrimary }}</a>
        <a class="secondary" :href="copy.ctaSecondaryHref">{{ copy.ctaSecondary }}</a>
      </div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
.product-intro {
  max-width: 1120px
  margin: 0 auto
  padding: 12px 24px 96px
  color: var(--vp-c-text-1)
}

.lead {
  max-width: 46rem
  margin: 8px auto 28px
  text-align: center
  font-size: 18px
  line-height: 1.7
  color: var(--vp-c-text-2)
}

.formats {
  display: grid
  grid-template-columns: repeat(4, minmax(0, 1fr))
  gap: 12px
  margin-bottom: 12px

  article {
    padding: 16px 16px 14px
    border: 1px solid var(--vp-c-divider)
    border-radius: 16px
    background: var(--vp-c-bg-soft)
  }

  h3 {
    margin: 0 0 6px
    font-size: 15px
    font-weight: 650
    letter-spacing: 0
    line-height: 1.4
    border: 0
    padding: 0
  }

  p {
    margin: 0
    font-size: 13px
    line-height: 1.55
    color: var(--vp-c-text-2)
  }
}

.band {
  display: grid
  grid-template-columns: minmax(0, 1.15fr) minmax(240px, 320px)
  gap: 48px
  align-items: center
  padding: 64px 0
  scroll-margin-top: 88px
  border-top: 1px solid var(--vp-c-divider)

  &.wide {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr)
  }

  &.flip :deep(.shot) {
    order: -1
  }
}

.kicker {
  margin: 0 0 8px
  font-size: 13px
  font-weight: 700
  letter-spacing: 0.04em
  color: var(--vp-c-brand)
}

h2 {
  margin: 0
  font-size: 32px
  line-height: 1.25
  letter-spacing: -0.02em
  border: 0
  padding: 0
}

.lede {
  margin: 12px 0 0
  font-size: 16px
  line-height: 1.65
  color: var(--vp-c-text-2)
}

ul {
  margin: 16px 0 0
  padding: 0
  list-style: none

  li {
    position: relative
    margin: 8px 0
    padding-left: 16px
    font-size: 15px
    line-height: 1.65
    color: var(--vp-c-text-1)

    &::before {
      content: ""
      position: absolute
      left: 0
      top: 0.62em
      width: 6px
      height: 6px
      border-radius: 50%
      background: var(--vp-c-brand)
    }
  }
}

.doc {
  display: inline-block
  margin-top: 14px
  font-size: 14px
  font-weight: 650
  color: var(--vp-c-brand-dark)
  text-decoration: none

  &:hover {
    text-decoration: underline
    text-underline-offset: 3px
  }
}

.extra {
  padding-top: 56px
  border-top: 1px solid var(--vp-c-divider)
  scroll-margin-top: 88px

  .lede {
    max-width: 40rem
  }
}

.cards {
  display: grid
  grid-template-columns: repeat(4, minmax(0, 1fr))
  gap: 12px
  margin-top: 22px

  article {
    padding: 16px
    border: 1px solid var(--vp-c-divider)
    border-radius: 16px
    background: var(--vp-c-bg)
  }

  h3 {
    margin: 0 0 8px
    font-size: 15px
    line-height: 1.4
    border: 0
    padding: 0
  }

  p {
    margin: 0
    font-size: 13.5px
    line-height: 1.6
    color: var(--vp-c-text-2)
  }
}

.cta {
  display: flex
  align-items: center
  justify-content: space-between
  gap: 24px
  margin-top: 28px
  padding: 28px
  border-radius: 20px
  background: var(--vp-c-bg-soft)
  border: 1px solid var(--vp-c-divider)

  p {
    margin: 8px 0 0
    color: var(--vp-c-text-2)
  }
}

.cta-actions {
  display: flex
  flex-wrap: wrap
  gap: 10px
  flex: none

  a {
    display: inline-flex
    align-items: center
    justify-content: center
    min-height: 44px
    padding: 0 18px
    border-radius: 12px
    font-weight: 650
    text-decoration: none
  }

  .primary {
    color: #fff
    background: var(--vp-c-brand)
  }

  .secondary {
    color: var(--vp-c-text-1)
    background: transparent
    box-shadow: inset 0 0 0 1px var(--vp-c-divider)
  }
}

@media (max-width: 960px) {
  .formats,
  .cards {
    grid-template-columns: 1fr 1fr
  }

  .band,
  .band.wide,
  .band.flip {
    grid-template-columns: 1fr
    gap: 24px
    padding: 40px 0

    :deep(.shot) {
      order: -1
      max-width: 280px
    }
  }

  h2 {
    font-size: 26px
  }

  .cta {
    flex-direction: column
    align-items: flex-start
  }
}

@media (max-width: 560px) {
  .product-intro {
    padding-left: 16px
    padding-right: 16px
  }

  .formats,
  .cards {
    grid-template-columns: 1fr
  }
}

.dark .doc {
  color: var(--vp-c-brand-light)
}
</style>
