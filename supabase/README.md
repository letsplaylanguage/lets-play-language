# Supabase Setup

This folder prepares the repository for a minimally live, persistent dashboard.

## What you will need

From **Supabase → Project Settings → API**:

- Project URL
- Publishable key or legacy anonymous (`anon`) key

Never expose or commit:

- Secret key
- `service_role` key
- Database password

## Setup steps

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Paste and run `schema.sql`.
4. Confirm `learning_events` appears under **Table Editor**.
5. Confirm Realtime is enabled for the table.
6. Add the Project URL and publishable key to the public browser configuration that will be created during integration.
7. Test an insert, refresh the table, and confirm the row persists.

## Minimum audit test

1. Open the dashboard in one browser.
2. Open the playable app in another browser or device.
3. Complete a screen.
4. Confirm the dashboard activity feed updates.
5. Refresh the dashboard.
6. Confirm the event is still visible.

Passing only steps 3–4 is not sufficient; step 6 proves persistence rather than local simulation.
