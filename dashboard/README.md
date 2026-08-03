# Let's Play Dashboard

This directory contains the public dashboard interface.

## Current status

The current implementation uses a local generator in `js/dashboard.js` and is therefore **staged, not live**. It demonstrates layout and update behavior only.

The audited live milestone will replace the generator with:

- An initial query to `public.learning_events`
- Aggregation of persisted event rows
- A Supabase Realtime insert subscription
- A connection-status indicator
- A last-real-event timestamp

See `../supabase/README.md` and `../docs/ELIGIBILITY_CHECKLIST.md`.
