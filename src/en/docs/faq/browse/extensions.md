---
title: Extensions
titleTemplate: Frequently Asked Questions
description: Frequently asked questions about Honyomi extensions (source plugins).
---

# Extensions

Frequently asked questions about Honyomi extensions (source plugins, `.honyomiplug`).

## What are extensions?

Extensions (source plugins) are plugin packages that add online content sources. Once installed, their sources appear in the <navEn to="main_browse" /> tab for browsing and reading.

Honyomi **ships with no content sources** and does not provide resources for any third-party extensions or repositories.

## How do I install an extension?

1. Obtain the `.honyomiplug` package file;
1. Go to <navEn to="extensions" />, tap install and select the package file;
1. After installation, the source appears in <navEn to="main_browse" />.

Installing, updating, and uninstalling extensions is managed in <navEn to="extensions" />.

## How do I update an extension?

Check the versions of your installed extensions in <navEn to="extensions" />. To update, download the new `.honyomiplug` package and install it over the old one.

## What are NSFW extensions?

Extensions marked NSFW (Not Safe For Work) are hidden by default. To show them, enable **Show NSFW sources** in the <navEn to="browse" /> settings.

## Are extensions risky?

::: danger Caution
Any third-party extension will have full access to the app and may contain malware. Honyomi cannot audit third-party extension behavior. Only install extensions from sources you trust.
:::

## I want to write an extension for Honyomi

Refer to `docs/plugin-interface.md` in the repository, which defines the extension manifest (`manifest.json`) fields, the runtime DSL, and host behaviors.
