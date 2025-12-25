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
  
  const NvidiaLogo = ({ size = 120 }) => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <defs>
        <linearGradient id="nvidiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#76B900', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#5A9000', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path d="M100 20 L40 60 L100 100 L160 60 Z" fill="url(#nvidiaGrad)"/>
      <path d="M40 140 L100 180 L160 140 L100 100 Z" fill="url(#nvidiaGrad)" opacity="0.7"/>
      <text x="100" y="110" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">NVIDIA</text>
      <text x="100" y="128" textAnchor="middle" fill="white" fontSize="12">INCEPTION</text>
    </svg>
  );

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
      <div className="flex items-center justify-center gap-12">
        {clickable ? (
          <>
            <Link href="/partnerships#nvidia" className="group">
              <NvidiaLogo size={80} />
            </Link>
            <Link href="/partnerships#lenovo" className="group">
              <LenovoLogo size={80} />
            </Link>
          </>
        ) : (
          <>
            <NvidiaLogo size={80} />
            <LenovoLogo size={80} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-12">
      {/* NVIDIA Inception */}
      {animated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {clickable ? (
            <Link href="/partnerships#nvidia" className="group block">
              <div className="flex flex-col items-center gap-3">
                <div className="group-hover:scale-105 transition-transform">
                  <NvidiaLogo />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  NVIDIA Inception Program
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <NvidiaLogo />
              <span className="text-sm text-white/60">NVIDIA Inception Program</span>
            </div>
          )}
        </motion.div>
      ) : (
        clickable ? (
          <Link href="/partnerships#nvidia" className="group block">
            <div className="flex flex-col items-center gap-3">
              <div className="group-hover:scale-105 transition-transform">
                <NvidiaLogo />
              </div>
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                NVIDIA Inception Program
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <NvidiaLogo />
            <span className="text-sm text-white/60">NVIDIA Inception Program</span>
          </div>
        )
      )}

      {/* Lenovo AI Innovator */}
      {animated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
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

// Individual logo exports for flexibility
export function NvidiaInceptionLogo({ size = 120, showLabel = true }: { size?: number; showLabel?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="nvidiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#76B900', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#5A9000', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <path d="M100 20 L40 60 L100 100 L160 60 Z" fill="url(#nvidiaGrad)"/>
        <path d="M40 140 L100 180 L160 140 L100 100 Z" fill="url(#nvidiaGrad)" opacity="0.7"/>
        <text x="100" y="110" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">NVIDIA</text>
        <text x="100" y="128" textAnchor="middle" fill="white" fontSize="12">INCEPTION</text>
      </svg>
      {showLabel && <span className="text-sm text-white/60">NVIDIA Inception Program</span>}
    </div>
  );
}

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
