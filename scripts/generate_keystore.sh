#!/usr/bin/env bash
# ==============================================================================
# Script: generate_keystore.sh
# Purpose: Generate release signing keystore for production Android APK/AAB
# ==============================================================================

KEYSTORE_PATH="android/app/upload-keystore.jks"
KEY_ALIAS="kickpredict"

echo "=== Generating Android Release Keystore ==="
if [ -f "$KEYSTORE_PATH" ]; then
  echo "Keystore already exists at $KEYSTORE_PATH"
  exit 0
fi

keytool -genkey -v -keystore "$KEYSTORE_PATH" \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias "$KEY_ALIAS" \
  -dname "CN=KickPredict, OU=Mobile, O=KickPredict, L=Kampala, ST=Central, C=UG"

echo "✔ Keystore successfully generated at $KEYSTORE_PATH"
