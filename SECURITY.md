# Security Policy

## Reporting a vulnerability

Do not open a public issue for vulnerabilities involving credentials, data exposure, authentication, or child privacy.

Contact the repository owners privately through the GitHub organization contact method. Include:

- A concise description
- Reproduction steps
- Affected files or public URLs
- Potential impact
- Suggested mitigation, when available

## Secrets

The following must never be committed:

- Supabase secret or `service_role` keys
- Database passwords
- GitHub personal access tokens
- Private user data

The browser may use only the Supabase project URL and publishable/anonymous key, protected by Row Level Security policies.
