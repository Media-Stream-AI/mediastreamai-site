"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Server, Shield, Tv, Bot, Cpu, ArrowRight, ExternalLink } from "lucide-react";

// MOTHER Chat typing animation
const chatMessages = [
  { role: "mother", text: "Hello, I'm MOTHER — a UK Sovereign AI built for European AI & data independence." },
  { role: "mother", text: "I am built as a new British Class of LLM called MODULAR COGNITIVE ARCHITECTURE" },
  { role: "mother", text: "Did you know i was built and trainined in the same city as BABY the first computer - and every BABY needs a MOTHER!." },
  { role: "mother", text: "I trained on NVIDIA H200 GPU's - I now run on inference chips across MSAI UK & EU data centres. Your data never leaves European jurisdiction." },
  { role: "mother", text: "I can help with code, legal analysis, scientific research, creative writing, and video generation - and soon I will be walking..." },
  { role: "mother", text: "All training data is British. All weights are proprietary. Zero dependencies." },
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

      {/* ===== MODULAR COGNITIVE ARCHITECTURE ===== */}
      <section className="py-16 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000a18] to-black" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400 mb-4 inline-block">
              BRITISH CLASS OF LLM
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              MODULAR COGNITIVE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ARCHITECTURE
              </span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Cognition separated into specialized, independently upgradeable domains
            </p>
          </div>

          {/* Architecture Flow Panel */}
          <div className="bg-[#000022]/80 backdrop-blur border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            {/* Subtle dot grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />

            <div className="relative z-10">
              {/* MOTHER Hub Node */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/30 rounded-xl flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="font-bold tracking-wide">MOTHER</span>
                  <span className="text-[10px] text-white/30 font-mono hidden sm:inline">Sovereign AI Engine</span>
                </motion.div>
              </div>

              {/* Connection lines */}
              <div className="hidden md:flex justify-center mb-4">
                <div className="relative w-full max-w-3xl h-6">
                  <div className="absolute left-1/2 top-0 w-px h-3 bg-gradient-to-b from-cyan-500/30 to-transparent" />
                  <div className="absolute left-[16.67%] right-[16.67%] top-3 h-px bg-gradient-to-r from-cyan-500/20 via-white/10 to-amber-500/20" />
                  <div className="absolute left-[16.67%] top-3 w-px h-3 bg-cyan-500/20" />
                  <div className="absolute left-1/2 top-3 w-px h-3 bg-purple-500/20" />
                  <div className="absolute right-[16.67%] top-3 w-px h-3 bg-amber-500/20" />
                </div>
              </div>

              {/* Three Engine Nodes */}
              <div className="grid md:grid-cols-3 gap-3">
                {/* CORE 7B */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,200,255,0.4)]" />
                    <h3 className="font-bold text-sm text-cyan-400">CORE 7B</h3>
                  </div>
                  <p className="text-[10px] text-white/25 mb-3 uppercase tracking-widest">Deterministic Reasoning</p>

                  <div className="space-y-1">
                    {[
                      ['Reasoning', 'Theorem proving'],
                      ['Science', 'Physics sims'],
                      ['Defence', 'Threat assessment'],
                      ['Legal', 'Compliance'],
                      ['Maths', 'Optimization'],
                    ].map(([name, hint]) => (
                      <div key={name} className="flex items-center gap-2 group/item">
                        <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
                        <span className="text-[11px] text-white/40 font-mono flex-1">CORE-{name}</span>
                        <span className="text-[8px] text-cyan-500/30 hidden group-hover/item:inline">{hint}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-cyan-500/10 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-500/60" />
                    <span className="text-[8px] text-cyan-500/40 font-mono">T=0 DETERMINISTIC AUDITABLE</span>
                  </div>
                </motion.div>

                {/* LLM 7B */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-purple-500/5 border border-purple-500/15 rounded-xl p-4 hover:border-purple-500/40 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                    <h3 className="font-bold text-sm text-purple-400">LLM 7B</h3>
                  </div>
                  <p className="text-[10px] text-white/25 mb-3 uppercase tracking-widest">Public Language Engine</p>

                  <div className="space-y-1">
                    {[
                      ['Creative', 'Narrative gen'],
                      ['Coder', 'Code & docs'],
                      ['Policy', 'Gov writing'],
                      ['Education', 'Teaching'],
                    ].map(([name, hint]) => (
                      <div key={name} className="flex items-center gap-2 group/item">
                        <span className="w-1 h-1 rounded-full bg-purple-500/40" />
                        <span className="text-[11px] text-white/40 font-mono flex-1">LLM-{name}</span>
                        <span className="text-[8px] text-purple-500/30 hidden group-hover/item:inline">{hint}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-purple-500/10 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-purple-500/60" />
                    <span className="text-[8px] text-purple-500/40 font-mono">BRITISH TONE CONVERSATIONAL</span>
                  </div>
                </motion.div>

                {/* T2V */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 hover:border-amber-500/40 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    <h3 className="font-bold text-sm text-amber-400">T2V</h3>
                  </div>
                  <p className="text-[10px] text-white/25 mb-3 uppercase tracking-widest">Sovereign Multi-Modal</p>

                  {/* Pipeline Flow */}
                  <div className="space-y-1">
                    {[
                      { stage: 'Stage2C', label: 'Latent' },
                      { stage: 'Stage3A', label: 'Motion' },
                      { stage: 'Stage3B', label: 'Temporal' },
                      { stage: 'Stage4', label: 'Decoder' },
                    ].map((s, i, arr) => (
                      <div key={s.stage}>
                        <div className="flex items-center gap-2 bg-amber-500/10 rounded px-2 py-1">
                          <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                          <span className="text-[11px] font-mono text-amber-400/70 flex-1">{s.stage}</span>
                          <span className="text-[9px] text-white/20">{s.label}</span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="flex justify-center">
                            <span className="text-amber-500/20 text-[10px] leading-none">{'\u2193'}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-amber-500/10 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                    <span className="text-[8px] text-amber-500/40 font-mono">TEXT-TO-VIDEO PIPELINE</span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-white/5">
                {[
                  { color: 'bg-cyan-500', label: 'Deterministic' },
                  { color: 'bg-purple-500', label: 'Language' },
                  { color: 'bg-amber-500', label: 'Multi-Modal' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                    <span className="text-[9px] text-white/25">{label}</span>
                  </div>
                ))}
                <span className="text-[9px] text-white/15 font-mono ml-2">LoRA/SFT Adapters</span>
              </div>
            </div>
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
