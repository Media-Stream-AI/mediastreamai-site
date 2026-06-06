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

---

## Session log — MOTHER EXO robotics integration (2026-06-06)

This documents the changes, decisions and learnings from the robotics-platform
redesign session (branch `claude/robotics-platform-redesign-KjTyC`).

### What shipped

| PR | Summary | State |
| --- | --- | --- |
| [#24](https://github.com/Media-Stream-AI/mediastreamai-site/pull/24) | Rebuilt `/robotics` to mirror `robotics.mediastreamai.com`: ported the **3D brain fly-through** in place of the old iframe "platform preview", plus the sovereign hero, "Owned/hosted/trained in Britain" cards and the perceive→reason→act steps. All platform links point to `https://robotics.mediastreamai.com`. | Merged |
| [#25](https://github.com/Media-Stream-AI/mediastreamai-site/pull/25) | Amended the site popup (`CountdownTimer`) to the **MOTHER EXO 'World Model' & Humanoid Training Simulator** creative with a direct link to `robotics.mediastreamai.com`, and repurposed the form to collect **Name + Email for Humanoid Teacher** sign-ups. Also fixed the 3D scroller's empty-space bug. | Merged |

### Key files

- `app/robotics/page.tsx` — the `/robotics` page. Self-contained client component;
  the global sticky `Header` (from `app/layout.tsx`) supplies site nav, so the page's
  own redundant nav was removed. The brain animation (`BrainJourney3D`) is **pure CSS
  3D transforms** (no WebGL / three.js — this repo has no three.js dep), driven by a
  `window` scroll listener + `requestAnimationFrame`. Styles are injected via an inline
  `<style>` block ported from the robotics landing page.
- `app/_components/CountdownTimer.tsx` — the site-wide popup. Posts to
  `/api/beta-signup` with `source: "msai-site-mother-exo-humanoid-teacher"` so Humanoid
  Teacher sign-ups are separable in the CSV export (`GET /api/beta-signup?secret=…`).
- `public/mother-exo-world-model.png` — the popup creative.

### Learnings / gotchas

- **`position: sticky` + ancestor `overflow`:** the scroller's empty-space band was caused
  by `overflow-x: hidden` on the page root. Per spec, setting one overflow axis to a
  non-`visible` value forces the other to `auto`, which turns the element into a scroll
  container and **breaks `position: sticky`** for descendants. Fix: keep the page root
  `overflow: visible` (so `window` stays the scroll container) and contain the oversized
  hero wordmark with `overflow-x: clip` on the hero (a *sibling*, not an ancestor, of the
  sticky track). `html/body/main` already avoid `overflow-x: hidden` here (it was removed
  earlier to stop clipping dropdown menus).
- **Deploys** go through the MSAI Cloud Portal / Netlify (see above). Netlify posts a
  Deploy Preview per PR; Lighthouse on `/robotics` dips on Performance because the
  fly-through renders ~330 animated DOM dots — acceptable for the requested effect, but
  the popup creative could be converted to WebP / lazy-loaded if scores need recovering.

### MOTHER EXO model/weights as surfaced on the public site

Values the marketing site now presents (sourced from `robotics.mediastreamai.com`; the
authoritative platform/model state lives in the
[`MSAIGlobal/MSAI_Robotics`](https://github.com/MSAIGlobal/MSAI_Robotics) README):

| Weight | Size | Role |
| --- | --- | --- |
| Vision EXO (fused) | 18.3M params | detection + bbox + scene-graph reasoning |
| MOTHER CORE | 6.88B params (~7B) | sovereign reasoning world-model |
| Spatial relations | — | geometric + learned object relationships |
| Continuous training | — | capture → tag → fine-tune across all weights |
| **Total** | **6.9B+ params** | across the full brain |

- Released: **MOTHER CORE V.2 (3B)** on Hugging Face (`huggingface.co/MediaStreamAI/MOTHER_CORE_V2`).
- Upcoming: **MOTHER EXO World Model V1** — Hugging Face (`huggingface.co/MediaStreamAI`).
- Hardware partner: **Fourier N1** humanoid; **NVIDIA Isaac GR00T N1** convergence.
