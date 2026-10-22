import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Octokit } from '@octokit/rest'
import { GITHUB_OWNER, GITHUB_REPO } from './constants'

const cacheFile = resolve(dirname(fileURLToPath(import.meta.url)), '../../../.cache/github-releases.json')
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export type Release = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.getLatestRelease>

export interface ReleaseData {
  stable: Release[]
  stableLatest?: Release
  betaLatest?: Release
}

interface CachedReleaseData extends ReleaseData {
  version: 1
  fetchedAt: string
}

let releaseDataPromise: Promise<ReleaseData> | undefined

export async function getReleaseData(): Promise<ReleaseData> {
  releaseDataPromise ||= loadReleaseData()
  return releaseDataPromise
}

export async function refreshReleaseData(): Promise<ReleaseData> {
  releaseDataPromise = fetchReleaseData()
  const data = await releaseDataPromise
  await writeCache(data)
  return data
}

export async function getStableReleases(): Promise<Release[]> {
  return (await getReleaseData()).stable
}

export async function getStableRelease(tag: string): Promise<Release | undefined> {
  return (await getReleaseData()).stable.find(release => release.tag_name === tag)
}

async function loadReleaseData(): Promise<ReleaseData> {
  const cached = await readCache()
  if (cached)
    return cached

  try {
    return await refreshReleaseData()
  }
  catch (error) {
    console.warn(
      'Unable to fetch GitHub release data. '
      + 'Set GITHUB_TOKEN and run "npm run refresh:releases" to create the local cache. '
      + 'Falling back to an empty release list.',
      error instanceof Error ? error.message : error,
    )
    return { stable: [] }
  }
}

async function fetchReleaseData(): Promise<ReleaseData> {
  const [releases, latest] = await Promise.all([
    octokit.paginate(octokit.repos.listReleases, {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      per_page: 100,
    }),
    octokit.repos
      .getLatestRelease({ owner: GITHUB_OWNER, repo: GITHUB_REPO })
      .catch(() => undefined),
  ])

  const stable = releases.filter(release => !release.draft && !release.prerelease)
  const prereleases = releases.filter(release => !release.draft && release.prerelease)

  return {
    stable,
    stableLatest: latest?.data ?? stable[0],
    betaLatest: prereleases[0] ?? stable[0],
  }
}

async function readCache(): Promise<ReleaseData | undefined> {
  try {
    const cached = JSON.parse(await readFile(cacheFile, 'utf8')) as Partial<CachedReleaseData>
    if (cached.version === 1 && Array.isArray(cached.stable)) {
      return {
        stable: cached.stable,
        stableLatest: cached.stableLatest,
        betaLatest: cached.betaLatest,
      }
    }
  }
  catch {
    // A missing or outdated cache is refreshed below.
  }
}

async function writeCache(data: ReleaseData): Promise<void> {
  await mkdir(dirname(cacheFile), { recursive: true })
  const temporaryFile = `${cacheFile}.tmp`
  const cached: CachedReleaseData = {
    version: 1,
    fetchedAt: new Date().toISOString(),
    ...data,
  }
  await writeFile(temporaryFile, `${JSON.stringify(cached, null, 2)}\n`)
  await rename(temporaryFile, cacheFile)
}

async function main(): Promise<void> {
  const data = await refreshReleaseData()
  console.warn(`Cached ${data.stable.length} stable releases in ${cacheFile}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  void main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
