---
title: Local source
titleTemplate: Guides
description: Complete guide to reading local content with Honyomi.
---

# Local source

Complete guide to reading local content with **Honyomi**.

## Getting started

In the <navEn to="main_browse" /> tab, select "Local manga", "Local novels", or "Local videos":

1. On first use, tap **Choose folder** and grant access to a folder from the system file picker;
1. Tap **Sync** – the app scans the folder and recognizes works and chapters;
1. The app remembers the folder and restores access automatically after a restart;
1. The **Sync** menu in the top bar lets you **Sync now** or **Change folder** at any time.

::: info File picker tip
The HarmonyOS file picker's "folder" mode only shows directories (files are hidden). Enter multi-select mode via "⋮ → Multi-select" in the top-right corner, check the folder, and confirm with the button in the top-right corner.
:::

## Directory layout

After you pick a folder, the app automatically creates the `comic`, `novel`, and `anime` subfolders inside it (if creation fails due to permissions, you can create them manually in the file manager). Each local source scans only its matching subfolder:

```
<chosen folder>/
├── comic/                          # "Local manga" scans this
│   └── MangaA/
│       ├── Chapter 01/001.jpg ...  # Chapter = image directory (jpg/jpeg/png/webp/gif/bmp/avif)
│       ├── Chapter 02.zip          # Chapter = zip / cbz archive (containing images)
│       └── Volume 01/Chapter 03/001.jpg   # Nesting is supported; shown as "Volume 01 / Chapter 03"
├── novel/                          # "Local novels" scans this
│   └── NovelB/
│       ├── Chapter 1.txt           # Chapter = a single txt file
│       └── Part 1/Chapter 5.txt    # Nesting is supported; shown as "Part 1 / Chapter 5"
└── anime/                          # "Local videos" scans this
    └── ShowC/
        ├── 01.mp4                  # Episode = a single video file (mp4/mkv/webm/mov/m4v)
        └── Season 1/02.mkv         # Nesting is supported; shown as "Season 1 / 02"
```

## Notes

- Each top-level directory inside a subfolder is one work; loose files in the root of a subfolder are not shown as works;
- Archive chapters (zip / cbz) are extracted automatically when reading;
- Dedicate the chosen folder to local sources: due to system restrictions, syncing copies the entire folder tree into the app sandbox before scanning, so content takes up roughly the same amount of storage again;
- After adding or removing content in the source folder, run the sync again for changes to appear.

## E-book files

EPUB / MOBI / AZW / AZW3 / PRC e-books do not need to go into the local source folder. Open such a file from the file manager with Honyomi and the app will parse it and add it to your library automatically.
