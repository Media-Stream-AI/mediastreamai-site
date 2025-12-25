// app/models/page.tsx
import Link from "next/link";

/**
 * MSAI Models — grouped cards + animated SVG diagram
 * - No external libraries required
 * - Uses Tailwind classes already present in your project
 * - Fonts: Horizon (headings), Glacial (body) assumed in globals.css
 */

export default function ModelsPage() {
  const groups: {
    title: string;
    blurb: string;
    models: { name: string; desc: string }[];
  }[] = [
    {
      title: "IntuiTV Personalisation Models",
      blurb:
        "Consumer-facing models that learn preferences, mood, and context — then assemble a personal 24/7 channel.",
      models: [
        {
          name: "IntuiProfile",
          desc:
            "Learns viewer preferences, watch patterns, and mood correlations to drive hyper-personalised recommendations."
        },
        {
          name: "IntuiMood",
          desc:
            "Classifies mood from biometrics and in-app behaviour to adapt programming tone, pacing, and notifications."
        },
        {
          name: "IntuiSchedule",
          desc:
            "Generates rolling 24-hour schedules in real time, blending live, VOD, and AI interstitials for seamless ‘lean back’ TV."
        }
      ]
    },
    {
      title: "Content Intelligence Models",
      blurb:
        "Understand every frame and paragraph — automatic tags, summaries, and engagement intelligence for your catalogue.",
      models: [
        {
          name: "IntuiTagger",
          desc:
            "NLP + vision tagging for topics, genres, cast, tone, compliance, safety and more — all as structured metadata."
        },
        {
          name: "IntuiSummary",
          desc:
            "Short bios, show descriptions, and episode synopses optimised for UI tiles, notifications, and promos."
        },
        {
          name: "IntuiEngage",
          desc:
            "Finds what performs, for whom, and why — content lift insights and recommendations for creatives & schedulers."
        }
      ]
    },
    {
      title: "Audience Analytics & Forecasting",
      blurb:
        "Forecast, simulate and optimise business outcomes for broadcasters and platforms.",
      models: [
        {
          name: "IntuiPredict",
          desc:
            "Forecasts engagement, churn risk, and ad performance using historical and live signals."
        },
        {
          name: "IntuiCase",
          desc:
            "Case-study simulation: national-level savings, energy reduction and infra impact (e.g., BBC, Channel 4, M6)."
        },
        {
          name: "IntuiMonetize",
          desc:
            "Optimises ad loads, sponsorship slots and subscription tiers grounded in behavioural economics."
        }
      ]
    },
    {
      title: "MOTHER AI (System Orchestration)",
      blurb:
        "The brain of the platform — coordinates models, safeguards data, and quietly rolls out improvements.",
      models: [
        {
          name: "MOTHER Core",
          desc:
            "Schedules workloads across GPUs, arbitrates model outputs, and auto-optimises performance over time."
        },
        {
          name: "MOTHER Secure",
          desc:
            "Data isolation with zero external access; air-gapped sandboxing for all proprietary models."
        },
        {
          name: "MOTHER Update",
          desc:
            "Controls quiet-hour deployments across apps, dashboards, and servers with rollback safety."
        }
      ]
    },
    {
      title: "IntuiPLAY Engagement",
      blurb:
        "Lightweight gamification that respects privacy and reinforces personalisation loops.",
      models: [
        {
          name: "PlaySuggest",
          desc:
            "Detects great moments to suggest games, quizzes or challenges (commutes, inactivity, mood dips)."
        },
        {
          name: "PlayLearn",
          desc:
            "Learns from gameplay patterns to refine personalisation without storing sensitive personal data."
        }
      ]
    },
    {
      title: "AI Production & Robotics",
      blurb:
        "Autonomous Virtual Production (VP) studio control across cameras, lights and creative workflow.",
      models: [
        {
          name: "AIDirector",
          desc:
            "Virtual director controlling robotic cameras, lights and scene setups from brief to shot-plan."
        },
        {
          name: "AIShotTrainer",
          desc:
            "Operators ‘teach’ preferred shots and transitions; the system automates them next time."
        },
        {
          name: "AILightOpt",
          desc:
            "Optimises studio lighting power while preserving creative intent and visual quality."
        }
      ]
    }
  ];

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">MSAI Models</h1>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto font-glacial">
            Proprietary models powering <span className="font-bold">MSAI Deployment V1</span> — from
            IntuiTV personalisation to orchestration by <span className="font-bold">MOTHER AI</span>.
          </p>
          <div className="mt-6 text-sm text-white/60 font-glacial">
            Explore how models connect below, then dive into each group of cards.
          </div>
        </div>
      </section>

      {/* INTERACTION DIAGRAM */}
      <section className="section border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">How the models interact</h2>
          <p className="mt-3 text-white/70 font-glacial">
            <span className="font-bold">MOTHER AI</span> orchestrates all subsystems. Content flows into{" "}
            <span className="font-bold">Content Intelligence</span>, which feeds{" "}
            <span className="font-bold">IntuiTV Personalisation</span>. Forecasting informs business decisions, and{" "}
            <span className="font-bold">VP/Robotics</span> uses intelligence for production.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4 overflow-hidden">
            <ModelInteractionDiagram />
          </div>
          <div className="mt-3 text-xs text-white/50 font-glacial">
            Animated lines show data/control flow; pulsing dots represent live signals.
          </div>
        </div>
      </section>

      {/* GROUPED CARDS */}
      {groups.map((g) => (
        <section key={g.title} className="section border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-horizon">{g.title}</h3>
            </div>
            <p className="mt-3 text-white/70 max-w-4xl font-glacial">{g.blurb}</p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {g.models.map((m) => (
                <div
                  key={m.name}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition"
                >
                  <div className="text-lg font-horizon">{m.name}</div>
                  <p className="mt-2 text-white/70 text-sm font-glacial">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h4 className="text-3xl sm:text-4xl font-horizon">Partner with MSAI</h4>
          <p className="mt-3 text-white/70 font-glacial">
            Integrate IntuiTV personalisation, run private model clusters, or pilot the AI VP Studio.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Talk to our team
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------
   Animated SVG (self-contained)
---------------------------- */
function ModelInteractionDiagram() {
  // The diagram is an 800x540 SVG with MOTHER AI at center and six hubs around it.
  // CSS lives inside <svg><style> so there’s no external stylesheet dependency.
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 540"
        className="w-full h-auto block"
        role="img"
        aria-label="Model interaction diagram with MOTHER AI orchestrating subsystems"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </radialGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Embedded CSS for animation */}
        <style>{`
          .hub       { fill: url(#nodeGlow); stroke: rgba(255,255,255,0.18); stroke-width: 1; }
          .hubText   { fill: #fff; font-size: 12px; letter-spacing: .02em; }
          .modelText { fill: #cbd5e1; font-size: 11px; }
          .center    { fill: url(#nodeGlow); stroke: rgba(255,255,255,0.25); stroke-width: 1.2; }
          .centerTxt { fill: #fff; font-size: 14px; font-weight: 700; }

          .link {
            stroke: rgba(56,189,248,.8); /* cyan-400 */
            stroke-width: 2;
            stroke-dasharray: 6 10;
            animation: dash 4.8s linear infinite;
            filter: url(#softGlow);
          }
          .link2 {
            stroke: rgba(139,92,246,.8); /* violet-500 */
            stroke-width: 1.6;
            stroke-dasharray: 4 10;
            animation: dash 6s linear infinite;
            filter: url(#softGlow);
          }
          @keyframes dash {
            to { stroke-dashoffset: -500; }
          }

          .pulse {
            fill: rgba(59,130,246,.9);
            animation: pulse 1.8s ease-in-out infinite;
          }
          @keyframes pulse {
            0%,100% { r: 3 }
            50% { r: 6 }
          }
        `}</style>

        {/* Center: MOTHER AI */}
        <g transform="translate(400,270)">
          <circle r="70" className="center" />
          <text className="centerTxt" textAnchor="middle" y="-6">MOTHER AI</text>
          <text className="modelText" textAnchor="middle" y="14">Core · Secure · Update</text>
        </g>

        {/* Hubs */}
        {/** Positions around the center */}
        <Hub x={400} y={80} title="Content Intelligence" models={["IntuiTagger","IntuiSummary","IntuiEngage"]} />
        <Hub x={660} y={200} title="IntuiTV Personalisation" models={["IntuiProfile","IntuiMood","IntuiSchedule"]} />
        <Hub x={620} y={420} title="VP & Robotics" models={["AIDirector","AIShotTrainer","AILightOpt"]} />
        <Hub x={180} y={420} title="IntuiPLAY" models={["PlaySuggest","PlayLearn"]} />
        <Hub x={140} y={200} title="Analytics & Forecast" models={["IntuiPredict","IntuiCase","IntuiMonetize"]} />
        <Hub x={400} y={480} title="Data & Infra" models={["Sovereign Clusters","GPU Orchestration","Pipelines"]} ghost />

        {/* Links from center to hubs */}
        {[
          [400,270, 400,110],
          [400,270, 640,200],
          [400,270, 600,400],
          [400,270, 200,400],
          [400,270, 160,200],
          [400,270, 400,440],
        ].map((coords, i) => (
          <line key={i} x1={coords[0]} y1={coords[1]} x2={coords[2]} y2={coords[3]} className="link" />
        ))}

        {/* Secondary links between hubs (content -> personalisation, analytics -> monetise, VP uses intelligence) */}
        <line x1={400} y1={110} x2={640} y2={200} className="link2" />
        <line x1={160} y1={200} x2={640} y2={200} className="link2" />
        <line x1={400} y1={110} x2={600} y2={400} className="link2" />

        {/* Pulsing nodes along a couple of links */}
        <circle cx="520" cy="235" r="4" className="pulse" />
        <circle cx="500" cy="165" r="4" className="pulse" />
        <circle cx="300" cy="360" r="4" className="pulse" />
      </svg>
    </div>
  );
}

/** Hub node + labels */
function Hub({
  x,
  y,
  title,
  models,
  ghost = false
}: {
  x: number;
  y: number;
  title: string;
  models: string[];
  ghost?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y})`} style={{ opacity: ghost ? 0.7 : 1 }}>
      <circle r="52" className="hub" />
      <text className="hubText" textAnchor="middle" y="-60">
        {title}
      </text>
      {/* Model labels stacked below the hub */}
      {models.map((m, i) => (
        <text
          key={m}
          className="modelText"
          textAnchor="middle"
          y={24 + i * 14}
        >
          {m}
        </text>
      ))}
    </g>
  );
}