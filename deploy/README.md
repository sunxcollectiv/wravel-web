# Deploying wravel-web to a server

Server setup only. To run the site locally, see the [main README](../README.md).

- [First time](#first-time): [clone and build](#1-clone-and-build), [store URLs](#2-store-urls), [nginx site](#3-nginx-site-http), [HTTPS](#4-https)
- [Deploying a new version](#deploying-a-new-version) (and rolling back)
- [Automatic deploys](#automatic-deploys): GitHub Actions runs `deploy.sh` on every push to `main`
- [Changing the nginx site](#changing-the-nginx-site)

Files: [`deploy.sh`](deploy.sh) · [`nginx.conf`](nginx.conf) · [`deploy.yml`](../.github/workflows/deploy.yml) · [`Dockerfile`](../Dockerfile) · [`.dockerignore`](../.dockerignore)

The site is static files: nginx on the host serves them and proxies `/api/*`
to wravel-server on loopback. It normally shares wravel-server's host, so
[wravel-server's README](https://github.com/sunxcollectiv/wravel-server#deploying-to-a-server)
covers the base setup (Docker, nginx, certbot, ufw, swap). The setup is the
same as [wravel-manage](https://github.com/sunxcollectiv/wravel-manage)'s, with
two things left out: there is no API token (the site calls the public
endpoints as an anonymous visitor) and no basic-auth login (the site is public).

| | Where |
|---|---|
| Checkout | `/srv/apps/wravel-web` |
| Live files | `/srv/apps/wravel-web/build/current` (symlink to a release) |
| Store URLs | `/srv/apps/wravel-web/.env.production` (gitignored, optional) |
| nginx site | `/etc/nginx/sites-available/wravel-web`, copied from [`nginx.conf`](nginx.conf) |
| API | `127.0.0.1:4830` (wravel-server) |

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

Merging into `main` does this by itself ([Automatic deploys](#automatic-deploys)). By hand:

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

## Automatic deploys

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs
[`deploy.sh`](deploy.sh) on the server over ssh on every push to `main`, so a
merged pull request is live a few minutes later. It is the same script as
deploying by hand, so the Actions log shows the same output, and a failed build
leaves the live release alone. "Run workflow" in the Actions tab redeploys
without a new commit. Pull requests are linted and built first by
[`ci.yml`](../.github/workflows/ci.yml), so what reaches `main` already builds.
The one-time setup below gives GitHub a key that can do one thing on the
server: run `deploy.sh`.

### 1. Server: checkout on `main`

`deploy.sh` deploys whatever branch the checkout tracks, so the production
checkout has to be on `main`:

```bash
git -C /srv/apps/wravel-web checkout main
```

### 2. Server: a key that only runs deploy.sh

Make a key pair on your own machine, not the server:

```bash
ssh-keygen -t ed25519 -N '' -C 'wravel-web deploy' -f wravel-web-deploy
```

On the server, add the public key (`wravel-web-deploy.pub`) to the deploy
user's `~/.ssh/authorized_keys`, as one line with a forced command in front.
The user is whoever owns `/srv/apps/wravel-web`; it needs to be in the `docker`
group, since `deploy.sh` builds in Docker.

```
command="/srv/apps/wravel-web/deploy/deploy.sh",no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-pty ssh-ed25519 AAAA... wravel-web deploy
```

Whatever a client holding this key asks for, sshd runs `deploy.sh` instead, and
nothing else. It matters because the repository is public: the key sits in
GitHub, and this keeps a leak of it from being a shell on the server.

Then record the server's host key, which the workflow pins:

```bash
ssh-keyscan -t ed25519 <server-host>
```

### 3. GitHub: secrets on the `production` environment

Four secrets, on an environment called `production` (the workflow creates the
environment the first time it runs, or make it under Settings → Environments):

| Secret               | Value                                                  |
| -------------------- | ------------------------------------------------------ |
| `DEPLOY_HOST`        | The server's hostname or IP                            |
| `DEPLOY_USER`        | The deploy user from step 2                            |
| `DEPLOY_SSH_KEY`     | Contents of the private key file `wravel-web-deploy`   |
| `DEPLOY_KNOWN_HOSTS` | The `ssh-keyscan` line from step 2                     |

With the `gh` CLI, from the checkout:

```bash
gh api -X PUT repos/sunxcollectiv/wravel-web/environments/production >/dev/null
gh secret set DEPLOY_HOST --env production
gh secret set DEPLOY_USER --env production
gh secret set DEPLOY_SSH_KEY --env production < wravel-web-deploy
ssh-keyscan -t ed25519 <server-host> | gh secret set DEPLOY_KNOWN_HOSTS --env production
rm wravel-web-deploy wravel-web-deploy.pub
```

The hostname and user are secrets rather than variables only so the log of a
public repository masks them. Delete the local key files once they are in
GitHub; it is the only copy that should exist.

### 4. Try it

Actions → Deploy → Run workflow, or merge something into `main`. The log ends
with `live: build/current -> releases/<time>-<commit>`. A second server, for
staging, gets its own environment and job in the workflow, with its checkout on
the staging branch.

## Changing the nginx site

The live site file is a copy that certbot has edited, so a change to
[`nginx.conf`](nginx.conf) here does not reach it. Make the same change in
`/etc/nginx/sites-available/wravel-web` by hand, then
`sudo nginx -t && sudo systemctl reload nginx`.
