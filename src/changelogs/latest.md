---
title: 最新更新日志
description: Honyomi 最新版本的更新日志。
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
    router.go(`/changelogs/${latestTag}`)
  else
    router.go('/changelogs')
})
</script>

<div style="text-align: center; padding: 2rem;">
  <p>正在跳转到最新更新日志…</p>
</div>
