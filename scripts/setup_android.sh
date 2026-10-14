#!/usr/bin/env bash
# ==============================================================================
# Script: setup_android.sh
# Purpose: Verify and setup Android SDK and Flutter dependencies
# ==============================================================================

set -e

echo "=== KickPredict Android Environment Setup ==="

# Check Java
if command -v java >/dev/null 2>&1; then
  echo "✔ Java installed: $(java -version 2>&1 | head -n 1)"
else
  echo "✖ Java not found. Please install OpenJDK 17."
fi

# Check Flutter
if command -v flutter >/dev/null 2>&1; then
  echo "✔ Flutter installed: $(flutter --version | head -n 1)"
  echo "Running flutter doctor..."
  flutter doctor
else
  echo "✖ Flutter not found in PATH."
fi

# Check Android SDK
if [ -n "$ANDROID_HOME" ]; then
  echo "✔ ANDROID_HOME is set: $ANDROID_HOME"
else
  echo "ℹ ANDROID_HOME not exported in current shell. Set export ANDROID_HOME=/path/to/android-sdk"
fi

echo "Environment check complete."
