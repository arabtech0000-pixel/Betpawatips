# 📱 KickPredict Flutter Android Application

Complete, production-grade Flutter Android mobile application for sports betting predictions, Arsenal vs Chelsea live match analytics with tactical pitch formations, Ugandan Shillings (UGX) premium tiers, clean Aviator Predictor, and production CI/CD GitHub workflows.

---

## 📱 Application Modules & Architecture

1. **Home Screen (`home_screen.dart`)**:
   - Header with extending animated Search (left) and Calendar fixtures picker (right).
   - Arsenal vs Chelsea Featured Clash with live score pulse, odds quick actions, and direct full match navigation.
   - Sports category filter pills (Football, Basketball, Tennis, Baseball, Cricket, Rugby).
   - Upcoming events match cards with odds and team logos.

2. **Match Detail Screen (`match_detail_screen.dart`)**:
   - Prominent Stadium Hero Banner at the top with floodlights, tournament badge, live score, and action buttons.
   - 2D Realistic Football Pitch Lineup with player positions, ratings, coach info, and team formations.
   - Match Stats & xG bars (Possession, xG, Total Shots, Shots on Target, Corners).
   - Minute-by-minute Match Timeline.

3. **Premium Screen (`subscriptions_screen.dart`)**:
   - Native Ugandan Shillings (UGX) pricing:
     - 1 Week Plan: **25,000 UGX**
     - 1 Month Plan: **55,000 UGX**
     - VIP Infinity Plan: **90,000 UGX**
   - Active subscription state management via Provider.

4. **Tips Screen (`tips_screen.dart`)**:
   - Streamlined display focusing on winning vs losing teams.
   - Tabs: Today Tips, History, Won, Lost, Pending.
   - Clean badges without cluttered odds.

5. **Aviator Predictor (`aviator_screen.dart`)**:
   - Smart, simplified predictor interface.
   - Flight radar with predicted multiplier (e.g., 3.85x) and recommended cashout target (e.g., 2.10x).
   - One-tap "Predict Next Round" button with calibration feedback.
   - Recent crash history chip stream.

6. **Profile Screen (`profile_screen.dart`)**:
   - Picks history, Premium membership status, and Social channels.

---

## 🛠 GitHub Actions CI/CD ("Git Workflows")

All workflows are located in `/.github/workflows/`:

1. **`build-android-apk.yml`**:
   - Triggers on push to `main` and Pull Requests.
   - Installs Flutter 3.24 & Java 17.
   - Runs `flutter pub get` and tests.
   - Compiles **Universal Release APK** (`app-release.apk`) + **Split ABI APKs** (`armeabi-v7a`, `arm64-v8a`, `x86_64`).
   - Automatically uploads downloadable artifacts.

2. **`build-app-bundle.yml`**:
   - Builds Google Play Store ready `.aab` bundles on tag push.

3. **`flutter-ci.yml`**:
   - Verifies code formatting (`dart format`), static analysis (`flutter analyze`), and test suites.

4. **Automation Scripts (`/scripts/`)**:
   - `scripts/build_apk.sh`: One-click local APK builder with colorized diagnostics.
   - `scripts/setup_android.sh`: Diagnostic check for Android SDK and environment variables.
   - `scripts/generate_keystore.sh`: Creates production release signing keystores.
   - `scripts/install_git_hooks.sh`: Installs pre-commit formatting validation hooks.
   - `.github/git-hooks/pre-commit`: Git hook for code verification.

---

## 🚀 Quick Start (Build & Run on Android)

### Requirements
- Flutter SDK 3.16+ (or 3.24+)
- Android Studio / Android SDK (Platform 34, Build Tools 34.0.0)
- Java 17 JDK (Zulu or OpenJDK)

### Run Locally
```bash
# Clone repository
git clone <repository_url>
cd kickpredict

# Make build scripts executable
chmod +x scripts/*.sh

# Run local build
./scripts/build_apk.sh
```

Or via Flutter CLI:
```bash
cd flutter_app
flutter pub get
flutter run
```

---

## 🔥 Firebase Configuration (`betwin-afa78`)
- **Project ID**: `betwin-afa78`
- **Application ID / Package**: `com.kickpredict.app`
- **Realtime Database URL**: `https://betwin-afa78-default-rtdb.firebaseio.com`
- **Configuration file**: `flutter_app/android/app/google-services.json`
- **Plugin configured**: `com.google.gms.google-services`
- **Dart options**: `flutter_app/lib/firebase_options.dart`
- **Service layer**: `flutter_app/lib/services/firebase_service.dart` (Auth + Realtime Database)
- **Active Packages**: `firebase_core`, `firebase_auth`, `firebase_database` (Cloud Firestore removed)

### Firebase Console Setup Checklist
1. **Authentication**:
   - Go to **Firebase Console** -> **Build** -> **Authentication** -> **Sign-in method**
   - Enable **Email/Password** and/or **Anonymous**
2. **Realtime Database**:
   - Go to **Firebase Console** -> **Build** -> **Realtime Database**
   - Click **Create Database** (choose default region)
   - In **Rules**, set:
     ```json
     {
       "rules": {
         ".read": true,
         ".write": "auth != null"
       }
     }
     ```
3. **Firestore**:
   - Leave unconfigured (no Firestore instance needed).

---

## ⚽ Football-Data.org API Integration
KickPredict is configured to consume live fixtures, live in-play scores, and match statistics directly from **football-data.org (v4)**:

- **Service File**: `flutter_app/lib/services/football_data_service.dart`
- **Endpoints Used**:
  - `GET https://api.football-data.org/v4/matches` (Realtime matches across top leagues)
  - `GET https://api.football-data.org/v4/competitions/{code}/matches` (Premier League `PL`, Champions League `CL`, La Liga `PD`, Serie A `SA`, Bundesliga `BL1`)
- **Authentication**: `X-Auth-Token` header.
- **How to plug your API Token**:
  1. **In-App via UI**:
     - On the **Home Screen**: Tap the **Plug Token** / **Configure** pill in the top banner.
     - On the **Profile Screen**: Scroll down to the **Football-Data.org API** card and tap **Enter API Token** / **Update Token**.
     - Paste your token and tap **Save & Connect**. It will persist to `SharedPreferences` and refresh immediately.
  2. **In Code**:
     - Open `flutter_app/lib/services/football_data_service.dart` and set `static String defaultToken = 'YOUR_API_TOKEN_HERE';`
- **Automatic Fallback**:
  - If no token is provided or the device is offline, KickPredict seamlessly displays featured fallback fixtures and high-conviction tips with zero crashes.

