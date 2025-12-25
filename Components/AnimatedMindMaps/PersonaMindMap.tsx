"use client";
import React from "react";

export type Persona = { role: string; goals?: string[] };

type Props = { persona: Persona; title?: string };

export default function PersonaMindMap({ persona, title }: Props) {
  const { role, goals } = persona;
  return (
<<<<<<< Updated upstream
    <div style={box}>
      <h3 style={titleStyle}>{title ?? "Persona Mind Map"}</h3>
      <p style={muted}>Role: {role}</p>
      {goals?.length ? (
        <ul style={{ marginTop: 8 }}>
          {goals.map((g, i) => (
            <li key={i}>• {g}</li>
          ))}
        </ul>
      ) : (
        <p style={muted}>Goals: (none provided)</p>
      )}
    </div>
  );
}

const box: React.CSSProperties = {
  padding: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
};
const titleStyle: React.CSSProperties = { margin: 0, fontSize: 16 };
const muted: React.CSSProperties = { margin: "6px 0 0", opacity: 0.7, fontSize: 12 };
=======
    <div style={{padding:16,border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,background:"rgba(255,255,255,0.03)"}}>
      <h3 style={{margin:0,fontSize:16}}>Persona Mind Map</h3>
      <p style={{margin:"6px 0 0",opacity:0.7,fontSize:12}}>Placeholder component</p>
    </div>
  );
}
>>>>>>> Stashed changes
