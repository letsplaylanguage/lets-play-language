# Let's Play Language

**Let's Play** is an open-source, game-based language-learning prototype designed to help children build early Arabic literacy through visual block-building, guided tracing, listening, speaking, and picture-selection activities.

This repository contains a playable Level 1 prototype, its dashboard interface, source assets, and the database schema for the minimally live analytics implementation.

## Public links

- **Repository:** https://github.com/letsplaylanguage/lets-play-language
- **Playable prototype:** https://letsplaylanguage.github.io/lets-play-language/
- **Dashboard:** https://letsplaylanguage.github.io/lets-play-language/dashboard/

> GitHub Pages is configured from the `main` branch. Deployment status is visible under repository Actions.

## Eligibility status

| Gate | Status | Evidence |
|---|---|---|
| Public open-source repository | Complete | Source and MIT license are public in this repository |
| Publicly playable prototype | Complete | GitHub Pages serves the app and dashboard |
| Minimally live dashboard | Implemented; verify deployment | App events persist in Supabase and stream to the dashboard via Realtime |

The dashboard must not be described as live until app-generated events are stored in Supabase, persist across refreshes, and appear in the public dashboard.

## What is implemented

- Responsive mobile-style Level 1 prototype
- Functional login fields for demonstration
- Onboarding and lesson navigation
- Drag-and-drop letter construction
- Guided tracing activity
- Listening, microphone-selection, and picture-choice exercises
- Dashboard button beside Restart
- Side-by-side dashboard panel
- Static deployment with no build step

## Repository structure

```text
.
├── index.html                 # Public entry point; opens the prototype
├── src/                       # Playable application
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   └── assets/
├── dashboard/                 # Dashboard interface
├── supabase/                  # Live-event schema and setup guide
├── docs/                      # Architecture, privacy, deployment and audit docs
├── LICENSE                    # MIT license for source code
├── ASSET_LICENSE.md           # Artwork and asset terms
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── TEAM.md
```

## Run locally

No package manager or build process is required.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Directly opening `index.html` also works in many desktop browsers, but serving the folder is more reliable for mobile testing and embedded dashboard behavior.

## Architecture

```mermaid
flowchart LR
    A[Playable browser app] -->|anonymous learning event| B[(Supabase learning_events)]
    B -->|initial query| C[Public dashboard]
    B -->|Realtime insert subscription| C
    D[GitHub repository] --> E[GitHub Pages]
    E --> A
    E --> C
```

The planned live event model intentionally excludes names, email addresses, recordings, exact age, and other child-identifying information.

See:

- [Architecture](docs/ARCHITECTURE.md)
- [Data and privacy](docs/PRIVACY.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Eligibility evidence checklist](docs/ELIGIBILITY_CHECKLIST.md)
- [Supabase setup](supabase/README.md)

## Live dashboard state

The public app records anonymous learning events in `public.learning_events`. The dashboard loads persisted events for the current day and subscribes to new inserts through Supabase Realtime.

The browser sends only:

- Anonymous session identifier
- Event type
- Screen number
- Language code
- Small non-identifying metadata

It does not send login-field contents, names, email addresses, recordings, exact age, or other child-identifying information.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributions should preserve Arabic text direction, accessible interaction targets, mobile usability, and the repository's privacy constraints.

## Licensing

Source code is released under the [MIT License](LICENSE). Artwork, branding, Adobe XD exports, audio, and other creative assets are governed separately by [ASSET_LICENSE.md](ASSET_LICENSE.md).
