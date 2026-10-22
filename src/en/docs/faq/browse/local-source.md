---
title: Local source
titleTemplate: Frequently Asked Questions
description: Frequently asked questions about local sources in Honyomi.
---

# Local source

Frequently asked questions about local sources in Honyomi.

## What content do local sources support?

:::: tabs
== Local manga
Image directories (jpg / jpeg / png / webp / gif / bmp / avif) and ZIP / CBZ archives.
== Local novels
txt text chapters.
== Local videos
mp4 / mkv / webm / mov / m4v files.
::::

## How do I use local sources?

1. In <navEn to="main_browse" />, select "Local manga", "Local novels", or "Local videos";
1. On first use, tap **Choose folder** and grant access to a folder from the system file picker;
1. Tap **Sync** – the app scans the folder and recognizes works and chapters;
1. The app remembers the folder and restores access automatically after a restart.

The full directory layout is described in the [Local source guide](/en/docs/guides/local-source/).

## Why does syncing use extra storage space?

Due to system restrictions, ordinary apps cannot browse user directories directly. When syncing, the app copies the entire folder tree into its sandbox before scanning, so content takes up roughly the same amount of storage again. We recommend dedicating the folder to local sources.

## Why don't my changes to the folder take effect?

After adding or removing content in the source folder, you need to run the sync again for the changes to appear.

## Do e-books (EPUB, etc.) go through local sources too?

No. When you open an EPUB / MOBI / AZW / AZW3 / PRC file from the file manager, choose to open it with Honyomi and the app will parse it and add it to your library automatically.
