---
title: Tracking
titleTemplate: Guides
description: How to connect a tracking service and sync reading progress.
---

# Tracking

How to write reading progress back to a tracking service. Local reading works without signing in.

## Supported services

There are 10. The sign-in method depends on the service:

| Service | Sign-in |
| --- | --- |
| AniList, MyAnimeList, Bangumi, Shikimori, Hikka | An authorization page inside the app |
| Kitsu, MangaUpdates | Username and password |
| Komga, Kavita, Suwayomi | The address of your own server, plus the account or key that service asks for |

Open them from <navEn to="tracking" />, or from the tracking sheet on a series page.

::: info Where credentials live
Tokens and passwords are kept in the system secure store. The settings page does not show the secret again.
:::

## Automatic sync

Automatic sync in <navEn to="tracking" /> is on by default. After a chapter is marked read, and the series is linked to an entry, the app refreshes the remote state and then writes the progress when the local chapter number is further ahead.

With automatic sync off, progress stays on the device until you update it from the series page.

## Link a series

1. Open the series from the library;
1. Open **Tracking**;
1. Pick a service you are signed in to, search, and choose the matching entry.

One series can be linked to more than one service.

## Sign out

Signing out of a service in <navEn to="tracking" /> clears that service’s credentials on the device. Unlinking a single series on its page does not sign the account out.
