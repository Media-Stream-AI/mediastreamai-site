"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Server, Shield, Tv, Bot, Cpu, ArrowRight, ExternalLink } from "lucide-react";

// MOTHER Chat typing animation
const chatMessages = [
  { role: "mother", text: "Hello, I'm MOTHER — a UK Sovereign AI built for European data independence." },
  { role: "mother", text: "I run on 8 NVIDIA H200 GPUs across UK data centres. Your data never leaves European jurisdiction." },
  { role: "mother", text: "I can help with code, legal analysis, scientific research, creative writing, and video generation." },
  { role: "mother", text: "All training data is British. All weights are proprietary. Zero US cloud dependencies." },
];

function MotherChatDemo() {
  const [currentMsg, setCurrentMsg] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentMsg >= chatMessages.length) {
      setTimeout(() => { setCurrentMsg(0); setDisplayText(""); }, 3000);
      return;
    }

    const msg = chatMessages[currentMsg].text;
    let i = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (i < msg.length) {
        setDisplayText(msg.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => setCurrentMsg(c => c + 1), 2000);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentMsg]);

  return (
    <div className="bg-black/50 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-cyan-400">MOTHER CORE</div>
          <div className="text-xs text-white/50">UK Sovereign AI • Online</div>
        </div>
        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      <div className="min-h-[120px]">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex-1">
            <p className="text-white/90 leading-relaxed">
              {displayText}
              {isTyping && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Service cards
const services = [
  {
    icon: Brain,
    title: "MOTHER AI",
    desc: "70B UK Sovereign LLM",
    url: "https://mother.mediastreamai.com",
    color: "cyan",
    features: ["Chat Interface", "Code Generation", "Legal Analysis"]
  },
  {
    icon: Cpu,
    title: "MOTHER Compute",
    desc: "GPU Infrastructure",
    url: "/solutions",
    color: "green",
    features: ["H200 • B200 • SambaNova", "73% vs AWS", "Canal-Cooled"]
  },
  {
    icon: Tv,
    title: "IntuiTV",
    desc: "AI Content Studio",
    url: "https://studio.intuitv.app",
    color: "blue",
    features: ["Script-to-Screen", "AI Video Gen", "HLS Playout"]
  },
  {
    icon: Bot,
    title: "MSAI Robotics",
    desc: "Embodied AI",
    url: "https://robotics.mediastreamai.com",
    color: "purple",
    features: ["Isaac Lab", "Humanoid Control", "Vision AI"]
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Media Stream AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="https://mother.mediastreamai.com" className="hover:text-cyan-400">MOTHER AI</Link>
            <Link href="https://studio.intuitv.app" className="hover:text-cyan-400">Studio</Link>
            <Link href="/government-defence" className="hover:text-cyan-400">Defence</Link>
          </div>
          <Link href="/contact">
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-medium">
              Contact
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero with MOTHER Chat */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">UK Sovereign</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">NVIDIA Inception</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">European</span>
              <br />Sovereign AI
            </h1>
            <p className="text-lg text-white/50 mb-8 max-w-md">
              From GPU infrastructure to production AI. Zero US dependencies. Zero CLOUD Act exposure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://mother.mediastreamai.com">
                <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold flex items-center gap-2">
                  Try MOTHER AI <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
          <div>
            <MotherChatDemo />
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">Our Platforms</h2>
          <p className="text-white/50 text-center mb-12">Complete AI sovereignty stack</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <Link key={i} href={s.url}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer h-full ${
                    s.color === "cyan" ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/50" :
                    s.color === "green" ? "bg-green-500/5 border-green-500/20 hover:border-green-500/50" :
                    s.color === "blue" ? "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/50" :
                    "bg-purple-500/5 border-purple-500/20 hover:border-purple-500/50"
                  }`}
                >
                  <s.icon className={`w-10 h-10 mb-4 ${
                    s.color === "cyan" ? "text-cyan-400" :
                    s.color === "green" ? "text-green-400" :
                    s.color === "blue" ? "text-blue-400" :
                    "text-purple-400"
                  }`} />
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-white/50 mb-4">{s.desc}</p>
                  <ul className="space-y-1">
                    {s.features.map((f, j) => (
                      <li key={j} className="text-xs text-white/40">• {f}</li>
                    ))}
                  </ul>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>


{/* ===== ROBOTICS CONVERGENCE SECTION ===== */}
<section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-black via-[#0a0f1a] to-black">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400 mb-4 inline-block">
        PHYSICAL INTELLIGENCE
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        MOTHER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">ROBOTICS</span>
      </h2>
      <p className="text-white/50 max-w-2xl mx-auto">
        Sovereign AI for humanoid robots. British brain. Global body.
      </p>
    </div>

    {/* Convergence Diagram */}
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      {/* NVIDIA Stack */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-[#76b900]/30 hover:border-[#76b900] transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-[#76b900]/20 text-[#76b900] rounded-full text-xs font-mono">
            NVIDIA ISAAC GR00T N1
          </span>
          <h3 className="font-semibold">Physical Intelligence</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#76b900]">
            <div className="text-xs text-white/40 mb-1">System 2 (Slow Thinking)</div>
            <div className="font-mono text-sm">Vision-Language Model</div>
          </div>
          <div className="text-center text-[#76b900]">↓</div>
          <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#76b900]">
            <div className="text-xs text-white/40 mb-1">System 1 (Fast Action)</div>
            <div className="font-mono text-sm">Diffusion Policy</div>
          </div>
          <div className="text-center text-[#76b900]">↓</div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="font-mono text-sm">Robot Actuators</div>
          </div>
        </div>
      </motion.div>

      {/* MOTHER Stack */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono">
            MOTHER SOVEREIGN AI
          </span>
          <h3 className="font-semibold">Cognitive Intelligence</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg p-4">
            <span className="px-2 py-1 bg-purple-500 text-white rounded text-xs mr-2">CORE</span>
            <span className="font-mono text-sm">7B/70B Sovereign Reasoning</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs">LEGAL</span>
            <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs">DEFENCE</span>
            <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs">ROBOTICS</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-xs text-white/40">Vector</div>
              <div className="font-mono text-xs">Qdrant</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-xs text-white/40">Graph</div>
              <div className="font-mono text-xs">Neo4j</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Integration Flow */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8"
    >
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👤</span>
          <span>UK Operator</span>
        </div>
        <span className="text-purple-400 text-xl">→</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span>MOTHER CORE</span>
        </div>
        <span className="text-purple-400 text-xl">→</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span>GR00T N1</span>
        </div>
      </div>
    </motion.div>

    {/* CTA */}
    <div className="text-center">
      <Link href="/robotics">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto"
        >
          Explore Robotics Platform <ExternalLink className="w-4 h-4" />
        </motion.button>
      </Link>
    </div>
  </div>
</section>


      
      {/* Stats */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "8×", label: "H200 GPUs" },
            { stat: "5", label: "EU Data Centres" },
            { stat: "70B", label: "Parameters" },
            { stat: "0", label: "US Dependencies" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-cyan-400">{s.stat}</div>
              <div className="text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Built for Trust</h2>
          <p className="text-white/50 mb-8 max-w-2xl mx-auto">
            Military veteran leadership. UK data sovereignty. GDPR compliant. No external base models. Full audit trail.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/government-defence">
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold">
                Government & Defence
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold">Media Stream AI Ltd</div>
              <div className="text-xs text-white/40">UK Sovereign AI</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span className="text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </div>
        <div className="text-center text-xs text-white/30 mt-8">
          © 2026 Media Stream AI Ltd. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
