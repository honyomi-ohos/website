---
title: Diagnosis
titleTemplate: Guides
description: How to diagnose problems with Honyomi.
---

# Diagnosis

How to diagnose problems with Honyomi.

## Basic checks

When something goes wrong, first verify:

1. **System version**: HarmonyOS 6.1.0 or higher;
2. **App version**: you are on the latest release (compare with the [download page](/en/download/));
3. **Network**: online features (sources, tracking, danmaku) require connectivity;
4. **Restart**: restarting the app resolves most transient issues.

## Narrow it down by feature

| Feature | Depends on | What to check |
| --- | --- | --- |
| Online sources | Network + extension | Try another source; check the extension version |
| Local source | Folder authorization + sync | Re-sync; check the directory layout |
| E-books | The file itself | Try another file |
| Narration | System TTS engine | Check the system text-to-speech settings |
| Danmaku | Network + dandanplay | Try a popular title |
| Tracking sync | Network + auth token | Disconnect and re-authorize |
| Downloads | Storage space + network | Check free space and download settings |

## Collecting information

If the problem persists, include the following when reporting it:

- Steps to reproduce (as detailed as possible);
- Device model and system version;
- App version (see <navEn to="about" />);
- Screenshots or the exact error message.

## Reporting

Report the issue on [GitHub Issues](https://github.com/ShueyYuen/honyomi/issues). Search existing issues first to avoid duplicates.
