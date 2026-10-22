import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vitepress'

// Theme related config
import headConfig from './config/headConfig'

// Enhanced meta generation
import generateFeed from './config/hooks/generateFeed'

import generateMeta from './config/hooks/generateMeta'

// Provides how to generate Meta head tags

// Allows generation of RSS feed
import generateOgImages from './config/hooks/generateOgImages'

import markdownConfig from './config/markdownConfig'

import { getStableRelease } from './config/releaseData'

// For use with loading Markdown plugins
import themeConfig from './config/themeConfig'

const title = 'Honyomi'
const description = '发现并阅读漫画、小说与视频——HarmonyOS 设备上前所未有的阅读体验。'

const env = loadEnv('', process.cwd())
const hostname: string = env.VITE_HOSTNAME || 'http://localhost:4173'

export default defineConfig({
  outDir: '../dist',
  lastUpdated: true,
  cleanUrls: true,
  title,
  description,
  sitemap: {
    hostname,
  },
  head: headConfig,
  markdown: markdownConfig,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Discover and read manga, novels, and videos – easier than ever on your HarmonyOS device.',
    },
  },
  themeConfig,
  transformPageData: async (pageData) => {
    if (pageData.filePath === 'changelogs/[tag].md' || pageData.filePath === 'en/changelogs/[tag].md') {
      const tag = (pageData as unknown as { params?: { tag?: string } }).params?.tag as string | undefined
      if (tag) {
        const version = tag.startsWith('v') ? tag.slice(1) : tag
        pageData.frontmatter ||= {}
        pageData.frontmatter.title = `v${version}`

        const release = await getStableRelease(tag)
        const publishedAt = release?.published_at || release?.created_at || ''

        const prettyDate = publishedAt
          ? new Date(publishedAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
          : undefined

        const versionLabel = tag
        const desc = prettyDate
          ? `Changelog for Honyomi ${versionLabel}, released on ${prettyDate}`
          : `Changelog for Honyomi ${versionLabel}`

        pageData.frontmatter.description = pageData.frontmatter.description || desc
        pageData.title = pageData.frontmatter.title
        pageData.description = pageData.frontmatter.description
      }
    }
    return pageData
  },
  transformHead: async context => generateMeta(context, hostname),
  buildEnd: async (context) => {
    generateFeed(context, hostname)
    generateOgImages(context)
  },
  vite: {
    resolve: {
      alias: [
        {
          // Used to show the release version on navbar.
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomNavBarMenu.vue', import.meta.url),
          ),
        },
        {
          find: /^.*VPNavScreenMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomNavScreenMenu.vue', import.meta.url),
          ),
        },
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomSwitchAppearance.vue', import.meta.url),
          ),
        },
        {
          // Used to render liquid glass hero action buttons.
          find: /^.*\/VPButton\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/GlassButton.vue', import.meta.url),
          ),
        },
      ],
    },
  },
})
