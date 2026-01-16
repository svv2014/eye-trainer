# Android App Quick Start Guide

## Prerequisites

- Android Studio (latest version)
- Google Play Developer Account ($25 one-time)
- Node.js 16+
- Capacitor installed
- JDK 11+

## Quick Setup

### 1. Install Capacitor Android
```bash
cd /home/user/eye-trainer
npm install @capacitor/android
npx cap add android
```

### 2. Build Web App
```bash
cd web
npm run build
```

### 3. Sync to Android
```bash
cd ..
npx cap sync android
```

### 4. Open in Android Studio
```bash
npx cap open android
```

## Android Studio Configuration

### Application ID
- File → Project Structure → Modules
- Default Config → Application ID: `ca.eyefitness.app`
- Or edit: `mobile/android/app/build.gradle`

```gradle
defaultConfig {
    applicationId "ca.eyefitness.app"
    minSdkVersion 22
    targetSdkVersion 34
    versionCode 1
    versionName "1.0.0"
}
```

### App Name
Edit `mobile/android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">Eye Fitness</string>
    <string name="title_activity_main">Eye Fitness</string>
</resources>
```

### App Icons

#### Using Image Asset Studio:
1. Right-click `app/src/main/res`
2. New → Image Asset
3. Icon Type: Launcher Icons (Adaptive and Legacy)
4. Path: Select `web/src/android-chrome-512x512.png`
5. Background Layer: Color `#1a1a2e`
6. Next → Finish

#### Manual (if needed):
Copy icons to:
- `mipmap-mdpi/` (48x48)
- `mipmap-hdpi/` (72x72)
- `mipmap-xhdpi/` (96x96)
- `mipmap-xxhdpi/` (144x144)
- `mipmap-xxxhdpi/` (192x192)

### Splash Screen
Edit `mobile/android/app/src/main/res/values/colors.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#67C5D5</color>
    <color name="colorPrimaryDark">#1a1a2e</color>
    <color name="colorAccent">#67C5D5</color>
    <color name="splash_background">#1a1a2e</color>
</resources>
```

Edit `mobile/android/app/src/main/res/values/styles.xml`:
```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@color/splash_background</item>
</style>
```

### Permissions
Edit `mobile/android/app/src/main/AndroidManifest.xml`:
```xml
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">
        ...
    </application>
</manifest>
```

## Testing

### Emulator
1. Android Studio → Tools → Device Manager
2. Create Device → Select device (e.g., Pixel 7)
3. Download system image (API 34)
4. Finish
5. Run app: Run → Run 'app' (Shift+F10)

Or via command line:
```bash
npx cap run android
```

### Physical Device
1. Enable Developer Options:
   - Settings → About Phone → Tap "Build Number" 7 times
2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging → ON
3. Connect device via USB
4. Accept USB debugging prompt on device
5. Run from Android Studio

### Verify Device Connection
```bash
adb devices
```

## Build for Play Store

### 1. Generate Signing Key

#### Create Keystore
```bash
cd mobile/android/app

keytool -genkey -v \
  -keystore eye-fitness.keystore \
  -alias eye-fitness \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# You'll be prompted for:
# - Keystore password (SAVE THIS!)
# - Your name, organization, city, country
# - Key password (can be same as keystore password)
```

**IMPORTANT**: Save the keystore file and passwords securely! You'll need them for all future updates.

#### Configure Signing
Create `mobile/android/key.properties`:
```properties
storeFile=eye-fitness.keystore
storePassword=YOUR_KEYSTORE_PASSWORD
keyAlias=eye-fitness
keyPassword=YOUR_KEY_PASSWORD
```

Edit `mobile/android/app/build.gradle`:
```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 2. Build Release AAB
```bash
cd mobile/android
./gradlew bundleRelease

# Output: app/build/outputs/bundle/release/app-release.aab
```

### 3. Test Release Build
```bash
./gradlew installRelease

# Or build APK for testing
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

### 4. Submit to Play Store

#### Create Play Console Account
1. Visit: https://play.google.com/console
2. Pay $25 one-time registration fee
3. Accept agreements

#### Create App
1. All apps → Create app
2. App name: `Eye Fitness`
3. Default language: English (US)
4. App type: App
5. Free or paid: Free
6. Declarations: Accept
7. Create app

#### Set Up Store Listing
**Main store listing**:
- App name: `Eye Fitness - Eye Training`
- Short description (80 chars):
  ```
  Free eye exercises to reduce strain and improve vision health
  ```
