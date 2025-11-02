// components/DcNetworkMap.tsx
'use client';
import React from 'react';

type Node = {
  id: 'MCR' | 'SND' | 'DUS' | 'KIN';
  name: string;
  subtitle: string;
  x: number; // viewBox coords
  y: number;
  color: string;
};

const NODES: Node[] = [
  {
    id: 'MCR',
    name: 'Manchester / Salford – MediaCityUK',
    subtitle: 'UK Sovereign • H200 + RDUs • Neptune',
    x: 380,
    y: 240,
    color: '#60A5FA',
  },
  {
    id: 'SND',
    name: 'Sunderland',
    subtitle: 'UK Edge/Redundancy • Sovereign Mirror',
    x: 460,
    y: 200,
    color: '#34D399',
  },
  {
    id: 'DUS',
    name: 'Düsseldorf',
    subtitle: 'EU Sovereign • GDPR • AIA',
    x: 540,
    y: 250,
    color: '#F59E0B',
  },
  {
    id: 'KIN',
    name: 'Kingston (Jamaica)',
    subtitle: 'LATAM/Caribbean Regional Node',
    x: 180,
    y: 420,
    color: '#A78BFA',
  },
];

// draw a compact 127-dot micro-grid (11 x 12 = 132 -> first 127 filled)
function NifeMicroGrid({
  cx,
  cy,
  size = 78,
  dots = 127,
  filled = '#ffffff',
  empty = 'rgba(255,255,255,0.15)',
  stroke = 'rgba(255,255,255,0.12)',
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

export default function DcNetworkMap({
  className,
}: {
  className?: string;
}) {
  // helpful lines to show inter-DC mesh
  const links: [Node, Node][] = [
    [NODES[0], NODES[1]], // MCR–SND
    [NODES[0], NODES[2]], // MCR–DUS
    [NODES[1], NODES[2]], // SND–DUS
    [NODES[0], NODES[3]], // MCR–KIN
    [NODES[1], NODES[3]], // SND–KIN
    [NODES[2], NODES[3]], // DUS–KIN
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 1000 600"
      role="img"
      aria-label="Media Stream AI Sovereign Data Centre Network Map"
    >
      <defs>
        {/* subtle animated dashed stroke for the WAN */}
        <style>{`
          .mesh {
            stroke-dasharray: 6 9;
            animation: dash 6s linear infinite;
          }
          @keyframes dash {
            to { stroke-dashoffset: -300; }
          }
        `}</style>

        {/* soft world backdrop */}
        <radialGradient id="bg" cx="50%" cy="10%" r="80%">
          <stop offset="0%" stopColor="#0b1220" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* node glow */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="1000" height="600" fill="url(#bg)" />

      {/* abstract continents silhouettes (very light) */}
      <g fill="rgba(255,255,255,0.03)">
        <ellipse cx="470" cy="230" rx="230" ry="120" />
        <ellipse cx="220" cy="420" rx="210" ry="110" />
        <ellipse cx="620" cy="270" rx="180" ry="90" />
      </g>

      {/* inter-site links */}
      <g stroke="rgba(135,206,250,0.55)" strokeWidth={2}>
        {links.map(([a, b], i) => (
          <line
            key={i}
            className="mesh"
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
          />
        ))}
      </g>

      {/* site nodes */}
      {NODES.map((n) => (
        <g key={n.id} transform={`translate(${n.x},${n.y})`}>
          {/* halo */}
          <circle r={22} fill={n.color} opacity={0.25} filter="url(#glow)" />
          {/* core */}
          <circle r={10} fill={n.color} stroke="white" strokeWidth={1.5} />
          {/* label */}
          <g transform="translate(0,34)">
            <rect
              x={-160}
              y={-18}
              width={320}
              height={48}
              rx={10}
              fill="rgba(0,0,0,0.55)"
              stroke="rgba(255,255,255,0.1)"
            />
            <text
              x={0}
              y={0}
              textAnchor="middle"
              fontSize={13}
              fill="#ffffff"
              fontWeight={600}
            >
              {n.name}
            </text>
            <text
              x={0}
              y={16}
              textAnchor="middle"
              fontSize={11}
              fill="rgba(255,255,255,0.7)"
            >
              {n.subtitle}
            </text>
          </g>

          {/* per-DC NIFEs micro-grid badge */}
          <g transform="translate(0,95)">
            <NifeMicroGrid cx={0} cy={0} />
          </g>
        </g>
      ))}

      {/* legend */}
      <g transform="translate(24,24)">
        <rect
          width="290"
          height="86"
          rx="12"
          fill="rgba(0,0,0,0.55)"
          stroke="rgba(255,255,255,0.12)"
        />
        <text x="16" y="26" fontSize="14" fill="#fff" fontWeight={700}>
          MSAI Sovereign DC Mesh
        </text>
        <text x="16" y="46" fontSize="12" fill="rgba(255,255,255,0.75)">
          Solid nodes = DCs • Dashed = encrypted 400G+ interconnects
        </text>
        <text x="16" y="66" fontSize="12" fill="rgba(255,255,255,0.75)">
          Per-site capacity badge: 127 NIFEs (Neptune-cooled)
        </text>
      </g>
    </svg>
  );
}
