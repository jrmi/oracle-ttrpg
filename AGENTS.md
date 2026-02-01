# Repository Guidelines

## Project Structure & Module Organization
- `public/index.html` bootstraps the app and loads CDN dependencies (Preact, HTM, i18next).
- `public/src/index.js` is the main UI entry point and renders the Preact app.
- `public/src/oracle.js`, `public/src/story.js`, and `public/src/utils.js` contain core logic, generators, and shared hooks/utilities.
- `public/styles.css` holds all UI styling.
- `public/locales/` contains translations (e.g., `public/locales/en/translation.json`, `public/locales/fr/translation.json`).
- `public/icons/` and `public/manifest.json` support PWA assets.
- `archive/` is historical material; avoid new changes unless explicitly needed.

## Build, Test, and Development Commands
This repo is a static site with no build step.
- Serve locally with a static server so module imports work:
  - `npm run dev` (then open `http://localhost:8080`).
- For quick previews, you can also open `index.html` directly, but module imports may be blocked by the browser.
- Deploy with Netlify CLI:
  - `npm run deploy` (production deploy from `public/`).
  - `npm run deploy:preview` (draft deploy from `public/`).

## Coding Style & Naming Conventions
- JavaScript uses 2-space indentation, single quotes, and semicolons.
- Keep module files under `public/src/` and use relative imports.
- Translation keys live in `public/locales/*/translation.json`; keep key names stable.

## Testing Guidelines
- No automated tests are present. Validate changes manually in the browser.
- When editing generators, verify multiple button flows (Oracle, Inspiration, Generate) to ensure output formatting stays intact.

## Commit & Pull Request Guidelines
- Commit history uses short, sentence-style messages (e.g., “Update january 2026”). Keep messages concise and descriptive.
- PRs should include a brief summary and manual test notes. Provide screenshots or short clips for UI changes.

## Localization Notes
- Add new keys to `locales/en/translation.json` first, then update other locales.
- For non-JSON locale data (e.g., `locales/fr/words.js`), keep exports consistent with existing structures.
