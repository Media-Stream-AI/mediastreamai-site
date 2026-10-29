# mediastreamai-site

Group site for Media Stream AI Limited — **www.mediastreamai.com**.

Next.js (App Router) + Tailwind, deployed on Netlify via the
`@netlify/plugin-nextjs` runtime (SSR + route handlers).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type-check   # tsc --noEmit
```

## The site

Dark-cinematic group site built around the four MSAI pillars:

| Route | What it covers |
| --- | --- |
| `/` | Group homepage — the full-stack story, pillars, infrastructure band, stack diagram |
| `/model-family` | MOTHER 7B sovereign model family (CORE, DeepVision, speech, memory, 26 heads) |
| `/intuitv` | IntuiTV + IntuiStudio (Creator editor, 24/7 Playout) |
| `/exo` | MOTHER EXO — frontier world model + robotics (2027) |
| `/defence` | MOTHER Defence — Guardian signed action filter, on-prem / air-gap |
| `/colocation` | MSAI Scotland — confirmed GPU deployments and 10 MW colocation |
| `/compliance` | EU AI Act Art. 53 transparency, gated white paper / due-diligence dossier |
| `/quantum`, `/technology`, `/blog`, `/pricing`, `/contact`, `/privacy`, `/terms` | Supporting pages |

Legacy paths from the previous version of this site (`/models`, `/robotics`,
`/data-centre`, `/vp-studio`, `/government-defence`, …) are 301'd to their
closest counterpart in `netlify.toml`.

## Lead capture

Every CTA on the site — trial signup, sales and enterprise contact,
colocation enquiry, gated document downloads — is forwarded to the MSAI
sales platform through `lib/leads.ts`
(`forwardLeadToSalesPlatform`), alongside the existing email / Mongo / CSV
sinks so nothing is dropped if one sink fails.

| Variable | Purpose |
| --- | --- |
| `SALES_PLATFORM_WEBHOOK` | Lead ingest endpoint (defaults to `https://sales.mediastreamai.com/api/leads`) |
| `SALES_PLATFORM_TOKEN` | Optional bearer for the ingest endpoint |

See `.env.example` for the full environment template.

**Compliance note:** the statutory EU AI Act Art. 53 copyright policy and
training-content summary stay **publicly available and ungated** — the
Regulation requires public availability. Only the white paper and the
due-diligence dossier sit behind `GatedDownload`.

---

## MSAI Cloud integration

Deploys are orchestrated through the
[MSAI Cloud Portal](https://github.com/Media-Stream-AI/msai-cloud-portal), so the
portal stays the single source of truth for who deployed what, when, and with
what result.

### Required GitHub config

| Secret | Source |
| --- | --- |
| `MSAI_PORTAL_URL` | Portal base URL, e.g. `https://api.cloud.mediastreamai.com` |
| `MSAI_DEPLOY_WEBHOOK_TOKEN` | Matches the portal's webhook token |

| Variable | Notes |
| --- | --- |
| `MSAI_DEPLOYMENT_SLUG` | Slug registered on the portal (`mediastreamai-site`) |
| `MSAI_DEPLOYMENT_ENV` | Optional, defaults to `production` |

### Auto-deploy

`.github/workflows/redeploy-via-msai.yml` POSTs to
`/admin/deployments/mediastreamai-site/redeploy` on every push to `main`
and `claude/**`. The portal records the event and forwards to the Netlify
build hook configured on that deployment row.

### Where each piece runs

| Piece | Host |
| --- | --- |
| This app (group site) | Netlify (`www.mediastreamai.com`) |
| Portal API | Render (`api.cloud.mediastreamai.com`) |
| Portal frontend / dashboard | Vercel (`portal.mediastreamai.com`) |
| IntuiTV product surfaces | `intuitv.app`, `creator.intuitv.app`, `watch.intuitv.app`, `studio.intuitv.app` |

See [`Media-Stream-AI/msai-cloud-portal/README.md`](https://github.com/Media-Stream-AI/msai-cloud-portal)
for the full topology.

## Security

Cyber Essentials baseline: CodeQL, Semgrep + gitleaks scanning, Dependabot and
HTTP security headers (`netlify.toml`). See
[`docs/security/cyber-essentials.md`](docs/security/cyber-essentials.md) and
[`SECURITY.md`](SECURITY.md).

## Refreshing the Hugging Face still

The models pillar on the homepage shows the real
[MediaStreamAI organisation on Hugging Face](https://huggingface.co/MediaStreamAI)
and links to it. `public/huggingface-mediastreamai.webp` is a logged-out capture
of that page, so refresh it whenever a model or dataset is published:

```bash
wget -q -p -k -H -e robots=off -nH --adjust-extension https://huggingface.co/MediaStreamAI
# then screenshot the local copy at 1152x864 (4:3), deviceScaleFactor 2, with
# `dark` on <html>, and save it as public/huggingface-mediastreamai.webp
```

Capturing the mirror rather than the live page keeps the shot logged-out (no
"Edit profile" / "Settings" chrome) and shows only public repositories.
