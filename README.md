# Honyomi Website

This repository contains the official website for [Honyomi](https://github.com/ShueyYuen/honyomi), a local-first manga / novel / video reader for HarmonyOS.

Built with [VitePress](https://vitepress.dev). The site is bilingual: Simplified Chinese is the default locale and English is served under `/en/`.

## Homepage screenshots

The homepage introduction expects the images listed in [src/public/showcase/README.md](src/public/showcase/README.md). Until a file is in place, that slot shows the filename and a short description of the shot.

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

Changelogs are generated from the release notes of `ShueyYuen/honyomi`. The site does not offer install packages; installation and updates go through Huawei AppGallery. During a build, release data is read from a local cache at `.cache/github-releases.json`; if no cache exists, it is fetched from the GitHub API (optionally authenticated via the `GITHUB_TOKEN` environment variable) and cached.

To refresh the cache manually, run:

```sh
npm run refresh:releases
```

## Docker

GitHub Actions builds a linux/amd64 image and publishes it to `ghcr.io/<owner>/<repo>` on pushes to the default branch (`latest`), other branch names, version tags, and short commit SHAs. Pull requests build the image and do not push it.

The runtime image is `nginx:stable-alpine-slim`. Node.js and `node_modules` are discarded after the VitePress build, so the image is the static site plus that nginx base.

```sh
docker build -f docker/Dockerfile -t honyomi-website .
docker run --rm -p 8080:80 honyomi-website
```

`VITE_HOSTNAME` is baked in at build time and used for the sitemap, RSS, and Open Graph URLs. Pass a GitHub token as a BuildKit secret when you want a higher GitHub API rate limit while fetching release notes:

```sh
docker build -f docker/Dockerfile \
  --build-arg VITE_HOSTNAME=https://example.com \
  --build-arg VITE_GA_ID=G-XXXXXXXX \
  --secret id=GITHUB_TOKEN,env=GITHUB_TOKEN \
  -t honyomi-website .
```

In the GitHub repository, set Actions variables `VITE_HOSTNAME` and `VITE_GA_ID`. The workflow passes `GITHUB_TOKEN` itself. If `docker pull` is denied, open the package on GitHub and set its visibility to public.

## Analytics

Google Analytics is only loaded when `VITE_GA_ID` is set at build time.

## License

MPL-2.0. See [LICENSE](LICENSE) for details.
