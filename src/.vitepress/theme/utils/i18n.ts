import { useData } from 'vitepress'
import { computed } from 'vue'

export interface ThemeLabels {
  latestStableKicker: string
  released: string
  download: string
  changelog: string
  viewReleasePage: string
  here: string
  contributors: string
  otherContributors: string
  latest: string
  assets: string
  releaseNotFound: string
  readArticle: string
  rssFeed: string
  latestRelease: string
  releasedAt: string
  redirecting: string
  downloadTitle: string
  stableTitle: string
  stableDescription: string
  stableNote: string
  previewTitle: string
  previewDescription: string
  unsupportedTitle: string
  unsupportedBody: string
  releasesOnGitHub: string
  githubReleasesLink: string
}

const zh: ThemeLabels = {
  latestStableKicker: '最新稳定版',
  released: '发布于',
  download: '下载',
  changelog: '更新日志',
  viewReleasePage: '查看完整发布页面',
  here: '这里',
  contributors: '贡献者',
  otherContributors: '位其他贡献者',
  latest: '最新',
  assets: '附件',
  releaseNotFound: '未找到该版本。',
  readArticle: '阅读全文',
  rssFeed: 'RSS 订阅',
  latestRelease: '最新版本：',
  releasedAt: '发布时间：',
  redirecting: '正在跳转到最新更新日志…',
  downloadTitle: '下载',
  stableTitle: '稳定版',
  stableDescription: '推荐大多数用户使用',
  stableNote: '需要 HarmonyOS 6.0 或更高版本。',
  previewTitle: '预览版',
  previewDescription: '可能包含未完成的功能或稳定性问题',
  unsupportedTitle: '不受支持的操作系统',
  unsupportedBody: 'Honyomi 仅提供 HarmonyOS 版本。任何其他平台上名为 Honyomi 的应用均与本项目无关。',
  releasesOnGitHub: '也可以在 GitHub 上查看',
  githubReleasesLink: 'GitHub Releases',
}

const en: ThemeLabels = {
  latestStableKicker: 'Latest stable release',
  released: 'Released',
  download: 'Download',
  changelog: 'Changelog',
  viewReleasePage: 'View the release page',
  here: 'here',
  contributors: 'Contributors',
  otherContributors: 'other contributors',
  latest: 'Latest',
  assets: 'Assets',
  releaseNotFound: 'Release not found.',
  readArticle: 'Read article',
  rssFeed: 'RSS feed',
  latestRelease: 'Latest release:',
  releasedAt: 'Released:',
  redirecting: 'Redirecting to the latest changelog...',
  downloadTitle: 'Download',
  stableTitle: 'Stable',
  stableDescription: 'Recommended for most users',
  stableNote: 'Requires HarmonyOS 6.0 or higher.',
  previewTitle: 'Preview',
  previewDescription: 'May contain unfinished features or stability issues',
  unsupportedTitle: 'Unsupported operating system',
  unsupportedBody: 'Honyomi is only available on HarmonyOS. Any non-HarmonyOS app named Honyomi is unaffiliated with this project.',
  releasesOnGitHub: 'Also available on',
  githubReleasesLink: 'GitHub Releases',
}

export function useThemeI18n() {
  const { lang } = useData()
  const labels = computed<ThemeLabels>(() => (lang.value.startsWith('zh') ? zh : en))
  const changelogBase = computed(() => (lang.value.startsWith('zh') ? '/changelogs' : '/en/changelogs'))
  return { labels, changelogBase }
}
