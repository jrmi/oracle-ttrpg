# Repository Guidelines

This repository is a static browser-side Preact app for TTRPG oracle prompts and GM-less play tools. There is no build step: `public/index.html` loads CDN dependencies and `public/src/index.js` mounts the app directly in the browser.

## Project Structure & Module Organization
- `public/index.html` bootstraps the app and loads CDN dependencies (Preact, HTM, i18next).
- `public/src/index.js` defines the tabs/buttons and renders the UI.
- `public/src/oracle.js` holds generator tables and output templates.
- `public/src/story.js` resolves recursive `{{tokens}}` used by generator templates.
- `public/src/i18n.js` loads translations.
- `public/styles.css` holds all UI styling.
- `public/locales/` contains translations.
- `archive/` is historical material; avoid new changes unless explicitly needed.

## Core Rules
- Keep the app browser-only. Do not add tooling assumptions, Node-only APIs, or build-time imports.
- Generated results are markdown strings, so keep template output markdown-safe.
- `oracle(type)` builds a `data` object where each key maps to an array of weighted `{ label, weight }` entries. Omit `weight` only when equal weighting is intended.
- Template labels can reference other tables with `{{key}}`; `story.js` resolves them recursively.
- Keep thematic text in translation files, not hardcoded JavaScript, when possible.
- When adding a new oracle action, update `public/src/index.js`, `public/src/oracle.js`, and the locale files together.

## Build, Test, and Development Commands
- `npm run dev` serves `public/` locally at `http://localhost:8080`.
- `npm run deploy` deploys `public/` to Netlify production.
- `npm run deploy:preview` creates a Netlify preview deploy.

## Coding Style & Naming Conventions
- JavaScript uses 2-space indentation, single quotes, and semicolons.
- Keep module files under `public/src/` and use relative imports.
- Translation keys live in `public/locales/*/translation.json`; keep key names stable.

## Testing Guidelines
- No automated tests are present. Validate changes manually in the browser.
- When editing generators, verify the main button flows still work and output renders correctly.
- Test both English and French when changing translation keys.

## Commit & Pull Request Guidelines
- Commit history uses short, sentence-style messages (e.g., “Update january 2026”). Keep messages concise and descriptive.
- PRs should include a brief summary and manual test notes. Provide screenshots or short clips for UI changes.

## Localization Notes
- Add new keys to `locales/en/translation.json` first, then update other locales.
- Keep equivalent meaning across locales, not just literal wording.
