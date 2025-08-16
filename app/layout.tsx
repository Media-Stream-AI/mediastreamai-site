// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Media Stream AI",
  description:
    "AI-powered personalised TV, virtual production, and AI data centres.",
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-horizon tracking-wide hover:text-cyan-400 transition"
      >
        Media Stream AI
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6 text-lg">
        <Link href="/solutions" className="hover:text-cyan-400 transition">
          Solutions
        </Link>
        <Link href="/technology" className="hover:text-cyan-400 transition">
          Technology
        </Link>
        <Link href="/vp-studio" className="hover:text-cyan-400 transition">
          VP Studio
        </Link>
        <Link href="/datacentre" className="hover:text-cyan-400 transition">
          Data Centre
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="absolute top-16 right-6 bg-black border border-cyan-500 rounded-lg shadow-lg flex flex-col space-y-4 p-4 md:hidden z-50">
          <Link
            href="/solutions"
            className="hover:text-cyan-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Solutions
          </Link>
          <Link
            href="/technology"
            className="hover:text-cyan-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Technology
          </Link>
          <Link
            href="/vp-studio"
            className="hover:text-cyan-400 transition"
            onClick={() => setIsOpen(false)}
          >
            VP Studio
          </Link>
          <Link
            href="/datacentre"
            className="hover:text-cyan-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Data Centre
          </Link>
        </nav>
      )}
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}