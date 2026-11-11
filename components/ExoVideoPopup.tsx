"use client";

/**
 * ExoVideoPopup — compact popup that plays the MOTHER EXO video.
 *
 * Replaces the earlier MOTHER SENTINEL teaser. A small corner card that
 * autoplays the MOTHER EXO voice-over film with sound. Browsers block
 * sound-on autoplay until the user interacts, so we try to play unmuted first
 * and, if the browser refuses, fall back to a muted autoplay with a prominent
 * "Tap for sound" button (and the first click/tap anywhere on the card unmutes
 * it). Native controls stay available. Dismiss with the × or Esc; shows once
 * per browser.
 *
 * Self-contained inline styles (white text on dark) so it renders identically
 * wherever it is mounted.
 */

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Path of the video in /public. */
  src?: string;
  /** Path prefixes on which the popup should NOT appear. */
  excludePaths?: string[];
  /** ms before the popup auto-opens. */
  delayMs?: number;
};

const SEEN_KEY = "msai.exo.video.popup.v1";

const C = {
  cyan: "#2fd4e6",
  amber: "#f5b63d",
  ink: "#0b1322",
  ink2: "#0a1120",
  line: "rgba(47,212,230,0.35)",
  text: "#eef4fb",
  muted: "#9fb2c8",
};

export default function ExoVideoPopup({
  src = "/mother-exo-vo.mp4",
  excludePaths = [],
  delayMs = 1200,
}: Props) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    timer.current = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setShown(true));
    }, delayMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Try to play with sound; fall back to muted + "Tap for sound" if blocked.
  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play()
      .then(() => setNeedsTap(false))
      .catch(() => {
        v.muted = true;
        setNeedsTap(true);
        v.play().catch(() => {});
      });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function enableSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    setNeedsTap(false);
    v.play().catch(() => {});
  }

  function dismiss() {
    setShown(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
      } catch {
        /* ignore */
      }
    }
    setTimeout(() => setOpen(false), 180);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="MOTHER EXO"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        left: "auto",
        zIndex: 2147483000,
        width: "min(440px, calc(100vw - 32px))",
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
          overflow: "hidden",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          color: C.text,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 26,
                height: 26,
                borderRadius: 8,
                border: `1px solid ${C.amber}`,
                color: C.amber,
                fontSize: 14,
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
              MOTHER EXO
            </span>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9,
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ×
          </button>
        </div>

        {/* Video */}
        <div style={{ position: "relative", background: "#000", lineHeight: 0 }}>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            playsInline
            controls
            preload="auto"
            onClick={() => needsTap && enableSound()}
            style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16 / 9" }}
          />
          {needsTap && (
            <button
              type="button"
              onClick={enableSound}
              aria-label="Tap for sound"
              style={{
                position: "absolute",
                left: "50%",
                bottom: 14,
                transform: "translateX(-50%)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 999,
                border: "none",
                background: `linear-gradient(90deg, ${C.cyan}, #37e0b8)`,
                color: "#04141a",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
              }}
            >
              🔊 Tap for sound
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
