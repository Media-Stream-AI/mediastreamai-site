"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, Brain, Server, Lock, ArrowRight, ExternalLink,
  CheckCircle2, Sparkles, Play
} from "lucide-react";

export default function HomePage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Media Stream AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <Link href="/mother" className="hover:text-white transition-colors">MOTHER AI</Link>
            <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/government-defence" className="hover:text-white transition-colors">Defence</Link>
          </div>

          <Link href="/contact">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-sm font-medium transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Ambient background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Trust badges - small and subtle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
              🎖️ Veteran Run
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
              NVIDIA Inception
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
              100% UK/EU
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
              European Sovereign AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Your data. Your AI. Your jurisdiction.
            <br className="hidden sm:block" />
            From infrastructure to intelligence—complete sovereignty.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="https://mother.mediastreamai.com" target="_blank">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Try MOTHER AI
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                Talk to Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Visual element - Sovereign stack visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="relative p-8 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl backdrop-blur-sm">
              {/* Stack layers */}
              <div className="space-y-3">
                {[
                  { label: "Applications", sub: "IntuiTV • Creator Studio • Robotics", color: "blue" },
                  { label: "MOTHER AI", sub: "70B LLM • Specialist Models • Agents", color: "cyan" },
                  { label: "Infrastructure", sub: "5 UK/EU Data Centres • NVIDIA GPU", color: "green" },
                ].map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-default ${
                      layer.color === "blue" ? "bg-blue-500/10 border-blue-500/20" :
                      layer.color === "cyan" ? "bg-cyan-500/10 border-cyan-500/20" :
                      "bg-green-500/10 border-green-500/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold ${
                          layer.color === "blue" ? "text-blue-400" :
                          layer.color === "cyan" ? "text-cyan-400" :
                          "text-green-400"
                        }`}>{layer.label}</div>
                        <div className="text-sm text-white/40">{layer.sub}</div>
                      </div>
                      <CheckCircle2 className={`w-5 h-5 ${
                        layer.color === "blue" ? "text-blue-400/50" :
                        layer.color === "cyan" ? "text-cyan-400/50" :
                        "text-green-400/50"
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Sovereignty badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40">
                <Lock className="w-4 h-4" />
                <span>Zero CLOUD Act exposure • 100% European owned</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT WE DO - SIMPLE 3 PILLARS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Complete AI sovereignty from the silicon up. No US cloud dependency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: "Sovereign Infrastructure",
                desc: "UK & EU data centres with canal-cooled NVIDIA GPU clusters. Your data never leaves European jurisdiction.",
                color: "green",
              },
              {
                icon: Brain,
                title: "MOTHER AI",
                desc: "70B parameter LLM trained on British data, values, and law. Plus specialist models for code, legal, science, and defence.",
                color: "cyan",
              },
              {
                icon: Shield,
                title: "Data Security",
                desc: "Zero CLOUD Act exposure. GDPR compliant by design. Air-gapped options for government and defence.",
                color: "purple",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-8 rounded-2xl border transition-all hover:scale-[1.02] ${
                  item.color === "green" ? "bg-green-500/5 border-green-500/10 hover:border-green-500/30" :
                  item.color === "cyan" ? "bg-cyan-500/5 border-cyan-500/10 hover:border-cyan-500/30" :
                  "bg-purple-500/5 border-purple-500/10 hover:border-purple-500/30"
                }`}
              >
                <item.icon className={`w-10 h-10 mb-6 ${
                  item.color === "green" ? "text-green-400" :
                  item.color === "cyan" ? "text-cyan-400" :
                  "text-purple-400"
                }`} />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Built for trust.<br />
                <span className="text-white/40">Run by veterans.</span>
              </h2>

              <div className="space-y-6">
                {[
                  { stat: "5", label: "UK/EU Data Centres", sub: "Manchester • Liverpool • Durham • Düsseldorf • Marseille" },
                  { stat: "40%", label: "Energy Reduction", sub: "Canal-cooled infrastructure vs hyperscalers" },
                  { stat: "99.99%", label: "Uptime SLA", sub: "Enterprise-grade reliability" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl font-bold text-cyan-400 w-20">{item.stat}</div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-white/40">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Why sovereign */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-2xl border border-cyan-500/20"
            >
              <h3 className="text-xl font-semibold mb-6">Why sovereignty matters</h3>
              <ul className="space-y-4">
                {[
                  "Your training data stays in European jurisdiction",
                  "No US CLOUD Act access to your models or data",
                  "Full GDPR compliance built into the infrastructure",
                  "Air-gapped deployment options for sensitive use cases",
                  "Your IP remains yours—we don't train on customer data",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SIMPLE CTA ===== */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to take control?
            </h2>
            <p className="text-white/50 mb-10 max-w-xl mx-auto">
              Whether you need GPU compute, an AI assistant, or a complete sovereign solution—we're here to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-white/90 rounded-xl font-semibold transition-all">
                  Contact Sales
                </button>
              </Link>
              <Link href="https://mother.mediastreamai.com" target="_blank">
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  Try MOTHER AI
                  <ExternalLink className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-semibold">Media Stream AI Ltd</div>
                <div className="text-xs text-white/40">European Sovereign AI</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Systems Operational
              </span>
            </div>
          </div>

          <div className="text-center text-xs text-white/30 mt-8">
            © 2026 Media Stream AI Ltd. All rights reserved. GDPR Compliant.
          </div>
        </div>
      </footer>
    </main>
  );
}
