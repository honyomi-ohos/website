---
title: 扩展
titleTemplate: 常见问题
description: 关于 Honyomi 扩展（书源插件）的常见问题与解答。
---

# 扩展

关于 Honyomi 扩展（书源插件，`.honyomiplug`）的常见问题与解答。

## 什么是扩展？

扩展（书源插件）是接入在线内容的插件包。安装扩展后，其对应的书源会出现在 <nav to="main_browse" /> 页签中，供你浏览与阅读。

Honyomi **不预置任何内容源**，也不为任何第三方扩展或扩展仓库提供资源。

## 如何安装扩展？

1. 获取 `.honyomiplug` 插件包文件；
1. 进入 <nav to="extensions" />，点击安装并选择插件包文件；
1. 安装完成后，对应书源即会出现在 <nav to="main_browse" />。

扩展的安装、更新与卸载均在 <nav to="extensions" /> 中管理。

## 如何更新扩展？

在 <nav to="extensions" /> 中检查已安装扩展的版本，如有新版本可下载新的 `.honyomiplug` 包后覆盖安装。

## 什么是 NSFW 扩展？

标记为 NSFW（不适合在工作场合浏览）的扩展默认隐藏。如需显示，可在 <nav to="browse" /> 设置中开启 **显示 NSFW 源**。

## 安装扩展有什么风险？

::: danger 注意
任何第三方扩展都将拥有应用的完整访问能力，且可能包含恶意代码。Honyomi 无法审核第三方扩展的行为，请仅安装你信任来源的扩展。
:::

## 我想为 Honyomi 编写扩展

请参阅仓库中的 `docs/plugin-interface.md`，其中定义了扩展清单（`manifest.json`）字段、运行时 DSL 与宿主行为规范。
