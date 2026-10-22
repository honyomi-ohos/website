import { defineLoader } from 'vitepress'
import { getReleaseData } from '../../config/releaseData'

export interface LatestStableRelease {
  name: string
  publishedAt?: string
  tagName: string
}

export declare const data: LatestStableRelease | null
export { data }

export default defineLoader({
  async load(): Promise<LatestStableRelease | null> {
    const { stableLatest } = await getReleaseData()

    if (!stableLatest)
      return null

    return {
      name: stableLatest.name ?? `Honyomi ${stableLatest.tag_name}`,
      publishedAt: stableLatest.published_at ?? undefined,
      tagName: stableLatest.tag_name,
    }
  },
})
