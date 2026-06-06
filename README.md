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

## Home-page 3D experience (June 2026)

The marketing home page (`app/page.tsx`) now ships three interactive 3D
pieces, all **pure CSS 3D** (`perspective` / `preserve-3d`) — no WebGL, so
they degrade gracefully and never crash a GPU-less browser. Each is
dynamically imported with `ssr: false` and respects
`prefers-reduced-motion`.

| Component | File | Where | What it does |
| --- | --- | --- | --- |
| `DataCenter3D` | `components/DataCenter3D.tsx` | Hero background | A neon AI data-hall corridor you "walk through" — glowing server racks line both walls and recede to a bright vanishing point on a seamless `translateZ` fly-through loop. |
| `CognitiveBrain3D` | `components/CognitiveBrain3D.tsx` | Modular Cognitive Architecture section | A volumetric brain dot-cloud that slowly auto-rotates and cycles through MOTHER's cognitive modules, each anchored to a real brain region with a leader-line label + HUD. |
| `QuantumBrainVisualizer` | `components/QuantumBrainVisualizer.tsx` | Quantum RAG section | (Pre-existing) SVG neural map of MOTHER CORE ↔ TRM ↔ Quantum RAG with hover-to-explore nodes. |

### `DataCenter3D` — neon server-hall

