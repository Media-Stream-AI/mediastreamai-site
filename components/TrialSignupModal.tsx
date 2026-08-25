"use client";

/**
 * IntuiTV - trial signup popup.
 *
 * "3 months of IntuiTV, free" - part of the first 25,000-member free trial. Captures
 * Name / Age / Email (with explicit consent) and POSTs to /api/trial-signup, which appends
 * the lead to a CSV the team can download from /api/trial-signup/export.
 *
 * Self-contained + inline-styled (MOTHER EXO near-black + cyan) so the exact same component drops
 * into every IntuiTV site with no Tailwind-token dependencies. Shows once per browser (localStorage),
 * a few seconds after load; closable with the X, the backdrop, or Esc.
 *
 * On the group site it is mounted in the root layout but only appears on the
 * IntuiTV surfaces - a consumer TV trial has nothing to say to someone reading
 * the colocation or compliance pages.
 */
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const CYAN = "#22D3EE";
const NIGHT = "#05060A";
const PANEL = "#0B0E16";
const SEEN_KEY = "intuitv_trial_seen_v1";
const TRIAL_CAP = 25000;

type Props = {
  /** which site this signup came from - stored in the CSV */
  source?: string;
  /** ms before the popup appears (default 6s) */
  delayMs?: number;
  /** Route prefixes the popup may appear on. Omit to allow every route, which
   *  is what a dedicated IntuiTV site wants. */
  paths?: string[];
};

export default function TrialSignupModal({ source = "intuitv-website", delayMs = 6000, paths }: Props) {
  const pathname = usePathname();
  const onAllowedPath =
    !paths || paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (!onAllowedPath) {
      setOpen(false);
      return;
    }
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, onAllowedPath]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setMessage("Please tick the consent box so we can send your trial details.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/trial-signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, age, email, consent, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
      setMessage("You're in. Check your inbox - your 3 months free is on its way. 🎬");
    } catch (err) {
      setStatus("error");
      setMessage((err as Error).message || "Sorry, please try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Claim your 3 months free IntuiTV trial"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(5,6,10,0.80)",
        backdropFilter: "blur(6px)",
        fontFamily:
          "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 480,
          background: PANEL,
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "34px 30px 30px",
          boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* cyan glow accent */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(420px 260px at 88% -10%, rgba(34,211,238,0.18), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            background: "transparent",
            border: "none",
            color: "#8b93a5",
            fontSize: 26,
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: CYAN, boxShadow: `0 0 18px ${CYAN}` }} />
            <span>Intui<span style={{ color: CYAN, marginLeft: -3 }}>TV</span></span>
          </div>

          {status === "done" ? (
            <div style={{ marginTop: 26 }}>
              <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1 }}>
                Welcome to IntuiTV 🎉
              </h2>
              <p style={{ marginTop: 14, color: "#B8C0D0", fontSize: 16, lineHeight: 1.5 }}>{message}</p>
              <button onClick={close} style={btnPrimary}>Start creating</button>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 22, color: CYAN, fontWeight: 800, letterSpacing: 3, fontSize: 12 }}>
                FREE TRIAL · FIRST {TRIAL_CAP.toLocaleString()} MEMBERS
              </div>
              <h2 style={{ marginTop: 10, fontSize: 34, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.04 }}>
                3 months of <span style={{ color: CYAN }}>IntuiTV</span>, free.
              </h2>
              <p style={{ marginTop: 12, color: "#B8C0D0", fontSize: 15.5, lineHeight: 1.5 }}>
                Describe a show, and our sovereign British AI makes the whole thing and streams it to your
                telly. Join our first 25,000 members and get 3 months completely free.
              </p>

              <form onSubmit={submit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  aria-label="Your name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={input}
                />
                <input
                  aria-label="Your age"
                  placeholder="Your age"
                  type="number"
                  min={13}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  style={input}
                />
                <input
                  aria-label="Your email"
                  placeholder="you@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={input}
                />
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#9aa3b5", fontSize: 12.5, lineHeight: 1.45, marginTop: 2 }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ marginTop: 2, accentColor: CYAN, width: 16, height: 16 }}
                  />
                  <span>
                    I agree to IntuiTV storing my details to set up my free trial and send me service
                    emails. You can opt out any time. See our privacy policy.
                  </span>
                </label>

                {status === "error" && (
                  <div style={{ color: "#ff8080", fontSize: 13 }}>{message}</div>
                )}

                <button type="submit" disabled={status === "sending"} style={{ ...btnPrimary, opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? "Setting up your trial…" : "Claim my 3 months free →"}
                </button>
                <div style={{ color: "#6b7280", fontSize: 11.5, textAlign: "center" }}>
                  No card required. Cancel anytime.
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "14px 16px",
  color: "#fff",
  fontSize: 15,
  outline: "none",
};

const btnPrimary: React.CSSProperties = {
  marginTop: 6,
  width: "100%",
  background: "linear-gradient(100deg, #5EEAFF, #22D3EE 30%, #8B5CF6 75%, #EC4899)",
  color: NIGHT,
  fontWeight: 800,
  fontSize: 16,
  border: "none",
  borderRadius: 12,
  padding: "15px 18px",
  cursor: "pointer",
};
