# Architecture

## Overview

Let's Play is a static browser application designed to run from GitHub Pages. The prototype does not require a compilation step.

## Components

### Playable application

`src/index.html`, `src/css/style.css`, and `src/js/app.js` implement the phone-frame experience and lesson state machine. Screen art and draggable pieces are stored under `src/assets/`.

### Dashboard

`dashboard/` contains the usage dashboard. During the staged phase it generates values locally. The live milestone replaces that generator with persisted anonymous events from Supabase.

### Live event backend

The proposed `learning_events` table records a deliberately small event envelope:

- `created_at`
- `anonymous_session_id`
- `event_type`
- `screen_number`
- `language`
- `metadata`

No child name, email, recording, exact age, or precise location is required.

## Data flow

1. The browser generates an anonymous session UUID.
2. Meaningful actions insert an event through the Supabase REST client.
3. Row Level Security allows constrained anonymous inserts and reads.
4. The dashboard loads recent events and aggregates its KPIs.
5. A Realtime subscription receives subsequent inserts.
6. Refreshing the dashboard reloads persisted events, proving the data is not locally simulated.

## Static hosting

GitHub Pages serves the root entry point, playable app and dashboard from one public repository.
