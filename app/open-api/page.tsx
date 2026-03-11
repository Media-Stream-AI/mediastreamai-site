"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2, Zap, Shield, Globe, Check, ChevronRight, Copy,
  Brain, Server, Database, Video, ArrowRight, Lock, Key, Terminal,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   MOTHER AI — Open API Access Portal
   Captures leads → POST to CRM + CSV fallback
───────────────────────────────────────────────────────────────────────── */

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/chat/completions",
    model: "mother-core-7b",
    desc: "Deterministic reasoning, defence-grade, T=0",
    color: "cyan",
    icon: Brain,
  },
  {
    method: "POST",
    path: "/v1/completions",
    model: "mother-llm-7b",
    desc: "British language model — creative, legal, code",
    color: "purple",
    icon: Code2,
  },
  {
    method: "POST",
    path: "/v1/rag/query",
    model: "quantum-rag",
    desc: "Quantum-enhanced RAG — 1.67M sovereign chunks",
    color: "green",
    icon: Database,
  },
  {
    method: "POST",
    path: "/v1/video/generate",
    model: "mother-t2v",
    desc: "Text-to-video — script to screen pipeline",
    color: "amber",
    icon: Video,
  },
];

const TIERS = [
  {
    name: "Developer",
    price: "Free",
    period: "",
    desc: "For individual developers and researchers exploring MOTHER AI",
    highlight: false,
    color: "white",
    features: [
      "100 API calls / day",
      "MOTHER LLM 7B access",
      "Basic RAG queries",
      "Community support",
      "Rate limit: 10 req/min",
      "UK data residency",
    ],
    cta: "Start Free",
    tier: "developer",
  },
  {
    name: "Professional",
    price: "£299",
    period: "/mo",
    desc: "For startups and growing teams building sovereign AI products",
    highlight: true,
    color: "cyan",
    features: [
      "10,000 API calls / day",
      "MOTHER CORE 7B + LLM 7B",
      "Quantum RAG access",
      "T2V — 50 videos / day",
      "Priority support (SLA 4h)",
      "Usage analytics dashboard",
      "UK / EU data residency",
    ],
    cta: "Get Access",
    tier: "professional",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Dedicated infrastructure for government, defence and enterprise",
    highlight: false,
    color: "purple",
    features: [
      "Unlimited API calls",
      "Full MOTHER ecosystem",
      "MOTHER CORE 70B access",
      "Air-gapped deployment option",
      "Dedicated GPU cluster",
      "24/7 support + SLAs",
      "Custom fine-tuning",
      "On-premise / sovereign cloud",
      "Defence Tier 3 governance",
    ],
    cta: "Contact Sales",
    tier: "enterprise",
  },
];

const CODE_SAMPLES: Record<string, string> = {
  python: `import requests

API_KEY = "your_msai_api_key"
BASE_URL = "https://api.mediastreamai.com"

response = requests.post(
    f"{BASE_URL}/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "mother-core-7b",
        "messages": [
            {"role": "user", "content": "Analyse this contract clause..."}
        ],
        "temperature": 0,  # Deterministic — defence-grade
        "stream": False
    }
)

print(response.json()["choices"][0]["message"]["content"])`,
  curl: `curl -X POST https://api.mediastreamai.com/v1/chat/completions \\
  -H "Authorization: Bearer your_msai_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mother-core-7b",
    "messages": [{"role": "user", "content": "Hello MOTHER"}],
    "temperature": 0
  }'`,
  js: `const response = await fetch(
  "https://api.mediastreamai.com/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer your_msai_api_key",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mother-core-7b",
      messages: [{ role: "user", content: "Hello MOTHER" }],
      temperature: 0
    })
  }
);
const data = await response.json();
console.log(data.choices[0].message.content);`,
  rag: `# Quantum-Enhanced RAG Query
response = requests.post(
    f"{BASE_URL}/v1/rag/query",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "query": "What is QAOA and how does MOTHER use it?",
        "top_k": 5,
        "quantum_enhanced": True,  # PennyLane swap-test
        "collection": "sovereign_knowledge"
    }
)
for chunk in response.json()["chunks"]:
    print(chunk["text"], chunk["quantum_score"])`,
};

