import type { DefaultTheme } from 'vitepress'
import { GITHUB_REPO_URL } from './constants'
import nav from './navigation/navbar'
import sidebar from './navigation/sidebar'

const themeConfig: DefaultTheme.Config = {
  logo: {
    src: '/img/logo-128px.png',
    width: 24,
    height: 24,
  },

  sidebar,

  outline: [2, 3],

  socialLinks: [
    {
      icon: 'github',
      link: GITHUB_REPO_URL,
      ariaLabel: 'Project GitHub',
    },
  ],

  search: {
    provider: 'local',
    options: {
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          displayDetails: '显示详细列表',
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
          },
        },
      },
    },
  },

  locales: {
    root: {
      label: '简体中文',
      nav: nav.zhNav,

      footer: {
        message: '<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">开源 Apache 协议</a> <span class="divider">|</span> <a href="/privacy/">隐私政策</a>',
        copyright: `Copyright © ${new Date().getFullYear()} Honyomi Contributors`,
      },

      editLink: {
        pattern: 'https://github.com/ShueyYuen/website/edit/main/src/:path',
        text: '帮助我们改进此页面',
      },

      lastUpdated: {
        text: '最后更新',
        formatOptions: {
          forceLocale: true,
          dateStyle: 'long',
          timeStyle: 'short',
        },
      },

      outline: {
        label: '页面导航',
      },

      docFooter: {
        prev: '上一篇',
        next: '下一篇',
      },

      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '外观',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
    },

    en: {
      label: 'English',
      nav: nav.enNav,

      footer: {
        message: '<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Open-source Apache Licensed</a> <span class="divider">|</span> <a href="/en/privacy/">Privacy policy</a>',
        copyright: `Copyright © ${new Date().getFullYear()} Honyomi Contributors`,
      },

      editLink: {
        pattern: 'https://github.com/ShueyYuen/website/edit/main/src/:path',
        text: 'Help us improve this page',
      },

      lastUpdated: {
        text: 'Last updated',
        formatOptions: {
          forceLocale: true,
          dateStyle: 'long',
          timeStyle: 'short',
        },
      },

      outline: {
        label: 'On this page',
      },

      docFooter: {
        prev: 'Previous page',
        next: 'Next page',
      },

      returnToTopLabel: 'Return to top',
      sidebarMenuLabel: 'Menu',
      darkModeSwitchLabel: 'Appearance',
      lightModeSwitchTitle: 'Switch to light theme',
      darkModeSwitchTitle: 'Switch to dark theme',
    },
  },
}

export default themeConfig
