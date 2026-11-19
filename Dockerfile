# Builds the site's static files for a server (staging, prod). Nothing runs
# from this image: deploy/deploy.sh exports the final stage's files with
# `docker build --output` and nginx on the host serves them. Locally the site
# runs from `npm run dev`; see the README.
FROM node:22-alpine AS build
WORKDIR /app

# Dependencies on their own layer, so a code-only change reuses it.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Vite reads .env.production here if the checkout has one (the store URLs for
# this environment). Everything VITE_* is compiled into the public bundle, so
# only values that may be public belong in it; .dockerignore keeps the other
# .env files out.
RUN npm run build

# Just the build output, so `--output` writes dist/ and nothing else.
FROM scratch
COPY --from=build /app/dist /
