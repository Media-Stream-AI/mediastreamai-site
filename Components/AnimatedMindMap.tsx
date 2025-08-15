"use client";

import React from "react";

/** 
 * Minimal placeholder implementation so the site builds.
 * Replace the internals later with your real animated SVG/Canvas.
 */

export function BiometricSignalsMap() {
  return (
    <div style={box}>
      <h3 style={title}>Biometric Signals Map</h3>
      <p style={muted}>EEG / HRV / GSR / Mood → Feature graph (placeholder)</p>
    </div>
  );
}

export function PersonaMindMap() {
  return (
    <div style={box}>
      <h3 style={title}>Persona Mind Map</h3>
      <p style={muted}>Interests / Goals / Constraints (placeholder)</p>
      <ul style={{ marginTop: 8 }}>
        <li>• Product Manager</li>
        <li>• Student</li>
        <li>• Nurse</li>
        <li>• Retail Worker</li>
      </ul>
    </div>
  );
}

/** Example persona data objects (shape is up to your page usage) */
export const personaProductManager = {
  role: "Product Manager",
  goals: ["Roadmap clarity", "Stakeholder buy-in", "Data-driven tests"],
};

export const personaStudent = {
  role: "Student",
  goals: ["Revision planning", "Concept mastery", "Exam technique"],
};

export const personaNurse = {
  role: "Nurse",
  goals: ["Patient safety", "Shift efficiency", "Compliance"],
};

export const personaRetail = {
  role: "Retail",
  goals: ["Conversion", "Merchandising", "Queue time"],
};

/** Optional default export (handy if some pages import the module default) */
export default function AnimatedMindMaps() {
  return (
    <div style={box}>
      <h3 style={title}>Animated Mind Maps</h3>
      <p style={muted}>Module default (placeholder)</p>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <BiometricSignalsMap />
        <PersonaMindMap />
      </div>
    </div>
  );
}

/* inline styles to keep this file dependency-free */
const box: React.CSSProperties = {
  padding: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
};
const title: React.CSSProperties = { margin: 0, fontSize: 16 };
const muted: React.CSSProperties = { margin: "6px 0 0", opacity: 0.7, fontSize: 12 };
