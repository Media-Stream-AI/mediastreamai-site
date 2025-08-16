"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-horizon text-cyan-400 tracking-wider">
          Media Stream AI
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-white font-medium">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/technology" className="hover:text-cyan-400 transition">Technology</Link>
          <Link href="/solutions" className="hover:text-cyan-400 transition">Solutions</Link>
          <Link href="/vp-studio" className="hover:text-cyan-400 transition">VP Studio</Link>
          <Link href="/datacentre" className="hover:text-cyan-400 transition">Data Centre</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden bg-black/95 border-t border-cyan-500/30">
          <ul className="flex flex-col p-6 space-y-4 text-white font-medium">
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="/technology" onClick={() => setOpen(false)}>Technology</Link></li>
            <li><Link href="/solutions" onClick={() => setOpen(false)}>Solutions</Link></li>
            <li><Link href="/vp-studio" onClick={() => setOpen(false)}>VP Studio</Link></li>
            <li><Link href="/datacentre" onClick={() => setOpen(false)}>Data Centre</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}