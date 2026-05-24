#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f package.json ]; then
  echo "package.json not found. Run this from the Lab Library repo root." >&2
  exit 1
fi

if command -v npm >/dev/null 2>&1; then
  npm run verify
else
  echo "npm is not available on PATH." >&2
  exit 1
fi
