import type { DefaultTheme } from 'vitepress'

type SidebarConfig = DefaultTheme.SidebarMulti

function zhSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        {
          text: '下载',
          link: '/download/',
        },
        {
          text: '更新日志',
          link: '/changelogs/',
        },
        {
          text: '参与贡献',
          link: '/docs/contribute',
        },
      ],
    },
    {
      text: '常见问题',
      items: [
        { text: '通用', link: '/docs/faq/general' },
        {
          text: '书库',
          link: '/docs/faq/library',
        },
        {
          text: '更新',
          collapsed: true,
          items: [
            { text: '智能更新', link: '/docs/faq/updates/smart' },
            { text: '即将更新', link: '/docs/faq/updates/upcoming' },
          ],
        },
        {
          text: '浏览',
          link: '/docs/faq/browse/',
          collapsed: true,
          items: [
            { text: '扩展', link: '/docs/faq/browse/extensions' },
            {
              text: '本地源',
              link: '/docs/faq/browse/local-source',
            },
          ],
        },
        {
          text: '下载',
          link: '/docs/faq/downloads',
        },
        {
          text: '阅读',
          link: '/docs/faq/reader',
        },
        {
          text: '设置',
          link: '/docs/faq/settings',
        },
        {
          text: '存储',
          link: '/docs/faq/storage',
        },
      ],
    },
    {
      text: '指南',
      items: [
        {
          text: '快速上手',
          link: '/docs/guides/getting-started',
        },
        {
          text: '故障排查',
          link: '/docs/guides/troubleshooting/',
          collapsed: true,
          items: [
            {
              text: '常见问题',
              link: '/docs/guides/troubleshooting/common-issues',
            },
            {
              text: '问题诊断',
              link: '/docs/guides/troubleshooting/diagnosis',
            },
          ],
        },
        {
          text: '书源迁移',
          link: '/docs/guides/source-migration',
        },
        { text: '备份', link: '/docs/guides/backups' },
        { text: '追踪同步', link: '/docs/guides/tracking' },
        { text: '分类', link: '/docs/guides/categories' },
        {
          text: '本地源',
          link: '/docs/guides/local-source/',
        },
        {
          text: '阅读器设置',
          link: '/docs/guides/reader-settings',
        },
      ],
    },
  ]
}

function enSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        {
          text: 'Download',
          link: '/en/download/',
        },
        {
          text: 'Changelogs',
          link: '/en/changelogs/',
        },
        {
          text: 'Contribute',
          link: '/en/docs/contribute',
        },
      ],
    },
    {
      text: 'Frequently Asked Questions',
      items: [
        { text: 'General', link: '/en/docs/faq/general' },
        {
          text: 'Library',
          link: '/en/docs/faq/library',
        },
        {
          text: 'Updates',
          collapsed: true,
          items: [
            { text: 'Smart updates', link: '/en/docs/faq/updates/smart' },
            { text: 'Upcoming', link: '/en/docs/faq/updates/upcoming' },
          ],
        },
        {
          text: 'Browse',
          link: '/en/docs/faq/browse/',
          collapsed: true,
          items: [
            { text: 'Extensions', link: '/en/docs/faq/browse/extensions' },
            {
              text: 'Local source',
              link: '/en/docs/faq/browse/local-source',
            },
          ],
        },
        {
          text: 'Downloads',
          link: '/en/docs/faq/downloads',
        },
        {
          text: 'Reader',
          link: '/en/docs/faq/reader',
        },
        {
          text: 'Settings',
          link: '/en/docs/faq/settings',
        },
        {
          text: 'Storage',
          link: '/en/docs/faq/storage',
        },
      ],
    },
    {
      text: 'Guides',
      items: [
        {
          text: 'Getting started',
          link: '/en/docs/guides/getting-started',
        },
        {
          text: 'Troubleshooting',
          link: '/en/docs/guides/troubleshooting/',
          collapsed: true,
          items: [
            {
              text: 'Common issues',
              link: '/en/docs/guides/troubleshooting/common-issues',
            },
            {
              text: 'Diagnosis',
              link: '/en/docs/guides/troubleshooting/diagnosis',
            },
          ],
        },
        {
          text: 'Source migration',
          link: '/en/docs/guides/source-migration',
        },
        { text: 'Backups', link: '/en/docs/guides/backups' },
        { text: 'Tracking', link: '/en/docs/guides/tracking' },
        { text: 'Categories', link: '/en/docs/guides/categories' },
        {
          text: 'Local source',
          link: '/en/docs/guides/local-source/',
        },
        {
          text: 'Reader settings',
          link: '/en/docs/guides/reader-settings',
        },
      ],
    },
  ]
}

const sidebar: SidebarConfig = {
  '/download/': zhSidebar(),
  '/docs/': zhSidebar(),
  '/changelogs/': zhSidebar(),
  '/news/': zhSidebar(),
  '/privacy/': zhSidebar(),
  '/en/download/': enSidebar(),
  '/en/docs/': enSidebar(),
  '/en/changelogs/': enSidebar(),
  '/en/news/': enSidebar(),
  '/en/privacy/': enSidebar(),
}

export default sidebar
