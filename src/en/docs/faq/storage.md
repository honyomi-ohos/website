---
title: Storage
titleTemplate: Frequently Asked Questions
description: Frequently asked questions about data storage in Honyomi.
---

# Storage

Frequently asked questions about data storage in Honyomi.

## Where is my data stored?

- **Local data** (library, progress, settings) is stored in the app sandbox and completely removed on uninstall;
- **Tracking service tokens / passwords and sensitive extension settings** are kept in the system Asset Store (hardware-backed TEE);
- **Network cookies** are stored AES-256-GCM encrypted, with keys held in the Asset Store.

## Does uninstalling delete my data?

Yes. Uninstalling deletes all local data (including tokens in secure storage). [Back up](/en/docs/guides/backups) your library first if you want to keep it.

## How do I back up my data?

Open <navEn to="main_more" /> → **Data and storage** → **Create backup**. The file is JSON and contains categories, library series, chapter read flags, and the last page read. It contains no tracking tokens, passwords, or cookies, and no downloaded images or video. See the [Backups guide](/en/docs/guides/backups).

The same page sets automatic backups (off, every 6 hours, every 12 hours, every day, every 2 days, or every week). Only the latest 3 automatic files are kept. You can also export the library as a CSV of titles and authors. A CSV file cannot be restored.

## How do I restore data?

In **Data and storage**, tap **Restore backup** and choose a `.json` file you exported earlier.
