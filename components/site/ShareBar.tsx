'use client';

// Share this page to socials, with the page's own hero card attached.
//
// The networks below all read Open Graph tags from the URL they are handed, so
// the card people see is whatever `opengraph-image` renders for that route -
// nothing is uploaded and nothing can go stale. LinkedIn is first because
// that is where a data-centre vacancy actually travels.
//
// The URL is resolved on the client from `window.location` when no absolute
// href is passed, so a share still works on preview deploys and on any custom
// domain without the component knowing the site's hostname.

import { useCallback, useEffect, useState } from 'react';
import { Check, Copy, Linkedin, Mail, MessageCircle, Share2 } from 'lucide-react';

/** X's wordmark is not in lucide, so it is drawn here at the same weight. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

export default function ShareBar({
  url,
  title,
  summary,
  className = '',
  label = 'Share this',
}: {
  /** Absolute URL to share. Falls back to the current page. */
  url?: string;
  title: string;
  summary?: string;
  className?: string;
  label?: string;
}) {
  const [href, setHref] = useState(url ?? '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url) setHref(window.location.href.split('#')[0]);
  }, [url]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission): the links
      // beside this button still work, so fail quietly rather than alerting.
    }
  }, [href]);

  // The Web Share sheet is the natural route on a phone and carries the OG
  // card into whatever app the person picks, so it is offered when present.
  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: summary, url: href });
    } catch {
      // Cancelled or unsupported - nothing to report.
    }
  }, [href, title, summary]);

  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const e = encodeURIComponent;
  const text = summary ? `${title} - ${summary}` : title;

  const targets = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(href)}`,
    },
    {
      name: 'X',
      icon: XIcon,
      href: `https://x.com/intent/tweet?url=${e(href)}&text=${e(text)}`,
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(href)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${e(`${text} ${href}`)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${e(title)}&body=${e(`${summary ? summary + '\n\n' : ''}${href}`)}`,
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="mr-1 text-xs uppercase tracking-[0.18em] text-muted">{label}</span>

      {targets.map((t) => (
        <a
          key={t.name}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${t.name}`}
          title={`Share on ${t.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-white/5 text-muted transition-colors hover:border-cyan/40 hover:text-mist"
        >
          <t.icon className="h-4 w-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title="Copy link"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-hair bg-white/5 px-3 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-mist"
      >
        {copied ? <Check className="h-4 w-4 text-cyan" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>

      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Share"
          title="Share"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-hair bg-white/5 px-3 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-mist sm:hidden"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
      )}
    </div>
  );
}
