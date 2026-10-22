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

Go to <navEn to="settings" /> → **Backup** to export your library, categories, reading progress, and download history to a local backup file. See the [Backups guide](/en/docs/guides/backups).

Backup files contain **no** tokens, passwords, or cookies.

## How do I restore data?

In <navEn to="settings" /> → **Backup**, choose a backup file to import and restore your library.
