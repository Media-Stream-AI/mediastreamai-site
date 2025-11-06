// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import SignupPopup from "./_components/SignupPopup"; // ✅ Added popup

// 🔹 Enhanced Metadata for SEO + AI Discoverability
export const metadata: Metadata = {
  title:
    "Media Stream AI – UK & EU Sovereign GPU Cloud | Canal-Cooled AI Data Centres",
  description:
    "Media Stream AI provides sovereign UK & EU GPUaaS and AI inference infrastructure. Canal-cooled NVIDIA H200 and RDU clusters for GDPR and EU AI Act-aligned model training, deployment, and creative compute.",
  keywords:
    "UK AI Sovereignty, British GPU Cloud, EU Sovereign Compute, AI Inference, NVIDIA H200, Sovereign AI Data Centre, AI Training Infrastructure UK, Canal Cooling AI, British AI Cloud, RDUaaS, GPUaaS",
  openGraph: {
    title: "Media Stream AI – UK Sovereign GPU Cloud",
    description:
      "The UK's sovereign AI infrastructure for model training and inference. Powered by canal-cooled NVIDIA and SambaNova clusters.",
    url: "https://www.mediastreamai.com",
    images: [
      {
        url: "/media/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Media Stream AI Data Centres UK EU",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

// 🔹 Fonts (safe if missing in repo — Netlify won't break)
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

// 🔹 Main Layout Wrapper
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-white antialiased ${horizon.variable} ${horizonOutlined.variable}`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <SignupPopup /> {/* ✅ Popup for PDF + email submission */}
      </body>
    </html>
  );
}

// 🔹 Header (top navigation bar)
function Header() {
  const nav = [
    { href: "/solutions", label: "Solutions" },
    { href: "/technology", label: "Technology" },
    { href: "/robotics", label: "Robotics" },
    { href: "/models", label: "Models" },
    { href: "/vp-studio", label: "VP Studio" },
    { href: "/data-centre", label: "Data Centre" },
    { href: "/news", label: "News" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/media/logos/msai.png"
            alt="Media Stream AI"
            width={160}
            height={160}
            className="h-16 w-auto sm:h-20"
            priority
          />
          <span className="hidden sm:inline text-lg font-horizon tracking-wide"></span>
        </Link>

        {/* ✅ Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-white/70 hover:text-white transition"
            >
              {i.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 hover:bg-white/15 text-sm"
          >
            Contact
          </Link>
        </nav>

        {/* ✅ Mobile Menu */}
        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}

// 🔹 Mobile Menu (hamburger)
function MobileMenu({
  nav,
}: {
  nav: { href: string; label: string }[];
}) {
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-white/10 select-none">
        <span aria-hidden>☰</span>
        <span className="sr-only">Open menu</span>
      </summary>
      <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black p-3 shadow-xl">
        <div className="flex flex-col gap-2">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              {i.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-sm hover:bg-white/15 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </details>
  );
}

// 🔹 Footer
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
      © {new Date().getFullYear()} Media Stream AI — All rights reserved.
    </footer>
  );
}