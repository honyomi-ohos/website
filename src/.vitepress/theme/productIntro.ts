export interface IntroLink {
  href: string
  text: string
}

export interface IntroBand {
  id: string
  kicker: string
  title: string
  lede: string
  points: string[]
  image: string
  alt: string
  reverse?: boolean
  wide?: boolean
  link?: IntroLink
}

export interface IntroItem {
  title: string
  text: string
}

export interface IntroCopy {
  aria: string
  lead: string
  formats: IntroItem[]
  bands: IntroBand[]
  extraKicker: string
  extraTitle: string
  extraLede: string
  cards: IntroItem[]
  ctaTitle: string
  ctaText: string
  ctaPrimary: string
  ctaPrimaryHref: string
  ctaSecondary: string
  ctaSecondaryHref: string
}

function zh(): IntroCopy {
  const docs = ''
  return {
    aria: 'Honyomi 功能介绍',
    lead: 'Honyomi 把漫画、小说、电子书和视频放在同一个书架里。书架、阅读进度和设置都留在这台设备上。在线内容来自你安装的扩展，应用本身是阅读器。',
    formats: [
      { title: '漫画', text: '文件夹、ZIP、CBZ，以及扩展提供的在线图源。' },
      { title: '小说与电子书', text: 'EPUB、MOBI、AZW、AZW3、PRC，也可听书。' },
      { title: '视频', text: 'MP4、MKV、WebM、MOV、M4V，带字幕和弹幕。' },
      { title: '在线书源', text: '安装 .honyomiplug 扩展后，从插件仓库接入。' },
    ],
    bands: [
      {
        id: 'library',
        kicker: '书架',
        title: '所有作品在一处',
        lede: '手机底部第一个页签就是书架。封面网格、分类和角标都为了让你尽快回到上次看到的地方。',
        points: [
          '视图有紧凑网格、松散网格、封面网格和列表。列数、排序和升降序可以分别设置。',
          '可以按未读、已开始、已下载、书签、已读完、已追踪，以及漫画、小说、视频来筛选。',
          '分类显示为顶栏页签，也能显示每个分类里的作品数量。从一侧滑动封面可以把作品标为已读，这一侧也可以改成不操作。',
          '封面角标标出未读、已下载、本地文件和语言。也可以只看已下载的作品。长按封面进入批量管理。',
          '检查更新可以限制为仅 Wi-Fi，或仅在充电时。',
          '把作品加到桌面卡片后，可以从卡片直接打开。',
        ],
        image: '/showcase/library.png',
        alt: '书架：网格封面、分类页签和未读角标',
        link: { href: `${docs}/docs/faq/library`, text: '书架常见问题' },
      },
      {
        id: 'updates',
        kicker: '更新',
        title: '新章节和放送表',
        lede: '更新页汇总书架里的新章节，也可以切到即将更新和 Bangumi 放送时间表。',
        points: [
          '按分类筛选新章节，也可以按已下载、未读、已开始、书签筛选，或手动刷新整架书架。',
          '每部作品可以单独设置检查更新的间隔。',
          '即将更新按日期列出还没发布的章节。',
          '放送时间表按星期一到星期日查看 Bangumi 当日新番。',
        ],
        image: '/showcase/updates.png',
        alt: '更新页：新章节列表，以及更新与时间表的切换',
        reverse: true,
        link: { href: `${docs}/docs/faq/updates/smart`, text: '智能更新说明' },
      },
      {
        id: 'browse',
        kicker: '浏览',
        title: '扩展、书源与本地文件',
        lede: '在线书源由扩展提供。本地漫画目录和电子书不用装插件，放进设备里就能读。',
        points: [
          '可以从插件仓库安装、更新和卸载，也可以直接选择本地的 .honyomiplug 或 .zip。',
          '有新版本时，扩展列表上会出现更新标记。NSFW 书源默认隐藏，可以在设置里打开。',
          '某一个扩展可以单独进入隐身：浏览它的书源时不写历史，也不计阅读时长。',
          '全局搜索用一个关键词同时查询已安装的书源。',
          '本地源在所选文件夹里使用 comic、novel、anime 三个目录，分别放图片或压缩包、txt 章节和视频。同步时会把目录复制进应用再扫描。',
          '用文件管理器打开 EPUB、MOBI、AZW、AZW3、PRC 时选择 Honyomi，会解析并加入书架。',
          '扩展拥有应用的完整访问能力。只添加你信任的仓库。Honyomi 不预置、也不分发在线内容。',
        ],
        image: '/showcase/browse.png',
        alt: '浏览页：已安装的扩展或书源列表',
        link: { href: `${docs}/docs/faq/browse/extensions`, text: '扩展说明' },
      },
      {
        id: 'detail',
        kicker: '详情',
        title: '从一页开始读',
        lede: '作品详情把封面、简介、章节和操作放在一起。加入书架之后，更新间隔也从这里设置。',
        points: [
          '标签可以拿去搜索，或复制到剪贴板。',
          '章节可以筛选、排序和多选。',
          '章节号不连续时会提示缺章。封面可以更换，也可以恢复原图。',
          '可以设置更新间隔，写下只存在本机的备注。',
          '加入书架时，如果架上已有疑似同一部作品，会先提示。',
          '可以在应用内打开这部作品的源站页面。',
          '插件如果提供相关作品，详情页会用横向封面列出来。',
        ],
        image: '/showcase/detail.png',
        alt: '作品详情：封面、简介和章节列表',
        reverse: true,
      },
      {
        id: 'reader',
        kicker: '漫画',
        title: '按作品记住的阅读器',
        lede: '阅读方向、翻页动画和画面调整按部作品分别保存。条漫、页漫和横屏双页走的是不同布局。',
        points: [
          '方向：从左到右、从右到左、纵向分页、条漫、连续滚动、智感握姿。',
          '翻页动画有仿真、滑动、覆盖；单页横向时还有 3D 立方、堆叠、淡入淡出、3D 翻转和球体。',
          '横屏可以自动双页，也可以强制双页或始终单页；封面可以单独占一页。自动翻页在条漫里不可用。',
          '还有音量键翻页、点击区域、亮度、双指缩放、裁边、颜色滤镜、预加载和页码。',
          '可跳过已读章节、被过滤的章节、重复页和空白页。章与章之间有过渡页，缺章会警告。',
          '条漫可调边距和页间距，也可以禁止缩小。墨水屏可以在翻页时闪屏刷新。',
          '可以锁定屏幕方向。当前页可以保存、分享或复制。',
          '离开阅读器时可以把亮度恢复成系统亮度，也可以开关阅读时的页眉和页脚。',
        ],
        image: '/showcase/reader.png',
        alt: '漫画阅读器，最好能看到阅读菜单或当前阅读模式',
        link: { href: `${docs}/docs/guides/reader-settings`, text: '阅读器设置' },
      },
      {
        id: 'novel',
        kicker: '小说',
        title: '排版、书签和朗读',
        lede: '小说阅读器负责电子书和扩展里的文字章节。正文可以分页或滚动，也可以交给系统语音接着念。',
        points: [
          '支持 EPUB、MOBI、AZW、AZW3、PRC，以及插件提供的小说章节。',
          '阅读方式：滚动、单页从左到右、单页从右到左、双页。翻页动画为仿真、滑动或覆盖。',
          '可调字体（默认、宋体、黑体、等宽）、字号、行距、边距、段间距、段落缩进，也可以合并空行。',
          '背景可以跟随系统，或选白、纸张、灰、黑。亮度和屏幕常亮也可以改。',
          '书内搜索和书签都留在本机。',
          '朗读可选语速和音色。男声需要先在系统里下载，没下载时使用默认女声。睡眠定时按时间或按章节。播放可以在后台继续，其他页面底部会留下迷你条。',
        ],
        image: '/showcase/novel.png',
        alt: '小说阅读器中的一页正文，有朗读条时请保留在画面里',
        reverse: true,
        link: { href: `${docs}/docs/faq/reader`, text: '阅读常见问题' },
      },
      {
        id: 'video',
        kicker: '视频',
        title: '播放、字幕和弹幕',
        lede: '视频和书架里的其他作品用同一套进度。本地文件和在线章节都可以进播放器。',
        points: [
          '支持 MP4、MKV、WebM、MOV、M4V。',
          '左右双击前进或后退 10 秒。左半屏上下滑调亮度，右半屏上下滑调音量，横滑跳转进度，长按加速。',
          '可以锁定画面、打开剧集列表、调倍速和画质，也可以自动播放下一集、跳过片头片尾。',
          '字幕可以开关并调整字号。',
          '弹幕来自 dandanplay，样式有滚动、顶部和底部，可调字号、透明度、显示区域、速度和颜色。登录账号后可以发送弹幕。',
          '支持画中画、投屏和画面缩放。',
        ],
        image: '/showcase/video.png',
        alt: '视频播放器：画面、播控，有弹幕时一并入镜',
      },
      {
        id: 'stats',
        kicker: '统计',
        title: '本机上的阅读记录',
        lede: '统计页只汇总这台设备上的书架和阅读会话，用来看你读过多少、花了多少时间。',
        points: [
          '书架数量、已读完、已开始、本地作品、章节总数、已读章节和已下载章节。',
          '已追踪的作品数，以及这些记录里的平均分。',
          '阅读时长按漫画、小说、视频分开。',
          '本周和本月各有一张每日时长柱状图。',
        ],
        image: '/showcase/stats.png',
        alt: '统计页：概览数字和阅读时长图',
        reverse: true,
      },
      {
        id: 'devices',
        kicker: '设备',
        title: '手机、平板和 PC',
        lede: '同一套界面会随窗口变宽。窄屏用底部页签，宽屏用侧栏；设置在大窗口里分成左右两栏。',
        points: [
          '五个主页签是书架、更新、历史、浏览、更多。启动时打开哪一个可以指定。',
          '平板和 PC 上，导航改到侧边，设置页左侧是分类、右侧是内容。',
          '正在读的漫画页码、小说进度和视频位置可以交给系统接续，在另一台设备上接着看。',
          '两台都打开 Honyomi 时，碰一碰可以把当前内容推到对端。',
        ],
        image: '/showcase/wide.png',
        alt: '平板或 PC 上的宽屏界面，能看到侧边导航',
        wide: true,
      },
    ],
    extraKicker: '同样在应用里',
    extraTitle: '分类、备份、隐私和外观',
    extraLede: '从「更多」和「设置」进入，用来管理分类、备份和这台设备上的隐私。',
    cards: [
      {
        title: '分类',
        text: '一开始就有漫画、小说、动画三个分类，这三个不能改名或删除。自建分类可以新建、重命名、删除和拖动排序。新作品可以按内容类型自动归入、每次询问，或放进指定分类。',
      },
      {
        title: '历史与无痕',
        text: '历史按时间找回上次阅读的位置，也可以多选删除。无痕模式打开后不再写入历史，也不再累计阅读时长。作品上的已读标记和页码仍会保存。',
      },
      {
        title: '书源迁移',
        text: '同一部作品换到另一个书源时，可以把已有的章节进度迁过去。',
      },
      {
        title: '备份与还原',
        text: '手动备份，或按每 6 小时、12 小时、每天、每 2 天、每周自动备份。也可以导出书架列表、清理章节缓存。备份可能含有保存的密码。',
      },
      {
        title: '隐私',
        text: '应用锁使用系统锁屏凭据，切后台后可以立刻锁定，或等 1、2、5、10 分钟，也可以从不锁定。防截屏有始终、仅无痕、关闭三档，默认只在无痕模式生效。通知内容可以隐藏。密钥放在系统安全存储里。',
      },
      {
        title: '外观与语言',
        text: '跟随系统、浅色、深色和纯黑。内置 23 套配色，例如 Nord、Catppuccin、Dracula、Kanagawa。界面语言有 20 种，也可以跟随系统。',
      },
      {
        title: '验证页',
        text: '书源需要在网页里验证时，可以在应用内打开验证页，验证完成后再回到书源。',
      },
      {
        title: '网络',
        text: '可以打开 DNS over HTTPS，也可以自定义请求使用的 User-Agent。',
      },
      {
        title: '高级',
        text: '可以重新查看首次引导，打开详细日志，导出崩溃日志和调试信息，并清空数据库、Cookie 和网页数据。也可以重新下载书架封面，把各作品单独记住的阅读器设置恢复成默认，以及打开更平滑的高质量图片渲染。',
      },
    ],
    ctaTitle: '在 HarmonyOS 上安装',
    ctaText: '需要 HarmonyOS 6.1.0 或更高版本，手机、平板和 PC 都可以。',
    ctaPrimary: '下载',
    ctaPrimaryHref: '/download/',
    ctaSecondary: '快速上手',
    ctaSecondaryHref: '/docs/guides/getting-started',
  }
}

