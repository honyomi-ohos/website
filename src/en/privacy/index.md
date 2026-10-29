---
title: Privacy policy
description: Privacy Policy that explains how Honyomi collects, uses, and protects users' personal information.
editLink: false
---

# Privacy policy

Honyomi (package name `fun.shuey.honyomi`) is an Open Source, local-first manga / novel / video reader.
This SERVICE is provided at no cost and is intended for use as is.

This page details our policies with the collection, use, and disclosure of Personal Information.
The app itself does **not collect, upload, or share** any personal information:

- No account registration or login system;
- No embedded analytics, tracking, or crash-reporting SDKs;
- No advertising SDKs;
- No data is sent to any developer-operated server (the app has no backend of its own).

## Information Collection and Use

The app may interact with third-party websites or services in the following scenarios, all initiated **by the user**:

| Scenario | Default state | Information involved | Purpose and destination |
| --- | --- | --- | --- |
| Local library / reading progress / download history / preferences | — | Stored on the device only | Never uploaded |
| Browsing or reading from an online source (a user-installed extension) | Off | Requests go directly to the third-party site | Handled by that site under its own policy; the app does not process or store them |
| Connecting to a tracking service (syncing reading progress) | Automatic sync is on by default, after you sign in to a service | Authorization token or account credentials, and reading progress | Sent directly to the service you chose; credentials stay in the device's secure storage |
| Video danmaku (dandanplay) | On (can be disabled at any time) | Title of the currently playing work | Sent to api.dandanplay.net to match the episode and load danmaku; no account or device identifiers are sent |
| Encrypted DNS (DoH) | Off | Domain name resolution requests | Sent to the chosen DoH provider once enabled |
| Text-to-speech narration | — | Novel text | On-device speech synthesis; narration never leaves the device |
| Backup / restore | — | Library, categories, reading progress, etc. | Exported to a file at a location of the user's choice; contains **no** tokens, passwords, or cookies |
| App lock | Off | System lock-screen check (PIN, face, or fingerprint) | Used only to unlock the app. The system shows the prompt; the app does not collect biometric data |

## Permissions

All permissions declared by the app are system-level (normal) permissions. The app does **not** request any user_grant permissions that require runtime consent dialogs:

| Permission | Purpose |
| --- | --- |
| ohos.permission.INTERNET | Loading online source content and connecting to user-chosen services |
| ohos.permission.GET_NETWORK_INFO | Checking network availability |
| ohos.permission.FILE_ACCESS_PERSIST | Remembering user-authorized local library directories |
| ohos.permission.ACCESS_BIOMETRIC | App lock, using the system prompt (PIN, face, or fingerprint) |
| ohos.permission.PRIVACY_WINDOW | Screenshot protection (active when enabled by the user) |
| ohos.permission.KEEP_BACKGROUND_RUNNING | Keeping downloads / narration / BT downloads running in the background |

## Third-Party Services

The app does not integrate any third-party SDKs that collect personal information. The following third-party services are used only upon user action and are each governed by their own privacy policy:

| Service | Trigger | What is sent | Where it is stored |
| --- | --- | --- | --- |
| Tracking services (AniList, MyAnimeList, Kitsu, Shikimori, Bangumi, MangaUpdates, Hikka, Komga, Kavita, Suwayomi) | The user signs in | An authorization page, a username and password, or a self-hosted server address and key; plus reading progress | Credentials stay in the device Asset Store (hardware-backed TEE) and are not uploaded anywhere else |
| dandanplay danmaku service | Video playback with danmaku enabled (default on, can be disabled) | Work title (for episode matching) | Danmaku is cached in memory only, never written to disk |
| Online source sites (websites targeted by user-installed extensions) | User browses / reads that source | Browse requests (direct to the site) | Handled by the site itself |
| DoH provider | User enables encrypted DNS (default off) | DNS resolution requests | Contains no user identity information |

Extensions (source plugins) are installed by the user as `.honyomiplug` packages and are only distributed over HTTPS in release builds; the app ships with no content sources, and extension behavior is governed by their respective terms and privacy policies.

## Data Storage and Security

- Local data (library, progress, settings) is stored in the app sandbox and is completely removed on uninstall;
- Tracking service tokens / passwords and sensitive extension settings are stored in the system Asset Store (hardware-backed TEE);
- Network cookies are stored AES-256-GCM encrypted, with keys held in the Asset Store;
- Release builds enable code obfuscation and shrinking, and extension network requests are forced over HTTPS;
- The app offers optional local protections: an app lock that uses the system lock-screen credential, and a secure screen that blocks screenshots. The secure screen applies only during incognito unless you change it.

## External Links

This Service contains links to other sites.
If you click on a third-party link, you will be directed to that site.
Note that these external sites are not operated by us.
Therefore, we strongly advise you to review the Privacy Policy of these websites.
We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

This includes the use of external tracking services (e.g. MyAnimeList).

## Your Rights

- **Access / export**: back up and export your library data at any time from Settings;
- **Delete**: uninstalling the app deletes all local data (including tokens in secure storage);
- **Revoke consent**: disconnecting a tracking service deletes its token from the device; disabling danmaku, DoH, or privacy features stops the corresponding data transfer; disabling / uninstalling an extension stops interaction with its site;
- **Withdraw consent**: uninstalling the app constitutes withdrawal of consent to this policy.

## Children's Privacy

This Service is not directed at minors. Online content comes from third-party sources installed by the user and may contain material unsuitable for minors; sources and content marked NSFW are hidden by default (users may enable them in settings). Minors are advised to use the app under parental guidance.

## Changes to This Privacy Policy

We may periodically update our Privacy Policy. Updates are published on this page, in the in-app privacy policy, and on the app marketplace listing. You are advised to review this page periodically for any changes.

## Contact Us

If you have any questions or suggestions about this Privacy Policy, do not hesitate to reach out to us on [GitHub](https://github.com/ShueyYuen/honyomi).
