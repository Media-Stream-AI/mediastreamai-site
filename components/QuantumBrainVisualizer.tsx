"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -----------------------------------------------------------------------
   QUANTUM BRAIN NEURAL VISUALIZER
   Shows MOTHER CORE ↔ TRM ↔ Quantum-Enhanced RAG as a living neural brain
   with quantum circuit overlays and animated synaptic connections.
----------------------------------------------------------------------- */

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
  type: "core" | "hub" | "satellite";
}

interface Edge {
  from: string;
  to: string;
  color: string;
  dashArray?: string;
  pulseColor?: string;
  bidirectional?: boolean;
}

const NODES: Node[] = [
  // Central MOTHER CORE
  { id: "mother", x: 500, y: 300, r: 72, label: "MOTHER CORE", sublabel: "7B / 70B", color: "rgba(0,200,255,0.15)", glow: "#00c8ff", type: "core" },
  // TRM
  { id: "trm", x: 500, y: 120, r: 44, label: "TRM", sublabel: "Task Router", color: "rgba(168,85,247,0.15)", glow: "#a855f7", type: "hub" },
  // Quantum RAG
  { id: "qrag", x: 760, y: 300, r: 56, label: "Quantum RAG", sublabel: "PennyLane · Port 8004", color: "rgba(52,211,153,0.15)", glow: "#34d399", type: "hub" },
  // LLM 7B
  { id: "llm", x: 240, y: 180, r: 44, label: "LLM 7B", sublabel: "British Language", color: "rgba(251,191,36,0.15)", glow: "#fbbf24", type: "hub" },
  // MOTHER DEFENCE
  { id: "defence", x: 240, y: 420, r: 38, label: "DEFENCE", sublabel: "In Training", color: "rgba(239,68,68,0.15)", glow: "#ef4444", type: "satellite" },
  // T2V
  { id: "t2v", x: 500, y: 480, r: 38, label: "T2V", sublabel: "Stage 3B Active", color: "rgba(251,146,60,0.15)", glow: "#fb923c", type: "satellite" },
  // Vector DB
  { id: "vector", x: 760, y: 480, r: 32, label: "~1.67M Chunks", sublabel: "Vector Store", color: "rgba(52,211,153,0.10)", glow: "#34d399", type: "satellite" },
  // Quantum Circuit
  { id: "quantum", x: 760, y: 120, r: 36, label: "PilotOS", sublabel: "GB10 Blackwell", color: "rgba(52,211,153,0.12)", glow: "#34d399", type: "satellite" },
];

const EDGES: Edge[] = [
  { from: "mother", to: "trm", color: "#a855f7", pulseColor: "#d8b4fe", bidirectional: true },
  { from: "mother", to: "qrag", color: "#34d399", pulseColor: "#6ee7b7", bidirectional: true },
  { from: "mother", to: "llm", color: "#fbbf24", pulseColor: "#fde68a", bidirectional: true },
  { from: "mother", to: "defence", color: "#ef4444", pulseColor: "#fca5a5" },
  { from: "mother", to: "t2v", color: "#fb923c", pulseColor: "#fdba74" },
  { from: "qrag", to: "vector", color: "#34d399", dashArray: "4 6" },
  { from: "qrag", to: "quantum", color: "#34d399", dashArray: "4 6", bidirectional: true },
  { from: "trm", to: "llm", color: "#c084fc", dashArray: "3 5" },
];

function getNodeById(id: string): Node {
  return NODES.find(n => n.id === id)!;
}

function getEdgePath(from: Node, to: Node): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = from.x + dx * 0.5;
  const cy = from.y + dy * 0.5 + (Math.abs(dx) > 100 ? -30 : 20);
  return `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`;
}

