"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/solutions", label: "Solutions" },
    { href: "/technology", label: "Technology" },
    { href: "/vp-studio", label: "VP Studio" },
    { href: "/data-centre", label: "Data Centre" }
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/media/msai-logo.png"
          alt="Media Stream AI"
          width={320}
          height={80}
          className="h-20 w-auto"
          priority
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6 text-lg">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-cyan-400 transition ${pathname === href ? "nav-link-active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(v => !v)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="absolute top-16 right-6 bg-black border border-cyan-500 rounded-lg shadow-lg flex flex-col space-y-4 p-4 md:hidden z-50">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-cyan-400 transition ${pathname === href ? "nav-link-active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
