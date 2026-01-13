# Eye Fitness Web Application

A web-based eye exercise and vision training application designed to help users improve eye health through guided exercises.

**Website:** https://eyefitness.ca

## Features

- **Multiple Exercise Difficulty Levels:** Easy, Medium, Tough, and Tough x2
- **Guided Eye Exercises:** Left-Right, Up-Down, Diagonal, and Circular movements
- **Self-Assessment Vision Test:** Built-in vision testing with standard eye chart rows
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Localization:** English and Russian language support
- **Progress Tracking:** Browser-based state persistence using localStorage
- **Pause/Resume:** Full control over exercise with spacebar or button click

## Tech Stack

- **Frontend Framework:** React 16.13.1
- **State Management:** Redux
- **Routing:** React Router DOM
- **Reactive Programming:** RxJS
- **Build Tool:** Webpack with Neutrino
- **Icons:** FontAwesome
- **i18n:** react-localization
- **Cookies:** react-cookie

## Project Structure

```
web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Eyes.jsx         # Eye animation visualization
│   │   ├── PauseButton.jsx  # Play/pause control
│   │   └── LanguageSwitch.jsx
│   ├── pages/               # Page components
│   │   ├── Exercise.jsx     # Main exercise page
│   │   ├── SelfTest.jsx     # Vision self-test
│   │   ├── Support.jsx      # Support information
│   │   └── AppPolicy.jsx    # Privacy policy
│   ├── redux/               # State management
│   │   ├── store.jsx        # Redux store configuration
│   │   ├── actions.js       # Action creators
│   │   └── reducers.jsx     # Redux reducers
│   ├── tools/               # Utility functions
│   │   ├── ExerciseUtils.jsx  # Exercise definitions
│   │   ├── EyeActions.jsx     # Eye movement constants
│   │   ├── localStorage.jsx   # State persistence helpers
│   │   └── rxTools.jsx        # RxJS utilities
│   ├── languages/           # i18n configuration
│   │   └── localizationStrings.jsx
│   ├── css/                 # Global styles
│   ├── App.jsx              # Landing page
│   ├── LandingPage.jsx      # Router wrapper
│   └── index.jsx            # Entry point
├── res/                     # Static resources
├── webpack.config.js        # Webpack configuration
├── package.json             # Dependencies
└── package-lock.json        # Locked dependency versions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Firebase CLI (for deployment)

### Local Development

```bash
# Install dependencies
cd web
npm install

# Start development server
npm start

# Access application at http://localhost:5000/
```

### Building for Production

```bash
cd web
npm run build

# Output: web/dist/
```

## Firebase Deployment

### Setup

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase project:**
   ```bash
   firebase init hosting
   ```

3. **Configure Firebase:**
   - Set public directory to `dist`
   - Don't rewrite URLs for single-page app (we'll use Router)

4. **Create `.firebaserc` file** (if not already present):
   ```json
   {
     "projects": {
       "default": "your-firebase-project-id"
     }
   }
   ```

### Local Deployment Test

```bash
# Build and serve locally
npm run build
firebase serve --only hosting
```

### Automated Deployment (GitHub Actions)

This project includes GitHub Actions workflow for automated deployment.

**Setup GitHub Secrets:**
1. Go to repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `FIREBASE_TOKEN`: Your Firebase CI token
     ```bash
     firebase login:ci
     ```
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID

**Deployment Triggers:**
- Automatic deployment on push to `main` branch
- Build validation on pull requests to `main` branch

## Environment Variables

No environment variables are required for development. For Firebase deployment, use GitHub secrets (see above).

## Available Scripts

```bash
# Development server
npm start

# Production build
npm run build

# Deploy to Firebase (requires Firebase setup)
npm run buildDeploy
```

## Code Quality

The project follows React and JavaScript best practices. Areas for future improvement:

- Add ESLint and Prettier for code formatting
- Implement unit tests
- Set up CI/CD pipeline (✅ In progress with GitHub Actions)
- Improve accessibility (ARIA labels, semantic HTML)
- Refactor state management patterns

## Localization

The application supports English and Russian languages. To add a new language:

1. Add language entry to `languages` array in `src/languages/localizationStrings.jsx`
2. Add translation object with all required keys
3. Ensure all English translation keys are present in the new language

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC

## Support

For support, please contact: dev.samsklepal@gmail.com

## Contributing

1. Create a feature branch from `main`
2. Commit changes with clear messages
3. Push to your branch
4. Create a pull request
5. GitHub Actions will validate your build
6. Merge to deploy to production

## Troubleshooting

### Build fails with npm error
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Firebase deployment fails
```bash
# Verify Firebase is initialized
firebase projects:list

# Check Firebase configuration
cat .firebaserc

# Re-authenticate if needed
firebase logout
firebase login
```

### Port 5000 already in use
```bash
# Use alternative port
npm start -- --port 3000
```

## Related Resources

- [React Documentation](https://react.dev)
- [Redux Documentation](https://redux.js.org)
- [RxJS Documentation](https://rxjs.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Webpack Documentation](https://webpack.js.org)
