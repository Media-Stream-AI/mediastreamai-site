"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };
type Plan = {
  title: string;
  lighting: string[];
  camera: string[];
  locations: string[];
  shots: string[];
} | null;

export default function AIDirectorWidget() {
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I’m the AI Director. Describe the video you want to make." }
  ]);
  const [plan, setPlan] = useState<Plan>(null);

  // --- Microphone (Web Speech API) ---
  const recognitionRef = useRef<SpeechRecognition | null>(null as any);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.lang = "en-US";
    rec.interimResults = false;
    recognitionRef.current = rec;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join(" ");
      setInput(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);

    return () => {
      try { rec.abort(); } catch {}
      recognitionRef.current = null;
    };
  }, []);

  const toggleMic = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Microphone recognition is not supported on this browser. Please type your prompt.");
      return;
    }
    if (listening) {
      try { rec.stop(); } catch {}
      setListening(false);
    } else {
      setPlan(null);
      try { rec.start(); setListening(true); } catch {}
    }
  }, [listening]);

  // --- Send to API stub ---
  const send = async (prompt: string) => {
    if (!prompt.trim()) return;
    setBusy(true);
    setPlan(null);
    setMessages(prev => [...prev, { role: "user", text: prompt }]);

    try {
      const res = await fetch("/pages/api/director", {
        // Support both /api/director and /pages/api/director, depending on hosting
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      }).catch(() => null);

      let data: any = null;

      // Fallback to /api/director if /pages/api/director is not routed
      if (!res || !res.ok) {
        const res2 = await fetch("/api/director", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });
        data = await res2.json();
      } else {
        data = await res.json();
      }

      setMessages(prev => [...prev, { role: "assistant", text: data?.reply || "Here’s a draft plan." }]);
      setPlan(data?.plan ?? null);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "I couldn’t reach the planner just now. Here’s a simple outline instead." }
      ]);
      setPlan({
        title: "Simple Plan",
        lighting: ["Soft key light", "Cool rim light"],
        camera: ["Wide establishing", "Medium interview", "Cutaway B-roll"],
        locations: ["Studio cyc wall"],
        shots: ["Open wide", "Push-in on subject", "Cut to product close-ups"]
      });
    } finally {
      setBusy(false);
      setInput("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggleMic}
          className={`rounded-xl px-4 py-2 text-sm border ${
            listening ? "bg-white/20" : "bg-white/10"
          } border-white/10 hover:bg-white/15 transition`}
        >
          {listening ? "Listening…" : "Talk"}
        </button>
        <div className="flex-1 min-w-[220px] flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Describe the video you want to make…"
            className="flex-1 rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={() => send(input)}
            disabled={busy}
            className="btn btn-primary disabled:opacity-60"
          >
            {busy ? "Planning…" : "Send"}
          </button>
        </div>
      </div>

      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          "Create a 30s product demo with upbeat energy",
          "Corporate brand film, calm and confident",
          "Moody music video — neon lighting"
        ].map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Transcript */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 max-h-[340px] overflow-auto">
        {messages.map((m, i) => (
          <div key={i} className="mb-3 last:mb-0">
            <div className="text-xs uppercase tracking-wide text-white/50">{m.role}</div>
            <div className={m.role === "user" ? "text-white" : "text-white/80"}>{m.text}</div>
          </div>
        ))}
      </div>

      {/* Plan */}
      {plan && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-lg font-horizon">{plan.title}</div>
          <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm text-white/80 font-glacial">
            <div>
              <div className="text-white/60 uppercase text-xs mb-1">Lighting</div>
              <ul className="list-disc pl-5 space-y-1">{plan.lighting.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div>
              <div className="text-white/60 uppercase text-xs mb-1">Camera</div>
              <ul className="list-disc pl-5 space-y-1">{plan.camera.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div>
              <div className="text-white/60 uppercase text-xs mb-1">Locations</div>
              <ul className="list-disc pl-5 space-y-1">{plan.locations.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div>
              <div className="text-white/60 uppercase text-xs mb-1">Shots</div>
              <ul className="list-disc pl-5 space-y-1">{plan.shots.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}