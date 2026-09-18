// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, Play, Cpu, Boxes, Shield, Atom, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PILLARS: { label: string; href: string; icon: typeof Cpu; blurb: string }[] = [
  { label: 'MOTHER Models', href: '/model-family', icon: Cpu, blurb: '7 sovereign models · 240B parameters' },
  { label: 'IntuiTV · IntuiStudio', href: '/intuitv', icon: Play, blurb: 'AI television · Creator · Playout' },
  { label: 'MOTHER EXO', href: '/exo', icon: Boxes, blurb: 'Physical AI · humanoid · Manchester 2027' },
  { label: 'MOTHER Defence', href: '/defence', icon: Shield, blurb: 'Air-gapped, dual-use, sovereign' },
];

const EXTRAS: { label: string; href: string; icon: typeof Cpu; blurb: string }[] = [
  { label: 'Quantum-AI', href: '/quantum', icon: Atom, blurb: 'Quantum-enhanced sovereign RAG' },
  { label: 'MSAI Compute · Colocation', href: '/colocation', icon: Server, blurb: '25 MW colo now · 38 MW site' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 border-b ${
        scrolled ? 'bg-night/80 backdrop-blur-xl border-hair' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark. The MSAI mark is drawn as SVG text with a forced
              advance width (textLength + lengthAdjust="spacing") so it always
              measures exactly as wide as the "Sovereign UK AI" lockup beneath
              it - a font-size alone could never guarantee that, and Anton's
              metrics shift while the webfont loads. */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Media Stream AI - home">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan via-iris to-magenta shadow-glow-violet">
              <span className="h-4 w-4 rounded-full bg-night" />
            </span>
            <span className="block w-[126px] leading-none sm:w-[150px]">
              {/* Both lines are drawn with a forced advance width, so the
                  wordmark and the strapline are guaranteed to measure the same
                  regardless of which fonts have loaded. */}
              <svg viewBox="0 0 150 44" className="block h-auto w-full" role="img" aria-label="MSAI - Sovereign UK AI">
                <text
                  x="0"
                  y="30"
                  textLength="150"
                  lengthAdjust="spacing"
                  className="font-display fill-mist"
                  style={{ fontSize: 36 }}
                >
                  MSAI
                </text>
                <text
                  x="0"
                  y="42"
                  textLength="150"
                  lengthAdjust="spacing"
                  className="font-sans fill-muted"
                  style={{ fontSize: 8.5, textTransform: 'uppercase' }}
                >
                  SOVEREIGN UK AI
                </text>
              </svg>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 text-sm">
            <div className="relative group">
              <button className="flex items-center gap-1 text-muted hover:text-mist transition-colors">
                Platform <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[340px] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="rounded-2xl border border-hair bg-night-800 p-2 shadow-panel">
                  {[...PILLARS, ...EXTRAS].map((p, i) => (
                    <div key={p.href}>
                      {i === PILLARS.length && <div className="my-1 mx-3 border-t border-hair" />}
                      <Link href={p.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-hair">
                          <p.icon className="w-4 h-4 text-cyan" />
                        </span>
                        <span>
                          <span className="block text-mist font-medium">{p.label}</span>
                          <span className="block text-xs text-muted">{p.blurb}</span>
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/model-family" className="text-muted hover:text-mist transition-colors link-grow">Models</Link>
            <Link href="/quantum" className="text-muted hover:text-mist transition-colors link-grow">Quantum-AI</Link>
            <Link href="/colocation" className="text-muted hover:text-mist transition-colors link-grow">Compute</Link>
            <Link href="/technology" className="text-muted hover:text-mist transition-colors link-grow">Technology</Link>
            <Link href="/careers" className="text-muted hover:text-mist transition-colors link-grow">Careers</Link>
            <Link href="/blog" className="text-muted hover:text-mist transition-colors link-grow">Blog</Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://motherai.uk" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-mist transition-colors">MOTHER AI</a>
            <Link href="/contact" className="btn-glow text-sm px-5 py-2">Talk to us</Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-mist"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-night-800 border-t border-hair overflow-hidden"
          >
            <div className="container-custom py-6 space-y-1">
              {PILLARS.map((p) => (
                <Link key={p.href} href={p.href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 min-h-[48px] py-2 text-mist">
                  <p.icon className="w-5 h-5 text-cyan" /> {p.label}
                </Link>
              ))}
              {[['Quantum-AI', '/quantum'], ['Colocation', '/colocation'], ['Technology', '/technology'], ['Careers', '/careers'], ['Blog', '/blog'], ['Pricing', '/pricing']].map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="flex items-center min-h-[48px] py-2 text-muted">
                  {label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-glow block w-full text-center mt-3">
                Talk to us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
