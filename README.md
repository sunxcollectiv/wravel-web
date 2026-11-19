# wravel-web

The wravel website: React 19, Vite and TypeScript. Public, unauthenticated routes for now.

## Getting started

```sh
npm ci
npm run dev
```

The site is at http://localhost:4630.

## Port

Locally wravel-web serves on port **4630**: the dev server and `npm run preview`. The port is set once in `vite.config.ts` (`server.port` and `preview.port`, both strict, so a busy port fails instead of moving). On a server nothing listens on it: nginx serves the built files itself (see [Deploying to a server](#deploying-to-a-server)).

## Scripts

| Command           | What it does                                 |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                    |
| `npm run build`   | Type-check (`tsc -b`) and build into `dist/` |
| `npm run preview` | Serve the production build                   |
| `npm run lint`    | Lint with oxlint                             |

### Building without Node

Docker alone can build it, with no npm, Node or TypeScript on the machine. The
[`Dockerfile`](Dockerfile) runs `npm ci && npm run build` in a `node` image and writes only
the result to `dist/` (cleared first, since Docker leaves old files in place):

```sh
rm -rf dist && docker build --output type=local,dest=dist .
```

This is the production build. It ignores `.env.local` and reads only
`.env.production` if there is one, so locally it has whichever store URLs that
file holds, or the defaults. [`deploy/deploy.sh`](deploy/deploy.sh) runs this same build on a
server ([deploy/README.md](deploy/README.md)).

## Environment variables

Copy `.env.example` to `.env.local` (gitignored). Both are optional.

| Variable              | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `VITE_APP_STORE_URL`  | Where the App Store button points                      |
| `VITE_PLAY_STORE_URL` | Where the Google Play button points                    |

Everything `VITE_*` is compiled into the public JavaScript, so only values that
may be public belong here. On a server the same two variables go in
`.env.production` (also gitignored); see [deploy/README.md](deploy/README.md#2-store-urls).

## Deploying to a server

Server-only setup is in [deploy/README.md](deploy/README.md). You don't need
any of it to run the site locally.

- [First-time setup](deploy/README.md#first-time): clone, store URLs, [nginx](deploy/README.md#3-nginx-site-http), [HTTPS with certbot](deploy/README.md#4-https)
- [Deploying a new version](deploy/README.md#deploying-a-new-version) and rolling back
- Files: [`deploy/deploy.sh`](deploy/deploy.sh) · [`deploy/nginx.conf`](deploy/nginx.conf) · [`Dockerfile`](Dockerfile)

## Layout

```
src/
  brand/      tokens.css (colors, type, spacing) and the W mark
  chrome/     header/footer frames pages sit in; optional and swappable, see its README
  components/ shared pieces (store buttons)
  pages/      one folder per page; copy lives next to the page
  routes.tsx  the route tree, grouped by chrome
deploy/       server-side deploy script, nginx site and setup notes
```
