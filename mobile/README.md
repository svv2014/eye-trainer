# Eye Fitness Mobile Apps

This directory contains documentation and configuration for Eye Fitness mobile applications (iOS, Android, and PWA).

## 📱 Current Status

| Platform | Status | Installation |
|----------|--------|--------------|
| **PWA (iOS)** | ✅ Ready | [Install Guide](docs/PWA_INSTALLATION.md) |
| **PWA (Android)** | ✅ Ready | [Install Guide](docs/PWA_INSTALLATION.md) |
| **iOS Native** | 📋 Planned | [Quick Start](docs/IOS_QUICK_START.md) |
| **Android Native** | 📋 Planned | [Quick Start](docs/ANDROID_QUICK_START.md) |

## 🚀 Quick Start

### Testing PWA (Recommended First Step)

1. **Build the web app**:
   ```bash
   cd /home/user/eye-trainer/web
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

3. **Test on devices**:
   - **iOS**: Safari → https://eyefitness.ca → Share → Add to Home Screen
   - **Android**: Chrome → https://eyefitness.ca → Install app prompt

4. **Verify PWA features**:
   - Fullscreen launch (no browser UI)
   - Splash screen appears
   - Works offline after first load
   - Fast loading from cache

### Building Native Apps (Next Step)

See [NATIVE_APP_PLAN.md](docs/NATIVE_APP_PLAN.md) for complete guide.

**Quick setup**:
```bash
# Install Capacitor
cd /home/user/eye-trainer
npm install @capacitor/core @capacitor/cli

# Add platforms
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android

# Build and sync
cd web && npm run build && cd ..
npx cap sync

# Open in IDEs
npx cap open ios      # Xcode
npx cap open android  # Android Studio
```

## 📚 Documentation

### Guides
- **[Native App Plan](docs/NATIVE_APP_PLAN.md)** - Complete roadmap for iOS & Android native apps
- **[PWA Installation](docs/PWA_INSTALLATION.md)** - How users install the PWA
- **[iOS Quick Start](docs/IOS_QUICK_START.md)** - Fast iOS development guide
- **[Android Quick Start](docs/ANDROID_QUICK_START.md)** - Fast Android development guide

### What to Read First

1. **Just want to try it as an app?**
   → Start with [PWA Installation Guide](docs/PWA_INSTALLATION.md)

2. **Building iOS app?**
   → Read [iOS Quick Start](docs/IOS_QUICK_START.md) then [Native App Plan](docs/NATIVE_APP_PLAN.md)

3. **Building Android app?**
   → Read [Android Quick Start](docs/ANDROID_QUICK_START.md) then [Native App Plan](docs/NATIVE_APP_PLAN.md)

4. **Want full picture?**
   → Start with [Native App Plan](docs/NATIVE_APP_PLAN.md)

## 🎯 Project Structure

```
mobile/
├── README.md                    # This file
├── docs/
│   ├── NATIVE_APP_PLAN.md      # Master plan for all platforms
│   ├── PWA_INSTALLATION.md      # User-facing PWA guide
│   ├── IOS_QUICK_START.md       # iOS developer guide
│   └── ANDROID_QUICK_START.md   # Android developer guide
├── ios/                         # iOS native project (after setup)
│   └── App/                     # Xcode project
└── android/                     # Android native project (after setup)
    └── app/                     # Android Studio project
```

## ✨ What's Been Done (Phase 1: PWA)

- [x] Service Worker for offline support
- [x] Enhanced manifest.json for iOS and Android
- [x] iOS-specific meta tags and splash screen references
- [x] Android PWA meta tags
- [x] Service Worker registration in app
- [x] Webpack configuration updated
- [x] Splash screen generator script created
- [x] Complete documentation

## 🔜 What's Next (Phase 2+)

1. **Test PWA** (This week)
   - Deploy to Firebase
   - Test on iOS devices
   - Test on Android devices
   - Verify offline functionality

2. **Setup Capacitor** (Next week)
   - Install Capacitor dependencies
   - Initialize iOS and Android projects
   - Configure app identifiers

3. **iOS Development** (Week 2-3)
   - Configure Xcode project
   - Test on simulator and devices
   - Prepare for App Store

4. **Android Development** (Week 2-3)
   - Configure Android Studio project
   - Test on emulator and devices
   - Prepare for Play Store

5. **App Store Submission** (Week 3-4)
   - Create app store listings
   - Upload builds
   - Submit for review

## 🛠 Useful Commands

### PWA Development
```bash
# Build web app
cd web && npm run build

