---
name: add-oracle
description: Use when asked to create or update an oracle in this repository,
---

# Add Oracle

Use this skill when the task is to add a new oracle to the app.

## Inputs to collect

Before editing, make sure these points are known:

- Oracle name.
- Target tab where the oracle should appear.
- Button label in English and French.
- Output format or generation rules.
- Whether the oracle needs new word pools in `public/locales/en/words.js` and `public/locales/fr/words.js`.

If the tab is not specified, inspect `public/src/index.js` and either:

- add the oracle to an existing tab, or
- create a new tab only if the request clearly needs one.

## Files to inspect

- `public/src/index.js`
- `public/src/oracle.js`
- `public/locales/en/translation.json`
- `public/locales/fr/translation.json`

## Workflow

1. Find the target tab in `public/src/index.js`.
2. Add a button entry to that tab's `buttons` array.
3. Choose a stable `type` key for the oracle. Keep it short and descriptive.
4. In `public/src/oracle.js`, add a matching entry inside `data` for that `type`.
5. If the oracle output uses interpolation keys such as `{{something}}`, make sure each referenced key also exists in `data` or in the locale word pools merged at the end of the file.
6. Add the UI translation keys in `public/locales/en/translation.json` first, then mirror them in `public/locales/fr/translation.json`.
7. Manually verify the button appears in the correct tab and generates valid output in both languages.

## Implementation notes

- Tabs are declared in `public/src/index.js` in the `tabs` array.
- Each button looks like `{ type: 'myOracleType', label: () => i18next.t('ui.some_key') }`.
- Oracle generation lives in `public/src/oracle.js` inside the `data` object passed to `story('{{type}}', data)`.
- Simple outputs can be a single template entry:

```js
myOracleType: [
  {
    label: i18next.t('oracle.my_oracle.result'),
  },
],
```

- Weighted outputs follow the existing pattern:

```js
myOracleType: [
  { label: i18next.t('oracle.my_oracle.option_1'), weight: 2 },
  { label: i18next.t('oracle.my_oracle.option_2'), weight: 1 },
],
```

- When using placeholders like `{{action}}` or `{{focus}}`, prefer existing pools before adding new ones.
- Keep translation keys stable. Prefer `ui.*` for button labels and `oracle.*` for generated text.

## Default decision rules

- Prefer adding to an existing tab over creating a new one.
- Limit the number of oracle per tab at 3 max.
- Prefer reusing existing word pools over inventing new ones.
- Add English keys before French keys.
- Do not touch `archive/`.

## Done checklist

- New oracle button is reachable from the intended tab.
- `type` in `public/src/index.js` matches a key in `public/src/oracle.js`.
- New translation keys exist in both `en` and `fr`.
- New word pools, if any, exist in both locale files.
- Manual browser validation is noted in the final response.
