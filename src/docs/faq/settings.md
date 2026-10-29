---
title: 设置
titleTemplate: 常见问题
description: 关于 Honyomi 设置的常见问题与解答。
---

# 设置

关于 Honyomi <nav to="settings" /> 的常见问题与解答。宽窗口里左侧是分类、右侧是内容；手机上每一项单独打开。

## 设置页有哪些分组？

| 分组 | 内容 |
| --- | --- |
| 常规 | 启动时打开哪一个页签：书架、更新、历史、浏览、更多 |
| <nav to="appearance" /> | 界面语言、浅色 / 深色 / 跟随系统、23 套配色、纯黑 |
| <nav to="library" /> | 默认归入分类、排序、视图、列数、角标、仅 Wi-Fi 或仅充电时更新、滑动标记已读 |
| <nav to="reader" /> | 漫画阅读器的默认方向、翻页、裁边、滤镜、预加载、墨水屏闪屏 |
| <nav to="player" /> | 倍速、自动下一集、跳过片头片尾、字幕、弹幕 |
| <nav to="downloads" /> | 仅 Wi-Fi、CBZ、并行数、自动下载新章节、读完删除 |
| BitTorrent | 仅在 BT 组件安装后出现 |
| <nav to="browse" /> | 是否显示 NSFW 书源 |
| <nav to="tracking" /> | 自动同步，以及 10 个追踪服务的登录 |
| 数据与存储 | 存储位置、备份与还原、自动备份、章节缓存、导出书架列表 |
| <nav to="security-and-privacy" /> | 应用锁、切后台锁定、隐藏通知内容、隐私界面 |
| <nav to="advanced" /> | 崩溃日志、DoH、User-Agent、清 Cookie、刷新封面、重置各作品的阅读器设置 |
| 翻译 | 引擎顺序、密钥、目标语言、连通性测试 |
| 关于 | 版本、开源许可证、隐私政策 |

本地文件夹不在设置里，而在 <nav to="main_browse" /> 的本地漫画、本地小说、本地视频中管理。

## 如何开启深色模式？

在 <nav to="appearance" /> 选择深色、浅色，或跟随系统。深色下还可以打开纯黑。配色有 23 套，例如 Nord、Catppuccin、Dracula、Kanagawa。

界面语言有 20 种，也可以跟随系统。

## 什么是加密 DNS（DoH）？

DoH 用 HTTPS 做域名解析。默认关闭。在 <nav to="advanced" /> 选择提供商后生效，可选 Cloudflare、Google、AdGuard、Quad9、AliDNS、DNSPod、360、Quad 101、Mullvad、Control D、Njalla、Shecan。解析失败时回落到系统 DNS。

## 如何防止别人看到我的阅读内容？

- 在 <nav to="security-and-privacy" /> 打开 **应用锁**，用系统锁屏凭据解锁；
- **隐私界面** 可选始终、仅无痕模式，或关闭。默认是仅无痕模式。开启后，截屏和录屏看不到内容；
- 打开 **隐藏通知内容**；
- 用 <nav to="incognito-mode" /> 暂停写入历史和阅读时长。
