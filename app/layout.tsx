// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Media Stream AI",
  description:
    "AI-powered personalised TV, virtual production, and AI data centres.",
  icons: {
    icon: "/favicon.png",       // place favicon.png in /public/
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/solutions", label: "Solutions" },
    { href: "/technology", label: "Technology" },
    { href: "/vp-studio", label: "VP Studio" },
    { href: "/datacentre", label: "Data Centre" },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/media/msai-logo.png" // make sure logo exists here: public/media/msai-logo.png
          alt="Media Stream AI"
          width={160}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6 text-lg">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-cyan-400 transition ${
              pathname === href ? "nav-link-active" : ""
            }`}
          >
            {label}
          </Link>
        ))}
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
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-cyan-400 transition ${
                pathname === href ? "nav-link-active" : ""
              }`}
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