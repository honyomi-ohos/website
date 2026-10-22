import type { DefaultTheme } from 'vitepress'

const zhNav: DefaultTheme.NavItem[] = [
  {
    text: '获取 v{app_version}',
    activeMatch: '^/*?(download|changelogs)/*?$',
    items: [
      {
        text: '下载',
        link: '/download/',
      },
      {
        text: '更新日志',
        link: '/changelogs/',
      },
    ],
  },
  {
    text: '文档',
    link: '/docs/guides/getting-started',
    activeMatch: '/docs/',
  },
  {
    text: '新闻',
    link: '/news/',
    activeMatch: '/news/',
  },
]

const enNav: DefaultTheme.NavItem[] = [
  {
    text: 'Get v{app_version}',
    activeMatch: '^/*?en/*?(download|changelogs)/*?$',
    items: [
      {
        text: 'Download',
        link: '/en/download/',
      },
      {
        text: 'Changelogs',
        link: '/en/changelogs/',
      },
    ],
  },
  {
    text: 'Docs',
    link: '/en/docs/guides/getting-started',
    activeMatch: '/en/docs/',
  },
  {
    text: 'News',
    link: '/en/news/',
    activeMatch: '/en/news/',
  },
]

export default { enNav, zhNav }
