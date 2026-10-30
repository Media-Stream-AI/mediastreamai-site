// "How the stack fits together": the six platform entry points (the hero
// cubes) mapped onto the seven owned layers (StackDiagram). It exists so a
// visitor never confuses the two - the cubes are doors, the layers are the
// building they open into.
//
// Desktop renders a real <table>; small screens get one card per platform so
// nothing scrolls sideways.

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LAYERS } from './StackDiagram';
import { PLATFORMS, PLATFORM_STATUS_LABEL } from '@/lib/platforms';

// LAYERS runs top-down (07 → 01); "Layer 07" → 7.
const ROWS = LAYERS.map((l) => ({ n: Number(l.tier.replace(/\D/g, '')), name: l.name, href: l.href }));

const layerName = (n: number) => ROWS.find((r) => r.n === n)?.name ?? `Layer ${n}`;

export default function StackFit() {
  return (
    <div>
      {/* ---------- desktop matrix ---------- */}
      <div className="hidden overflow-hidden rounded-2xl border border-hair bg-night-800/60 md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Which of the seven stack layers each of the six MSAI platforms runs on
          </caption>
          <thead>
            <tr className="border-b border-hair">
              <th scope="col" className="w-[26%] px-5 py-4 align-bottom font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted">
                Stack layer ↓ · Platform →
              </th>
              {PLATFORMS.map((p) => (
                <th key={p.id} scope="col" className="px-2 py-4 text-center align-bottom">
                  <span className="mx-auto mb-2 block h-1 w-8 rounded-full" style={{ background: p.accent }} aria-hidden />
                  <span className="block font-display text-[13px] leading-tight tracking-wide text-mist lg:text-sm">{p.name}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-widest text-muted">{PLATFORM_STATUS_LABEL[p.status]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.n} className="border-b border-hair last:border-0">
                <th scope="row" className="px-5 py-3 font-normal">
                  {row.href ? (
                    <Link href={row.href} className="group inline-flex items-center gap-3 text-sm text-mist hover:text-cyan">
                      <span className="font-mono text-[10px] text-muted">{String(row.n).padStart(2, '0')}</span>
                      {row.name}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    </Link>
                  ) : (
                    <span className="text-sm text-mist">{row.name}</span>
                  )}
                </th>
                {PLATFORMS.map((p) => {
                  const on = p.layers.includes(row.n);
                  return (
                    <td key={p.id} className="px-2 py-3 text-center">
                      {on ? (
                        <span
                          className="mx-auto block h-3 w-3 rounded-[3px]"
                          style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }}
                          aria-label={`${p.name} runs on ${row.name}`}
                          role="img"
                        />
                      ) : (
                        <span className="mx-auto block h-1 w-1 rounded-full bg-white/15" aria-hidden />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- mobile cards ---------- */}
      <ul className="grid gap-3 md:hidden">
        {PLATFORMS.map((p) => (
          <li key={p.id} className="card-night p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-lg tracking-wide text-mist">{p.name}</span>
              <span className="status-pill" data-status={p.status}>{PLATFORM_STATUS_LABEL[p.status]}</span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">Runs on</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {p.layers.slice().sort((a, b) => b - a).map((n) => (
                <li key={n} className="chip !py-1 !text-[10px]">
                  {String(n).padStart(2, '0')} · {layerName(n)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
