# Contributing

Thank you for contributing to Let's Play Language.

## Development principles

- Keep the prototype usable on mobile Safari and current desktop browsers.
- Preserve right-to-left Arabic text and source-design fidelity.
- Avoid collecting personal or child-identifying data.
- Never commit Supabase secret keys, service-role keys, database passwords, or personal access tokens.
- Keep the project runnable without a proprietary build system whenever practical.

## Local setup

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

## Change workflow

1. Create a branch from `main`.
2. Make one focused change.
3. Test the full lesson flow and dashboard panel.
4. Check mobile layout at approximately 375 × 812.
5. Open a pull request explaining the user-visible behavior and test evidence.

## JavaScript checks

```bash
node --check src/js/app.js
node --check dashboard/js/dashboard.js
```

## Assets

Do not add artwork unless the project has the right to publish and redistribute it. Record its source and licensing status in `ASSET_LICENSE.md`.
