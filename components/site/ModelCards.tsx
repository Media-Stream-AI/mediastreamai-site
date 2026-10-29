'use client';

// Interactive cards for the MOTHER model family, one per model, each opening
// onto three panels: what it is, what it was trained on, and what it can do.
//
// The data lives in lib/mother-models so the home-page strip, the nav and this
// page cannot drift apart. Every figure there is taken from something MSAI
// already publishes - the Art. 53(1)(d) public training-content summary in
// /downloads and the model cards on Hugging Face - rather than written for the
// page. Models that are not released say so, and the access-gated repositories
// are labelled as gated rather than implying a download.

import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Cpu, Database, Sparkles } from 'lucide-react';
import Image from 'next/image';
import {
  MOTHER_MODELS, AVAILABILITY_LABEL, type Availability,
} from '@/lib/mother-models';

const BADGE_CLASS: Record<Availability, string> = {
  open: 'text-cyan border-cyan/30 bg-cyan/[0.08]',
  gated: 'text-violet border-violet/30 bg-violet/[0.08]',
  'in-family': 'text-mist border-hair bg-white/5',
  pipeline: 'text-ember border-ember/30 bg-ember/[0.08]',
};

const TABS = [
  { id: 'details', label: 'Model details', icon: Cpu },
  { id: 'training', label: 'Training data', icon: Database },
  { id: 'capabilities', label: 'Capabilities', icon: Sparkles },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function ModelCards() {
  const [openId, setOpenId] = useState<string | null>(MOTHER_MODELS[0].id);
  const [tab, setTab] = useState<Record<string, TabId>>({});

  // Deep links from elsewhere on the site (/model-family#exo) should land on
  // the card *open*, not on a collapsed row the visitor has to find again.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (MOTHER_MODELS.some((m) => m.id === id)) setOpenId(id);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {MOTHER_MODELS.map((model) => {
        const isOpen = openId === model.id;
        const active = tab[model.id] ?? 'details';
        // A model published on Hugging Face gets the link on the card face
        // itself, not buried in an expanded panel.
        const hf = model.links.find((l) => l.huggingface);

        return (
          <div
            key={model.id}
            id={model.id}
            className={`card-night scroll-mt-28 overflow-hidden transition-colors ${isOpen ? 'md:col-span-2 border-cyan/25' : 'card-hover'}`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : model.id)}
              aria-expanded={isOpen}
              aria-controls={`${model.id}-panel`}
              className="flex w-full items-start gap-4 p-5 text-left"
            >
              <span className="flex-1">
                <span className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-xl text-mist">{model.name}</span>
                  <span className={`chip !py-0.5 !text-[10px] ${BADGE_CLASS[model.availability]}`}>
                    {AVAILABILITY_LABEL[model.availability]}
                  </span>
                  <span className="chip !py-0.5 !text-[10px]">{model.status}</span>
                </span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-muted">{model.kicker}</span>
                <span className="mt-2.5 block text-sm leading-relaxed text-muted">{model.blurb}</span>
                <span className="mt-3 block font-mono text-[11px] tracking-wide text-cyan">{model.headline}</span>
              </span>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {hf && (
              <a
                href={hf.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-5 mb-5 flex items-center gap-2.5 rounded-xl border border-hair bg-white/[0.03] px-4 py-2.5 text-sm text-mist transition-colors hover:border-cyan/40 hover:bg-white/[0.06]"
              >
                <Image src="/huggingface-logo.svg" alt="" width={18} height={18} className="shrink-0" />
                <span className="flex-1 truncate">{hf.label}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan" />
              </a>
            )}

            {isOpen && (
              <div id={`${model.id}-panel`} className="border-t border-hair px-5 pb-5">
                <div role="tablist" aria-label={`${model.name} information`} className="flex flex-wrap gap-2 py-4">
                  {TABS.map((t) => {
                    const selected = active === t.id;
                    return (
                      <button
                        key={t.id}
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setTab((s) => ({ ...s, [model.id]: t.id }))}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                          selected ? 'border-cyan/40 bg-cyan/[0.08] text-mist' : 'border-hair text-muted hover:text-mist'
                        }`}
                      >
                        <t.icon className="h-3.5 w-3.5" /> {t.label}
                      </button>
                    );
                  })}
                </div>

                <div role="tabpanel">
                  {active === 'details' && (
                    <dl className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {model.details.map((d) => (
                        <div key={d.k} className="flex justify-between gap-4 border-b border-hair/60 pb-2 text-sm">
                          <dt className="text-muted">{d.k}</dt>
                          <dd className="text-right text-mist">{d.v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {active === 'training' && (
                    <div>
                      <p className="text-sm leading-relaxed text-muted">{model.training.note}</p>
                      {model.training.rows && (
                        <dl className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                          {model.training.rows.map((r) => (
                            <div key={r.k} className="flex justify-between gap-4 border-b border-hair/60 pb-2 text-sm">
                              <dt className="text-muted">{r.k}</dt>
                              <dd className="text-right text-mist">{r.v}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      <p className="mt-4 text-xs text-muted/70">
                        Published in full under EU AI Act Art. 53(1)(d). Shares by record count, measured over the corpus.
                      </p>
                    </div>
                  )}

                  {active === 'capabilities' && (
                    <ul className="space-y-2.5">
                      {model.capabilities.map((c) => (
                        <li key={c} className="flex gap-2.5 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hair pt-4">
                  {model.links.map((l) => {
                    const external = l.href.startsWith('http');
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center gap-1.5 text-sm text-cyan hover:underline"
                      >
                        {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