function en(): IntroCopy {
  const docs = '/en'
  return {
    aria: 'Honyomi features',
    lead: 'Honyomi keeps manga, novels, ebooks, and video on one shelf. The library, reading progress, and settings stay on the device. Online series come from extensions you install; the app itself is the reader.',
    formats: [
      { title: 'Manga', text: 'Folders, ZIP, CBZ, and image series from extensions.' },
      { title: 'Novels and ebooks', text: 'EPUB, MOBI, AZW, AZW3, and PRC, plus read-aloud.' },
      { title: 'Video', text: 'MP4, MKV, WebM, MOV, and M4V, with subtitles and danmaku.' },
      { title: 'Online sources', text: 'Install a .honyomiplug from an extension repository.' },
    ],
    bands: [
      {
        id: 'library',
        kicker: 'Library',
        title: 'Every series in one place',
        lede: 'The first tab is the library. Covers, categories, and badges are there so you can get back to the last page quickly.',
        points: [
          'The view can be a compact grid, a comfortable grid, a cover grid, or a list. Column count and sort order are set separately.',
          'Filter by unread, started, downloaded, bookmarked, completed, or tracked, and by manga, novels, or video.',
          'Categories show up as tabs, with an optional count of series in each one. Swiping a cover from one side can mark the series read, and that side can be set to do nothing.',
          'Cover badges mark unread chapters, downloads, local files, and language. The shelf can also be limited to downloaded series. Long-press a cover for bulk actions.',
          'Library update checks can be limited to Wi-Fi, or to times when the device is charging.',
          'Pin a series to a home-screen card and open it from there.',
        ],
        image: '/showcase/library.png',
        alt: 'Library grid with category tabs and unread badges',
        link: { href: `${docs}/docs/faq/library`, text: 'Library FAQ' },
      },
      {
        id: 'updates',
        kicker: 'Updates',
        title: 'New chapters and the airing calendar',
        lede: 'Updates collects new chapters from the library. The same page also opens upcoming chapters and the Bangumi airing calendar.',
        points: [
          'Filter new chapters by category, or by downloaded, unread, started, and bookmarked. You can also refresh the whole library.',
          'Each series can have its own update interval.',
          'Upcoming groups chapters that have not been published yet, by date.',
          'The calendar lists Bangumi shows for Monday through Sunday.',
        ],
        image: '/showcase/updates.png',
        alt: 'Updates list, with the updates and calendar switch visible',
        reverse: true,
        link: { href: `${docs}/docs/faq/updates/smart`, text: 'Smart updates' },
      },
      {
        id: 'browse',
        kicker: 'Browse',
        title: 'Extensions, sources, and files on device',
        lede: 'Online sources come from extensions. Local manga folders and ebooks do not need a plugin.',
        points: [
          'Install, update, or remove extensions from a repository, or pick a local .honyomiplug or .zip file.',
          'Available updates are marked on the extension list. NSFW sources stay hidden until you show them in settings.',
          'One extension can be incognito on its own: browsing its sources skips history and reading-time stats.',
          'Global search runs one query across the sources you have installed.',
          'Local source uses comic, novel, and anime folders for images or archives, txt chapters, and video. Sync copies that tree into the app before scanning it.',
          'Opening an EPUB, MOBI, AZW, AZW3, or PRC file in the file manager and choosing Honyomi adds it to the library.',
          'An extension has the app’s full access. Add only repositories you trust. Honyomi does not ship or distribute online content.',
        ],
        image: '/showcase/browse.png',
        alt: 'Browse page showing installed extensions or sources',
        link: { href: `${docs}/docs/faq/browse/extensions`, text: 'Extensions' },
      },
      {
        id: 'detail',
        kicker: 'Series',
        title: 'Start reading from one page',
        lede: 'The series page holds the cover, description, and chapter list. After you add a series to the library, the update interval is set here too.',
        points: [
          'A tag can be searched or copied.',
          'Filter, sort, and multi-select chapters.',
          'Gaps in chapter numbers are called out. The cover can be replaced or restored.',
          'Set the update interval, and keep a note that stays on the device.',
          'If the library already has a likely duplicate, adding the series asks first.',
          'The source page for the series can be opened inside the app.',
          'When a plugin provides related series, they appear as a horizontal row of covers.',
        ],
        image: '/showcase/detail.png',
        alt: 'Series page with cover, description, and chapter list',
        reverse: true,
      },
      {
        id: 'reader',
        kicker: 'Manga',
        title: 'A reader that remembers each series',
        lede: 'Reading direction, page animation, and picture adjustments are stored per series. Webtoons, paged comics, and landscape spreads use different layouts.',
        points: [
          'Directions: left to right, right to left, vertical pages, webtoon, continuous scroll, and smart grip.',
          'Animations: curl, slide, and cover. Single-page horizontal mode also has 3D cube, stack, fade, 3D flip, and sphere.',
          'Landscape can turn dual-page on automatically, or you can force dual-page or single-page. The cover can sit on its own page. Auto page-turn is unavailable for webtoon.',
          'Also: volume keys, tap zones, brightness, pinch zoom, edge crop, color filters, preload, and page numbers.',
          'Skip chapters you have read, chapters hidden by filters, duplicate pages, and blank pages. A transition screen sits between chapters and warns about gaps.',
          'Webtoon margin, page gap, and a lock against zooming out. E-ink displays can flash on each page turn.',
          'Screen orientation can be locked. The current page can be saved, shared, or copied.',
          'Brightness can return to the system level when you leave the reader, and the header and footer can be turned off.',
        ],
        image: '/showcase/reader.png',
        alt: 'Manga reader, ideally with the reader menu or current mode visible',
        link: { href: `${docs}/docs/guides/reader-settings`, text: 'Reader settings' },
      },
      {
        id: 'novel',
        kicker: 'Novels',
        title: 'Typesetting, bookmarks, and read-aloud',
        lede: 'The novel reader handles ebooks and text chapters from extensions. Pages can scroll or turn, and the system voice can keep reading.',
        points: [
          'Opens EPUB, MOBI, AZW, AZW3, PRC, and novel chapters from plugins.',
          'Modes: scroll, single page left to right, single page right to left, and dual page. Animations are curl, slide, and cover.',
          'Adjust the typeface (default, serif, sans, mono), size, line height, margins, paragraph spacing, and first-line indent. Blank lines can be merged.',
          'The background can follow the system, or be white, paper, gray, or black. Brightness and keep-awake can be changed too.',
          'In-book search and bookmarks stay on the device.',
          'Read-aloud has speed and voice. The male voice has to be downloaded in the system first; until then the default female voice is used. The sleep timer counts minutes or chapters. Playback continues in the background, with a mini bar on other screens.',
        ],
        image: '/showcase/novel.png',
        alt: 'A typeset novel page, including the read-aloud bar if it is visible',
        reverse: true,
        link: { href: `${docs}/docs/faq/reader`, text: 'Reader FAQ' },
      },
      {
        id: 'video',
        kicker: 'Video',
        title: 'Playback, subtitles, and danmaku',
        lede: 'Video uses the same library and progress as everything else. Local files and online episodes both open in the player.',
        points: [
          'Plays MP4, MKV, WebM, MOV, and M4V.',
          'Double-tap the left or right side to jump back or forward 10 seconds. Swipe up or down on the left for brightness and on the right for volume, swipe sideways to seek, and press and hold to boost speed.',
          'Lock the screen, open the episode list, change speed and picture scaling, autoplay the next episode, and skip the opening and ending.',
          'Subtitles can be toggled, with an adjustable font size.',
          'Danmaku comes from dandanplay. Comments can scroll, sit at the top, or sit at the bottom, with controls for size, opacity, screen area, speed, and color. Signing in lets you send comments.',
          'Picture-in-picture, casting, and picture scaling.',
        ],
        image: '/showcase/video.png',
        alt: 'Video player with controls, and danmaku if any are on screen',
      },
      {
        id: 'stats',
        kicker: 'Stats',
        title: 'Reading time kept on this device',
        lede: 'Stats summarizes the library and reading sessions on this device: how much is on the shelf, and how long you spent reading.',
        points: [
          'Library size, completed series, started series, local series, total chapters, chapters read, and chapters downloaded.',
          'How many series are tracked, and the average score on those entries.',
          'Time is split across manga, novels, and video.',
          'The week and the month each have a daily bar chart.',
        ],
        image: '/showcase/stats.png',
        alt: 'Stats screen with the overview numbers and the reading-time chart',
        reverse: true,
      },
      {
        id: 'devices',
        kicker: 'Devices',
        title: 'Phone, tablet, and PC',
        lede: 'The same layout adapts as the window gets wider. Narrow windows use the bottom tabs. Wide windows use a side rail, and Settings splits into two columns.',
        points: [
          'The five tabs are Library, Updates, History, Browse, and More. You can choose which one opens at launch.',
          'On a tablet or PC the navigation moves to the side. Settings shows categories on the left and the selected page on the right.',
          'The current manga page, novel progress, and video position can continue on another device through the system handoff.',
          'With Honyomi open on both devices, a knock can push the current series to the other one.',
        ],
        image: '/showcase/wide.png',
        alt: 'A wide tablet or PC layout with the side navigation visible',
        wide: true,
      },
    ],
    extraKicker: 'Also in the app',
    extraTitle: 'Categories, backups, privacy, and appearance',
    extraLede: 'Open them from More and Settings to manage categories, backups, and privacy on this device.',
    cards: [
      {
        title: 'Categories',
        text: 'The app starts with Manga, Novels, and Anime. Those three cannot be renamed or deleted. Categories you create can be added, renamed, deleted, and reordered. A new series can follow its content type, ask every time, or go into one category you pick.',
      },
      {
        title: 'History and incognito',
        text: 'History returns you to the last place you read, and selected entries can be removed. Incognito stops new history entries and reading-time stats. Read markers and the page position on the series are still saved.',
      },
      {
        title: 'Source migration',
        text: 'When you move a series to another source, existing chapter progress can move with it.',
      },
      {
        title: 'Backup and restore',
        text: 'Back up manually, or automatically every 6 hours, 12 hours, day, 2 days, or week. Export the library list and clear the chapter cache. A backup can contain saved passwords.',
      },
      {
        title: 'Privacy',
        text: 'App lock uses the system lock-screen credential. After you leave the app it can lock immediately, after 1, 2, 5, or 10 minutes, or never. The secure screen can be always on, only during incognito, or off. The default is only during incognito. Notification content can be hidden. Secrets stay in the system secure store.',
      },
      {
        title: 'Appearance and language',
        text: 'Follow the system, light, dark, or pure black. Twenty-three color themes, including Nord, Catppuccin, Dracula, and Kanagawa. Twenty interface languages, or follow the system.',
      },
      {
        title: 'Verification pages',
        text: 'When a source needs a check in a web page, open that page inside the app and return to the source afterward.',
      },
      {
        title: 'Network',
        text: 'Turn on DNS over HTTPS, or set a custom User-Agent for requests.',
      },
      {
        title: 'Advanced',
        text: 'Replay the first-run guide, turn on verbose logging, export crash logs and debug info, and clear the database, cookies, and web data. You can also refresh library covers, reset the reader settings stored on each series, and turn on smoother high-quality image rendering.',
      },
    ],
    ctaTitle: 'Install it on HarmonyOS',
    ctaText: 'Requires HarmonyOS 6.1.0 or later, on a phone, tablet, or PC.',
    ctaPrimary: 'Download',
    ctaPrimaryHref: '/en/download/',
    ctaSecondary: 'Get started',
    ctaSecondaryHref: '/en/docs/guides/getting-started',
  }
}

export function introFor(lang: string): IntroCopy {
  return lang.toLowerCase().startsWith('en') ? en() : zh()
}
