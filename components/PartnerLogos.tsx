"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PartnerLogosProps {
  variant?: "full" | "simple";
  animated?: boolean;
  clickable?: boolean;
}

export default function PartnerLogos({
  variant = "full",
  animated = true,
  clickable = true
}: PartnerLogosProps) {

  const LenovoLogo = ({ size = 120 }) => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="60" stroke="#E31C23" strokeWidth="4" fill="none"/>
      <path d="M70 100 L90 100 M90 70 L90 130 M110 100 L130 100 M120 90 L120 110" stroke="#E31C23" strokeWidth="4"/>
      <text x="100" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LENOVO</text>
      <text x="100" y="192" textAnchor="middle" fill="white" fontSize="11">AI INNOVATOR</text>
    </svg>
  );

  if (variant === "simple") {
    return (
      <div className="flex items-center justify-center">
        {clickable ? (
          <Link href="/partnerships#lenovo" className="group">
            <LenovoLogo size={80} />
          </Link>
        ) : (
          <LenovoLogo size={80} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center">
      {/* Lenovo AI Innovator */}
      {animated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {clickable ? (
            <Link href="/partnerships#lenovo" className="group block">
              <div className="flex flex-col items-center gap-3">
                <div className="group-hover:scale-105 transition-transform">
                  <LenovoLogo />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  Lenovo AI Innovator Program
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <LenovoLogo />
              <span className="text-sm text-white/60">Lenovo AI Innovator Program</span>
            </div>
          )}
        </motion.div>
      ) : (
        clickable ? (
          <Link href="/partnerships#lenovo" className="group block">
            <div className="flex flex-col items-center gap-3">
              <div className="group-hover:scale-105 transition-transform">
                <LenovoLogo />
              </div>
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                Lenovo AI Innovator Program
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <LenovoLogo />
            <span className="text-sm text-white/60">Lenovo AI Innovator Program</span>
          </div>
        )
      )}
    </div>
  );
}

// Individual logo export for flexibility
export function LenovoAIInnovatorLogo({ size = 120, showLabel = true }: { size?: number; showLabel?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="60" stroke="#E31C23" strokeWidth="4" fill="none"/>
        <path d="M70 100 L90 100 M90 70 L90 130 M110 100 L130 100 M120 90 L120 110" stroke="#E31C23" strokeWidth="4"/>
        <text x="100" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LENOVO</text>
        <text x="100" y="192" textAnchor="middle" fill="white" fontSize="11">AI INNOVATOR</text>
      </svg>
      {showLabel && <span className="text-sm text-white/60">Lenovo AI Innovator Program</span>}
    </div>
  );
}
