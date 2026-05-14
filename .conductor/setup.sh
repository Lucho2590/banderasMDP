#!/bin/bash
# Conductor workspace setup script.
# Runs automatically when a new workspace is created (configured in Conductor app).
# Idempotent: safe to re-run.

set -euo pipefail

WORKSPACE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SHARED_ENV="$HOME/conductor/repos/banderasmdp/.env.local"

cd "$WORKSPACE_DIR"

echo "==> Conductor setup for: $WORKSPACE_DIR"

# 1) Copy shared .env.local from the main repo if it exists and the workspace doesn't already have one.
if [ -f "$WORKSPACE_DIR/.env.local" ]; then
  echo "[env] .env.local already present — skipping copy."
elif [ -f "$SHARED_ENV" ]; then
  cp "$SHARED_ENV" "$WORKSPACE_DIR/.env.local"
  echo "[env] Copied .env.local from $SHARED_ENV"
else
  echo "[env] WARNING: No .env.local found at $SHARED_ENV — create it once and re-run setup." >&2
fi

# 2) Install Node dependencies.
if [ -f "$WORKSPACE_DIR/package.json" ]; then
  echo "[pnpm] Running pnpm install..."
  pnpm install
  echo "[pnpm] Done."
else
  echo "[pnpm] No package.json found — skipping."
fi

echo "==> Setup complete."
