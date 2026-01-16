# PWA Installation Guide

## What is a PWA?

A Progressive Web App (PWA) is a web application that can be installed on your device and works like a native app. Eye Fitness PWA provides:

- **Offline support**: Works without internet after first load
- **Fullscreen experience**: No browser UI, looks like a native app
- **Home screen icon**: Install and launch from your home screen
- **Fast loading**: Cached assets load instantly
- **App-like feel**: Smooth animations and native interactions

## iOS Installation (iPhone/iPad)

### Requirements
- iOS 11.3 or later
- Safari browser

### Steps

1. **Open Safari**
   - Open Safari on your iPhone/iPad
   - Navigate to: https://eyefitness.ca

2. **Add to Home Screen**
   - Tap the Share button (square with arrow pointing up)
   - Scroll down and tap "Add to Home Screen"

3. **Customize (Optional)**
   - Edit the name if desired (default: "Eye Fitness")
   - Tap "Add" in the top right

4. **Launch the App**
   - Find the Eye Fitness icon on your home screen
   - Tap to launch
   - App opens in fullscreen mode (no Safari UI)

### iOS Features
- ✅ Fullscreen mode
- ✅ Custom splash screen on launch
- ✅ Home screen icon
- ✅ Offline support
- ✅ Works like a native app

### iOS Limitations
- Cannot auto-prompt installation (user must manually add)
- Updates require closing and reopening the app
- No push notifications (yet)
- Limited background functionality

## Android Installation

### Requirements
- Android 5.0 (Lollipop) or later
- Chrome, Firefox, Edge, or Samsung Internet

### Steps (Chrome)

1. **Open Chrome**
   - Open Chrome on your Android device
   - Navigate to: https://eyefitness.ca

2. **Install App Prompt**
   - You may see an automatic "Install app" banner at the bottom
   - Tap "Install" or "Add to Home Screen"

3. **Manual Installation** (if no prompt):
   - Tap the menu (three dots in top right)
   - Tap "Install app" or "Add to Home Screen"

4. **Launch the App**
   - Find Eye Fitness in your app drawer
   - Or tap the home screen icon
   - App opens in fullscreen mode

### Android Features
- ✅ Automatic install prompt
- ✅ Appears in app drawer
- ✅ Fullscreen mode
- ✅ Custom splash screen
- ✅ Offline support
- ✅ Back button support
- ✅ Multitasking view

### Android Browsers

#### Chrome (Recommended)
- Best PWA support
- Automatic install prompts
- Full feature support

#### Firefox
- Open menu → "Install"
- Good PWA support

#### Samsung Internet
- Menu → "Add page to" → "Home screen"
- Excellent PWA support on Samsung devices

#### Edge
- Similar to Chrome
- Good PWA support

## Desktop Installation

### Windows/Linux (Chrome/Edge)

1. Navigate to https://eyefitness.ca in Chrome or Edge
2. Look for install icon in address bar (⊕ or computer icon)
3. Click icon → "Install"
4. App appears in Start Menu / Applications

### macOS (Chrome/Edge)

1. Navigate to https://eyefitness.ca in Chrome or Edge
2. Look for install icon in address bar
3. Click icon → "Install"
4. App appears in Applications folder

### Benefits of Desktop PWA
- Dedicated window (no browser tabs)
- Appears in taskbar/dock
- Keyboard shortcuts
- Faster access

## Verifying Installation

### Check if Properly Installed

**iOS**:
- App launches fullscreen (no Safari UI)
- Status bar shows time at top
- No browser address bar

**Android**:
- App appears in app drawer
- No browser UI when launched
- Shows in recent apps with app icon

**Desktop**:
- Launches in dedicated window
- No browser tabs or address bar
- App icon in taskbar/dock

## Using the PWA

### Offline Mode
After first load, the app works offline:
1. Load any page while online
2. Service Worker caches assets
3. Disconnect from internet
4. App continues to work!

### Updating the App

**iOS**:
- Close the app completely (swipe up from app switcher)
- Reopen the app
- New version loads automatically

