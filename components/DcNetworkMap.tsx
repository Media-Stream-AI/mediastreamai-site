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
  {
    id: "MCR",
    name: "Manchester / Salford – MediaCityUK",
    subtitle: "UK Sovereign • H200 + RDUs • Neptune",
    x: 320,
    y: 300,
    color: "#60A5FA",
  },
  {
    id: "SND",
    name: "Sunderland",
    subtitle: "UK Edge / Redundancy • Sovereign Mirror",
    x: 540,
    y: 140, // lifted higher
    color: "#34D399",
  },
  {
    id: "DUS",
    name: "Düsseldorf",
    subtitle: "EU Sovereign • GDPR • AIA",
    x: 700,
    y: 320,
    color: "#F59E0B",
  },
  {
    id: "KIN",
    name: "Kingston (Jamaica)",
    subtitle: "LATAM / Caribbean Regional Node",
    x: 160,
    y: 520,
    color: "#A78BFA",
  },
];

/** Draws the 127 NIFE micro-grid under each DC node */
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

/** Sovereign DC Network SVG Map */
export function DcNetworkMap() {
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 900 650"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl h-auto border border-white/10 rounded-xl shadow-lg bg-gradient-to-b from-blue-950/60 to-black/80"
      >
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(30,58,138,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,1)" />
          </radialGradient>
        </defs>

        {/* connecting lines */}
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="1.2">
          <line x1={NODES[0].x} y1={NODES[0].y} x2={NODES[1].x} y2={NODES[1].y} />
          <line x1={NODES[1].x} y1={NODES[1].y} x2={NODES[2].x} y2={NODES[2].y} />
          <line x1={NODES[0].x} y1={NODES[0].y} x2={NODES[3].x} y2={NODES[3].y} />
        </g>

        {/* nodes + micro-grids */}
        {NODES.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={14} fill={n.color} />
            <text
              x={n.x + 20}
              y={n.y + 4}
              fontSize={13}
              fill="#fff"
              style={{ fontWeight: 600 }}
            >
              {n.name}
            </text>
            <text
              x={n.x + 20}
              y={n.y + 20}
              fontSize={10}
              fill="rgba(255,255,255,0.7)"
            >
              {n.subtitle}
            </text>
            <NifeMicroGrid cx={n.x} cy={n.y + 100} />
          </g>
        ))}
      </svg>
    </div>
  );
}
