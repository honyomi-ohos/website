---
title: Extensions
titleTemplate: Frequently Asked Questions
description: Frequently asked questions about Honyomi extensions.
---

# Extensions

Frequently asked questions about Honyomi extensions (`.honyomiplug`).

## What is an extension?

An extension is the plugin that connects an online source. After you install it, its sources show up in <navEn to="main_browse" />.

Honyomi does not ship content sources, and it does not supply third-party extensions or repositories.

## How do I install an extension?

Both ways are in <navEn to="extensions" />:

1. **Repository**: add the repository URL, refresh, and install from the list. Installed extensions can be checked and updated here;
1. **Local file**: pick a `.honyomiplug` or `.zip` in the document picker.

While nothing is installed, Browse shows an installation prompt.

## What is an NSFW extension?

Sources marked NSFW stay hidden until **Show NSFW sources** is turned on in <navEn to="browse" />. They then appear in Browse and in Updates.

## Can one extension skip history on its own?

Yes. Open the extension’s page and turn on its incognito switch. Browsing that plugin’s sources does not write history or reading-time stats. Global incognito is <navEn to="incognito-mode" />.

## What is the risk of installing an extension?

::: danger Caution
A third-party extension has the app’s full access and may contain malicious code. Honyomi does not review these extensions. Add only repositories you trust, and install only packages you trust.
:::

## I want to write an extension

`docs/plugin-interface.md` in the repository describes `manifest.json`, the runtime interface, and host behavior.
