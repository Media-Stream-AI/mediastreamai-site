"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Article = {
  title: string;
  href: string;
  source: string;
  date: string; // free text
  image: string; // put a file in /public/media/news/...
  tag?: string;
};

const ARTICLES: Article[] = [
  {
    title:
      "Charismatic AI & Media Stream AI partner on hyper-personalised story generation for TV",
    href: "https://www.c21media.net/news/charismatic-ai-media-stream-ai-partner-on-hyper-personalised-story-generation-tool-for-tv",
    source: "C21Media",
    date: "2025",
    image: "/media/news/c21-charismatic-msai.jpg",
    tag: "Partnership",
  },
  {
    title:
      "Media Stream AI puts Manchester on the map with AI models, robotics lab and autonomous VP studio",
    href: "https://genbmag.com/media-stream-ai-puts-manchester-on-the-map-with-ai-models-robotics-lab-and-autonomous-vp-studio/",
    source: "GenB Magazine",
    date: "2025",
    image: "/media/news/genb-manchester.jpg",
    tag: "Ecosystem",
  },
  {
    title: "Media Stream AI: the future of personalized linear TV is here",
    href: "https://www.blacknews.uk/media-stream-ai-the-future-of-personalized-linear-tv-is-here",
    source: "Black News UK",
    date: "2025",
    image: "/media/news/blacknews-tv.jpg",
    tag: "Opinion",
  },
  {
    title:
      "Media Stream AI joins NVIDIA Inception program to accelerate innovation in AI-driven streaming",
    href: "https://genbmag.com/media-stream-ai-joins-nvidia-inception-program-to-accelerate-innovation-in-ai-driven-streaming/",
    source: "GenB Magazine",
    date: "2025",
    image: "/media/news/genb-inception.jpg",
    tag: "Milestone",
  },
  {
    title:
      "Media Stream AI & Charismatic AI to revolutionise TV with hyper-personalised story generation",
    href: "https://genbmag.com/media-stream-ai-charismatic-ai-partner-to-revolutionise-tv-with-hyper-personalised-story-generation/",
    source: "GenB Magazine",
    date: "2025",
    image: "/media/news/genb-charismatic.jpg",
    tag: "Partnership",
  },
  {
    title:
      "Media Stream AI joins the Grow London MediaTech Trade Mission in Madrid & Paris",
    href: "https://genbmag.com/media-stream-ai-joins-the-grow-london-mediatech-trade-mission-in-madrid-and-paris/",
    source: "GenB Magazine",
    date: "2025",
    image: "/media/news/genb-trade-mission.jpg",
    tag: "Events",
  },
  {
    title:
      "Media Stream AI readies global launch of IntuiTV as it closes funding round ahead of 2026 UK IPO",
    href: "https://chapterzmagazine.com/2025/08/media-stream-ai-readies-global-launch-of-intuitv-as-it-closes-funding-round-ahead-of-2026-uk-ipo/",
    source: "Chapter Z",
    date: "Aug 2025",
    image: "/media/news/chapterz-ipo.jpg",
    tag: "Funding",
  },
  {
    title:
      "MSAI’s CEO Christopher Kenna to speak at Global Innovation Summit 2025",
    href: "https://chapterzmagazine.com/2025/06/media-stream-ais-ceo-christopher-kenna-to-speak-at-global-innovation-summit-2025/",
    source: "Chapter Z",
    date: "Jun 2025",
    image: "/media/news/chapterz-gis.jpg",
    tag: "Speaking",
  },
];

export default function NewsPage() {
  // pick first 3 as featured (tweak as you wish)
  const featured = ARTICLES.slice(0, 3);
  const rest = ARTICLES.slice(3);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-horizon text-4xl md:text-6xl"
          >
            News & Press
          </motion.h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto font-glacial">
            Coverage, announcements, and milestones from across the Media Stream AI
            ecosystem.
          </p>
        </div>
      </section>

      {/* FEATURED ROW */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          {featured.map((a, i) => (
            <motion.article
              key={a.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden relative"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {a.tag && (
                  <span className="absolute left-3 top-3 rounded-lg bg-white/10 border border-white/20 px-2 py-1 text-xs font-glacial">
                    {a.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-horizon leading-snug">
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {a.title}
                  </a>
                </h3>
                <div className="mt-2 text-xs text-white/60 font-glacial">
                  {a.source} • {a.date}
                </div>
                <div className="mt-4">
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    Read article <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ boxShadow: "inset 0 0 120px rgba(99, 179, 237, 0.12)" }} />
            </motion.article>
          ))}
        </div>
      </section>

      {/* GRID (rest) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((a, i) => (
              <motion.article
                key={a.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-horizon leading-snug">
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {a.title}
                    </a>
                  </h3>
                  <div className="mt-2 text-xs text-white/60 font-glacial">
                    {a.source} • {a.date}
                  </div>
                  <div className="mt-4">
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                    >
                      Read article <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center relative overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">Press enquiries</h2>
          <p className="mt-3 text-white/70 font-glacial">
            For interviews, images, or product briefings, reach out to the Media Stream AI team.
          </p>
          <Link
            href="/contact"
            className="btn btn-primary mt-6 inline-flex"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </main>
  );
}
