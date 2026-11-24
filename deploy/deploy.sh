#!/usr/bin/env bash
# Deploys whatever the checkout's upstream branch points at, on a server
# (staging or prod). Idempotent, so re-running after a failure is always the
# right move.
#
#   /srv/apps/wravel-web/deploy/deploy.sh
#
# Builds the static files in Docker (the host needs no Node), writes them to
# build/releases/<time>-<commit>, then swaps build/current to point there. nginx
# serves build/current, so the switch is a single rename and a page never sees
# half a release. Nothing here assumes a human is watching: GitHub Actions runs it
# over ssh on every push to main (.github/workflows/deploy.yml), and it can
# still be run by hand.

set -euo pipefail
cd "$(dirname "$(readlink -f "$0")")/.."

# How many releases to keep, the live one included, for a quick rollback.
KEEP=5

# --ff-only: the server checkout is not a place to make edits, and if it has
# diverged from origin this stops rather than quietly merging.
git pull --ff-only --quiet
sha="$(git rev-parse --short HEAD)"
echo "deploying $sha: $(git log -1 --pretty=%s)"

if [[ ! -f .env.production ]]; then
    echo "note: no .env.production, so the store buttons point at the stores' home pages (deploy/README.md)" >&2
fi

mkdir -p build/releases
# Timestamped, so re-deploying the same commit never overwrites the live files.
name="$(date +%Y%m%d-%H%M%S)-$sha"
release="build/releases/$name"
staging="$release.tmp"
# Leftovers from a build that failed part-way.
rm -rf build/releases/*.tmp

# --pull refreshes the node base image too, so its security fixes arrive.
docker build --pull --output "type=local,dest=$staging" .

if [[ ! -f "$staging/index.html" ]]; then
    echo "build produced no index.html; leaving the live release alone" >&2
    exit 1
fi

mv "$staging" "$release"

# Atomic swap: build a new symlink beside the old one, then rename over it.
ln -sfn "releases/$name" build/current.new
mv -T build/current.new build/current
echo "live: build/current -> releases/$name"

# Names start with the time, so reverse order is newest first. Never the live one.
ls -1 build/releases | sort -r | tail -n +"$((KEEP + 1))" | while read -r old; do
    [[ "$old" == "$name" ]] || rm -rf "build/releases/$old"
done

# Layers superseded by the build above; nothing in use is touched.
docker image prune -f >/dev/null
