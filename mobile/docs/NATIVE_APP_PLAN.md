# Eye Fitness Native App Development Plan

## Overview

This document outlines the complete plan for converting Eye Fitness web app into native iOS and Android applications using Capacitor.

## Architecture

```
eye-trainer/
├── web/                    # Existing React web app (PWA)
├── mobile/
│   ├── ios/               # iOS native project (Capacitor)
│   ├── android/           # Android native project (Capacitor)
│   ├── docs/              # Documentation
│   └── capacitor.config.ts # Capacitor configuration
├── public/                # Built web assets
└── package.json           # Root package.json
```

## Technology Stack

### Current Stack
- **Framework**: React 16.13.1
- **State Management**: Redux
- **Routing**: React Router DOM
- **Build Tool**: Webpack 5
- **Deployment**: Firebase Hosting

### Native Stack (To Be Added)
- **Capacitor**: 5.x (iOS + Android bridge)
- **iOS**: Swift, Xcode 15+
- **Android**: Kotlin, Android Studio

---

## Phase 1: PWA Enhancement ✅ COMPLETED

### Deliverables
- [x] Service Worker for offline support
- [x] Enhanced manifest.json with iOS/Android support
- [x] iOS-specific meta tags and splash screen references
- [x] Android PWA meta tags
- [x] Splash screen generator script

### Testing PWA
1. **Build the app**: `npm run build`
2. **Deploy to Firebase**: `npm run buildDeploy`
3. **iOS Testing**:
   - Open Safari on iPhone
   - Navigate to https://eyefitness.ca
   - Tap Share → Add to Home Screen
   - Launch app from home screen (fullscreen, no browser UI)
4. **Android Testing**:
   - Open Chrome on Android
   - Navigate to https://eyefitness.ca
   - Tap menu → "Install app" or "Add to Home Screen"
   - Launch app (fullscreen, app-like experience)

---

## Phase 2: Capacitor Setup (Native App Foundation)

### Prerequisites
- Node.js 16+ installed
- Xcode 15+ (for iOS)
- Android Studio (for Android)
- Apple Developer Account ($99/year) - **YOU HAVE THIS**
- Google Play Developer Account ($25 one-time fee)

### Setup Steps

#### 2.1 Install Capacitor
```bash
cd /home/user/eye-trainer
npm install @capacitor/core @capacitor/cli
npx cap init
# App name: Eye Fitness
# App ID: ca.eyefitness.app (reverse domain)
```

#### 2.2 Add Platforms
```bash
# Add iOS
npm install @capacitor/ios
npx cap add ios

# Add Android
npm install @capacitor/android
npx cap add android
```

#### 2.3 Configure Capacitor
Create `capacitor.config.ts` in the root:
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.eyefitness.app',
  appName: 'Eye Fitness',
  webDir: 'public',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a1a2e'
    }
  }
};

export default config;
```

#### 2.4 Build and Sync
```bash
# Build web app
npm run build

# Copy web assets to native projects
npx cap sync

# Open native projects
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

---

## Phase 3: iOS Native App Development

### 3.1 Configure Xcode Project

#### App Icons
1. Open `mobile/ios/App/App/Assets.xcassets/AppIcon.appiconset`
2. Add app icons for all sizes:
   - 20x20 @2x, @3x
   - 29x29 @2x, @3x
   - 40x40 @2x, @3x
   - 60x60 @2x, @3x
   - 1024x1024 (App Store)

#### Launch Screen
1. Open `mobile/ios/App/App/Base.lproj/LaunchScreen.storyboard`
2. Customize with Eye Fitness branding
3. Use theme colors: Background `#1a1a2e`, Accent `#67C5D5`

#### Info.plist Configuration
Add to `mobile/ios/App/App/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>Eye Fitness needs camera access for vision tests</string>

<key>UIRequiresFullScreen</key>
<true/>

<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>

<key>UIViewControllerBasedStatusBarAppearance</key>
<true/>
```

#### Signing & Capabilities
1. Open Xcode → Project Settings → Signing & Capabilities
2. Select your Apple Developer Team
3. Bundle Identifier: `ca.eyefitness.app`
4. Enable capabilities if needed:
   - Push Notifications (future)
   - Background Modes → Audio (for audio guidance)

### 3.2 Testing on iOS

#### Simulator Testing
```bash
npx cap run ios
# Or from Xcode: Product → Run (Cmd+R)
```

#### Physical Device Testing
1. Connect iPhone via USB
2. Select device in Xcode
3. Run (Cmd+R)
4. Trust developer certificate on device: Settings → General → VPN & Device Management

### 3.3 iOS App Store Submission

