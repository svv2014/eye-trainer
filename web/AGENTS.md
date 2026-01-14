# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React app entry points (`index.jsx`, `App.jsx`), shared styles, and feature code.
- `src/components/` holds reusable UI components; `src/pages/` contains page-level views.
- `src/redux/` houses Redux state and reducers; `src/languages/` keeps localization strings.
- `src/css/`, `src/*.css` contain global and component styles; static images live in `src/*.png`.
- `res/` contains static assets copied to `public/res` during builds.

## Build, Test, and Development Commands
- `npm start`: runs the webpack dev server in development mode and opens the app.
- `npm run build`: production build via webpack; outputs to `../public` (see `.neutrinorc.js`).
- `npm run buildDeploy`: builds, then runs `firebase deploy` from the parent directory.
- `npm test`: currently exits with an error placeholder; add a test runner before relying on it.

## Coding Style & Naming Conventions
- Indentation is 4 spaces in existing `.jsx` files; keep consistent.
- Use semicolons and single quotes where possible; JSX attributes use double quotes.
- Components and files use PascalCase (e.g., `LanguageSwitch.jsx`); CSS files mirror component names.
- No formatter or linter is configured; run manual checks before submitting.

## Testing Guidelines
- No testing framework is configured yet. If adding tests, document the runner in `package.json`
  and colocate tests with components (e.g., `ComponentName.test.jsx`).

## Commit & Pull Request Guidelines
- Recent history suggests short, descriptive subjects, sometimes with Conventional Commit prefixes
  (e.g., `refactor: organize codebase for production maintenance and CI/CD`).
- Keep the first line under ~72 characters and use the imperative mood.
- Pull requests should describe changes, link issues if applicable, and include screenshots for UI updates.

## Configuration Notes
- Webpack configuration is generated via Neutrino; prefer `.neutrinorc.js` for build changes.
- `buildDeploy` requires Firebase CLI authentication and a configured Firebase project in the parent directory.
