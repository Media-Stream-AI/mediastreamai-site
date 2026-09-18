/* eslint-disable @next/next/no-img-element */
// Shared renderer for the site's social hero images.
//
// Every route gets a 1200x630 card generated from its own title and figures
// through the Next `opengraph-image` file convention, so any link shared to
// LinkedIn, X, Slack, WhatsApp or an AI crawler arrives with a real hero image
// rather than a bare URL - and the card can never drift from the page, because
// both read the same strings.
//
// Deliberately no webfont: ImageResponse would have to fetch and embed one on
// every cold render, which is a network dependency on a path that must not
// fail. The built-in sans at weight 800 carries the layout well enough, and a
// card that always renders beats a prettier one that sometimes 404s.

import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const ACCENTS = {
  cyan: { from: '#22D3EE', to: '#6366F1', text: '#5EEAFF' },
  violet: { from: '#A855F7', to: '#EC4899', text: '#C4A7FF' },
  ember: { from: '#F59E0B', to: '#EA580C', text: '#FBBF24' },
} as const;

export type OgAccent = keyof typeof ACCENTS;

export interface OgOptions {
  /** Small line above the title, e.g. "MSAI Scotland · Careers". */
  eyebrow: string;
  /** The headline. Keep it under ~60 characters so it stays on three lines. */
  title: string;
  /** One supporting sentence. */
  subtitle?: string;
  /** Up to four short facts rendered as a footer strip. */
  facts?: string[];
  accent?: OgAccent;
}

export function renderOgImage({ eyebrow, title, subtitle, facts = [], accent = 'cyan' }: OgOptions) {
  const a = ACCENTS[accent];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#05060A',
          padding: '64px 72px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* accent wash */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: `radial-gradient(circle, ${a.from}33 0%, transparent 70%)`,
            display: 'flex',
          }}
        />
        {/* top rule */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: `linear-gradient(90deg, ${a.from}, ${a.to})`,
            display: 'flex',
          }}
        />

        {/* brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 20, height: 20, borderRadius: 20, background: '#05060A', display: 'flex' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#E7ECF3', letterSpacing: 8, lineHeight: 1 }}>
              MSAI
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8', letterSpacing: 5, marginTop: 4 }}>
              MEDIA STREAM AI
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 17,
              color: a.text,
              letterSpacing: 2,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div
            style={{
              fontSize: title.length > 46 ? 68 : 84,
              fontWeight: 800,
              color: '#E7ECF3',
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 28, color: '#94A3B8', lineHeight: 1.35, marginTop: 22, maxWidth: 940 }}>
              {subtitle}
            </div>
          )}
        </div>

        {/* facts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {facts.slice(0, 4).map((f) => (
            <div
              key={f}
              style={{
                display: 'flex',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 999,
                padding: '10px 20px',
                fontSize: 19,
                color: '#E7ECF3',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              {f}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', fontSize: 20, color: '#64748B', display: 'flex' }}>
            mediastreamai.com
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