**Android**:
- Updates happen automatically in background
- Or close and reopen app
- Check About page for version number

**Desktop**:
- Close and reopen app
- Or wait for automatic update

### Uninstalling

**iOS**:
- Long press the app icon
- Tap "Remove App" → "Delete App"
- Or drag to Trash

**Android**:
- Long press app icon
- Drag to "Uninstall" at top
- Or Settings → Apps → Eye Fitness → Uninstall

**Desktop**:
- Chrome: chrome://apps → Right-click → Remove
- Edge: edge://apps → Right-click → Remove

## Troubleshooting

### iOS: Can't find "Add to Home Screen"
- Make sure you're using Safari (not Chrome or other browsers)
- Update to latest iOS version
- Tap Share button, scroll down in the menu

### Android: No "Install" option
- Make sure you're using a supported browser (Chrome recommended)
- Try opening in incognito/private mode, then regular mode
- Clear browser cache and revisit

### App not working offline
- Load the app at least once while online
- Check if Service Worker is registered (open browser console)
- Try closing and reopening the app

### Updates not appearing
- Close the app completely
- Clear browser cache
- Reopen the app
- Or reinstall the PWA

### App looks like website (browser UI visible)
- You might have bookmarked instead of installed
- Follow installation steps above
- Look for "Add to Home Screen" not "Add Bookmark"

## Testing PWA Features

### Offline Test
1. Open the app
2. Navigate to different pages
3. Enable Airplane Mode
4. Try using the app
5. Should still work! 🎉

### Cache Test
1. Open app
2. Close app completely
3. Reopen app
4. Should load instantly (cached)

## PWA vs Native App

| Feature | PWA | Native App |
|---------|-----|------------|
| Installation | Browser, no store | App Store/Play Store |
| Size | ~2-5 MB | ~10-50 MB |
| Updates | Automatic, instant | Store approval required |
| Offline | ✅ Yes | ✅ Yes |
| Home Screen | ✅ Yes | ✅ Yes |
| Fullscreen | ✅ Yes | ✅ Yes |
| Push Notifications | ❌ Not yet (iOS) | ✅ Yes |
| Background Sync | Limited | Full |
| Performance | Very Good | Excellent |
| Device APIs | Limited | Full |

## Advantages of PWA

1. **No App Store Required**
   - Install directly from website
   - No approval process
   - Immediate updates

2. **Smaller Size**
   - Typical PWA: 2-5 MB
   - Typical native app: 20-100 MB
   - Saves device storage

3. **Always Up-to-Date**
   - Updates push automatically
   - No "Update App" prompts
   - New features arrive instantly

4. **Cross-Platform**
   - One codebase works everywhere
   - iOS, Android, Desktop
   - Consistent experience

5. **Privacy-Friendly**
   - No app store tracking
   - No extensive permissions
   - Runs in secure browser context

## Future Enhancements

Coming soon to Eye Fitness PWA:
- [ ] Push notifications for exercise reminders (Android first)
- [ ] Background sync for progress tracking
- [ ] Share exercise results
- [ ] Web Share API integration
- [ ] Offline analytics queueing

## Support

Need help with PWA installation?

- **Website**: https://eyefitness.ca/support
- **Email**: support@eyefitness.ca
- **Documentation**: See this guide

## Testing the PWA Now

Ready to test? Here's what to do:

1. **Deploy PWA**:
   ```bash
   cd /home/user/eye-trainer/web
   npm run build
   firebase deploy
   ```

2. **Test on iOS**:
   - Open Safari on iPhone
   - Go to https://eyefitness.ca
   - Add to Home Screen
   - Test offline mode

3. **Test on Android**:
   - Open Chrome on Android
   - Go to https://eyefitness.ca
   - Install when prompted
   - Test offline mode

4. **Verify Features**:
   - Fullscreen launch
   - Splash screen appears
   - Offline functionality
   - Fast loading from cache
   - Theme persistence

Enjoy your new PWA! 🎉
