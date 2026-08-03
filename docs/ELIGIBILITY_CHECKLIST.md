# Eligibility Evidence Checklist

## Public repository gate

- [ ] Repository opens in a private/incognito browser window
- [ ] Source files are visible without signing in
- [ ] MIT license is visible
- [ ] README explains how to run the app
- [ ] Contributor identities use verified GitHub handles
- [ ] Latest submission commit hash is recorded

## Live dashboard gate

- [ ] Dashboard visibly reports connected status
- [ ] Opening the app creates a persisted event
- [ ] Completing a screen creates a persisted event
- [ ] Event appears in dashboard within a few seconds
- [ ] Event remains after dashboard refresh
- [ ] Test works in two separate browsers or devices
- [ ] Random simulation code is disabled or removed

## Deployment evidence

- [ ] Public app URL
- [ ] Public dashboard URL
- [ ] Public repository URL
- [ ] Screen recording of app action appearing on dashboard
- [ ] Screenshot of stored database event
- [ ] Screenshot while signed out
- [ ] Final commit hash and deployment timestamp

## Accuracy rule

Do not label the dashboard “live” based only on changing animations or random numbers. The audit evidence must demonstrate a real app event, backend persistence, realtime delivery, and survival after refresh.
