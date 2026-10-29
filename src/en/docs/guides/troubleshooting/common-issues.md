---
title: Common issues
titleTemplate: Guides
description: Common problems and solutions when running Honyomi.
---

# Common issues

Common problems and solutions when running Honyomi.

## The app won't install

* Install it from Huawei AppGallery. Sideloading a package is not supported;
* Make sure your system is HarmonyOS 6.1.0 or higher;
* If an update fails, uninstall the old version first ([back up your data](/en/docs/guides/backups) beforehand), then install it again from the store.

## A source won't load content

* Check your network connection;
* The source site may be temporarily unavailable – try again later;
* If the site changed its structure, the extension needs an update.

## Local source shows no content

* Make sure you selected the correct local source in <navEn to="main_browse" /> and completed a sync;
* Make sure your directory layout matches the [local source format](/en/docs/guides/local-source/);
* After adding or removing content in the folder, run the sync again for changes to appear.

## An e-book fails to open

* Make sure the format is supported (EPUB / MOBI / AZW / AZW3 / PRC);
* The file may be corrupted – try opening it with another reader to verify.

## Narration produces no sound

* Check the media volume;
* Make sure a text-to-speech engine is installed on the system;
* On some devices, the text-to-speech (TTS) feature must be enabled in system settings.

## Danmaku doesn't show

* Make sure danmaku are enabled (toggle in the player);
* Danmaku rely on the dandanplay service matching the episode – obscure titles may have no danmaku data;
* Check your network connection.

## Tracking sync fails

* In Settings → Tracking, confirm that service is signed in. Online services use an authorization page, Kitsu and MangaUpdates use a username and password, and Komga, Kavita, and Suwayomi need your server address;
* If the sign-in has expired, sign out of that service and sign in again;
* Check your network connection.

## Downloads stop or fail

* Check free storage space;
* If "Download over Wi-Fi only" is enabled, connect to Wi-Fi;
* BT downloads require the on-demand BT component – make sure it finished downloading.

## The reader is laggy

* Try disabling double-page mode or white-border trimming;
* Chapters with very large images may load slowly on low-end devices – this is normal;
* Restart the app and try again.
