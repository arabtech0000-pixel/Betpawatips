#!/usr/bin/env bash
# ==============================================================================
# Script: install_git_hooks.sh
# Purpose: Configure git pre-commit hooks for flutter formatting and tests
# ==============================================================================

HOOKS_DIR=".git/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "Not inside a git repository root. Skipping git hook installation."
  exit 0
fi

cp .github/git-hooks/pre-commit "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/pre-commit"

echo "✔ Git hooks successfully installed to $HOOKS_DIR/pre-commit"
