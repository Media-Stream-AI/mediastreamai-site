// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RootClient from "./_components/RootClient";
import localFont from "next/font/local";
import Link from "next/link";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Media Stream AI",
  description:
    "Smart TV, Made Personal — Broadcast-grade AI powering personalized channels, sovereign data centres, and AI VP studio.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

// --- Fonts ---
const horizon = localFont({
  src: "./fonts/horizon.woff2",
  variable: "--font-horizon",
  display: "swap",
});
const horizonOutlined = localFont({
  src: "./fonts/horizon_outlined.woff2",
  variable: "--font-horizon-outlined",
  display: "swap",
});

// --- Layout ---
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-white antialiased ${horizon.variable} ${horizonOutlined.variable}`}
      >
        <RootClient>
          <Header />
          <main>{children}</main>
          <Footer />
        </RootClient>
      </body>
    </html>
  );
}

// --- Header ---
function Header() {
  const nav = [
    { href: "/solutions", label: "Solutions" },
    { href: "/technology", label: "Technology" },
    { href: "/models", label: "Models" },
    { href: "/robotics", label: "Robotics" },
    { href: "/vp-studio", label: "VP Studio" },
    { href: "/data-centre", label: "Data Centre" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-horizon">
          Media Stream AI
        </Link>
        <nav className="hidden md:flex gap-6">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-white/70 hover:text-white"
            >
              {i.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 hover:bg-white/15"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
      © {new Date().getFullYear()} Media Stream AI — All rights reserved.
    </footer>
  );
}
