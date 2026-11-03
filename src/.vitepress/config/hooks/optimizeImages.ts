import { readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

/** Public folders whose screenshots are large enough to recompress at build time. */
const FOLDERS = ['home', 'showcase']

const RASTER = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])
const REWRITE_EXT = new Set(['.html', '.js', '.css', '.mjs', '.json', '.xml', '.svg'])

// Phone shots render at 300px, the hero a bit wider. Wide shots sit in a ~640px column.
// Caps are 3× those CSS sizes so high-density screens stay sharp.
const PHONE = { width: 900, height: 2000 }
const HERO = { width: 960, height: 2000 }
const WIDE = { width: 1600, height: 1200 }

interface OptimizedFile {
  fromUrl: string
  toUrl: string
  before: number
  after: number
}

function limitsFor(fileName: string) {
  const base = path.basename(fileName, path.extname(fileName))
  if (base === 'wide')
    return WIDE
  if (base === 'phone')
    return HERO
  return PHONE
}

function isMissing(error: unknown) {
  return typeof error === 'object'
    && error !== null
    && 'code' in error
    && error.code === 'ENOENT'
}

function formatBytes(bytes: number) {
  if (bytes < 1024)
    return `${bytes} B`
  if (bytes < 1024 * 1024)
    return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

async function optimizeFile(dir: string, folder: string, fileName: string): Promise<OptimizedFile | undefined> {
  const ext = path.extname(fileName).toLowerCase()
  const fromPath = path.join(dir, fileName)
  const toName = `${path.basename(fileName, ext)}.avif`
  const toPath = path.join(dir, toName)
  const sourceSize = (await stat(fromPath)).size
  const tmp = `${toPath}.${process.pid}.tmp`
  const limits = limitsFor(fileName)

  try {
    await sharp(fromPath)
      .rotate()
      .resize({ ...limits, fit: 'inside', withoutEnlargement: true })
      .avif({ quality: 55, effort: 5, chromaSubsampling: '4:4:4' })
      .toFile(tmp)

    const outputSize = (await stat(tmp)).size
    if (outputSize >= sourceSize && ext === '.avif') {
      await rm(tmp, { force: true })
      return undefined
    }

    if (fromPath !== toPath)
      await rm(fromPath, { force: true })
    await rm(toPath, { force: true })
    await rename(tmp, toPath)

    const fromUrl = `/${folder}/${fileName}`
    const toUrl = `/${folder}/${toName}`
    console.log(`[images] ${folder}/${fileName} ${formatBytes(sourceSize)} -> ${toName} ${formatBytes(outputSize)}`)
    return fromUrl === toUrl
      ? undefined
      : { fromUrl, toUrl, before: sourceSize, after: outputSize }
  }
  catch (error) {
    await rm(tmp, { force: true })
    throw error
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function rewriteReferences(dir: string, replacements: OptimizedFile[]) {
  const entries = await readdir(dir, { withFileTypes: true })
  await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await rewriteReferences(full, replacements)
      return
    }
    if (!REWRITE_EXT.has(path.extname(entry.name).toLowerCase()))
      return

    let text = await readFile(full, 'utf8')
    let changed = false
    for (const { fromUrl, toUrl } of replacements) {
      // Skip paths such as ../home/phone.png in the screenshot guide.
      const pattern = new RegExp(`(?<![.\\w])${escapeRegExp(fromUrl)}`, 'g')
      const updated = text.replace(pattern, toUrl)
      if (updated === text)
        continue
      text = updated
      changed = true
    }
    if (changed)
      await writeFile(full, text)
  }))
}

export default async function optimizePublicImages(outDir: string) {
  const files: { dir: string, folder: string, fileName: string }[] = []

  for (const folder of FOLDERS) {
    const dir = path.join(outDir, folder)
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    }
    catch (error) {
      if (isMissing(error))
        continue
      throw error
    }

    const bases = new Map<string, string>()
    for (const entry of entries) {
      if (!entry.isFile())
        continue
      const ext = path.extname(entry.name).toLowerCase()
      if (!RASTER.has(ext))
        continue
      const base = path.basename(entry.name, ext)
      const previous = bases.get(base)
      if (previous)
        throw new Error(`Both ${folder}/${previous} and ${folder}/${entry.name} would become ${base}.avif`)
      bases.set(base, entry.name)
      files.push({ dir, folder, fileName: entry.name })
    }
  }

  const optimized = (await Promise.all(
    files.map(file => optimizeFile(file.dir, file.folder, file.fileName)),
  )).filter((file): file is OptimizedFile => file !== undefined)

  if (optimized.length === 0)
    return

  await rewriteReferences(outDir, optimized)
  const before = optimized.reduce((sum, file) => sum + file.before, 0)
  const after = optimized.reduce((sum, file) => sum + file.after, 0)
  console.log(`[images] ${formatBytes(before)} -> ${formatBytes(after)} across ${optimized.length} files`)
}
