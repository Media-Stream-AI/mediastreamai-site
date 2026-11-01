// MSAI Cloud & Compute (gpu.mediastreamai.com): the sovereign GPU cloud that
// sells layers 02-03 of the stack as a metered, multi-tenant service.
//
// Copy restates only what the control plane itself shows. GPU counts are
// deliberately left out until the figures on gpu.mediastreamai.com and on
// this site are reconciled (see docs/qa/2026-10-30-cube-hero/README.md).
// The product keeps its own green identity inside the corporate frame.

import { ArrowUpRight, Cpu, Gauge, KeyRound, Layers, LineChart, Brain, ShieldCheck, Database } from 'lucide-react';
import Reveal from '../Reveal';

export const MSAI_CLOUD_URL = 'https://gpu.mediastreamai.com';

const CAPABILITIES = [
  { icon: Cpu, title: 'GPU clusters', body: 'NVIDIA B300 and H200 clusters across MSAI Scotland (Dundee) and MSAI Manchester, under one sovereign control plane.' },
  { icon: Layers, title: 'One scheduler', body: 'A single scheduler across sites, with dstack, KAI, HAMi, GPUStack, Grove, Tensor Fusion and SkyPilot as plug-and-play providers.' },
  { icon: Gauge, title: 'Multi-tenant and metered', body: 'Per-tenant quotas, usage metering from second zero and invoice generation built into the platform.' },
  { icon: KeyRound, title: 'Identity and residency', body: 'RBAC, data residency controls and sign-in with email, Google or Microsoft.' },
  { icon: Brain, title: 'MOTHER-ready', body: 'Deploy MOTHER and Intui model services against your own tenancy, on the same hardware they were trained on.' },
  { icon: LineChart, title: 'Experiments to deployment', body: 'Experiment tracking, datasets and a model registry on a sovereign ClearML server, linked to each deploy.' },
  { icon: Database, title: 'Vector RAG memory', body: 'Sovereign, multi-tenant retrieval (Qdrant + BGE-M3) for the MOTHER and Intui families.' },
  { icon: ShieldCheck, title: 'Watched by Sentinel', body: 'MOTHER Sentinel monitors login, audit and policy events across the control plane in real time.' },
];

export default function CloudSection() {
  return (
    <section id="cloud" className="section-padding pt-0 scroll-mt-24">
      <div className="container-custom">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#5FB82A]/25 bg-[#07090a] p-6 sm:p-10 lg:p-14">
            <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#5FB82A]/15 blur-3xl" />
            <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              {/* copy */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#5FB82A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#07090a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#07090a]" aria-hidden />
                    UK &amp; EU sovereign GPU cloud
                  </span>
                  <span className="status-pill" data-status="rolling-out">Rolling out 2026</span>
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8fd45b]">Layers 02 · 03 as a service</p>
                <h2 className="mt-3 font-display text-4xl leading-[0.95] md:text-6xl">
                  MSAI Cloud <span className="text-[#8fd45b]">&amp; Compute.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                  The sovereign control plane for MSAI Compute. GPU clusters in our own UK data centres, sold as
                  multi-tenant, metered GPU-as-a-service, with the MOTHER models ready to deploy on top. No
                  hyperscaler in the path.
                </p>
                <a
                  href={MSAI_CLOUD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5FB82A] px-6 py-3.5 text-base font-semibold text-[#07090a] transition-[transform,filter] duration-fast hover:-translate-y-0.5 hover:brightness-110"
                >
                  Open the control plane
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                  <span className="sr-only">(gpu.mediastreamai.com, opens in a new tab)</span>
                </a>
                <p className="mt-3 font-mono text-xs text-muted/80">gpu.mediastreamai.com</p>
              </div>

              {/* visuals */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(95,184,42,0.55)] lg:[transform:perspective(1400px)_rotateY(-6deg)_rotateX(2deg)]">
                  <picture>
                    <source type="image/avif" srcSet="/msai-cubes/msai-cloud-compute-gpu-1024.avif" />
                    <img
                      src="/msai-cubes/msai-cloud-compute-gpu-1024.webp"
                      srcSet="/msai-cubes/msai-cloud-compute-gpu-1024.webp 1024w, /msai-cubes/msai-cloud-compute-gpu-1600.webp 1600w"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      alt="The MSAI Cloud home screen: the sovereign control plane for MSAI Compute, with GPU capacity counters, a rack illustration and Compute, Models and Control service cards."
                      width={1024}
                      height={692}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </picture>
                </div>
                <div className="absolute -bottom-8 -right-2 hidden w-[34%] overflow-hidden rounded-2xl border border-white/10 bg-[#07090a] shadow-2xl sm:block lg:-right-6">
                  <picture>
                    <source type="image/avif" srcSet="/msai-cubes/msai-cloud-mobile-signin-640.avif" />
                    <img
                      src="/msai-cubes/msai-cloud-mobile-signin-640.webp"
                      alt="MSAI Cloud mobile sign-in screen with email, Google and Microsoft options, above the MSAI wordmark and 'Sovereign GPU-as-a-service'."
                      width={640}
                      height={784}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* capabilities */}
            <ul className="relative mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CAPABILITIES.map((c) => (
                <li key={c.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-fast hover:border-[#5FB82A]/40">
                  <c.icon className="h-5 w-5 text-[#8fd45b]" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-mist">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
