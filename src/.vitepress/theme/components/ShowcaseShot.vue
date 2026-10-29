<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  wide?: boolean
}>()

const failed = ref(false)

watch(() => props.src, () => {
  failed.value = false
})
</script>

<template>
  <figure class="shot" :class="{ wide, missing: failed }">
    <img
      v-show="!failed"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      @error="failed = true"
    >
    <figcaption v-if="failed">
      <span class="file">{{ src }}</span>
      <span class="hint">{{ alt }}</span>
    </figcaption>
  </figure>
</template>

<style lang="stylus" scoped>
.shot {
  margin: 0
  width: 100%
  max-width: 300px
  justify-self: center
  border-radius: 22px
  overflow: hidden
  border: 1px solid var(--vp-c-divider)
  background: var(--vp-c-bg-soft)
  box-shadow: 0 18px 48px rgba(22, 24, 29, 0.14)

  img {
    display: block
    width: 100%
    height: auto
    max-height: 640px
    object-fit: cover
    object-position: top center
  }

  &.wide {
    max-width: none

    img {
      max-height: 460px
      object-fit: cover
      object-position: left top
    }
  }

  &.missing {
    display: flex
    align-items: center
    justify-content: center
    min-height: 420px
    padding: 28px 22px
    background:
      linear-gradient(180deg, var(--vp-c-bg-soft), var(--vp-c-bg-alt))
    box-shadow: none

    &.wide {
      min-height: 240px
    }
  }
}

figcaption {
  display: flex
  flex-direction: column
  gap: 8px
  text-align: center
}

.file {
  font-family: var(--vp-font-family-mono)
  font-size: 13px
  font-weight: 600
  color: var(--vp-c-brand)
  word-break: break-all
}

.hint {
  font-size: 13px
  line-height: 1.55
  color: var(--vp-c-text-2)
}
</style>
