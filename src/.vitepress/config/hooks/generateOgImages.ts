import type { ContentData, SiteConfig } from 'vitepress'
import type { SatoriOptions } from 'x-satori/vue'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderAsync } from '@resvg/resvg-js'
import { createContentLoader } from 'vitepress'
import { satoriVue } from 'x-satori/vue'
import { getStableReleases } from '../releaseData'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __fonts = resolve(__dirname, '../../fonts')

async function generateOgImages(config: SiteConfig) {
  const pages = await createContentLoader('**/*.md', { excerpt: true }).load()
  const template = await readFile(resolve(__dirname, '../../theme/components/OgImageTemplate.vue'), 'utf-8')

  const fonts: SatoriOptions['fonts'] = [
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-Regular.otf')),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-Medium.otf')),
      weight: 500,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-SemiBold.otf')),
      weight: 600,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-Bold.otf')),
      weight: 700,
      style: 'normal',
    },
  ]

  // Inter has no CJK glyphs: only render dynamic OG images for English pages
  // (Chinese pages fall back to the static /img/og-default.png).
  const filteredPages = pages.filter(p =>
    p.frontmatter.image === undefined
    && p.url.startsWith('/en/')
    && !p.url.startsWith('/en/changelogs/'),
  )

  for (const page of filteredPages) {
    await generateImage({
      page,
      template,
      outDir: config.outDir,
      fonts,
    })
  }

  // Changelog tag pages have language-neutral version titles.
  const releases = await getStableReleases()

  for (const r of releases) {
    if (!r.tag_name)
      continue

    const pageLike: Pick<ContentData, 'url' | 'frontmatter'> = {
      url: `/en/changelogs/${r.tag_name}`,
      frontmatter: {
        title: r.name || `Honyomi ${r.tag_name}`,
        description: undefined,
      } as ContentData['frontmatter'],
    }

    await generateImage({
      page: pageLike,
      template,
      outDir: config.outDir,
      fonts,
    })

    // The Chinese changelog tag page shares the version-number title, so it can
    // reuse the same rendered image.
    await copyImage({
      from: resolve(config.outDir, `en/changelogs/${r.tag_name}/__og_image__/og.png`),
      to: resolve(config.outDir, `changelogs/${r.tag_name}/__og_image__/og.png`),
    })
  }
}

export default generateOgImages

interface GenerateImagesOptions {
  page: Pick<ContentData, 'url' | 'frontmatter'>
  template: string
  outDir: string
  fonts: SatoriOptions['fonts']
}

function getDir(url: string) {
  if (url.startsWith('/en/docs/faq/'))
    return 'FAQ'
  else if (url.startsWith('/en/docs/guides/'))
    return 'Guide'
  else if (url.startsWith('/en/news/') && url !== '/en/news/')
    return 'News'

  return undefined
}

async function generateImage({ page, template, outDir, fonts }: GenerateImagesOptions) {
  const { frontmatter, url } = page

  const options: SatoriOptions = {
    width: 1200,
    height: 628,
    fonts,
    props: {
      title:
        frontmatter.layout === 'home'
          ? frontmatter.hero.name ?? frontmatter.title
          : frontmatter.customMetaTitle ?? frontmatter.title,
      description:
        frontmatter.layout === 'home'
          ? frontmatter.hero.tagline ?? frontmatter.description
          : frontmatter.description,
      dir: getDir(url),
    },
  }

  const svg = await satoriVue(options, template)

  const render = await renderAsync(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })

  const outputFolder = resolve(outDir, url.substring(1), '__og_image__')
  const outputFile = resolve(outputFolder, 'og.png')

  await mkdir(outputFolder, { recursive: true })

  return await writeFile(outputFile, render.asPng())
}

async function copyImage({ from, to }: { from: string, to: string }) {
  try {
    const data = await readFile(from)
    await mkdir(dirname(to), { recursive: true })
    await writeFile(to, data)
  }
  catch {
    // Source image may not exist; nothing to copy.
  }
}
