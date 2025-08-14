"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`section border-t border-white/5 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0.3 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className={`rounded-3xl border border-white/10 bg-white/[0.03] card-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}


export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-semibold h2-underline">{children}</h2>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-white/70 max-w-3xl">{children}</p>;
}

export function Grid({ children, cols = "lg:grid-cols-3" }: { children: React.ReactNode; cols?: string }) {
  return <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${cols}`}>{children}</div>;
}

/** Fancy headline wrapper */
export function GradientHeadline({ children }: { children: React.ReactNode }) {
  return <div className="gradient-text">{children}</div>;
}
