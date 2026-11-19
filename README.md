# wravel-web

The wravel website: React 19, Vite and TypeScript. Public, unauthenticated routes for now.

## Getting started

```sh
npm ci
npm run dev
```

The site is at http://localhost:4630.

## Port

wravel-web serves on port **4630** in every environment: the dev server, `npm run preview`, and the built `dist/` on staging and production. The port is set once in `vite.config.ts` (`server.port` and `preview.port`, both strict, so a busy port fails instead of moving). Anything that fronts the site, such as nginx or a Docker port mapping, should target 4630 too.

## Scripts

| Command           | What it does                                 |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                    |
| `npm run build`   | Type-check (`tsc -b`) and build into `dist/` |
| `npm run preview` | Serve the production build                   |
| `npm run lint`    | Lint with oxlint                             |

## Environment variables

Copy `.env.example` to `.env.local` (gitignored). Both are optional.

| Variable              | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `VITE_APP_STORE_URL`  | Where the App Store button points                      |
| `VITE_PLAY_STORE_URL` | Where the Google Play button points                    |

## Layout

```
src/
  brand/      tokens.css (colors, type, spacing) and the W mark
  chrome/     header/footer frames pages sit in; optional and swappable, see its README
  components/ shared pieces (store buttons)
  pages/      one folder per page; copy lives next to the page
  routes.tsx  the route tree, grouped by chrome
```