export default function QuantumBrainVisualizer() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick(t => (t + 1) % 100), 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative w-full">
      {/* Info overlay */}
      <AnimatePresence>
        {activeNode && (() => {
          const n = getNodeById(activeNode);
          const info: Record<string, string[]> = {
            mother: ["Step 262,000+ PRODUCTION", "Deterministic reasoning engine", "Zero temperature — fully auditable", "50,258 vocab · 6.86B parameters"],
            trm: ["Orchestrates all model routing", "Defence → CORE-Defence", "Creative → LLM-Creative", "Quantum RAG → CORE-Science"],
            qrag: ["Quantum-enhanced retrieval", "Swap-test fidelity scoring", "~1.67M knowledge chunks", "Wikipedia + domain collections"],
            llm: ["Step 302,000+ RUNNING", "British language model", "Step-302k British tone", "GDPR sovereign training data"],
            defence: ["CORE-Defence specialist", "Military doctrine & strategy", "Full Tier 3 governance required", "Target: Manchester Tech Week 2026"],
            t2v: ["Stage 3B — Temporal active", "Script-to-screen pipeline", "PyTorch quantum fusion layer", "IntuiTV production integration"],
            vector: ["1.67M chunks indexed", "Wikipedia + domain data", "Sovereign knowledge base", "Air-gapped retrieval"],
            quantum: ["PilotOS on GB10 Blackwell", "QAOA + matrix multiply", "Local air-gapped install", "Quantum training kernels"],
          };
          return (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute top-2 right-2 z-20 bg-black/90 border rounded-xl p-4 max-w-[220px] text-xs"
              style={{ borderColor: n.glow + "60" }}
            >
              <div className="font-bold mb-2" style={{ color: n.glow }}>{n.label}</div>
              <ul className="space-y-1">
                {info[activeNode]?.map((l, i) => (
                  <li key={i} className="text-white/60 leading-tight">· {l}</li>
                ))}
              </ul>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <svg
        viewBox="0 0 1000 600"
        className="w-full h-auto"
        style={{ minHeight: 340 }}
      >
        <defs>
          {/* Radial glow gradient per node */}
          {NODES.map(n => (
            <radialGradient key={n.id} id={`grad-${n.id}`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={n.glow} stopOpacity="0.5" />
              <stop offset="100%" stopColor={n.glow} stopOpacity="0.0" />
            </radialGradient>
          ))}
          {/* Dot grid */}
          <pattern id="qbrain-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.05)" />
          </pattern>
          {/* Quantum qubit ring gradient */}
          <linearGradient id="qubitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#00c8ff" />
          </linearGradient>
          {/* Arrow marker */}
          <marker id="arrow-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#00c8ff" opacity="0.6" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="1000" height="600" fill="url(#qbrain-dots)" rx="16" />

        {/* ── EDGES ── */}
        {EDGES.map((edge, i) => {
          const from = getNodeById(edge.from);
          const to = getNodeById(edge.to);
          const path = getEdgePath(from, to);
          const pulseOffset = ((tick * 4 + i * 15) % 120);
          return (
            <g key={i}>
              {/* Base path */}
              <path
                d={path}
                fill="none"
                stroke={edge.color}
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeDasharray={edge.dashArray || "none"}
              />
              {/* Animated flow */}
              <path
                d={path}
                fill="none"
                stroke={edge.color}
                strokeWidth="2"
                strokeOpacity="0.6"
                strokeDasharray="20 80"
                strokeDashoffset={-pulseOffset}
                strokeLinecap="round"
              />
              {/* Pulse dot */}
              <circle r="4" fill={edge.pulseColor || edge.color} opacity="0.9">
                <animateMotion path={path} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* ── QUANTUM CIRCUIT OVERLAY on Quantum RAG node ── */}
        <g transform="translate(760, 300)" opacity="0.5">
          {/* Qubit lines */}
          {[0, 1, 2].map(i => (
            <g key={i}>
              <line x1="-80" y1={-20 + i * 20} x2="80" y2={-20 + i * 20} stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.4" />
              {/* Gate boxes */}
              <rect x="-30" y={-27 + i * 20} width="14" height="14" rx="3" fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth="0.8" />
              <text x="-23" y={-16 + i * 20} fontSize="7" textAnchor="middle" fill="#34d399" opacity="0.7">H</text>
              <rect x="16" y={-27 + i * 20} width="14" height="14" rx="3" fill="rgba(0,200,255,0.2)" stroke="#00c8ff" strokeWidth="0.8" />
              <text x="23" y={-16 + i * 20} fontSize="7" textAnchor="middle" fill="#00c8ff" opacity="0.7">R</text>
            </g>
          ))}
          {/* CNOT vertical */}
          <line x1="-10" y1={-20} x2="-10" y2="20" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="2 2" />
          <circle cx="-10" cy="-20" r="3" fill="#34d399" opacity="0.6" />
          <circle cx="-10" cy="20" r="3" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.6" />
          <line x1="-14" y1="20" x2="-6" y2="20" stroke="#34d399" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* ── NODES ── */}
        {NODES.map(n => {
          const isActive = activeNode === n.id;
          const pulseScale = 1 + 0.08 * Math.sin(tick * 0.12 + NODES.indexOf(n) * 0.9);
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveNode(n.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Outer glow ring */}
              <circle
                r={n.r * 1.6 * pulseScale}
                fill={`url(#grad-${n.id})`}
                opacity={isActive ? 0.8 : 0.35}
              />
              {/* Core circle */}
              <circle
                r={n.r}
                fill={n.color}
                stroke={n.glow}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 1 : 0.5}
              />
              {/* For MOTHER — brain-like inner shape */}
              {n.type === "core" && (
                <path
                  d="M-28,6 C-30,-20,-4,-32,8,-20 C26,-42,56,-20,36,4 C50,14,38,38,14,28 C6,46,-26,42,-28,18"
                  fill="none"
                  stroke={n.glow}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                >
                  <animate attributeName="stroke-dasharray" values="3 8; 8 8; 3 8" dur="3s" repeatCount="indefinite" />
                </path>
              )}
              {/* Label */}
              <text
                y={n.type === "core" ? -8 : -5}
                textAnchor="middle"
                fontSize={n.type === "core" ? 13 : 10}
                fontWeight="700"
                fill="white"
                letterSpacing="0.05em"
              >
                {n.label}
              </text>
              <text
                y={n.type === "core" ? 10 : 9}
                textAnchor="middle"
                fontSize={n.type === "core" ? 9 : 8}
                fill={n.glow}
                opacity="0.8"
              >
                {n.sublabel}
              </text>
              {/* Live pulse for active nodes */}
              {(n.id === "mother" || n.id === "qrag" || n.id === "llm") && (
                <circle r="4" fill={n.glow} opacity="0.8" transform={`translate(${n.r - 8}, ${-n.r + 8})`}>
                  <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* ── LEGEND ── */}
        <g transform="translate(20, 560)">
          {[
            { color: "#00c8ff", label: "CORE Reasoning" },
            { color: "#34d399", label: "Quantum RAG" },
            { color: "#a855f7", label: "TRM Router" },
            { color: "#fbbf24", label: "Language" },
          ].map((item, i) => (
            <g key={i} transform={`translate(${i * 180}, 0)`}>
              <circle r="4" fill={item.color} cx="0" cy="0" />
              <text x="10" y="4" fontSize="10" fill="rgba(255,255,255,0.4)">{item.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
