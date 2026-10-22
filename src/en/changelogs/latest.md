---
title: Latest Changelog
description: Changelog of the latest version of Honyomi.
outline: false
lastUpdated: false
editLink: false
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { data as release } from '@theme/data/release.data'

const router = useRouter()

onMounted(() => {
  const latestTag = release.stable?.tag_name
  if (latestTag)
    router.go(`/en/changelogs/${latestTag}`)
  else
    router.go('/en/changelogs')
})
</script>

<div style="text-align: center; padding: 2rem;">
  <p>Redirecting to the latest changelog...</p>
</div>