export default function OpenApiPage() {
  const [selectedTier, setSelectedTier] = useState<string>("professional");
  const [codeTab, setCodeTab] = useState<string>("python");
  const [copied, setCopied] = useState(false);
  const [formStep, setFormStep] = useState<"select" | "form" | "done">("select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    country: "United Kingdom",
    useCase: "",
    monthlyVolume: "",
    tier: "professional",
    agreedTerms: false,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedTerms) { setError("Please agree to the API Terms of Service."); return; }
    setLoading(true);
    setError("");

    const payload = {
      source: "website_api_access_form",
      type: "api_access_request",
      tier: form.tier,
      lead: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        company: form.company,
        role: form.jobTitle,
        country: form.country,
      },
      metadata: {
        use_case: form.useCase,
        monthly_volume: form.monthlyVolume,
        requested_tier: form.tier,
        url: typeof window !== "undefined" ? window.location.href : "",
        timestamp: new Date().toISOString(),
        referrer: typeof document !== "undefined" ? document.referrer : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        priority: form.tier === "enterprise" ? "high" : "medium",
      },
    };

    let success = false;

    // Primary: CRM API
    try {
      const res = await fetch("https://api.mediastreamai.com/api/leads/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer msai_sk_live_XHChtYwp3WwmPP0k_sales_platform_2025",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) success = true;
    } catch (_) { /* fall through to local route */ }

    // Fallback: local CSV route
    if (!success) {
      try {
        const res = await fetch("/api/api-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) success = true;
      } catch (_) { /* ignore */ }
    }

    setLoading(false);
    if (success) {
      setFormStep("done");
    } else {
      setError("Could not submit right now. Please email hello@mediastreamai.com with your request.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/8 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 mb-6"
          >
            <Key className="w-4 h-4" />
            MOTHER AI — Open API
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Build with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> Britain&apos;s</span>
            <br />Sovereign AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl max-w-3xl mx-auto mb-10"
          >
            Access MOTHER CORE, Quantum RAG, LLM 7B and T2V via a clean REST API.
            Your data stays sovereign — UK and EU data residency guaranteed.
          </motion.p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { icon: Zap, label: "Sub-100ms TTFT", sub: "Quantum-accelerated retrieval" },
              { icon: Shield, label: "Zero CLOUD Act", sub: "UK & EU data residency" },
              { icon: Globe, label: "5 Data Centres", sub: "Manchester · Liverpool · Durham · EU" },
              { icon: Lock, label: "Air-Gap Option", sub: "On-premise enterprise deploy" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-white/40">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Available Endpoints</h2>
          <p className="text-white/40 mb-8 text-sm">OpenAI-compatible API schema — migrate in minutes</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {ENDPOINTS.map((ep, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-5 rounded-2xl border ${
                  ep.color === "cyan" ? "bg-cyan-500/5 border-cyan-500/20" :
                  ep.color === "purple" ? "bg-purple-500/5 border-purple-500/20" :
                  ep.color === "green" ? "bg-green-500/5 border-green-500/20" :
                  "bg-amber-500/5 border-amber-500/20"
                }`}
              >
                <ep.icon className={`w-8 h-8 mb-3 ${
                  ep.color === "cyan" ? "text-cyan-400" :
                  ep.color === "purple" ? "text-purple-400" :
                  ep.color === "green" ? "text-green-400" :
                  "text-amber-400"
                }`} />
                <div className={`text-xs font-mono px-2 py-0.5 rounded mb-2 inline-block ${
                  ep.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                  ep.color === "purple" ? "bg-purple-500/10 text-purple-400" :
                  ep.color === "green" ? "bg-green-500/10 text-green-400" :
                  "bg-amber-500/10 text-amber-400"
                }`}>
                  {ep.method}
                </div>
                <div className="font-mono text-xs text-white/60 mb-1">{ep.path}</div>
                <div className="font-mono text-xs text-white/30 mb-2">model: {ep.model}</div>
                <p className="text-xs text-white/50">{ep.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Code sample */}
          <div className="bg-[#060c18] border border-white/10 rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-white/5">
              <Terminal className="w-4 h-4 text-white/30 mr-2" />
              {(["python", "curl", "js", "rag"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setCodeTab(tab)}
                  className={`px-4 py-2 text-sm rounded-t-lg transition-colors font-mono ${
                    codeTab === tab
                      ? "bg-white/10 text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {tab === "rag" ? "Quantum RAG" : tab}
                </button>
              ))}
              <div className="ml-auto">
                <button
                  onClick={() => handleCopy(CODE_SAMPLES[codeTab])}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <pre className="p-6 text-sm text-white/70 font-mono overflow-x-auto leading-relaxed">
              <code>{CODE_SAMPLES[codeTab]}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">API Access Plans</h2>
            <p className="text-white/40">Individual developers to enterprise deployments</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedTier(tier.tier)}
                className={`relative p-8 rounded-2xl border cursor-pointer transition-all ${
                  tier.highlight
                    ? "bg-gradient-to-b from-cyan-500/10 to-transparent border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                    : tier.color === "purple"
                    ? "bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40"
                    : "bg-white/5 border-white/10 hover:border-white/25"
                } ${selectedTier === tier.tier ? "ring-1 ring-cyan-500/50" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${
                    tier.color === "cyan" ? "text-cyan-400" :
                    tier.color === "purple" ? "text-purple-400" :
                    "text-white"
                  }`}>{tier.price}</span>
                  <span className="text-white/40 text-sm">{tier.period}</span>
                </div>
                <p className="text-white/50 text-sm mb-6">{tier.desc}</p>

                <ul className="space-y-2 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className={`w-4 h-4 shrink-0 ${
                        tier.color === "cyan" ? "text-cyan-400" :
                        tier.color === "purple" ? "text-purple-400" :
                        "text-green-400"
                      }`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm(f => ({ ...f, tier: tier.tier }));
                    setFormStep("form");
                    document.getElementById("api-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    tier.highlight
                      ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                      : tier.color === "purple"
                      ? "bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Form */}
      <section id="api-form" className="py-16 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {formStep === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Request Received</h2>
                <p className="text-white/50 mb-6 max-w-md mx-auto">
                  We&apos;ll review your application and send your API credentials within 24 hours.
                  Enterprise requests are handled by our solutions team.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8">
                  <div className="text-xs text-white/30 uppercase tracking-wider mb-3 font-mono">What happens next</div>
                  {["API key generated and emailed to you", "Onboarding docs and SDK links included", "Support channel access granted", "For enterprise — solutions call scheduled within 48h"].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <span className="text-cyan-400 text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-sm text-white/60">{s}</span>
                    </div>
                  ))}
                </div>
                <Link href="/">
                  <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold">
                    Back to Home
                  </button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-3">Get API Access</h2>
                  <p className="text-white/40">Fill in your details and we&apos;ll set up your account</p>
                </div>

                {/* Tier selector */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {TIERS.map(t => (
                    <button
                      key={t.tier}
                      onClick={() => setForm(f => ({ ...f, tier: t.tier }))}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                        form.tier === t.tier
                          ? t.color === "cyan" ? "bg-cyan-600 border-cyan-500 text-white" :
                            t.color === "purple" ? "bg-purple-600 border-purple-500 text-white" :
                            "bg-white/20 border-white/40 text-white"
                          : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/50 mb-2">First Name *</label>
                      <input
                        required
                        value={form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="James"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Last Name *</label>
                      <input
                        required
                        value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Work Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      placeholder="james@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Company</label>
                      <input
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="Acme Ltd"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Job Title</label>
                      <input
                        value={form.jobTitle}
                        onChange={e => setForm(f => ({ ...f, jobTitle: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="CTO"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Country</label>
                    <select
                      value={form.country}
                      onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      {["United Kingdom", "Germany", "France", "Netherlands", "Sweden", "Denmark", "Ireland", "Other EU", "Other"].map(c => (
                        <option key={c} value={c} className="bg-black">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Intended Use Case *</label>
                    <select
                      required
                      value={form.useCase}
                      onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="" className="bg-black">Select use case...</option>
                      <option value="legal_analysis" className="bg-black">Legal Analysis & Compliance</option>
                      <option value="code_generation" className="bg-black">Code Generation & Review</option>
                      <option value="content_creation" className="bg-black">Content Creation</option>
                      <option value="research" className="bg-black">Research & Analysis</option>
                      <option value="defence_security" className="bg-black">Defence / Security</option>
                      <option value="government" className="bg-black">Government / Public Sector</option>
                      <option value="healthcare" className="bg-black">Healthcare / Life Sciences</option>
                      <option value="media_broadcasting" className="bg-black">Media & Broadcasting</option>
                      <option value="enterprise_automation" className="bg-black">Enterprise Automation</option>
                      <option value="education" className="bg-black">Education</option>
                      <option value="other" className="bg-black">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Expected Monthly API Volume</label>
                    <select
                      value={form.monthlyVolume}
                      onChange={e => setForm(f => ({ ...f, monthlyVolume: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="" className="bg-black">Select volume...</option>
                      <option value="<1k" className="bg-black">Under 1,000 calls/month</option>
                      <option value="1k-10k" className="bg-black">1,000 – 10,000 calls/month</option>
                      <option value="10k-100k" className="bg-black">10,000 – 100,000 calls/month</option>
                      <option value="100k-1m" className="bg-black">100,000 – 1M calls/month</option>
                      <option value=">1m" className="bg-black">1M+ calls/month</option>
                    </select>
                  </div>

                  {/* Terms */}
                  <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreedTerms}
                        onChange={e => setForm(f => ({ ...f, agreedTerms: e.target.checked }))}
                        className="mt-1 accent-cyan-500"
                      />
                      <span className="text-sm text-white/50">
                        I agree to the{" "}
                        <Link href="/terms" className="text-cyan-400 hover:underline">API Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
                        I understand that MOTHER AI processes data within UK / EU jurisdiction only,
                        and that my API key is for the stated use case.
                      </span>
                    </label>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request API Access <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-white/25">
                    Your data is stored in UK sovereign infrastructure. Zero US cloud dependencies.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Infrastructure trust strip */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: "UK Data Sovereignty", desc: "All inference in UK / EU. No CLOUD Act exposure." },
              { icon: Zap, label: "728× H200 GPUs", desc: "5 data centres. 65% energy saving via canal cooling." },
              { icon: Lock, label: "Tier 3 Governance", desc: "Temperature=0, deterministic, fully auditable." },
              { icon: Server, label: "99.9% Uptime SLA", desc: "Enterprise: dedicated cluster + failover." },
            ].map((s, i) => (
              <div key={i} className="p-5 bg-white/3 border border-white/8 rounded-2xl">
                <s.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <div className="font-semibold mb-1">{s.label}</div>
                <p className="text-white/45 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
