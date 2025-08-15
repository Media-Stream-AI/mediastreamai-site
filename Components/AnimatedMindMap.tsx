/* Animated neon SVG mind maps for Media Stream AI + IntuiTV
   - BiometricSignalsMap: fixed schema (heart rate, HRV, sleep, etc.)
   - PersonaMindMap: generates a behavioral map from props (moods + weather)
   These are server components (no "use client"), animations run in SVG/CSS only.
*/

type Branch = { label: string; items: string[] };
type PersonaProps = {
  centerLabel: string;
  moods: Branch[];    // 3–6 moods
  weather: Branch[];  // 2–4 weather contexts
  width?: number;
  height?: number;
};

const FONT_HEAD = `font-family: Horizon, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
const FONT_BODY = `font-family: "Glacial Indifference", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;

/* ------------------------- Biometric Signals ------------------------- */

export function BiometricSignalsMap({ width = 920, height = 540 }: { width?: number; height?: number }) {
  const cx = width / 2;
  const cy = height / 2;

  // Biometric radiating spokes
  const spokes = [
    { r: 180, angle: -50,  title: "Heart Rate",         notes: ["Rest/active trend", "Peaks & variability"] },
    { r: 200, angle: -15,  title: "HRV",                notes: ["Stress balance", "Recovery readiness"] },
    { r: 210, angle:  15,  title: "Sleep",              notes: ["Duration", "REM / deep / latency"] },
    { r: 190, angle:  45,  title: "Activity",           notes: ["Steps • workouts", "Intensity"] },
    { r: 210, angle:  75,  title: "Respiration",        notes: ["Rate", "Rhythm"] },
    { r: 190, angle: 115,  title: "Skin Temp",          notes: ["Basal shift", "Fever trends"] },
    { r: 210, angle: 150,  title: "Mood",               notes: ["Self-report", "Model inference"] }
  ];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-label="Biometric signals mind map">
      {/* defs: gradients, glow, line anim */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="50%" stopColor="#a855f7"/>
          <stop offset="100%" stopColor="#22d3ee"/>
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>{`
          .bg { fill: #000; }
          .ring { fill: none; stroke: url(#strokeGrad); stroke-width: 3; filter: url(#softGlow); }
          .edge { fill: none; stroke: url(#strokeGrad); stroke-width: 2; stroke-linecap: round;
                  stroke-dasharray: 6 8; animation: flow 6s linear infinite; }
          @keyframes flow { to { stroke-dashoffset: -200; } }
          .chip { fill: rgba(255,255,255,0.06); stroke: rgba(255,255,255,0.2); }
          .label-head { ${FONT_HEAD}; fill: #fff; font-size: 18px; }
          .label-body { ${FONT_BODY}; fill: rgba(255,255,255,0.85); font-size: 13px; }
        `}</style>
      </defs>

      {/* subtle background glow */}
      <circle cx={cx} cy={cy} r={120} fill="url(#glow)" />

      {/* central ring */}
      <circle cx={cx} cy={cy} r={80} className="ring" />
      <text x={cx} y={cy - 6} textAnchor="middle" className="label-head">Biometric Signals</text>
      <text x={cx} y={cy + 18} textAnchor="middle" className="label-body">consented · privacy-first</text>

      {/* spokes */}
      {spokes.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x2 = cx + s.r * Math.cos(rad);
        const y2 = cy + s.r * Math.sin(rad);
        const boxW = 180, boxH = 58;
        const bx = x2 + (x2 < cx ? -boxW - 16 : 16);
        const by = y2 - boxH/2;

        return (
          <g key={i}>
            <path d={`M ${cx} ${cy} Q ${(cx + x2)/2} ${(cy + y2)/2 - 18} ${x2} ${y2}`} className="edge" />
            <rect x={bx} y={by} rx="12" ry="12" width={boxW} height={boxH} className="chip" />
            <text x={bx + 12} y={by + 22} className="label-head">{s.title}</text>
            <text x={bx + 12} y={by + 40} className="label-body">{s.notes[0]}</text>
            <text x={bx + 12} y={by + 56} className="label-body">{s.notes[1]}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------- Persona / Behavioral ------------------------- */

export function PersonaMindMap({
  centerLabel,
  moods,
  weather,
  width = 980,
  height = 560
}: PersonaProps) {
  const cx = 280;              // center left – gives room for right-hand stacks
  const cy = height / 2;

  // Precompute branch slots (top to bottom)
  const allBranches: { type: "mood" | "weather"; data: Branch; y: number }[] = [];
  const moodYStart = 80;
  const weatherYStart = 340;
  const rowGap = 64;

  moods.forEach((m, idx) => allBranches.push({ type: "mood", data: m, y: moodYStart + idx * rowGap }));
  weather.forEach((w, idx) => allBranches.push({ type: "weather", data: w, y: weatherYStart + idx * rowGap }));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-label={`${centerLabel} behavioral mind map`}>
      <defs>
        <linearGradient id="moodStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
        <linearGradient id="weatherStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#22d3ee"/>
        </linearGradient>
        <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge>
            <feMergeNode in="b"/><feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>{`
          .center { fill: rgba(34,211,238,0.15); stroke: rgba(34,211,238,0.6); }
          .node  { fill: rgba(255,255,255,0.06); stroke: rgba(255,255,255,0.2); }
          .edge  { fill: none; stroke-width: 2; stroke-linecap: round;
                   stroke-dasharray: 6 10; animation: dash 7s linear infinite; filter:url(#glow2); }
          @keyframes dash { to { stroke-dashoffset: -240; } }
          .label-head { ${FONT_HEAD}; fill: #fff; font-size: 16px; }
          .label-body { ${FONT_BODY}; fill: rgba(255,255,255,0.9); font-size: 14px; }
          .pill { fill: rgba(0,0,0,0.35); stroke: rgba(255,255,255,0.18); }
        `}</style>
      </defs>

      {/* center persona */}
      <ellipse cx={cx} cy={cy} rx="180" ry="38" className="center" />
      <text x={cx} y={cy + 6} textAnchor="middle" className="label-head">{centerLabel}</text>

      {/* branches */}
      {allBranches.map((b, i) => {
        const isMood = b.type === "mood";
        const x1 = cx + 180;               // right edge of center ellipse
        const y1 = cy;
        const x2 = 440;                    // first node x
        const y2 = b.y;

        // edge style
        const stroke = isMood ? "url(#moodStroke)" : "url(#weatherStroke)";

        // main branch node
        const boxW = 180, boxH = 42, bx = x2, by = y2 - boxH/2;

        // child items stacked to the right
        const itemW = 220, itemH = 36;
        const itemStartX = bx + boxW + 34;

        return (
          <g key={i}>
            <path d={`M ${x1} ${y1} C ${x1+60} ${y1} ${x2-60} ${y2} ${x2} ${y2}`} className="edge" stroke={stroke} />

            <rect x={bx} y={by} width={boxW} height={boxH} rx="10" ry="10" className="node" />
            <text x={bx + 12} y={by + 26} className="label-head">
              {isMood ? `Mood: ${b.data.label}` : `Weather: ${b.data.label}`}
            </text>

            {b.data.items.map((it, k) => (
              <g key={k}>
                <path
                  d={`M ${bx + boxW} ${y2} C ${bx + boxW + 12} ${y2} ${itemStartX - 22} ${y2 + k*40} ${itemStartX - 6} ${y2 + k*40}`}
                  className="edge" stroke={stroke}
                />
                <rect
                  x={itemStartX} y={y2 + k*40 - itemH/2} width={itemW} height={itemH} rx="8" ry="8" className="pill"
                />
                <text x={itemStartX + 12} y={y2 + k*40 + 6} className="label-body">{it}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------- Example persona configs ------------------------- */

// Product manager (30–39, female)
export const personaProductManager = {
  centerLabel: "product manager (30–39, female)",
  moods: [
    { label: "happy",   items: ["comedies", "makeover reveals"] },
    { label: "sad",     items: ["found-family dramas", "wholesome reality"] },
    { label: "anxious", items: ["baking/crafts", "light rom-coms"] },
    { label: "tired",   items: ["6–8m clips"] },
    { label: "bored",   items: ["fast-paced reality competition"] }
  ],
  weather: [
    { label: "overcast_rain", items: ["bingeable drama"] },
    { label: "sunny_warm",    items: ["short clips on mobile"] },
    { label: "hot_humid",     items: ["cozy/soothing shows"] }
  ]
};

// University student (18–24, male)
export const personaStudent = {
  centerLabel: "university student (18–24, male)",
  moods: [
    { label: "happy",   items: ["live streams", "memes"] },
    { label: "sad",     items: ["slice-of-life anime", "comfort sitcoms"] },
    { label: "anxious", items: ["lo-fi study", "nature"] },
    { label: "tired",   items: ["short highlights"] },
    { label: "bored",   items: ["interactive live", "sports"] }
  ],
  weather: [
    { label: "rain",       items: ["longer dorm sessions"] },
    { label: "sunny_warm", items: ["mobile clips"] }
  ]
};

// NHS nurse (40–49, female)
export const personaNurse = {
  centerLabel: "NHS nurse (40–49, female)",
  moods: [
    { label: "happy",   items: ["makeover reveals"] },
    { label: "sad",     items: ["found-family sitcoms", "nature"] },
    { label: "anxious", items: ["slow TV"] },
    { label: "tired",   items: ["sleep-safe docs"] },
    { label: "bored",   items: ["competition reality"] }
  ],
  weather: [
    { label: "storms",   items: ["local news alerts"] },
    { label: "overcast", items: ["longer sessions"] }
  ]
};

// Retail associate (18–24, female)
export const personaRetail = {
  centerLabel: "retail associate (18–24, female)",
  moods: [
    { label: "happy",   items: ["music performances", "talent shows"] },
    { label: "sad",     items: ["wholesome K-drama", "pet content"] },
    { label: "anxious", items: ["craft/baking", "travel vlogs"] },
    { label: "tired",   items: ["<5m clips"] },
    { label: "bored",   items: ["competitive reality"] }
  ],
  weather: [
    { label: "cold_wet", items: ["K-drama binge"] },
    { label: "hot",      items: ["light variety"] }
  ]
};