'use client';

// Branded social links with animated hover - each mark lifts, glows in its brand
// colour and a light sheen sweeps across. Icons are inline SVG brand marks (no
// external image requests, crisp at any size). Reduced-motion users still get
// the colour/lift, just no sheen.

type Social = { name: string; href: string; color: string; path: string; viewBox?: string };

// Confirmed public MSAI handles (verified Aug 2026).
const SOCIALS: Social[] = [
  {
    name: 'LinkedIn', href: 'https://uk.linkedin.com/company/media-stream-europe', color: '#0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'Instagram', href: 'https://www.instagram.com/mediastream_ai/', color: '#E4405F',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'Facebook', href: 'https://www.facebook.com/MediaStreamAI/', color: '#1877F2',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'GitHub', href: 'https://github.com/media-stream-ai', color: '#ffffff',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
];

export default function SocialBar({ variant = 'row' }: { variant?: 'row' | 'cards' }) {
  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
            className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-hair bg-white/[0.03] px-3 py-5 transition-all hover:-translate-y-1"
            style={{ ['--brand' as string]: s.color }}
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: `radial-gradient(80% 60% at 50% 0%, ${s.color}22, transparent 70%)` }} />
            <span className="pointer-events-none absolute -inset-x-10 -top-10 h-24 -rotate-12 bg-white/10 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-sheen" />
            <svg viewBox={s.viewBox || '0 0 24 24'} className="relative h-7 w-7 fill-muted transition-colors" style={{ color: s.color }}>
              <path d={s.path} className="transition-all" fill="currentColor" />
            </svg>
            <span className="relative text-xs text-muted group-hover:text-mist transition-colors">{s.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {SOCIALS.map((s) => (
        <a
          key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
          className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-hair text-muted transition-all hover:-translate-y-0.5 hover:border-white/25"
        >
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{ background: `radial-gradient(70% 70% at 50% 50%, ${s.color}33, transparent 70%)` }} />
          <span className="pointer-events-none absolute -inset-x-8 -top-8 h-16 -rotate-12 bg-white/10 blur opacity-0 group-hover:opacity-100 group-hover:animate-sheen" />
          <svg viewBox={s.viewBox || '0 0 24 24'} className="relative h-[18px] w-[18px]">
            <path d={s.path} fill="currentColor" className="transition-colors group-hover:[fill:var(--hc)]" style={{ ['--hc' as string]: s.color }} />
          </svg>
        </a>
      ))}
    </div>
  );
}
