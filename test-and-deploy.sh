#!/bin/bash

set -e

PAYLOAD_PORT=$(grep '^PAYLOAD_PORT' .env | cut -d= -f2)
CMS_LOG=/tmp/saihan-cms-e2e.log

cleanup() {
  echo "→ Zastavuji lokální služby..."
  pkill -f "next dev" 2>/dev/null || true
  pkill -f "vite" 2>/dev/null || true
}
trap cleanup EXIT

echo "→ Zastavuji případné běžící lokální služby..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 1

echo "→ Spouštím CMS na portu $PAYLOAD_PORT..."
cd apps/cms
NODE_OPTIONS=--no-deprecation bunx next dev --port "$PAYLOAD_PORT" --hostname 0.0.0.0 --no-server-fast-refresh > "$CMS_LOG" 2>&1 &
cd ../..

echo "→ Čekám až CMS bude ready..."
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PAYLOAD_PORT" 2>/dev/null | grep -q "200\|301\|302"; then
    echo "→ CMS ready (${i}× pokus)"
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "✗ CMS se nespustil do 60 sekund. Log:"
    tail -20 "$CMS_LOG"
    exit 1
  fi
  sleep 2
done

echo "→ Spouštím unit testy..."
cd apps/frontend
if ! bun run test; then
  echo "✗ Unit testy selhaly — deploy zrušen"
  cd ../..
  exit 1
fi

echo "→ Spouštím E2E testy..."
if bun run test:e2e; then
  echo "✓ Všechny testy prošly"
  cd ../..
  echo "→ Nasazuji na Mac Mini (rsync + CMS restart)..."
  bun run build
  rsync -avz --delete apps/frontend/dist/ mac-mini-server:/var/docker/saihan_hotool/apps/frontend/dist/
  ssh mac-mini-server 'cd /var/docker/saihan_hotool && /opt/homebrew/bin/docker-compose restart cms'
  echo "✓ Deploy dokončen"
else
  echo "✗ E2E testy selhaly — deploy zrušen"
  cd ../..
  exit 1
fi
