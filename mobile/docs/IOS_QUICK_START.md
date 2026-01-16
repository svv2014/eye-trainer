# iOS App Quick Start Guide

## Prerequisites

- macOS with Xcode 15+
- Apple Developer Account
- Node.js 16+
- Capacitor installed

## Quick Setup

### 1. Install Capacitor iOS
```bash
cd /home/user/eye-trainer
npm install @capacitor/ios
npx cap add ios
```

### 2. Build Web App
```bash
cd web
npm run build
```

### 3. Sync to iOS
```bash
cd ..
npx cap sync ios
```

### 4. Open in Xcode
```bash
npx cap open ios
```

## Xcode Configuration

### Bundle Identifier
- Open Xcode project
- Select "App" target
- General tab → Identity
- Bundle Identifier: `ca.eyefitness.app`

### Signing
- Signing & Capabilities tab
- Team: Select your Apple Developer Team
- Automatically manage signing: ✅

### App Icons
1. Navigate to: `App/App/Assets.xcassets/AppIcon.appiconset`
2. Drag icons for each size from `web/src/` folder
3. Required sizes:
   - 20x20 @2x, @3x
   - 29x29 @2x, @3x
   - 40x40 @2x, @3x
   - 60x60 @2x, @3x
   - 1024x1024 (App Store)

### Display Name
- Info.plist → Add key:
  - `CFBundleDisplayName`: `Eye Fitness`

### Supported Orientations
- Info.plist → Supported interface orientations:
  - Portrait
  - Landscape Left
  - Landscape Right

### Status Bar
- Info.plist → Add:
  - `UIStatusBarStyle`: `UIStatusBarStyleLightContent`
  - `UIViewControllerBasedStatusBarAppearance`: `YES`

## Testing

### Simulator
```bash
# List simulators
xcrun simctl list devices

# Run on specific simulator
npx cap run ios --target="iPhone 15 Pro"
```

### Physical Device
1. Connect iPhone via USB
2. Xcode → Product → Destination → Your iPhone
3. Product → Run (Cmd+R)
4. Trust developer certificate on device:
   - Settings → General → VPN & Device Management

## Build for App Store

### 1. Increment Version
- Xcode → General → Identity
- Version: `1.0.0` (user-facing)
- Build: `1` (increment for each submission)

### 2. Create Archive
1. Xcode → Product → Destination → Any iOS Device
2. Product → Archive
3. Wait for archiving to complete
4. Archives window opens automatically

### 3. Upload to App Store Connect
1. Archives window → Select latest archive
2. Click "Distribute App"
3. App Store Connect → Next
4. Upload → Next
5. Automatic signing → Next
6. Upload
7. Wait for processing (15-30 minutes)

### 4. Submit for Review
1. Login to App Store Connect: https://appstoreconnect.apple.com
2. My Apps → Eye Fitness
3. iOS App → + Version
4. Fill in metadata (see NATIVE_APP_PLAN.md)
5. Upload screenshots
6. Submit for Review

## Common Issues

### Signing Error
```
Error: Signing for "App" requires a development team
```
**Solution**: Select your team in Signing & Capabilities

### Module Not Found
```
Error: Module 'Capacitor' not found
```
**Solution**:
```bash
npx cap sync ios
```

### Web Assets Not Updated
```bash
cd web && npm run build && cd .. && npx cap sync ios
```

### Clear Build Cache
Xcode → Product → Clean Build Folder (Shift+Cmd+K)

## Development Workflow

### Making Changes

#### Web-only changes (HTML/CSS/JS):
```bash
cd web
npm run build
cd ..
npx cap copy ios  # Faster than sync
```

#### Native changes (plugins, config):
```bash
npx cap sync ios
npx cap open ios
# Make changes in Xcode
# Run from Xcode
```

### Live Reload (Development)
```bash
# Terminal 1: Start web dev server
cd web
npm start

# Terminal 2: Update capacitor.config.ts
# Add: server: { url: 'http://localhost:3000' }

# Run app in Xcode
# App will load from local dev server with hot reload
```

**Remember to remove server config before production build!**

## App Store Assets Checklist

- [ ] App Icon (1024x1024 PNG)
- [ ] Screenshots:
  - [ ] 6.7" display (iPhone 15 Pro Max)
  - [ ] 6.5" display (iPhone 14 Plus)
  - [ ] 5.5" display (iPhone 8 Plus)
- [ ] App Preview video (optional)
- [ ] Privacy Policy URL
- [ ] Support URL
- [ ] Marketing URL
- [ ] App Description
- [ ] Keywords
- [ ] What's New (release notes)

## Testing Checklist

- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPhone 15 Pro (standard)
- [ ] Test on iPhone 15 Pro Max (large screen)
- [ ] Test on iPad
- [ ] Portrait and landscape orientations
- [ ] Dark mode
- [ ] Light mode
- [ ] Offline functionality
- [ ] Audio guidance
- [ ] All exercise levels
- [ ] Language switching
- [ ] Theme switching

## Resources

- **Apple Developer**: https://developer.apple.com
- **App Store Connect**: https://appstoreconnect.apple.com
- **Capacitor iOS Docs**: https://capacitorjs.com/docs/ios
- **HIG**: https://developer.apple.com/design/human-interface-guidelines/
