# Cube hero: browser QA, 30 Oct 2026

Scope: the home page six-cube hero shipped in #126, tested on production
(`https://www.mediastreamai.com/`), then the fixes in this branch re-tested
on a local production build (`next build && next start`).

Tooling: Playwright and Chromium, headless. WebGL ran on **SwiftShader
(software rendering)**, so frame rate and smoothness here do **not**
represent a real GPU. Safari/iOS and Android devices were not tested;
iPhone 13 emulation (viewport, touch, DPR) was.

## Results

| Check | Production (#126) | This branch |
|---|---|---|
| Cube hover hit-test, 1440×900, grid chapter | 5/6 (IntuiStudio partly off-screen) | **6/6** |
| Cube click to exact destination (all six) | 0/6 (see "Click threshold") | **6/6** |
| Drag across a cube navigates | No | No |
| Touch, first tap | not testable (cubes not located) | Pins tooltip, **no navigation** |
| Touch, second tap | n/a | Opens destination (`https://www.motherai.uk/`) |
| Canvas `touch-action` (page scroll not trapped) | `pan-y` | `pan-y` |
| Keyboard: six platform links reachable, visible focus | Pass (2px cyan outline) | Pass |
| Reduced motion | Static 100vh, but grid overlapped headline | Static ring, clear of copy |
| No WebGL (`--disable-webgl`) | Fallback grid, six correct links; clipped headline at 1440 | Clear at 1440 / 1024 / 375 |
| Sentinel popup over hero | Yes, every width (most of the screen at 320–375) | **No**; opens once hero has scrolled past |
| Nav at 1024 | Wrapped to two lines | Single line |
| CLS, 1440 and 375 (no-GL run) | **0.103** / 0.076 | **0** / **0** |
| LCP, 1440 (production, warm CDN) | 888 ms | not re-measured |
| JS transferred, home page | 1,248 KB total; three.js chunk 668 KB, lazy-loaded after idle | unchanged |
| Home First Load JS (build output) | 149 KB | 149 KB |
| Main-thread FPS in hero | 1.3 (SwiftShader, not representative) | not re-measured |
| JS heap in hero | 9.5 MB | not re-measured |

## Root causes fixed

- **Click threshold.** The press-duration check compared `performance.now()`
  in two handlers. On a slow main thread (here, ~770 ms software frames) the
  handlers ran more than 650 ms apart, so every click counted as a long press.
  It now uses the events' own `timeStamp`.
- **Grid off-screen.** The cluster used one placement for all formations, and
  the 3×2 grid is the widest. Each formation now has its own scale and offset.
- **CLS.** Anton was not preloaded, so the headline first rendered in the
  wider fallback, wrapped, then un-wrapped when Anton arrived (~1.3 s) and
  pushed the lede and CTAs down. Anton is now preloaded, and the authored
  headline lines are `nowrap` from 360px.
- **Popup.** `SentinelPopup` started its 1.4 s timer on load. A new
  `deferWhileVisible` prop holds the timer until `.cube-hero` is off screen.

## Still open

- Real-GPU measurements (FPS, INP, memory) on desktop Chrome, Safari macOS,
  iOS Safari and Android Chrome.
- Lighthouse run.
- Pre-existing, outside this change: the Cloudflare Insights beacon is blocked
  by the site CSP (`script-src`), and logs a console error on every page.

## Evidence

- `production-hero-breakpoints.webp`: production at 320 / 375 / 768 / 1024 /
  1440 / 1920 × three chapters (shows the popup and overlap issues).
- `production-sections.webp`: stack, how-it-fits and platforms sections at
  375 and 1440.
- `fixed-grid-1440.webp`, `fixed-grid-1024.webp`: grid chapter after the fix.
- `fixed-hover-tooltip.webp`, `fixed-touch-pinned.webp`: hover and touch
  selection.
- `fixed-reduced-motion.webp`, `fixed-no-webgl-1440.webp`,
  `fixed-no-webgl-375.webp`: fallbacks after the fix.
