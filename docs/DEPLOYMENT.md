# Deployment

## GitHub Pages

After the files are committed to `main`:

1. Open the repository on GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Save and wait for deployment.

Expected URLs:

```text
https://letsplaylanguage.github.io/lets-play-language/
https://letsplaylanguage.github.io/lets-play-language/dashboard/
```

## Local check

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
http://localhost:8000/dashboard/
```

## Live backend

Follow `../supabase/README.md`. Do not commit database passwords or secret/service-role keys.
