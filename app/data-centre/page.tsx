"use client";

import Image from "next/image";
import Link from "next/link";

export default function DataCentrePage() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Background hero (use your real canal / facility photo) */}
        <div className="absolute inset-0">
          <Image
            src="/media/canal-cooling-hero.jpg" // ← put your hero image here
            alt="Canal-Side AI Data Centre"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="flex items-center justify-center">
            <Image
              src="/media/AI DATA CENTRE - WHITE.png" // ← logo you provided earlier
              alt="Canal-Side AI Data Centre Logo"
              width={260}
              height={80}
              className="w-auto h-12 md:h-16 object-contain"
            />
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-horizon">
            Canal-Cooled AI Data Centre
          </h1>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto font-glacial">
            Sustainable, high-density GPU compute cooled by canal water—built to
            power Media Stream AI, IntuiTV personalization, and your cloud workloads.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#specs" className="btn btn-primary">View Specs</a>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-3xl font-horizon">Sustainable by Design</h2>
            <p className="mt-4 text-white/70 font-glacial">
              Our canal-side facilities use closed-loop heat exchange with canal water
              to remove heat from high-density GPU racks—reducing grid strain and
              fresh-water usage. Waste heat can be repurposed locally for canal
              ecology projects and nearby buildings.
            </p>
            <ul className="mt-6 text-white/80 space-y-2 font-glacial">
              <li>• Canal water heat-exchange with low ecological impact</li>
              <li>• High-density racks for modern GPU clusters</li>
              <li>• Renewable-ready power integration</li>
              <li>• Designed for AI training, fine-tuning, and real-time inference</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="aspect-video overflow-hidden rounded-xl bg-white/5">
              <Image
                src="/media/MRF_LitterStream_PID.png" // ← diagram provided earlier
                alt="Cooling / canal process diagram"
                width={1600}
                height={900}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-3 text-white/60 text-sm font-glacial">
              Process &amp; instrumentation diagram (illustrative)
            </p>
          </div>
        </div>
      </section>

      {/* COOLING & WATERWORKS DETAIL */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-2xl font-horizon">Canal Cleaning &amp; Waterworks</h3>
            <p className="mt-4 text-white/70 font-glacial">
              Our infrastructure supports canal restoration: filtration skimmers,
              debris capture, and real-time monitoring help return cleaner water to the canal.
              The system runs in concert with the heat-exchange loop, ensuring both
              compute efficiency and canal health.
            </p>
            <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-white/5">
              <Image
                src="/media/MRF_AddOn_Schematic.png" // ← schematic provided earlier
                alt="Canal cleaning add-on schematic"
                width={1600}
                height={900}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-2xl font-horizon">Cloud GPU &amp; AI Services</h3>
            <p className="mt-4 text-white/70 font-glacial">
              We provide consumption-based access to GPU instances optimized for
              training, fine-tuning, and inference—integrated with Media Stream AI and
              IntuiTV pipelines.
            </p>
            <ul className="mt-4 text-white/80 space-y-2 font-glacial">
              <li>• On-demand &amp; reserved GPU instances</li>
              <li>• Private clusters for sovereign workloads</li>
              <li>• Managed model hosting and inference APIs</li>
              <li>• Burst rendering &amp; media pipelines</li>
            </ul>
          </div>
        </div>
      </section>

      {/* GPU / SERVICES GRID */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-horizon">GPU Tiers &amp; Services</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: "Inference",
                d: "Low-latency instances for real-time personalization and stream metadata.",
                s: "NVIDIA L4 / A10G class"
              },
              {
                t: "Fine-Tuning",
                d: "Mid-range multi-GPU for continual / transfer learning.",
                s: "A4000 / A5000 class"
              },
              {
                t: "Training",
                d: "High-density multi-node training for vision & recsys models.",
                s: "A100 / H100 class"
              },
              {
                t: "Media Rendering",
                d: "Burst rendering for VP / VFX pipelines.",
                s: "L40 / A6000 class"
              }
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-lg font-horizon">{x.t}</div>
                <p className="mt-2 text-white/70 text-sm font-glacial">{x.d}</p>
                <div className="mt-3 text-white/60 text-xs font-glacial">Typical GPUs: {x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEC TABLE */}
      <section id="specs" className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-horizon">Facility Specifications</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="min-w-full text-sm font-glacial">
              <tbody className="[&_tr]:border-b [&_tr]:border-white/10 last:[&_tr]:border-0">
                <tr>
                  <td className="px-4 py-3 text-white/60">Cooling</td>
                  <td className="px-4 py-3">Closed-loop canal water heat-exchange + dry coolers</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Target PUE</td>
                  <td className="px-4 py-3">&lt; 1.2 (design point)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Rack Density</td>
                  <td className="px-4 py-3">Up to 30–60 kW/rack (high-density aisles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Power</td>
                  <td className="px-4 py-3">Renewable-ready, multi-feed with UPS + genset</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Security</td>
                  <td className="px-4 py-3">24/7 monitored, multi-factor access, zoned cages</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Connectivity</td>
                  <td className="px-4 py-3">Multi-carrier, redundant fiber, private interconnects</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Compliance</td>
                  <td className="px-4 py-3">ISO 27001 (planned), SOC 2 (planned)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LOCATIONS / ROADMAP */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-horizon">Locations &amp; Roadmap</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-horizon">Manchester, UK</div>
              <p className="mt-2 text-white/70 text-sm font-glacial">
                Data Sovereign Cluster (UK). <b>Target: Q1 2026</b>.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-horizon">Germany (EU)</div>
              <p className="mt-2 text-white/70 text-sm font-glacial">
                Planned EU data centre for sovereign workloads. <b>Target: 2026</b>.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-horizon">France (EU)</div>
              <p className="mt-2 text-white/70 text-sm font-glacial">
                Planned EU data centre for sovereign workloads. <b>Target: 2026</b>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-horizon">FAQ</h2>
          <div className="mt-8 space-y-4">
            {[
              {
                q: "How does the canal cooling work?",
                a: "A closed-loop heat exchanger transfers heat from data hall water to a secondary circuit interacting with canal water, with filtration and temperature safeguards to protect canal health."
              },
              {
                q: "Can we colocate private, sovereign clusters?",
                a: "Yes. We offer dedicated cages and private subnets with compliance roadmaps for ISO 27001 and SOC 2."
              },
              {
                q: "What GPUs are available?",
                a: "Inference (L4/A10G), fine-tuning (A4000/A5000), training (A100/H100), and media (L40/A6000) tiers depending on workload."
              },
              {
                q: "Do you offer managed services?",
                a: "We provide managed model hosting, inference APIs, burst rendering, and integration with Media Stream AI / IntuiTV."
              }
            ].map((f) => (
              <details key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <summary className="cursor-pointer font-horizon">{f.q}</summary>
                <p className="mt-2 text-white/70 font-glacial">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section border-t border-white/10 text-center relative overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">Need sustainable AI compute?</h2>
          <p className="mt-3 text-white/70 font-glacial">
            Get access to canal-cooled GPU clusters or discuss private sovereign builds.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">Contact our team</Link>
        </div>
      </section>
    </main>
  );
}