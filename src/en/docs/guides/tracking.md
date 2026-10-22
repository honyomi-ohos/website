---
title: Tracking
titleTemplate: Guides
description: Guide to connecting tracking services and syncing reading progress.
---

# Tracking

Guide to connecting tracking services and syncing reading progress.

## Supported tracking services

Honyomi supports the following 8 tracking services:

- AniList
- MyAnimeList
- Bangumi
- Kitsu
- Shikimori
- MangaUpdates
- MangaBaka
- Hikka

## Connecting a tracking service

1. Open the details page of a series in your library;
1. Tap the **Tracking** button to open the service picker;
1. Choose the service you want to use;
1. Complete the login and authorization on the service's website;
1. Return to the app – your reading status, scores, and progress will sync.

::: info Token security
Authorization tokens are stored only in the device's Asset Store (hardware-backed TEE) and never uploaded anywhere else.
:::

## How syncing works

- One-way and two-way sync are supported;
- Reading progress is pushed to the tracking service automatically as you read;
- Sync status can be refreshed manually from the series details page.

## Disconnecting a tracking service

Disconnect the service from the tracking panel on the series details page – the app immediately deletes the stored token from the device.
