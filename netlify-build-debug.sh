#!/usr/bin/env bash
set -euo pipefail

echo "=== RUNTIME VERSIONS ==="
uname -a || true
node -v || true
npm -v || true
python --version || true

echo "=== DISK & MEMORY ==="
df -h || true
free -m || true

echo "=== ENV KEYS (whitelisted) ==="
# Print only safe keys to avoid secrets
env | grep -E '^(CI|NETLIFY|NODE_|NPM_|NEXT_|VERCEL_|TZ|LANG)=' || true

echo "=== NEXT INFO ==="
npx next info || true

echo "=== LIST PROJECT ROOT ==="
ls -al || true

echo "=== TYPECHECK (no emit) ==="
npx tsc --noEmit || echo "[warn] TypeScript errors (continuing)";

echo "=== ESLINT (soft fail) ==="
# If ESLint fails we continue; Next can be configured to skip ESLint anyway
npx next lint || echo "[warn] ESLint errors (continuing)"

echo "=== NEXT BUILD START ==="
# Disable ESLint during Next build to avoid silent exits from lint plugins
export NEXT_DISABLE_ESLINT=1
# Increase heap just in case of OOM
export NODE_OPTIONS="--max-old-space-size=4096 ${NODE_OPTIONS:-}"
set -x
npx next build
set +x
echo "=== NEXT BUILD OK ==="