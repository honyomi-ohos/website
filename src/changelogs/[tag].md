---
# 动态路由模板。标题/描述可为通用内容；正文使用路由参数。
outline: false
lastUpdated: false
editLink: false
prev:
  text: '更新日志'
  link: '/changelogs'
next:
  text: '下载'
  link: '/download'
---

<script setup lang="ts">
import { useData } from 'vitepress'
import ChangelogByTag from "@theme/components/ChangelogByTag.vue";

const { page } = useData()
const tag = page.value.params.tag as string
</script>

<!-- markdownlint-disable-file -->
<ChangelogByTag :tag="tag" />
