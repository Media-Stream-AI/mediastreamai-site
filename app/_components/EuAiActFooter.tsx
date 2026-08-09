// EU AI Act — Model Transparency · drop-in footer section (React / Next.js)
// Render <EuAiActFooter /> inside your existing site footer. Tailwind classes;
// if a site doesn't use Tailwind, use footer-section.html instead.
// Place the three PDFs under the site's public/downloads/ (Next.js) or static
// assets so the /downloads/*.pdf links resolve.

const EU_AI_ACT_DOCS: { href: string; label: string }[] = [
  { href: "/downloads/MOTHER-EU-Copyright-Policy.pdf", label: "Copyright Policy — Art. 53(1)(c)" },
  { href: "/downloads/MOTHER-Training-Content-Summary.pdf", label: "Training-Content Summary — Art. 53(1)(d)" },
  { href: "/downloads/MOTHER-Technology-Due-Diligence.pdf", label: "Technology Due Diligence" },
];

export default function EuAiActFooter() {
  return (
    <section className="mt-3.5 max-w-3xl border-t border-white/10 pt-3" aria-label="EU AI Act transparency">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/70">
        EU AI Act — Model Transparency
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-white/40">
        MOTHER CORE V2 &amp; V3 are open-weight general-purpose AI models. As their provider, Media Stream AI publishes
        the documents required under Article 53 of the EU AI Act (Regulation (EU) 2024/1689) — a copyright-compliance
        policy and a public summary of training content — together with our full technology due-diligence dossier:
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px]">
        {EU_AI_ACT_DOCS.map((d) => (
          <a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noopener"
            className="text-white/55 transition hover:text-cyan-300"
          >
            ↓ {d.label}
          </a>
        ))}
      </div>
    </section>
  );
}
