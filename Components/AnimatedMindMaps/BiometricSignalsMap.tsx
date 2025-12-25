"use client";
import React from "react";

export default function BiometricSignalsMap() {
  return (
    <div style={box}>
      <h3 style={title}>Biometric Signals Map</h3>
      <p style={muted}>EEG / HRV / GSR / Mood → feature graph (placeholder)</p>
    </div>
  );
}

const box: React.CSSProperties = {
  padding: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
};
const title: React.CSSProperties = { margin: 0, fontSize: 16 };
const muted: React.CSSProperties = { margin: "6px 0 0", opacity: 0.7, fontSize: 12 };
