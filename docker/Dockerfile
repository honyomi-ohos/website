# syntax=docker/dockerfile:1

# Build context is the repository root:
#   docker build -f docker/Dockerfile .
#
# VitePress build stays in this stage. The published image is nginx plus dist/.
FROM node:22-alpine AS build

RUN apk add --no-cache git \
 && git config --global --add safe.directory '*'

WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY . .

ARG VITE_HOSTNAME=
ARG VITE_GA_ID=
ENV VITE_HOSTNAME=${VITE_HOSTNAME} \
    VITE_GA_ID=${VITE_GA_ID}

RUN --mount=type=secret,id=GITHUB_TOKEN,required=false \
    GITHUB_TOKEN="$(cat /run/secrets/GITHUB_TOKEN 2>/dev/null || true)" \
    npm run build

# Smallest official nginx image that still does cleanUrls (try_files) and gzip.
FROM nginx:stable-alpine-slim

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --link --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