- Full description (4000 chars): See NATIVE_APP_PLAN.md
- App icon: 512x512 PNG
- Feature graphic: 1024x500 PNG
- Screenshots:
  - Phone: 2-8 screenshots
  - 7" tablet: 1-8 screenshots (optional)
  - 10" tablet: 1-8 screenshots (optional)

**Categorization**:
- App category: Health & Fitness
- Tags: Eye care, Vision training, Eye exercises

**Contact details**:
- Email: support@eyefitness.ca
- Website: https://eyefitness.ca
- Phone: (optional)

**Privacy policy**:
- URL: https://eyefitness.ca/policy

#### Content Rating
1. Start questionnaire
2. Select app category: Health & Fitness
3. Answer questions honestly
4. Get rating (likely: Everyone)

#### App Content
1. Privacy policy: Already added
2. App access: All features available to all users
3. Ads: No ads
4. Content ratings: Complete questionnaire
5. Target audience: Adults
6. News app: No

#### Select Countries
- Select all countries or specific regions

#### Production Release
1. Create release
2. Upload `app-release.aab`
3. Release name: `1.0.0`
4. Release notes:
   ```
   Initial release of Eye Fitness!

   Features:
   - Guided eye exercises for all skill levels
   - Audio guidance
   - Dark/light themes
   - Offline support
   - Multiple languages (EN, ES, FR, DE, RU, UK)
   ```
5. Review and roll out

#### Submit for Review
- Review summary
- Send for review
- Approval time: Usually 1-3 days

## Common Issues

### Build Failed: SDK not found
```
Error: SDK location not found
```
**Solution**: Create `mobile/android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### Gradle Sync Failed
```bash
cd mobile/android
./gradlew clean
./gradlew build
```

### Web Assets Not Updated
```bash
cd web && npm run build && cd .. && npx cap sync android
```

### Clear Cache
Android Studio → File → Invalidate Caches → Invalidate and Restart

## Development Workflow

### Making Changes

#### Web-only changes (HTML/CSS/JS):
```bash
cd web
npm run build
cd ..
npx cap copy android  # Faster than sync
```

#### Native changes (plugins, config):
```bash
npx cap sync android
npx cap open android
# Make changes in Android Studio
# Run from Android Studio
```

### Live Reload (Development)
```bash
# Terminal 1: Start web dev server
cd web
npm start

# Terminal 2: Update capacitor.config.ts
# Add: server: { url: 'http://YOUR_IP:3000', cleartext: true }
# Find IP: ifconfig | grep "inet " | grep -v 127.0.0.1

# Run app in Android Studio or device
# App will load from local dev server with hot reload
```

**Remember to remove server config before production build!**

## Play Store Assets Checklist

- [ ] App icon (512x512 PNG)
- [ ] Feature graphic (1024x500 PNG)
- [ ] Screenshots (phone):
  - [ ] 2-8 screenshots
  - [ ] Recommended: 16:9 or 9:16 aspect ratio
- [ ] Screenshots (tablet) - optional
- [ ] App video - optional
- [ ] Privacy Policy URL
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] Category: Health & Fitness
- [ ] Content rating
- [ ] Contact email

## Testing Checklist

- [ ] Test on emulator (Pixel 7, API 34)
- [ ] Test on physical device
- [ ] Test on Samsung device
- [ ] Test on different screen sizes
- [ ] Portrait and landscape orientations
- [ ] Dark mode
- [ ] Light mode
- [ ] Offline functionality
- [ ] Audio guidance
- [ ] All exercise levels
- [ ] Language switching
- [ ] Theme switching
- [ ] Back button behavior
- [ ] App pause/resume

## ADB Useful Commands

```bash
# List devices
adb devices

# Install APK
adb install app-release.apk

# Uninstall app
adb uninstall ca.eyefitness.app

# View logs
adb logcat | grep Capacitor

# Clear app data
adb shell pm clear ca.eyefitness.app

# Screenshot
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png

# Record screen
adb shell screenrecord /sdcard/demo.mp4
# Ctrl+C to stop
adb pull /sdcard/demo.mp4
```

## Resources

- **Play Console**: https://play.google.com/console
- **Android Developer**: https://developer.android.com
- **Capacitor Android Docs**: https://capacitorjs.com/docs/android
- **Material Design**: https://m3.material.io/
- **Android Studio Download**: https://developer.android.com/studio
