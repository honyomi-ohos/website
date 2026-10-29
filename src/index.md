---
title: 首页
layout: home

hero:
  name: Honyomi
  text: 全功能阅读器
  tagline: 在你的 HarmonyOS 设备上，以前所未有的轻松方式发现并阅读漫画、小说、动画与更多内容。
  image:
    alt: Honyomi 书架页
    light: /home/phone.jpeg
    dark: /home/phone.jpeg
  actions:
    - theme: brand
      text: 开始使用
      link: /docs/guides/getting-started
    - theme: alt
      text: 帮助中心
      link: /docs/faq/general

customMetaTitle: Honyomi

features:
  - title: 书架与更新
    details: 分类、角标、新章节、即将更新，以及 Bangumi 放送时间表。
    icon: <svg height="24" width="24" viewBox="0 -960 960 960" fill="var(--vp-c-brand)" xmlns="http://www.w3.org/2000/svg"><path d="M400-80v-280h160v280h200v-400h160L480-880 40-480h160v400h200Z"/></svg>
    link: /#library
    linkText: 查看介绍
  - title: 漫画阅读
    details: 页漫、条漫、双页和多种翻页动画，画面设置按作品记住。
    icon: <svg height="24" width="24" viewBox="0 -960 960 960" fill="var(--vp-c-indigo-2)" xmlns="http://www.w3.org/2000/svg"><path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-70q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/></svg>
    link: /#reader
    linkText: 查看介绍
  - title: 小说与听书
    details: 电子书排版、书签、书内搜索，以及可后台播放的朗读。
    icon: <svg height="24" width="24" viewBox="0 -960 960 960" fill="var(--vp-c-green-2)" xmlns="http://www.w3.org/2000/svg"><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm80-80h480v-80H240v80Zm0-160h200v-240H240v240Zm280 0h200v-80H520v80Zm0-160h200v-80H520v80Z"/></svg>
    link: /#novel
    linkText: 查看介绍
  - title: 视频
    details: 字幕、dandanplay 弹幕、画中画、投屏，以及边下边播。
    icon: <svg height="24" width="24" viewBox="0 -960 960 960" fill="var(--vp-c-yellow-2)" xmlns="http://www.w3.org/2000/svg"><path d="m380-300 280-180-280-180v360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>
    link: /#video
    linkText: 查看介绍
  - title: 扩展插件
    details: 用 .honyomiplug 接入在线书源，也可以直接阅读本地漫画和电子书。
    icon: <svg height="24" width="24" viewBox="0 -960 960 960" fill="var(--vp-c-purple-2)" xmlns="http://www.w3.org/2000/svg"><path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm310-310Z"/></svg>
    link: /#browse
    linkText: 查看介绍
  - title: 进度追踪
    details: 可选同步到 AniList、Bangumi、Komga 等 10 个服务，不登录也能本地阅读。
    icon: <svg height="24" width="24" viewBox="0 -960 960 960" fill="var(--vp-c-green-2)" xmlns="http://www.w3.org/2000/svg"><path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z"/></svg>
    link: /#tracking
    linkText: 查看介绍
---
