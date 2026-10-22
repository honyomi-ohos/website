// Import icon components
import { IconBugReport, IconDownload, IconNewspaperVariant } from '@iconify-prerendered/vue-mdi'

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'

import Layout from './Layout.vue'

import analytics from './plugin/analytics'

// Import Stylus files
import './styles/base.styl'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
    app.component('IconDownload', IconDownload)
    app.component('IconNewspaperVariant', IconNewspaperVariant)
    app.component('IconBugReport', IconBugReport)
    analytics({ id: import.meta.env.VITE_GA_ID ?? '' })
  },
  Layout,
}