#### Prepare Assets
- App icon (1024x1024)
- Screenshots (6.7", 6.5", 5.5" displays)
- App preview video (optional, recommended)
- Privacy policy URL: https://eyefitness.ca/policy

#### Build Archive
1. Xcode → Product → Archive
2. Upload to App Store Connect
3. Wait for processing (~30 mins)

#### App Store Connect
1. Login: https://appstoreconnect.apple.com
2. My Apps → + → New App
3. Fill in metadata:
   - **Name**: Eye Fitness - Eye Training
   - **Subtitle**: Vision Exercises for Healthy Eyes
   - **Category**: Health & Fitness
   - **Keywords**: eye exercises, vision training, eye health, eye strain relief
   - **Description**: (Use web app description)
   - **What's New**: Initial release
   - **Support URL**: https://eyefitness.ca/support
   - **Marketing URL**: https://eyefitness.ca
   - **Privacy Policy**: https://eyefitness.ca/policy
4. Upload screenshots
5. Submit for review (7-14 days typically)

---

## Phase 4: Android Native App Development

### 4.1 Configure Android Studio Project

#### App Icons
1. Open `mobile/android/app/src/main/res`
2. Replace icons in:
   - `mipmap-mdpi/` (48x48)
   - `mipmap-hdpi/` (72x72)
   - `mipmap-xhdpi/` (96x96)
   - `mipmap-xxhdpi/` (144x144)
   - `mipmap-xxxhdpi/` (192x192)

Use Android Studio's Image Asset Studio:
- Right-click `res` → New → Image Asset
- Icon Type: Launcher Icons (Adaptive and Legacy)
- Path: `web/src/android-chrome-512x512.png`

#### Splash Screen
Edit `mobile/android/app/src/main/res/values/styles.xml`:
```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@color/splash_background</item>
</style>
```

Add colors in `res/values/colors.xml`:
```xml
<color name="splash_background">#1a1a2e</color>
<color name="colorPrimary">#67C5D5</color>
<color name="colorPrimaryDark">#1a1a2e</color>
<color name="colorAccent">#67C5D5</color>
```

#### AndroidManifest.xml Configuration
Update `mobile/android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />

<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="Eye Fitness"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:theme="@style/AppTheme">
    ...
</application>
```

#### build.gradle Configuration
Update `mobile/android/app/build.gradle`:
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        applicationId "ca.eyefitness.app"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 4.2 Testing on Android

#### Emulator Testing
```bash
npx cap run android
# Or from Android Studio: Run → Run 'app' (Shift+F10)
```

#### Physical Device Testing
1. Enable Developer Options on Android device:
   - Settings → About Phone → Tap Build Number 7 times
2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging
3. Connect device via USB
4. Run from Android Studio

### 4.3 Google Play Store Submission

#### Prepare Assets
- High-res icon (512x512)
- Feature graphic (1024x500)
- Screenshots (phone & tablet)
- Video (optional)
- Privacy policy URL: https://eyefitness.ca/policy

#### Build Release APK/AAB
```bash
cd mobile/android
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

#### Sign the App
1. Generate keystore:
```bash
keytool -genkey -v -keystore eye-fitness.keystore -alias eye-fitness -keyalg RSA -keysize 2048 -validity 10000
```

2. Sign the AAB:
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore eye-fitness.keystore app-release.aab eye-fitness
```

#### Google Play Console
1. Create account: https://play.google.com/console ($25 one-time)
2. Create new app
3. Fill in store listing:
   - **App name**: Eye Fitness - Eye Training
   - **Short description**: Free eye exercises for better vision health
   - **Full description**: (Use web app description)
   - **Category**: Health & Fitness
   - **Tags**: Eye care, Vision training, Eye exercises
   - **Contact email**: support@eyefitness.ca
   - **Privacy policy**: https://eyefitness.ca/policy
4. Upload screenshots and graphics
5. Content rating questionnaire
6. Upload AAB file
7. Submit for review (usually 1-3 days)

---

## Phase 5: Capacitor Plugins (Native Features)

### Essential Plugins

#### 5.1 Status Bar
```bash
npm install @capacitor/status-bar
```

Usage in `App.jsx`:
```javascript
import { StatusBar, Style } from '@capacitor/status-bar';

useEffect(() => {
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#1a1a2e' });
}, []);
```

#### 5.2 Splash Screen
```bash
npm install @capacitor/splash-screen
```

Usage in `index.jsx`:
```javascript
import { SplashScreen } from '@capacitor/splash-screen';

window.addEventListener('load', () => {
  SplashScreen.hide();
});
```

#### 5.3 Haptics (Vibration Feedback)
```bash
npm install @capacitor/haptics
```

Usage for exercise feedback:
```javascript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const vibrateFeedback = () => {
  Haptics.impact({ style: ImpactStyle.Light });
};
```

#### 5.4 Keep Awake (Already using Web Wake Lock API)
```bash
npm install @capacitor-community/keep-awake
```

Fallback for older devices:
```javascript
import { KeepAwake } from '@capacitor-community/keep-awake';

const keepScreenOn = async () => {
  await KeepAwake.keepAwake();
};

const allowScreenSleep = async () => {
  await KeepAwake.allowSleep();
};
```

### Optional Future Plugins

- **@capacitor/app**: App state and deep linking
- **@capacitor/push-notifications**: Push notifications for reminders
- **@capacitor/share**: Share exercise progress
- **@capacitor/app-launcher**: Open external URLs
- **@capacitor/preferences**: Native storage (instead of localStorage)

---

## Phase 6: Optimization & Best Practices

### 6.1 Performance
- Minimize bundle size: Code splitting with React.lazy()
- Optimize images: Use WebP format with fallbacks
- Enable gzip compression on Firebase Hosting
- Lazy load routes

### 6.2 Native Feel
- Use native scrolling (already have with CSS)
- Match iOS/Android design guidelines
- Add haptic feedback on interactions
- Respect device safe areas (notch support)

### 6.3 Testing Checklist
- [ ] Test on multiple iOS devices (iPhone SE, 14, 15 Pro)
- [ ] Test on multiple Android devices (Samsung, Pixel, OnePlus)
- [ ] Test offline functionality
- [ ] Test app updates (OTA updates with Capacitor)
- [ ] Test different screen orientations
- [ ] Test dark/light mode switching
- [ ] Test audio guidance
- [ ] Test all exercise levels
- [ ] Test language switching

### 6.4 Analytics
- Keep existing Google Analytics
- Add Firebase Analytics for mobile apps:
```bash
npm install @capacitor-firebase/analytics
```

---

## Phase 7: Deployment & Maintenance

### 7.1 Update Process

#### Web PWA Updates
1. Make changes to web code
2. `npm run build`
3. `npm run buildDeploy`
4. Users get updates automatically (service worker)

#### Native App Updates

**Over-the-Air (OTA) Updates** - HTML/CSS/JS changes:
1. Deploy web changes to Firebase
2. Native apps automatically fetch new web assets
3. No app store approval needed

**Native Updates** - Plugin/native code changes:
1. Update native code
2. Increment version in `capacitor.config.ts`
3. Build and submit to App Store / Play Store
4. Users update through stores

### 7.2 Version Management
```json
{
  "version": "1.0.0",
  "buildNumber": 1
}
```

Semantic versioning:
- **Major** (1.x.x): Breaking changes, major features
- **Minor** (x.1.x): New features, backward compatible
- **Patch** (x.x.1): Bug fixes

### 7.3 Monitoring
- Firebase Crashlytics (crash reporting)
- Google Analytics (user behavior)
- App Store Connect Analytics (iOS metrics)
- Google Play Console (Android metrics)

---

## Timeline Estimate

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: PWA Enhancement | 1 day | ✅ COMPLETED |
| Phase 2: Capacitor Setup | 2 hours | ⏳ NEXT |
| Phase 3: iOS Development | 1-2 days | 📋 PLANNED |
| Phase 4: Android Development | 1-2 days | 📋 PLANNED |
| Phase 5: Plugins Integration | 1 day | 📋 PLANNED |
| Phase 6: Testing & Polish | 2-3 days | 📋 PLANNED |
| Phase 7: App Store Submission | 7-14 days (review) | 📋 PLANNED |
| **Total** | **~2 weeks + review time** | |

---

## Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Apple Developer Account | $99 | Annual |
| Google Play Developer | $25 | One-time |
| Firebase Hosting | Free (current plan) | - |
| Domain (eyefitness.ca) | ~$15 | Annual |
| **Total First Year** | **$139** | |
| **Annual Renewal** | **$114** | |

---

## Support & Resources

### Documentation
- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Android Material Design**: https://m3.material.io/

### Communities
- Capacitor Discord: https://discord.com/invite/UPYYRhtyzp
- Ionic Forum: https://forum.ionicframework.com/

### Tools
- **App Icon Generator**: https://www.appicon.co/
- **Splash Screen Generator**: https://www.appicon.co/#app-icon
- **Screenshot Tools**: https://www.screely.com/

---

## Next Steps

1. **Test PWA** (Phase 1 complete)
   - Build and deploy to Firebase
   - Test on iOS and Android devices
   - Verify offline functionality

2. **Setup Capacitor** (Phase 2)
   - Install Capacitor dependencies
   - Initialize iOS and Android projects
   - Configure app identifiers

3. **Parallel Development** (Phases 3 & 4)
   - iOS: Configure Xcode, test on simulator
   - Android: Configure Android Studio, test on emulator

4. **Submit to Stores** (Phase 7)
   - Prepare all assets and metadata
   - Submit for review
   - Monitor review process

Ready to proceed with Phase 2?
