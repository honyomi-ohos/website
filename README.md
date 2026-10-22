# Honyomi Website

This repository contains the official website for [Honyomi](https://github.com/ShueyYuen/honyomi), a local-first manga / novel / video reader for HarmonyOS.

Built with [VitePress](https://vitepress.dev). The site is bilingual: Simplified Chinese is the default locale and English is served under `/en/`.

## Development

Prerequisites: Node.js 20+ and npm.

```sh
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build the static site into dist/
npm run build

# Serve the production build locally
npm run preview
```

## Release data

Changelogs and download buttons are generated from GitHub Releases of `ShueyYuen/honyomi`. During a build, release data is read from a local cache at `.cache/github-releases.json`; if no cache exists, it is fetched from the GitHub API (optionally authenticated via the `GITHUB_TOKEN` environment variable) and cached.

To refresh the cache manually, run:

```sh
npm run refresh:releases
```

## Analytics

Google Analytics is only loaded when `VITE_GA_ID` is set at build time.

## License

MPL-2.0. See [LICENSE](LICENSE) for details.
