<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { attachGlass } from '../glass/glassManager'

const props = withDefaults(defineProps<{
  preset?: 'button' | 'card' | 'bar'
  mode?: 'fixed' | 'flow'
  radius?: number
  tint?: 'neutral' | 'brand'
}>(), {
  preset: 'card',
})

const root = ref<HTMLElement>()
let detach: (() => void) | null = null

onMounted(() => {
  if (root.value) {
    detach = attachGlass(root.value, {
      preset: props.preset,
      mode: props.mode,
      radius: props.radius,
      tint: props.tint,
    })
  }
})

onBeforeUnmount(() => {
  detach?.()
  detach = null
})
</script>

<template>
  <div ref="root" class="liquid-glass" :data-liquid-glass="preset">
    <div class="liquid-glass-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.liquid-glass {
  position: relative;
  z-index: 0;
  isolation: isolate;
}

.liquid-glass-content {
  position: relative;
  z-index: 1;
}
</style>
