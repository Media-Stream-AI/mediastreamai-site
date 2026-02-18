// app/robotics/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Brain, Cpu, Shield, ExternalLink, Globe, 
  Database, Network, Zap, ArrowRight, Play,
  Terminal, Github 
} from "lucide-react";

export default function RoboticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-600 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg hidden sm:block">MSAI Robotics</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="#platform" className="hover:text-purple-400">Platform</Link>
            <Link href="#convergence" className="hover:text-purple-400">Convergence</Link>
            <Link href="#specs" className="hover:text-purple-400">Specs</Link>
          </div>
          <Link href="/contact">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium">
              Contact
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero with embedded platform */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400">
                  NVIDIA ISAAC GR00T N1 PARTNER
                </span>
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">
                  UK SOVEREIGN
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  British Brain
                </span>
                <br />for Global Bodies
              </h1>
              <p className="text-lg text-white/50 mb-8 max-w-md">
                Sovereign cognitive layer for humanoid robots. MOTHER meets NVIDIA GR00T N1.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="robotics.mediastreamai.com">
                  <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold flex items-center gap-2">
                    Launch Platform <Play className="w-4 h-4" />
                  </button>
                </a>
                <a href="robotics.mediastreamai.com" target="_blank">
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold flex items-center gap-2">
                    <Github className="w-4 h-4" /> SDK
                  </button>
                </a>
              </div>
            </div>
            
            {/* Live Platform Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-black rounded-2xl border border-white/10 overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-white/40 font-mono">robotics.mediastreamai.com</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </div>
                
                {/* Embedded Platform Iframe */}
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black relative">
                  <iframe 
                    src="https://robotics.mediastreamai.com" 
                    className="w-full h-full border-0"
                    title="MOTHER Robotics Platform"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  
                  {/* Overlay for demo - remove this when platform is live */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Platform Loading...</h3>
                      <p className="text-white/50 text-sm">Connecting to sovereign robotics cloud</p>
                    </div>
                  </div>
                </div>
                
                {/* Status Bar */}
                <div className="bg-white/5 px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Sovereign Link Active
                  </span>
                  <span className="text-white/40">|</span>
                  <span className="text-white/40">UK West Data Centre</span>
                  <span className="text-white/40">|</span>
                  <span className="text-cyan-400">GR00T N1 Connected</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="platform" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Sovereign Robotics Platform</h2>
          <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
            Complete development environment for UK sovereign humanoid robotics
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "MOTHER CORE", desc: "70B sovereign reasoning", color: "purple" },
              { icon: Cpu, title: "GR00T N1 Integration", desc: "NVIDIA physical intelligence", color: "green" },
              { icon: Database, title: "Vector Memory", desc: "Qdrant semantic search", color: "blue" },
              { icon: Network, title: "Graph Memory", desc: "Neo4j relationship tracking", color: "cyan" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border bg-${
                  feature.color === "purple" ? "purple" : 
                  feature.color === "green" ? "green" :
                  feature.color === "blue" ? "blue" : "cyan"
                }-500/5 border-${feature.color}-500/20 hover:border-${feature.color}-500/50 transition-all`}
              >
                <feature.icon className={`w-8 h-8 text-${feature.color}-400 mb-4`} />
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Convergence Architecture */}
      <section id="convergence" className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-black via-[#0a0f1a] to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Convergence Architecture</h2>
          <p className="text-white/50 text-center mb-12">MOTHER as sovereign System 2 for GR00T N1</p>

          {/* Dual System Diagram */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* NVIDIA Stack */}
            <div className="bg-white/5 rounded-2xl p-8 border border-[#76b900]/30">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#76b900] rounded-full" />
                NVIDIA Isaac GR00T N1
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-[#76b900] mb-1">System 2 (Slow Thinking)</div>
                  <div className="font-mono">Vision-Language Model</div>
                </div>
                <div className="text-center text-[#76b900]">↓</div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-[#76b900] mb-1">System 1 (Fast Action)</div>
                  <div className="font-mono">Diffusion Policy / Transformer</div>
                </div>
                <div className="text-center text-[#76b900]">↓</div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-mono">Robot Actuators</div>
                </div>
              </div>
            </div>

            {/* MOTHER Stack */}
            <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                MOTHER Sovereign AI
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg p-4">
                  <span className="text-sm text-purple-400 block mb-1">CORE 7B/70B</span>
                  <div className="font-mono">Sovereign Reasoning & Planning</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-500/20 rounded p-2 text-center">
                    <div className="text-xs">LEGAL</div>
                  </div>
                  <div className="bg-purple-500/20 rounded p-2 text-center">
                    <div className="text-xs">DEFENCE</div>
                  </div>
                  <div className="bg-purple-500/20 rounded p-2 text-center">
                    <div className="text-xs">ROBOTICS</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/10 rounded p-3">
                    <div className="text-xs text-white/40">Vector</div>
                    <div className="font-mono text-sm">Qdrant</div>
                  </div>
                  <div className="bg-white/10 rounded p-3">
                    <div className="text-xs text-white/40">Graph</div>
                    <div className="font-mono text-sm">Neo4j</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Flow Diagram */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-lg font-bold mb-6">Data Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span>👤</span>
                <span>UK Operator</span>
              </div>
              <Zap className="w-4 h-4 text-purple-400" />
              <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                <span>🧠</span>
                <span>MOTHER CORE</span>
              </div>
              <Zap className="w-4 h-4 text-purple-400" />
              <div className="flex items-center gap-2 bg-[#76b900]/20 px-4 py-2 rounded-full">
                <span>🤖</span>
                <span>GR00T N1</span>
              </div>
              <Zap className="w-4 h-4 text-purple-400" />
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span>⚙️</span>
                <span>Robot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal / SDK Preview */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/50 rounded-2xl border border-purple-500/30 overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-mono">MOTHER Robotics SDK v1.0.0</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <p><span className="text-green-400">$</span> mother-robotics init --project=uk-defence --env=air-gapped</p>
              <p className="text-white/70">✓ Initializing sovereign robotics environment</p>
              <p className="text-white/70">✓ Loading UK MoD doctrine...</p>
              <p className="text-white/70">✓ Connecting to GR00T N1...</p>
              <p className="text-cyan-400">✓ Sovereign cognitive layer active</p>
              <p className="text-green-400">$</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold">MSAI Robotics</div>
              <div className="text-xs text-white/40">A Media Stream AI Company</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <a href="https://robotics.mediastreamai.com" target="_blank" className="text-purple-400 flex items-center gap-2">
              <span>Platform</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
