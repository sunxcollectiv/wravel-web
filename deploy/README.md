# Deploying wravel-web to a server

Server setup only. To run the site locally, see the [main README](../README.md).

- [First time](#first-time): [clone and build](#1-clone-and-build), [store URLs](#2-store-urls), [nginx site](#3-nginx-site-http), [HTTPS](#4-https)
- [Deploying a new version](#deploying-a-new-version) (and rolling back)
- [Changing the nginx site](#changing-the-nginx-site)
- [API access (CORS)](#api-access-cors): what wravel-server needs before the site calls it

Files: [`deploy.sh`](deploy.sh) · [`nginx.conf`](nginx.conf) · [`Dockerfile`](../Dockerfile) · [`.dockerignore`](../.dockerignore)

The site is static files, and nginx on the host serves them; nothing else runs
for it. Any API calls go straight from the browser to `https://api.wravel.app`,
the same way the iOS and Android apps call it, so wravel-server has to allow the
site's origin via CORS (see [API access (CORS)](#api-access-cors)). The site
normally shares wravel-server's host, so
[wravel-server's README](https://github.com/sunxcollectiv/wravel-server#deploying-to-a-server)
covers the base setup (Docker, nginx, certbot, ufw, swap). The setup is the
same as [wravel-manage](https://github.com/sunxcollectiv/wravel-manage)'s, with
three things left out: there is no API token (the site calls the public
endpoints as an anonymous visitor), no basic-auth login (the site is public),
and no `/api` reverse proxy (the browser talks to the API directly).

| | Where |
|---|---|
| Checkout | `/srv/apps/wravel-web` |
| Live files | `/srv/apps/wravel-web/build/current` (symlink to a release) |
| Store URLs | `/srv/apps/wravel-web/.env.production` (gitignored, optional) |
| nginx site | `/etc/nginx/sites-available/wravel-web`, copied from [`nginx.conf`](nginx.conf) |

## First time

The domain's DNS has to point at the server before certbot can issue a
certificate. Set it once for the commands below:

```bash
DOMAIN=www.example.com
```

### 1. Clone and build

```bash
git clone https://github.com/sunxcollectiv/wravel-web.git /srv/apps/wravel-web
/srv/apps/wravel-web/deploy/deploy.sh   # builds in Docker, publishes build/current
```

### 2. Store URLs

The App Store and Google Play buttons read `VITE_APP_STORE_URL` and
`VITE_PLAY_STORE_URL` at build time. Without them they point at the stores'
home pages, which is fine until the apps are listed. To set them, write
`.env.production` in the checkout (Vite reads it during `npm run build`, and the
[`Dockerfile`](../Dockerfile) lets it into the image) and deploy again:

```bash
cat > /srv/apps/wravel-web/.env.production <<'ENV'
VITE_APP_STORE_URL=https://apps.apple.com/app/...
VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=...
ENV
/srv/apps/wravel-web/deploy/deploy.sh
```

Only public values belong in it: everything `VITE_*` is compiled into the
JavaScript anyone can download. Staging can point at TestFlight or an internal
testing track, which is why the file is per server and gitignored.

### 3. nginx site (HTTP)

Copy [`nginx.conf`](nginx.conf) into place with the domain filled in, enable
it, and reload:

```bash
sudo sed "s/<site-domain>/$DOMAIN/" /srv/apps/wravel-web/deploy/nginx.conf | sudo tee /etc/nginx/sites-available/wravel-web >/dev/null
sudo ln -s /etc/nginx/sites-available/wravel-web /etc/nginx/sites-enabled/wravel-web
sudo nginx -t && sudo systemctl reload nginx
```

`http://$DOMAIN` should now show the site.

### 4. HTTPS

certbot gets the certificate, adds the 443 listener to the site file and
redirects port 80 to it:

```bash
sudo certbot --nginx -d "$DOMAIN" --redirect
```

To serve the bare domain as well, add it to both `server_name` and certbot
(`-d example.com -d www.example.com`). certbot renews by itself
(`systemctl list-timers | grep certbot`). To check a renewal would work:
`sudo certbot renew --dry-run`.

## Deploying a new version

```bash
/srv/apps/wravel-web/deploy/deploy.sh
```

[`deploy.sh`](deploy.sh) fast-forwards the checkout to its upstream branch, builds in Docker (`node`
image, so the host needs no Node), writes the files to
`build/releases/<time>-<commit>`, then repoints `build/current` with one atomic
rename. It keeps the last five releases. To roll back, point `current` at an
older one:

```bash
cd /srv/apps/wravel-web/build
ln -sfn releases/<older> current.new && mv -T current.new current
```

nginx needs no reload for either.

## Changing the nginx site

The live site file is a copy that certbot has edited, so a change to
[`nginx.conf`](nginx.conf) here does not reach it. Make the same change in
`/etc/nginx/sites-available/wravel-web` by hand, then
`sudo nginx -t && sudo systemctl reload nginx`.

## API access (CORS)

The site has no API calls yet. When it gets them, the browser will call
`https://api.wravel.app` from the site's own origin, and browsers only allow
that if the API says so in its response headers. nginx here adds nothing, so the
change is in wravel-server, not in this repo: register FastAPI's
`CORSMiddleware` on the app in `app/main.py`, listing the production and staging
site origins exactly (scheme and host, no path, no trailing slash). Open up
methods and headers only as far as the site's calls need; the public endpoints
are anonymous, so leave `allow_credentials` off unless the site ever sends
cookies.

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://wravel.app", "https://<staging-site-domain>"],
    allow_methods=["GET", "POST"],  # widen as the site's calls need
    allow_headers=["Content-Type"],
    allow_credentials=False,        # only if the site ever sends cookies
)
```

Local development is unaffected until the site calls the API from
`http://localhost:4630`; that origin would need adding on a local wravel-server
too, or the dev build could point at staging.
