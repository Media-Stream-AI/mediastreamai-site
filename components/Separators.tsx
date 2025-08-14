"use client";
import { motion } from "framer-motion";

export function ScanSeparator() {
  return (
    <div className="relative my-6">
      <div className="h-px w-full bg-white/10" />
      <motion.div
        className="absolute top-0 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-purple-500"
        initial={{ x: "-10%" }}
        whileInView={{ x: "110%" }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
        viewport={{ once: true, margin: "-80px" }}
      />
    </div>
  );
}
