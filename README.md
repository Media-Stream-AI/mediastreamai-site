# mediastreamai-site

Marketing site for Media Stream AI Limited — www.mediastreamai.com.


---

## MSAI Cloud integration

This repo plugs into the [MSAI Cloud Portal](https://github.com/Media-Stream-AI/msai-cloud-portal)
for AI generation and deployment orchestration. **All AI calls and
deploys go through the portal — never directly from this app to an
external provider.**

### How requests flow

```
 Browser ──▶ Next.js app (this repo) ──▶ /api/intuistudio/jobs (server route)
                                                  │
                                                  ▼
                                MSAI Cloud Portal /intuistudio/jobs
                                                  │
                                                  ▼
                                IntuiTV engine (in-process on the portal)
                                                  │
                                                  ▼
                                /inference/{images,videos}/generations
                                                  │
                                                  ▼
                                upstream provider (portal-configured)
```

The browser **never** sees the portal bearer — `/api/intuistudio/*`
runs server-side, injects `Authorization: Bearer $MSAI_CLOUD_API_TOKEN`,
and forwards to the portal.

### Required hosting env (Netlify)

| Variable | Purpose |
| --- | --- |
| `MSAI_CLOUD_API_URL` | Portal base URL, e.g. `https://api.cloud.mediastreamai.com` |
| `MSAI_CLOUD_API_TOKEN` | Server-side bearer issued by the portal |

### Required GitHub config

| Secret | Source |
| --- | --- |
| `MSAI_PORTAL_URL` | Same as `MSAI_CLOUD_API_URL` |
| `MSAI_DEPLOY_WEBHOOK_TOKEN` | Matches the portal's webhook token |

| Variable | Notes |
| --- | --- |
| `MSAI_DEPLOYMENT_SLUG` | Slug registered on the portal (`mediastreamai-site`) |
| `MSAI_DEPLOYMENT_ENV` | Optional, defaults to `production` |

### Auto-deploy

`.github/workflows/redeploy-via-msai.yml` POSTs to
`/admin/deployments/mediastreamai-site/redeploy` on every push to `main`
and `claude/**`. The portal records the event and forwards to the
Netlify build hook configured on that deployment row. The portal is
the single source of truth for "did this deploy succeed?".

### Where each piece runs

| Piece | Host |
| --- | --- |
| This app (marketing site) | Netlify (`www.mediastreamai.com`) |
| Portal API | Render (`api.cloud.mediastreamai.com`) |
| Portal frontend / dashboard | Vercel (`portal.mediastreamai.com`) |
| IntuiTV generation engine | Runs in-process on the portal API (no separate GPU node required for the default flow) |
| Optional SSH-offload | GB10 / datacentre nodes registered via `/admin/nodes` |

See [`Media-Stream-AI/msai-cloud-portal/README.md`](https://github.com/Media-Stream-AI/msai-cloud-portal)
for the full topology.
