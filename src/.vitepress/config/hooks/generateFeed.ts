import type { Item } from 'feed'
import type { SiteConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'

export interface FeedLocaleConfig {
  /** Glob of markdown posts, relative to the src root. */
  glob: string
  /** Output feed file name, relative to the site root. */
  fileName: string
  /** BCP-47 language tag written into the feed. */
  language: string
  /** Site description override for this locale. */
  description: string
}

export const feedLocales: FeedLocaleConfig[] = [
  {
    glob: 'news/*.md',
    fileName: 'feed.rss',
    language: 'zh-CN',
    description: 'Honyomi 的新闻与公告。',
  },
  {
    glob: 'en/news/*.md',
    fileName: 'en/feed.rss',
    language: 'en',
    description: 'News and announcements about Honyomi.',
  },
]

async function generateFeed(config: SiteConfig, hostname: string) {
  for (const locale of feedLocales) {
    const nested = locale.fileName.includes('/')

    const feed = new Feed({
      title: 'Honyomi',
      description: locale.description,
      id: hostname,
      link: hostname,
      language: locale.language,
      image: `${hostname}/img/logo.png`,
      favicon: `${hostname}/favicon.ico`,
      copyright: `Copyright © ${new Date().getFullYear()} Honyomi Contributors`,
    })
    const json: Item[] = []

    const posts = await createContentLoader(locale.glob, {
      excerpt: true,
      render: true,
      includeSrc: true,
    }).load()

    // Filter everything that's not of type `article` (e.g. index.md)
    const filteredPosts = posts.filter(post => post.frontmatter.type === 'article')

    filteredPosts.sort((a, b) => +new Date(b.frontmatter.date as string) - +new Date(a.frontmatter.date as string))

    for (const { url, frontmatter, html, src } of filteredPosts) {
      const fullUrl = `${hostname}${url}`

      // Strip `&ZeroWidthSpace;` from `html` string
      const content = (html ?? '')
        .replace(/&ZeroWidthSpace;/g, '')
        .replace(/<a href="(\/.*?)">/g, `<a href="${hostname}$1">`)

      const markdown = (src ?? '')
        .replace(/^---.*---/s, '')
        .replace(/\]\((\/.*?)\)/g, `](${hostname}$1)`)
        .replace(/^# .*$/m, '')
        .trim()

      const post = {
        title: frontmatter.title,
        id: fullUrl,
        link: fullUrl,
        description: frontmatter.description,
        content,
        date: frontmatter.date,
      } satisfies Item

      feed.addItem(post)
      json.push({ ...post, content: nested ? content : markdown })
    }

    writeFileSync(path.join(config.outDir, locale.fileName), feed.rss2())
    writeFileSync(
      path.join(config.outDir, locale.fileName.replace(/feed\.rss$/, 'news.json')),
      JSON.stringify(json),
    )
  }
}

export default generateFeed
