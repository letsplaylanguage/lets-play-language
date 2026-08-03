# Let's Play Dashboard

This directory contains the public, minimally live dashboard.

## Live behavior

The dashboard:

- Loads persisted events from `public.learning_events`
- Calculates today’s activity metrics from real rows
- Subscribes to new inserts through Supabase Realtime
- Shows connection status and the timestamp of the latest real event
- Refreshes its initial query periodically for resilience

No random metric generator is used.

## Audit test

1. Open the public dashboard.
2. Open the public prototype in another tab or device.
3. Advance through a screen.
4. Confirm a new activity row appears.
5. Refresh the dashboard.
6. Confirm the row remains visible.
