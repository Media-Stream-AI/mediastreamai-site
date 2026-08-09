# Secret remediation runbook (mediastreamai-site)

_Owner: Security with Operations. Raised by the cyber-essentials-compliance
hardening pass on 2026-08-09._

## Why this exists

One or more environment files containing live-looking credentials were
committed to this repository's history. The current hardening pass has:

1. **Untracked** the file(s) with `git rm --cached` (kept on disk locally).
2. **Git-ignored** the pattern so they cannot be re-committed.
3. Added a **gitleaks** gate so any new secret is blocked in CI.

Untracking removes the file from the *tip* of the branch. It does **not**
remove it from git history, and it does **not** rotate the exposed
credentials. Both of those steps are required and are owned by you/ops
because they affect live systems and shared history.

## Affected files

- `.env.local`

## Step 1 — Rotate every exposed credential (do this first)

Treat every value in the affected file(s) as compromised. For each one:

- Generate a new secret in the owning system (database, Supabase, SendGrid,
  Anthropic, GitHub token, LinkedIn app, JWT signing key, etc.).
- Update the value in the secrets store used by deployment (Netlify/Vercel
  environment variables, GB10 node secret store, GitHub Actions secrets) —
  **not** in a committed file.
- Revoke the old value.
- Record the rotation date and actor in the evidence store
  (`s3://msai-aiact-evidence/wp-g/secret-rotation/`).

## Step 2 — Purge the file from git history

Coordinate with everyone working on the repo — this rewrites history and
requires a force-push and re-clone.

```bash
# Preferred: git-filter-repo (https://github.com/newren/git-filter-repo)
pip install git-filter-repo
# From a FRESH clone of the repo:
git filter-repo --invert-paths \
  --path .env.local
git push --force-with-lease origin --all
git push --force-with-lease origin --tags
```

Alternative with BFG:

```bash
bfg --delete-files '{.env.local}'
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force-with-lease origin --all
```

After the rewrite, everyone must re-clone; old clones and any caches
(including forks and CI caches) still contain the secret until they are
deleted.

## Step 3 — Verify

- `gitleaks detect --source . --no-banner` returns clean.
- Remove the corresponding entry from `.gitleaks.toml` `[allowlist].paths`
  so the gate protects that path again.
- Confirm deployments read the rotated values from the secrets store.
- Update MSAI-AIACT-REG-001 (WP-G) with completion date and actor.
