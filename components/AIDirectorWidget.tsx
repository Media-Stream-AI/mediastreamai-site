"use client";
import { useState } from "react";
export default function AIDirectorWidget() {
  const [listening, setListening] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-sm text-white/70">Prototype — microphone UI placeholder.</div>
      <button
        onClick={() => setListening(v => !v)}
        className={`mt-3 rounded-lg px-4 py-2 text-sm ${listening ? "bg-white/20" : "bg-white/10"} border border-white/10`}
      >
        {listening ? "Stop listening" : "Talk via Microphone"}
      </button>
    </div>
  );
}