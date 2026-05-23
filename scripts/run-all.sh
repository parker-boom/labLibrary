#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f package.json ]; then
  echo "Lab Library scaffold is ready, but no app has been initialized yet."
  echo "After implementation, this script will run the verification loop."
  exit 0
fi

if command -v npm >/dev/null 2>&1; then
  npm run lint --if-present
  npm run build
  npm run check --if-present
else
  echo "npm is not available on PATH." >&2
  exit 1
fi
