"use client";

/**
 * SentinelPopup — compact MOTHER SENTINEL teaser popup.
 *
 * A small (≤¼ screen) corner card that drives visitors to our new data-centre
 * tech: MOTHER SENTINEL, the sovereign physical-AI command centre for data
 * centres. One line of positioning + a short email capture ("Request a
 * walkthrough"). Deliberately easy to dismiss — a large × and Esc both close
 * it — and it only appears once per browser.
 *
 * Self-contained inline styles (no Tailwind / global CSS dependency) so the
 * card renders identically — and legibly, text always white on dark — across
 * every surface it is dropped into.
 *
 * The captured lead is POSTed as { name, email, source } to `endpoint`
 * (defaults to /api/sentinel-lead). Submission fails open: the viewer always
 * sees a thank-you, the lead is forwarded best-effort server-side.
 */

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Lead-capture endpoint. Receives JSON { name, email, source }. */
  endpoint?: string;
  /** Lead source tag recorded against the capture. */
  source?: string;
  /** Path prefixes on which the popup should NOT appear (e.g. a different
   *  product's popup owns those surfaces). */
  excludePaths?: string[];
  /** ms before the popup auto-opens. */
  delayMs?: number;
  /** CSS selector of a section the popup must not cover (e.g. the home-page
   *  hero). While it is on screen the timer waits; it starts once the
   *  section has scrolled out of view. Ignored when nothing matches. */
  deferWhileVisible?: string;
};

const SEEN_KEY = "msai.sentinel.popup.v1";

const C = {
  cyan: "#2fd4e6",
  amber: "#f5b63d",
  ink: "#0b1322",
  ink2: "#0a1120",
  line: "rgba(47,212,230,0.35)",
  text: "#eef4fb",
  muted: "#9fb2c8",
};

export default function SentinelPopup({
  endpoint = "/api/sentinel-lead",
  source = "sentinel-popup",
  excludePaths = [],
  delayMs = 1400,
  deferWhileVisible,
}: Props) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // drives enter transition
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* storage blocked — still show once this session */
    }
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    if (excludePaths.some((p) => path === p || path.startsWith(p + "/") || path.startsWith(p))) {
      return;
    }
    const start = () => {
      timer.current = setTimeout(() => {
        setOpen(true);
        requestAnimationFrame(() => setShown(true));
      }, delayMs);
    };
    const blocker = deferWhileVisible ? document.querySelector(deferWhileVisible) : null;
    let io: IntersectionObserver | null = null;
    if (blocker && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) return;
        io?.disconnect();
        io = null;
        start();
      });
      io.observe(blocker);
    } else {
      start();
    }
    return () => {
      io?.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function markSeen() {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function dismiss() {
    setShown(false);
    markSeen();
    setTimeout(() => setOpen(false), 180);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    markSeen();
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Website visitor",
          email: email.trim(),
          source,
        }),
      });
    } catch {
      /* fail open — lead still acknowledged to the viewer */
    }
    setStatus("done");
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="MOTHER SENTINEL — sovereign AI for data centres"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        left: "auto",
        zIndex: 2147483000,
        width: "min(380px, calc(100vw - 32px))",
        maxHeight: "calc(100vh - 32px)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, Arial, sans-serif',
        transform: shown ? "translateY(0)" : "translateY(16px)",
        opacity: shown ? 1 : 0,
        transition: "transform .22s ease, opacity .22s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          background: `linear-gradient(160deg, ${C.ink} 0%, ${C.ink2} 100%)`,
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          padding: "20px 20px 18px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          color: C.text,
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,0.65)",
            fontSize: 22,
            lineHeight: 1,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          ×
        </button>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: 9,
              border: `1px solid ${C.amber}`,
              color: C.amber,
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            Σ
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.cyan,
            }}
          >
            MOTHER SENTINEL
          </span>
        </div>

        {status === "done" ? (
          <div>
            <h3 style={{ margin: "2px 0 8px", fontSize: 17, fontWeight: 700, color: C.text }}>
              ✓ You&apos;re on the list.
            </h3>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: C.muted }}>
              We&apos;ll be in touch with the architecture one-pager and a live walkthrough of the
              data centre that defends itself.
            </p>
            <button
              type="button"
              onClick={dismiss}
              style={{
                marginTop: 14,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${C.line}`,
                background: "transparent",
                color: C.text,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3
              style={{
                margin: "2px 0 6px",
                fontSize: 18,
                lineHeight: 1.25,
                fontWeight: 700,
                color: C.text,
              }}
            >
              The data centre that defends itself.
            </h3>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, lineHeight: 1.5, color: C.muted }}>
              Our new data-centre tech: a sovereign command centre fusing digital twin, ISR
              overwatch, on-node vision and sensor fusion into one pane of glass.{" "}
              <span style={{ color: C.text }}>Your data never leaves site.</span>
            </p>

            <form onSubmit={submit} noValidate>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                autoComplete="name"
                style={inputStyle}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Work email"
                autoComplete="email"
                required
                style={{
                  ...inputStyle,
                  marginTop: 8,
                  borderColor: status === "error" ? "#ff6b6b" : inputStyle.borderColor,
                }}
              />
              {status === "error" && (
                <div style={{ color: "#ff8f8f", fontSize: 12, marginTop: 6 }}>
                  Please enter a valid work email.
                </div>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 11,
                  border: "none",
                  background: `linear-gradient(90deg, ${C.cyan}, #37e0b8)`,
                  color: "#04141a",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.01em",
                  cursor: status === "sending" ? "default" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Request a walkthrough →"}
              </button>
            </form>
            <p style={{ margin: "10px 2px 0", fontSize: 11, lineHeight: 1.4, color: "rgba(159,178,200,0.75)" }}>
              Sovereign &amp; on-node · NPSA-layered, ISO 27001-aligned. No spam — just the
              architecture one-pager and a walkthrough.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#ffffff",
  fontSize: 14,
  outline: "none",
};
