// Code based on vitepress-plugin-google-analytics.
// Customized as the plugin did not consider the script loading time.
// https://github.com/ZhongxuYang/vitepress-plugin-google-analytics

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function mountGoogleAnalytics(id: string) {
  if (('dataLayer' in window && window.gtag) || window.location.hostname === 'localhost')
    return

  const analyticsScript = document.createElement('script')

  analyticsScript.addEventListener('load', () => {
    window.dataLayer = window.dataLayer || []
    function gtag(..._args: unknown[]) {
      window.dataLayer!.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', id)

    window.gtag = gtag
  })

  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`

  document.body.appendChild(analyticsScript)
}

export default function ({ id }: { id: string }) {
  if (import.meta.env.MODE === 'production' && id && typeof window !== 'undefined')
    mountGoogleAnalytics(id)
}