Redesigned (PR #23) to replicate a photoreal neon data-centre reference:

- Neon-outlined racks with dense **cyan/teal/violet server-LED textures**
  rendered as layered radial-gradients with `screen` blend (many "lights"
  at zero extra DOM cost).
- Bright converging rails → **vanishing-point glow**, faint floor
  reflections, glossy floor + ceiling with depth light-streaks.
- Overhead ceiling light panels between rows; falling **"data-rain"**
  particle columns down the centre.
- Seamless loop is guaranteed by spacing racks every `GAP` px and animating
  the world by exactly one `GAP` (`@keyframes dcFly`).

### `CognitiveBrain3D` — Modular Cognitive Architecture

Mirrors the MSAI Robotics "fly-through brain" (`BrainJourney3D`), adapted to
MOTHER's modules. Modules and their mapped brain regions:

| Module | Region | Role |
| --- | --- | --- |
| MOTHER CORE | Prefrontal cortex | Sovereign deterministic reasoning engine |
| CORE 7B | Frontal lobe | Theorem proving, physics, defence, legal — T=0 / auditable |
| LLM 7B | Temporal lobe | British public language engine |
| T2V | Occipital lobe | Sovereign multi-modal text-to-video |
| Quantum RAG | Hippocampus | Quantum-enhanced retrieval |

---

## Current MOTHER model states & weights

> Sourced from the figures surfaced across the site (`app/page.tsx`,
> `components/QuantumBrainVisualizer.tsx`, `components/CognitiveBrain3D.tsx`).
> MOTHER is a **British class of LLM — "Modular Cognitive Architecture"**:
> cognition split into specialised, independently upgradeable domains.
> Trained on **NVIDIA H200** GPUs; runs on **inference chips across MSAI UK
> & EU data centres**. All training data British, all weights proprietary,
> zero external base models, zero CLOUD Act exposure.

| Engine | Params / spec | State | Notes |
| --- | --- | --- | --- |
| **MOTHER CORE** | ~6.86B params · 50,258 vocab | **Step 262,000+ — PRODUCTION** | Deterministic reasoning, zero-temperature, fully auditable |
| **LLM 7B** (British language) | 7B class | **Step 302,000+ — RUNNING** | British tone, GDPR-sovereign training data |
| **CORE 7B** (deterministic) | 7B class | Production | Reasoning / Science / Defence / Legal / Maths, T=0 LoRA/SFT adapters |
| **T2V** (text-to-video) | Multi-modal pipeline | **Stage 3B — Temporal active** | Pipeline: Stage2C (latent) → Stage3A (motion) → Stage3B (temporal) → Stage4 (decoder) |
| **CORE-Defence** | specialist | **In training** | Tier-3 governance required · target Manchester Tech Week 2026 |
| **Quantum RAG** | ~1.67M knowledge chunks | Active (PennyLane · port 8004) | Swap-test fidelity scoring over Wikipedia + domain collections |
| **TRM** | task router | Active | Routes Defence→CORE-Defence, Creative→LLM-Creative, Quantum RAG→CORE-Science |
| **PilotOS / quantum kernels** | on GB10 Blackwell | Local / air-gapped | QAOA + matrix-multiply training kernels |

### MOTHER EXO (robotics) — companion model

Surfaced via the new **MOTHER EXO** CTA (links to
`robotics.mediastreamai.com`). It is a **world model, not a chatbot** —
perceive → understand space → reason → act, in one loop:

| Weight | Spec |
| --- | --- |
| MOTHER CORE | ~6.88B params · sovereign reasoning world-model |
| Vision EXO (fused) | 18.3M params · detection + bbox + scene-graph reasoning (10k-class head) |
| Spatial relations | geometric + learned object relationships |
| Continuous training | capture → tag → fine-tune across all weights |

---

## Product surfaces

| Product | URL | Summary |
| --- | --- | --- |
| MOTHER AI | `https://motherai.uk` | 70B UK Sovereign LLM — chat, code, legal analysis |
| MOTHER Compute | `/solutions` | GPU infrastructure — H200 · B200 · SambaNova · canal-cooled · ~73% vs AWS |
| IntuiTV | `https://studio.intuitv.app` | AI content studio — script-to-screen, AI video, HLS playout |
| MSAI Robotics / MOTHER EXO | `https://robotics.mediastreamai.com` | Embodied AI — Isaac Lab, humanoid control, vision AI |

---

## System build & stack

- **Framework:** Next.js 14.2.5 (App Router) · React 18 · TypeScript 5.4
- **Styling/anim:** Tailwind CSS 3.4 · framer-motion 11 · lucide-react icons
- **Data:** MongoDB driver 6 (blog / signups via `app/api/*`)
- **Node engine:** `>=18.17 <=22`
- **Build/verify:** `npm run build` (or `yarn`) — produces 28 static routes;
  validated clean after each change in this session.
- **Hosting/deploy:** Netlify (`www.mediastreamai.com`), redeploys
  orchestrated through the MSAI Cloud Portal (see above). Netlify deploy
  previews + Lighthouse run on every PR.

### Session changelog (June 2026)

- **PR #20 (merged):** Added `CognitiveBrain3D` to the Modular Cognitive
  Architecture section; added `DataCenter3D` hero background; replaced both
  "Contact Sales" buttons on the home page with **"MOTHER EXO"** linking to
  `robotics.mediastreamai.com`.
- **PR #21 (closed):** A Lighthouse-focused density optimization of the 3D
  scenes — **dropped**: it didn't move the score, because the cost is
  dominated by deploy-preview infra + home-page JS hydration, not the 3D
  DOM node count.
- **PR #23 (merged):** Redesigned `DataCenter3D` into the neon server-hall
  corridor described above.

### Learnings captured this session

- **Lighthouse on this home page** is bound by Total Blocking Time (JS
  hydration: framer-motion + a large page) and Speed Index (a perpetually
  animating background never "settles") — *not* by 3D DOM node count.
  Trimming dots/racks alone won't recover the score; pausing the animation
  after a few seconds and/or lazy-mounting below-fold scenes would.
- "From production" Lighthouse deltas on deploy previews are misleading —
  preview infra scores lower than the production CDN, so compare
  preview-to-preview, and treat ±3-5 points as noise.
- **CSS-3D plane placement gotcha:** rotating a large plane (`rotateX/Y(90deg)`)
  pivots about its *centre*, so a plane's world position is `translate +
  half-its-size`. Offset translations by half the width/height to land
  floors, ceilings and rails on-axis.
- For dense "server LED" looks, layered radial-gradient textures with
  `background-blend-mode: screen` beat hundreds of DOM nodes on paint cost.
- CSS keyframe animations that only touch `opacity`/`transform` stay on the
  compositor; animating `transform` on an element that already carries an
  inline `translate3d` will clobber its position — pulse `opacity` only.
