"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, Lock, Award, Users, CheckCircle, AlertTriangle,
  Cpu, Globe, Satellite, Radio, Monitor, Database,
  Eye, Map, Layers, Wifi, Search, Video
} from "lucide-react";

/* ─── Available defence images ───────────────────────────────────────────── */
const DEFENCE_IMAGES = new Set([
  "mother-defence-decision-support.jpg",
  "mother-defence-fusion-engine.jpg",
  "mother-defence-global-intel.jpg",
  "mother-defence-intel-terminal.jpg",
  "mother-defence-osint.jpg",
  "mother-defence-overview.jpg",
  "mother-defence-radio-scanner.jpg",
  "mother-defence-satellite-tracker.jpg",
  "mother-defence-sovereign-watch.jpg",
  "mother-defence-video-wall.jpg",
]);

/* ─── Image Placeholder ──────────────────────────────────────────────────── */
function ImagePlaceholder({
  filename, label, aspect = "aspect-video"
}: {
  filename: string; label: string; aspect?: string;
}) {
  if (DEFENCE_IMAGES.has(filename)) {
    return (
      <div className={`${aspect} relative overflow-hidden rounded-xl`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${filename}`}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`${aspect} bg-gradient-to-br from-blue-900/10 to-black/60 border border-blue-400/20 rounded-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent" />
      <Monitor size={28} className="text-blue-400/30 relative z-10" />
      <div className="relative z-10 text-center px-4">
        <p className="text-[10px] font-mono text-blue-400/40 tracking-wider">{label}</p>
        <p className="text-[9px] font-mono text-white/20 mt-1">{filename}</p>
        <p className="text-[8px] font-mono text-white/15 mt-0.5">1920 × 1080 px · 16:9</p>
      </div>
    </div>
  );
}

/* ─── Capability Panel Card ──────────────────────────────────────────────── */
function CapabilityCard({
  icon, title, description, filename, delay = 0
}: {
  icon: React.ReactNode; title: string; description: string;
  filename: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all"
    >
      <ImagePlaceholder filename={filename} label={title} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-blue-400">{icon}</div>
          <h3 className="font-bold text-white text-base">{title}</h3>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function GovernmentDefencePage() {

  /* ─── MOTHER Defence panels ─────────────────────────────────────────── */
  const motherDefencePanels = [
    {
      icon: <Map size={18} />,
      title: "Common Operating Picture",
      description:
        "Interactive Leaflet map overlaying real-time ADS-B aircraft, AIS vessel tracks, USGS seismic events, and NATO symbol overlays with classified geofence alerting.",
      filename: "mother-defence-cop-map.jpg",
    },
    {
      icon: <Eye size={18} />,
      title: "Sovereign Watch",
      description:
        "Aviation & maritime threat intelligence: live ADS-B/Mode-S tracks, MLAT-correlated positions, anomaly detection including spoofing, altitude deviations, and EMCON breaks.",
      filename: "mother-defence-sovereign-watch.jpg",
    },
    {
      icon: <Shield size={18} />,
      title: "Cyber Threat Intelligence",
      description:
        "CISA Known Exploited Vulnerabilities feed, SANS InfoCon level, URLhaus IOCs, Shodan exposure scoring, and Kaspersky CyberThreat Map correlated with live CVE/CVSS data.",
      filename: "mother-defence-cyber-threat.jpg",
    },
    {
      icon: <Cpu size={18} />,
      title: "Intel Terminal",
      description:
        "Sovereign AI command interface running the sandboxed 7-billion-parameter MOTHER Defence LLM. Natural-language queries against live feeds; structured intelligence reports on demand.",
      filename: "mother-defence-intel-terminal.jpg",
    },
    {
      icon: <Database size={18} />,
      title: "Data Fusion Engine",
      description:
        "Kafka-brokered multi-source ingest pipeline with 25+ real-time streams. Data normalisation, deduplication, cross-source correlation, and source confidence scoring.",
      filename: "mother-defence-fusion-engine.jpg",
    },
    {
      icon: <Layers size={18} />,
      title: "Decision Support (HITL)",
      description:
        "Human-in-the-Loop action queue with AI-generated recommendations and confidence scores. Escalation chains, four-eyes verification, and full audit trail for critical actions.",
      filename: "mother-defence-decision-support.jpg",
    },
    {
      icon: <Globe size={18} />,
      title: "Global Intel",
      description:
        "USGS seismic network (M2.5+), GDELT geopolitical event correlation, NOAA NWS weather warnings, FIRMS active fire data, and international disaster event tracking.",
      filename: "mother-defence-global-intel.jpg",
    },
    {
      icon: <Satellite size={18} />,
      title: "Satellite Tracker",
      description:
        "CelesTrak TLE feeds for ISS, Starlink, NOAA, and classified orbital objects. Real-time polar plot, pass prediction, conjunction analysis, and orbital decay monitoring.",
      filename: "mother-defence-satellite-tracker.jpg",
    },
    {
      icon: <Monitor size={18} />,
      title: "Live Feed",
      description:
        "GOES-16/18 full-disc satellite imagery, ISS HD stream, NOAA weather radar loops, and real-time GFS/ECMWF numerical weather model overlays.",
      filename: "mother-defence-live-feed.jpg",
    },
    {
      icon: <Video size={18} />,
      title: "Global Video Wall",
      description:
        "49-channel HLS global news monitoring wall — BBC World, Sky News, CNN International, Al Jazeera, RT, CGTN, France 24, NHK World — with AI transcript tagging and entity extraction.",
      filename: "mother-defence-video-wall.jpg",
    },
    {
      icon: <Radio size={18} />,
      title: "HF/VHF/UHF Radio Scanner",
      description:
        "WebSDR-backed global radio monitoring: aviation guard (121.5 MHz), marine distress (156.8 MHz), military comms bands, weather VOLMET, and emergency services frequencies.",
      filename: "mother-defence-radio-scanner.jpg",
    },
    {
      icon: <Search size={18} />,
      title: "OSINT & Personnel Search",
      description:
        "Open-source intelligence engine: Shodan/Censys/ZoomEye asset discovery, Wayback Machine archive correlation, breach data integration, and social graph mapping.",
      filename: "mother-defence-osint.jpg",
    },
    {
      icon: <Wifi size={18} />,
      title: "Urban ISR / JamCam",
      description:
        "921 TfL road camera feeds with AI vehicle and crowd density counting, anomaly detection, and event correlation. Extensible to broader CCTV network integrations.",
      filename: "mother-defence-jamcam-isr.jpg",
    },
  ];

  const fusionStats = [
    { value: "25k+",   label: "Live Data Sources" },
    { value: "7B",    label: "Parameter Sovereign LLM" },
    { value: "13+",    label: "Capability Panels" },
    { value: "490",    label: "Global News Streams" },
    { value: "921",   label: "Urban ISR Feeds" },
    { value: "100%",  label: "UK Sovereign Infrastructure" },
  ];

  /* ─── Existing content ──────────────────────────────────────────────── */
  const capabilities = [
    {
      title: "Air-Gapped Infrastructure",
      icon: <Lock size={32} className="text-blue-400" />,
      description:
        "Completely isolated deployment at Dundee, Scotland facility with zero internet connectivity. Your classified workloads remain physically and logically separated from all other systems.",
    },
    {
      title: "UK Security Cleared Personnel",
      icon: <Shield size={32} className="text-blue-400" />,
      description:
        "All personnel with access to government and defence infrastructure hold appropriate UK SC security clearances.",
    },
    {
      title: "Security Engagement",
      icon: <Award size={32} className="text-blue-400" />,
      description:
        "Active engagement with Security providers for classified & unclassified AI workloads. We understand the unique requirements of defence and intelligence operations.",
    },
    {
      title: "Military Veteran Leadership",
      icon: <Users size={32} className="text-green-400" />,
      description:
        "Founded and run by military veterans who understand operational security, chain of command, and the importance of mission success.",
    },
  ];

  const useCases = [
    {
      category: "Intelligence Analysis",
      examples: [
        "Classified document processing and synthesis",
        "Multi-source intelligence correlation",
        "Pattern recognition in signals intelligence",
        "Automated threat assessment",
        "Real-time situation awareness",
      ],
    },
    {
      category: "Defence Operations",
      examples: [
        "Operational planning and scenario modeling",
        "Autonomous systems coordination",
        "Logistics optimization",
        "Supply chain security",
        "Mission rehearsal and simulation",
      ],
    },
    {
      category: "Cybersecurity",
      examples: [
        "Network threat detection",
        "Incident response automation",
        "Vulnerability assessment",
        "Security operations center (SOC) automation",
        "Threat intelligence analysis",
      ],
    },
    {
      category: "Government Services",
      examples: [
        "Citizen inquiry processing (public-facing)",
        "Policy document analysis",
        "Cross-department coordination",
        "Fraud detection and prevention",
        "Emergency response coordination",
      ],
    },
  ];

  const securityFeatures = [
    "Physical access controls with biometric authentication",
    "Faraday cage EMI/RF shielding",
    "Dedicated power supply with UPS backup",
    "UK security-cleared operations team",
    "No unvetted remote access - on-premises only",
    "Complete audit trail and logging",
    "Compliance with all security & ISO Requirements",
    "STRAP classified workload capability",
    "Cyber Essentials Plus certified",
  ];

  const differentiators = [
    {
      title: "100% UK Ownership",
      description:
        "Media Stream AI is British-owned and operated. No foreign investors. No offshore subsidiaries. Complete UK control.",
    },
    {
      title: "Military Veteran Run",
      description:
        "Our leadership team includes veterans who understand operational security, mission-critical systems, and the unique requirements of defence operations.",
    },
    {
      title: "Purpose-Built for Sovereignty",
      description:
        "We didn't add sovereignty as an afterthought. Our entire infrastructure was designed from day one for UK/EU data residency and operational independence.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600/20 border border-blue-400/40 rounded-full">
              <span className="text-sm font-semibold text-blue-300">Military Veteran Run</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-600/20 border border-red-400/40 rounded-full">
              <span className="text-sm font-semibold text-red-300">MOD Engaged</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-600/20 border border-green-400/40 rounded-full">
              <span className="text-sm font-semibold text-green-300">Air-Gapped Available</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[1.1] mb-6 md:mb-8 px-4">
            <span className="block text-white">Government &</span>
            <span className="block text-blue-400">Defence AI</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 px-4">
            100% UK sovereign AI infrastructure for national security operations.
            Air-gapped deployment with military veteran leadership.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Zero foreign dependencies. Zero CLOUD Act exposure. Complete operational independence.
          </p>
          <p className="mt-6 inline-block text-base sm:text-lg md:text-xl font-semibold text-red-300 border border-red-400/30 bg-red-600/10 rounded-full px-5 py-2 max-w-3xl mx-auto">
            MOTHER DeepVision model powering MOTHER DEFENCE and OverWatch systems for Security &amp; Defence.
          </p>
        </motion.div>

        {/* ── MOTHER Defence Platform ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          {/* Section header */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/15 border border-red-400/30 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm font-mono font-semibold text-red-300 tracking-widest uppercase">
                Live Platform
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">MOTHER Defence</h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
              A fully sovereign, real-time multi-source intelligence platform running on UK
              infrastructure. 13 integrated capability panels fused through a Kafka data pipeline
              and commanded via a sandboxed 7-billion-parameter on-premises LLM.
            </p>
          </div>

          {/* Overview dashboard image placeholder */}
          <div className="mb-10">
            <ImagePlaceholder
              filename="mother-defence-overview.jpg"
              label="MOTHER Defence — Full Dashboard Overview"
            />
            <p className="text-center text-xs text-white/30 font-mono mt-3">
              Full MOTHER Defence multi-panel command interface · 1920 × 1080 px
            </p>
          </div>

          {/* Fusion stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {fusionStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-black/40 border border-white/10 rounded-xl p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-xs text-white/50 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* 13 capability panels */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              13 Integrated Capability Panels
            </h3>
            <p className="text-white/50 text-center text-sm mb-8">
              Each panel streams live data and feeds the sovereign AI decision layer
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {motherDefencePanels.map((panel, i) => (
                <CapabilityCard
                  key={i}
                  icon={panel.icon}
                  title={panel.title}
                  description={panel.description}
                  filename={panel.filename}
                  delay={i * 0.04}
                />
              ))}
            </div>
          </div>

          {/* Sovereign LLM note */}
          <div className="bg-gradient-to-br from-blue-600/10 to-blue-900/10 border border-blue-400/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Cpu size={28} className="text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Sandboxed Sovereign LLM — 7 Billion Parameters
                </h4>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  The MOTHER Defence Intel Terminal runs a fully sandboxed, on-premises
                  7-billion-parameter large language model with no internet connectivity.
                  All inference occurs on UK sovereign hardware within our Dundee, Scotland air-gapped
                  facility. The model is fine-tuned for structured threat assessment, SIGINT
                  triage, and mission-brief generation. No prompt data leaves the facility
                  perimeter.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Core Capabilities ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Core Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {capabilities.map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all"
              >
                <div className="mb-4">{capability.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{capability.title}</h3>
                <p className="text-sm md:text-base text-white/70">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Use Cases ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Government & Defence Use Cases
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {useCases.map((useCase, i) => (
              <div key={i} className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{useCase.category}</h3>
                <ul className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-white/80">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Security Features ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Security Features & Certifications
          </h2>
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-400/30 rounded-2xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Shield size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Why We're Different ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Why Government & Defence Choose Us
          </h2>
          <div className="space-y-6 md:space-y-8">
            {differentiators.map((diff, i) => (
              <div key={i} className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{diff.title}</h3>
                <p className="text-sm md:text-base lg:text-lg text-white/70">{diff.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CLOUD Act Warning ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="bg-yellow-600/10 border border-yellow-400/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle size={32} className="text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-3">
                  CLOUD Act Exposure: A Critical Risk
                </h3>
                <p className="text-sm md:text-base text-white/80 mb-4">
                  US hyperscalers (AWS, Azure, Google Cloud) are all subject to the CLOUD Act,
                  which compels them to provide US government agencies with access to data stored
                  anywhere in the world, including UK and EU data centers.
                </p>
                <p className="text-sm md:text-base text-white/80">
                  <strong className="text-white">
                    Media Stream AI is UK-owned with zero US parent exposure.
                  </strong>{" "}
                  Your classified data remains under UK jurisdiction and UK law exclusively.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Dundee Air-Gapped Facility ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">
            Dundee, Scotland Air-Gapped Facility
          </h2>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Location: Dundee, Scotland</h3>
                <ul className="space-y-3 text-sm md:text-base text-white/80">
                  {[
                    "Completely isolated from public internet",
                    "NVIDIA B300 & H200 GPU clusters (live across 2026)",
                    "Horizon Scotland based cooling system with PHE 1.1",
                    "UK security-cleared personnel only",
                    "Physical access controls with biometrics",
                    "Faraday cage EMI/RF shielding",
                    "Dedicated power with military-grade UPS",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-lg p-8 flex items-center justify-center border border-blue-400/30">
                <div className="text-center">
                  <Shield size={80} className="text-blue-400 mx-auto mb-4" />
                  <p className="text-white/60 text-sm">Dundee, Scotland Air-Gapped Facility</p>
                  <p className="text-white/40 text-xs mt-2">100% Isolated Infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-8 md:p-12 rounded-2xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Classified Briefing</h2>
          <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto px-4">
            Discuss MOTHER Defence and your sovereign AI requirements with our military veteran
            leadership team.
          </p>
          <p className="text-sm md:text-base text-white/60 mb-8 max-w-xl mx-auto px-4">
            All briefings conducted on UK sovereign territory with appropriate security protocols.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-base md:text-lg transition-colors">
                Contact Government Sales
              </button>
            </Link>
            <Link href="/data-centre#dundee" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 md:py-4 border border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold text-base md:text-lg transition-colors">
                View Dundee Facility
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
