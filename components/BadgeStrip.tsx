"use client";

import { motion } from "framer-motion";

interface BadgeStripProps {
  variant?: "default" | "compact";
  animated?: boolean;
}

export default function BadgeStrip({ variant = "default", animated = true }: BadgeStripProps) {
  const badges = [
    {
      icon: "🎖️",
      text: "Military Veteran Run",
      color: "blue"
    },
    {
      icon: "🤝",
      text: "Ethnic Minority Led",
      color: "green"
    },
    {
      icon: "🇬🇧",
      text: "100% UK Sovereign",
      color: "blue"
    },
    {
      icon: "🔒",
      text: "Air-Gapped Available",
      color: "red"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-600/20 border-blue-400/40 text-blue-300",
    green: "bg-green-600/20 border-green-400/40 text-green-300",
    red: "bg-red-600/20 border-red-400/40 text-red-300"
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-1 border rounded-full ${
              colorClasses[badge.color as keyof typeof colorClasses]
            }`}
          >
            <span className="text-lg">{badge.icon}</span>
            <span className="text-xs font-semibold">{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge, i) => (
        animated ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
              colorClasses[badge.color as keyof typeof colorClasses]
            }`}
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="text-sm font-semibold">{badge.text}</span>
          </motion.div>
        ) : (
          <div
            key={i}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
              colorClasses[badge.color as keyof typeof colorClasses]
            }`}
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="text-sm font-semibold">{badge.text}</span>
          </div>
        )
      ))}
    </div>
  );
}

// Certification Badges Component
interface CertificationBadgesProps {
  layout?: "grid" | "inline";
}

export function CertificationBadges({ layout = "grid" }: CertificationBadgesProps) {
  const certifications = [
    { name: "ISO 27001", desc: "Information Security" },
    { name: "Cyber Essentials Plus", desc: "UK Government" },
    { name: "GDPR Compliant", desc: "EU Data Protection" },
    { name: "BSI C5", desc: "German Cloud Security" },
    { name: "DORA Ready", desc: "EU Financial Resilience" },
    { name: "Government Cloud", desc: "UK Public Sector" }
  ];

  if (layout === "inline") {
    return (
      <div className="flex flex-wrap gap-2">
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs text-white/70"
          >
            {cert.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {certifications.map((cert, i) => (
        <div
          key={i}
          className="p-4 bg-black/40 border border-white/10 rounded-lg text-center"
        >
          <div className="text-blue-400 mb-2">✓</div>
          <div className="text-sm font-semibold text-white mb-1">{cert.name}</div>
          <div className="text-xs text-white/60">{cert.desc}</div>
        </div>
      ))}
    </div>
  );
}
