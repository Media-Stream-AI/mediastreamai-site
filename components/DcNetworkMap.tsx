"use client";

import React from "react";

type Node = {
  id: "MCR" | "SND" | "DUS" | "KIN";
  name: string;
  subtitle: string;
  x: number;
  y: number;
  color: string;
};

const NODES: Node[] = [
  { id: "MCR", name: "Manchester / Salford – MediaCityUK", subtitle: "UK Sovereign • H200 + RDUs • Neptune", x: 380, y: 240, color: "#60A5FA" },
  { id: "SND", name: "Sunderland", subtitle: "UK Edge/Redundancy • Sovereign Mirror", x: 460, y: 200, color: "#34D399" },
  { id: "DUS", name: "Düsseldorf", subtitle: "EU Sovereign • GDPR • AIA", x: 540, y: 250, color: "#F59E0B" },
  { id: "KIN", name: "Kingston (Jamaica)", subtitle: "LATAM/Caribbean Regional Node", x: 180, y: 420, color: "#A78BFA" },
];

// small 127-dot grid showing NIFE nodes
function NifeMicroGrid({
  cx,
  cy,
  size = 78,
  dots = 127,
  filled = "#ffffff",
  empty = "rgba(255,255,255,0.15)",
  stroke = "rgba(255,255,255,0.12)",
}: {
  cx: number;
  cy: number;
  size?: number;
  dots?: number;
  filled?: string;
  empty?: string;
  stroke?: string;
}) {
  const cols = 11;
  const rows = 12;
  const gap = size / Math.max(cols, rows);
  const r = gap * 0.22;
  const startX = cx - (cols - 1) * gap * 0.5;
  const startY = cy - (rows - 1) * gap * 0.5;

  const circles: JSX.Element[] = [];
  for (let i = 0; i < rows * cols; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * gap;
    const y = startY + row * gap;
    const isFilled = i < dots;
    circles.push(
      <circle
        key={i}
        cx={x}
        cy={y}
        r={r}
        fill={isFilled ? filled : empty}
        stroke={stroke}
        strokeWidth={0.6}
      />
    );
  }

  return (
    <g>
      <rect
        x={cx - size * 0.55}
        y={cy - size * 0.55}
        width={size * 1.1}
        height={size * 1.1}
        rx={6}
        fill="rgba(0,0,0,0.45)"
        stroke="rgba(255,255,255,0.08)"
      />
      {circles}
      <text
        x={cx}
        y={cy + size * 0.72}
        textAnchor="middle"
        fontSize={10}
        fill="rgba(255,255,255,0.8)"
      >
        ×127 NIFEs
      </text>
    </g>
  );
}

export function DcNetworkMap() {
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl h-auto border border-white/10 rounded-xl shadow-lg bg-black/30"
      >
        <rect width="800" height="600" fill="url(#bg)" />
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(30,58,138,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,1)" />
          </radialGradient>
        </defs>

        {NODES.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={12} fill={n.color} />
            <text
              x={n.x + 18}
              y={n.y + 4}
              fontSize={12}
              fill="#fff"
              style={{ fontWeight: 600 }}
            >
              {n.name}
            </text>
            <text
              x={n.x + 18}
              y={n.y + 18}
              fontSize={10}
              fill="rgba(255,255,255,0.7)"
            >
              {n.subtitle}
            </text>
            <NifeMicroGrid cx={n.x} cy={n.y + 80} />
          </g>
        ))}
      </svg>
    </div>
  );
}