# Generate splash screens (requires sharp)
npm install sharp --save-dev
node web/src/tools/generateSplashScreens.js

# Deploy
firebase deploy
```

### Capacitor Development
```bash
# Sync web assets to native projects
npx cap sync

# Copy only (faster, no plugin updates)
npx cap copy

# Open in IDEs
npx cap open ios
npx cap open android

# Run on device/simulator
npx cap run ios
npx cap run android

# Update Capacitor
npm update @capacitor/core @capacitor/cli
npx cap sync
```

### Building for Production
```bash
# iOS (via Xcode)
# Xcode → Product → Archive → Distribute

# Android
cd mobile/android
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

## 📊 Comparison: PWA vs Native

| Feature | PWA | Native (Capacitor) |
|---------|-----|-------------------|
| Development Time | ✅ Minimal (already done) | ⏱ 1-2 weeks |
| App Store Presence | ❌ No | ✅ Yes |
| Installation | Browser only | App Store + Play Store |
| Size | 2-5 MB | 10-20 MB |
| Updates | Instant, automatic | Store review required |
| Offline Support | ✅ Yes | ✅ Yes |
| Native APIs | Limited | Full access |
| Push Notifications | ❌ iOS, ✅ Android | ✅ Both |
| Performance | 90-95% native | 95-98% native |
| Cost | Free | $99/year (iOS) + $25 (Android) |

## 🎓 Learning Resources

### PWA
- [web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Service Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Capacitor
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)
- [Ionic Forum](https://forum.ionicframework.com/)

### iOS
- [Apple Developer](https://developer.apple.com)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Connect](https://appstoreconnect.apple.com)

### Android
- [Android Developers](https://developer.android.com)
- [Material Design](https://m3.material.io/)
- [Play Console](https://play.google.com/console)

## 💰 Cost Breakdown

| Item | Cost | Frequency | Notes |
|------|------|-----------|-------|
| Apple Developer | $99 | Annual | Required for App Store |
| Google Play Console | $25 | One-time | Required for Play Store |
| Domain (eyefitness.ca) | ~$15 | Annual | Already owned |
| Firebase Hosting | Free | - | Current plan sufficient |
| **Total First Year** | **$139** | | |
| **Annual Renewal** | **$114** | | iOS only |

## 🧪 Testing Checklist

### PWA Testing
- [ ] Build completes successfully
- [ ] Service Worker registers
- [ ] Manifest.json loads correctly
- [ ] iOS: Add to Home Screen works
- [ ] iOS: Launches fullscreen
- [ ] iOS: Splash screen appears
- [ ] Android: Install prompt appears
- [ ] Android: Launches as standalone app
- [ ] Offline mode works
- [ ] Updates work correctly
- [ ] Theme persists after reload
- [ ] Audio guidance works
- [ ] All exercises work

### Native App Testing (When Ready)
- [ ] iOS simulator testing
- [ ] iOS device testing
- [ ] Android emulator testing
- [ ] Android device testing
- [ ] Different screen sizes
- [ ] Portrait and landscape
- [ ] Dark and light modes
- [ ] All native features work
- [ ] No crashes
- [ ] Performance is good

## 🐛 Troubleshooting

### PWA Issues

**Service Worker not registering:**
```bash
# Check browser console for errors
# Ensure HTTPS (localhost is ok for dev)
# Clear cache and reload
```

**PWA not installable:**
- Verify manifest.json is valid
- Check Service Worker is active
- Ensure HTTPS is enabled
- Test in incognito mode

**Offline mode not working:**
- Load app at least once while online
- Check Service Worker cache
- Verify network requests in DevTools

### Native App Issues

**iOS build fails:**
```bash
npx cap sync ios
# Clean build in Xcode (Shift+Cmd+K)
```

**Android build fails:**
```bash
cd mobile/android
./gradlew clean
./gradlew build
```

## 📞 Support

- **Issues**: https://github.com/svv2014/eye-trainer/issues
- **Email**: support@eyefitness.ca
- **Website**: https://eyefitness.ca

## 🎉 Ready to Start?

1. **Test PWA first** - It's ready now!
   ```bash
   cd web && npm run build && firebase deploy
   ```

2. **Then build native apps** - When you're ready for App Store/Play Store
   ```bash
   npm install @capacitor/cli @capacitor/core
   npx cap init
   ```

See [NATIVE_APP_PLAN.md](docs/NATIVE_APP_PLAN.md) for complete roadmap!
