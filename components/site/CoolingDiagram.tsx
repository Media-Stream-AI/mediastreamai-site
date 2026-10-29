'use client';

// The Horizon cooling and heat-reuse cascade at DC1-B, drawn as a schematic
// rather than photographed: it is a process diagram, and a diagram is the
// honest way to show a process.
//
// It follows the plant as built - a closed primary loop of 25% glycol between
// the direct-liquid-cooled hall and a titanium plate heat exchanger, and a
// secondary sewer-source loop that passes heat, not water, into the wet well
// (heat only - the flow passes through, there is no abstraction). Heat reuse
// into the gas-plant absorption circuit and a chiller trim stand behind it,
// both idle whenever free cooling alone holds the supply temperature.
//
// Figures are the design operating point taken from the Horizon digital twin.
// Decorative parts are aria-hidden; the figure carries one description.

const NODE = 'fill-night-600 stroke-hair';

export default function CoolingDiagram({ className = '' }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="card-night overflow-hidden p-4 md:p-6">
        <svg
          viewBox="0 0 900 424"
          className="h-auto w-full"
          role="img"
          aria-label="The Horizon cooling cascade at DC1-B. A direct-liquid-cooled data hall sends 42 degree hot return through a titanium plate heat exchanger and takes 30 degree cold supply back. On the secondary side an 11 degree sewer-source loop absorbs the heat and leaves at 20.8 degrees. A gas-plant absorption circuit for heat reuse and a standby chiller trim sit above, both at zero load while free cooling alone holds the supply temperature."
        >
          <defs>
            <linearGradient id="hot" x1="0" x2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="cold" x1="1" x2="0">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0EA5C4" />
            </linearGradient>
            <marker id="arrowHot" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#F59E0B" />
            </marker>
            <marker id="arrowCold" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#22D3EE" />
            </marker>
          </defs>

          {/* ---------- standby tier: heat reuse + chiller trim ---------- */}
          <g>
            <rect x="40" y="18" width="240" height="78" rx="12" className={NODE} strokeWidth="1" />
            <text x="160" y="46" textAnchor="middle" className="fill-muted" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
              HEAT-REUSE ABSORPTION
            </text>
            <text x="160" y="72" textAnchor="middle" className="fill-mist font-mono" style={{ fontSize: 18 }}>0.00 MW</text>
            <text x="160" y="88" textAnchor="middle" className="fill-muted/70" style={{ fontSize: 10 }}>gas-plant CHP · avail 6.1 MW</text>

            <rect x="330" y="18" width="220" height="78" rx="12" className={NODE} strokeWidth="1" strokeDasharray="4 4" />
            <text x="440" y="46" textAnchor="middle" className="fill-muted" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
              CHILLER TRIM
            </text>
            <text x="440" y="72" textAnchor="middle" className="fill-mist font-mono" style={{ fontSize: 18 }}>0.00 MW</text>
            <text x="440" y="88" textAnchor="middle" className="fill-muted/70" style={{ fontSize: 10 }}>standby · zero mechanical</text>
          </g>

          {/* dashed standby tie-ins */}
          <path d="M160 96 L160 150 L300 150" className="stroke-hair" strokeWidth="1.5" strokeDasharray="5 5" fill="none" aria-hidden />
          <path d="M440 96 L440 150" className="stroke-hair" strokeWidth="1.5" strokeDasharray="5 5" fill="none" aria-hidden />

          {/* ---------- data hall ---------- */}
          <rect x="40" y="170" width="220" height="180" rx="14" className={NODE} strokeWidth="1.5" />
          <text x="150" y="200" textAnchor="middle" className="fill-mist" style={{ fontSize: 14, letterSpacing: '0.06em' }}>
            DATA HALL · DLC
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={62 + i * 30} y={216} width="18" height="80" rx="3" className="fill-cyan/10 stroke-cyan/40" strokeWidth="1" aria-hidden />
          ))}
          <text x="150" y="322" textAnchor="middle" className="fill-cyan font-mono" style={{ fontSize: 15 }}>9.1 MW IT</text>
          <text x="150" y="340" textAnchor="middle" className="fill-ember/80 font-mono" style={{ fontSize: 10 }}>8.2 MW liquid · 0.91 MW air</text>

          {/* ---------- hot return ---------- */}
          <path d="M262 214 L392 214" stroke="url(#hot)" strokeWidth="4" markerEnd="url(#arrowHot)" fill="none" />
          <text x="327" y="202" textAnchor="middle" className="fill-ember font-mono" style={{ fontSize: 11 }}>HOT return 42.0°</text>

          {/* ---------- cold supply ---------- */}
          <path d="M392 306 L262 306" stroke="url(#cold)" strokeWidth="4" markerEnd="url(#arrowCold)" fill="none" />
          <text x="330" y="330" textAnchor="middle" className="fill-cyan font-mono" style={{ fontSize: 11 }}>COLD 30.0°</text>
          <circle cx="282" cy="306" r="10" className="fill-night-600 stroke-ember" strokeWidth="1.5" aria-hidden />
          <text x="282" y="290" textAnchor="middle" className="fill-ember/80 font-mono" style={{ fontSize: 9 }}>PUMP</text>

          {/* ---------- titanium PHE ---------- */}
          <rect x="396" y="170" width="120" height="180" rx="12" className="fill-night-500 stroke-cyan/40" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={410 + i * 14} y={196} width="7" height="128" rx="2" className="fill-mist/25" aria-hidden />
          ))}
          <text x="456" y="188" textAnchor="middle" className="fill-mist" style={{ fontSize: 12, letterSpacing: '0.06em' }}>
            TITANIUM PHE
          </text>
          <text x="456" y="342" textAnchor="middle" className="fill-muted/70 font-mono" style={{ fontSize: 9 }}>WRAS Cat-5</text>

          {/* ---------- secondary loop to wet well ---------- */}
          <path d="M518 214 L648 214" stroke="url(#hot)" strokeWidth="4" markerEnd="url(#arrowHot)" fill="none" />
          <text x="583" y="202" textAnchor="middle" className="fill-ember/90 font-mono" style={{ fontSize: 11 }}>WARM → well 20.8°</text>
          <path d="M648 306 L518 306" stroke="url(#cold)" strokeWidth="4" markerEnd="url(#arrowCold)" fill="none" />
          <text x="583" y="326" textAnchor="middle" className="fill-cyan font-mono" style={{ fontSize: 11 }}>COLD ← well 11.0°</text>

          {/* ---------- sewer wet well ---------- */}
          <rect x="652" y="150" width="208" height="216" rx="14" className="fill-cyan/10 stroke-cyan/35" strokeWidth="1.5" />
          <text x="756" y="178" textAnchor="middle" className="fill-mist" style={{ fontSize: 13, letterSpacing: '0.06em' }}>
            SEWER WET WELL
          </text>
          <text x="756" y="256" textAnchor="middle" className="fill-cyan font-mono" style={{ fontSize: 26 }}>11.0 °C</text>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${692 + i * 44} 348 L${692 + i * 44} 296`} className="stroke-cyan/50" strokeWidth="2" markerEnd="url(#arrowCold)" fill="none" aria-hidden />
          ))}
          <text x="756" y="384" textAnchor="middle" className="fill-muted/60" style={{ fontSize: 9.5 }}>
            heat only · flow passes through · no abstraction
          </text>

          {/* ---------- loop captions ---------- */}
          <text x="327" y="384" textAnchor="middle" className="fill-muted/60 font-mono" style={{ fontSize: 9.5 }}>primary · 25% glycol</text>
          <text x="583" y="384" textAnchor="middle" className="fill-muted/60 font-mono" style={{ fontSize: 9.5 }}>secondary · sewer source</text>
        </svg>

        {/* ---------- operating point ---------- */}
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hair bg-hair sm:grid-cols-4 lg:grid-cols-7">
          {[
            { k: '8.19 MW', v: 'Liquid duty' },
            { k: '100%', v: 'Free cooling' },
            { k: '30.0 °C', v: 'Primary supply' },
            { k: '42.0 °C', v: 'Primary return' },
            { k: '12.0 °C', v: 'Loop ΔT' },
            { k: '175 / 200', v: 'Prim / sec L/s' },
            { k: '1.110', v: 'PUE' },
          ].map((s) => (
            <div key={s.v} className="bg-night-800/80 px-3 py-4 text-center">
              <div className="font-mono text-sm text-cyan">{s.k}</div>
              <div className="mt-1 text-[9px] uppercase tracking-widest text-muted">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 text-center text-xs leading-relaxed text-muted/70">
        Horizon digital twin · DC1-B · design operating point. Free cooling alone holds the 30 °C supply -
        zero mechanical cooling, zero heat reuse called. The cascade below is what happens when it cannot.
      </figcaption>
    </figure>
  );
}
