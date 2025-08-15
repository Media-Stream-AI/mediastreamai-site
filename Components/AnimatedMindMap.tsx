"use client";
import React from "react";

/** 
 * Placeholder so production builds succeed.
 * Replace internals later with your real animated components.
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

/** Named persona objects expected by the page */
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

/** Default export (optional convenience) */
export default function AnimatedMindMaps() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <BiometricSignalsMap />
      <PersonaMindMap />
    </div>
  );
}

/* simple inline styles (no Tailwind dependency here) */
const box: React.CSSProperties = {
  padding: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
};
const title: React.CSSProperties = { margin: 0, fontSize: 16 };
const muted: React.CSSProperties = { margin: "6px 0 0", opacity: 0.7, fontSize: 12 };
