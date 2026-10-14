#!/usr/bin/env bash
# ==============================================================================
# Script: build_apk.sh
# Purpose: Build KickPredict Flutter Android APK (Debug & Release)
# ==============================================================================

set -e

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}   KickPredict Flutter Android Build Pipeline       ${NC}"
echo -e "${CYAN}====================================================${NC}"

# Navigate to flutter app directory if exists
if [ -d "flutter_app" ]; then
  cd flutter_app
fi

echo -e "\n${YELLOW}Step 1: Checking Flutter Environment...${NC}"
flutter --version

echo -e "\n${YELLOW}Step 2: Resolving Dependencies...${NC}"
flutter pub get

echo -e "\n${YELLOW}Step 3: Cleaning previous build caches...${NC}"
flutter clean
flutter pub get

echo -e "\n${YELLOW}Step 4: Building Release APK...${NC}"
flutter build apk --release --split-per-abi

echo -e "\n${YELLOW}Step 5: Building Universal Release APK...${NC}"
flutter build apk --release

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}   BUILD SUCCESSFUL! APKs Generated at:            ${NC}"
echo -e "${GREEN}====================================================${NC}"
ls -lh build/app/outputs/flutter-apk/*.apk 2>/dev/null || ls -lh ../build/app/outputs/flutter-apk/*.apk 2>/dev/null || echo "APKs ready in build/app/outputs/flutter-apk/"

echo -e "\n${CYAN}To install directly onto a connected phone or emulator:${NC}"
echo -e "${CYAN}flutter install${NC}\n"
