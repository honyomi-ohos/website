---
title: Backups
titleTemplate: Guides
description: How to back up and restore Honyomi library data.
---

# Backups

How to back up and restore the **Honyomi** library. The screen is <navEn to="main_more" /> → **Data and storage**, not another settings group.

## What a backup contains

Manual and automatic backups are the same JSON file:

- Category names;
- Series in the library: source, URL, title, cover URL, author, description, tags, status, category, and content type;
- For each chapter: URL, name, chapter number, read flag, and the last page read.

The file does not include tracking tokens, account passwords, or cookies, and it does not include downloaded images or video. The app still asks you to be careful about sharing a backup.

You can also export the library as CSV, with optional title and author columns. A CSV file cannot be restored.

## Create a backup

1. Open <navEn to="main_more" /> → **Data and storage**;
1. Tap **Create backup**;
1. Choose a location in the system document picker. The name looks like `honyomi_backup_<timestamp>.json`.

Copy that file somewhere else as well.

## Automatic backups

The interval can be off, every 6 hours, every 12 hours, every day, every 2 days, or every week. Automatic files are written in the app’s private directory, and only the latest 3 are kept. The page shows when the last automatic backup ran.

## Restore a backup

1. Open **Data and storage**;
1. Tap **Restore backup** and pick a `.json` file;
1. After import, the library, categories, and chapter progress match the file.

Downloaded pictures and video are not in the backup, so a restore does not bring them back.

## When to back up

- Before uninstalling or moving to another device;
- Before a [source migration](/en/docs/guides/source-migration);
- Or leave automatic backups on one of the intervals above.
