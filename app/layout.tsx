import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import SignupPopup from "./_components/SignupPopup";
import { CookieBanner } from "./_components/CookieBanner"; // ✅ Cookie component added

// 🔹 SEO Metadata
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
  icons: { icon: "/favicon.png" },
};

// 🔹 Fonts (local-safe)
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

// 🔹 Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gdprSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Media Stream AI Limited",
    url: "https://www.mediastreamai.com",
    description:
      "Media Stream AI is fully compliant with GDPR and the EU AI Act. All data processing occurs within UK & EU sovereign jurisdictions, ensuring lawful, transparent, and ethical AI operations.",
    areaServed: ["GB", "EU"],
    compliance: ["GDPR", "EU AI Act"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Data Protection Officer",
        email: "privacy@mediastreamai.com",
        availableLanguage: ["English"],
      },
    ],
    privacyPolicy: "https://www.mediastreamai.com/privacy",
    sameAs: [
      "https://www.linkedin.com/company/media-stream-ai",
      "https://x.com/MediaStreamAI",
      "https://github.com/Media-Stream-AI",
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ GDPR + EU AI Act Compliance Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gdprSchema) }}
        />
      </head>
      <body
        className={`bg-black text-white antialiased overflow-x-hidden ${horizon.variable} ${horizonOutlined.variable}`}
      >
        <Header />
        {/* ✅ Scroll-safe main wrapper (fixes hero cutoff) */}
        <main className="min-h-screen w-full overflow-visible pb-20">
          {children}
        </main>
        <Footer />
        <SignupPopup />
        <CookieBanner /> {/* ✅ Added cookie banner */}
      </body>
    </html>
  );
}

// ==========================
// 🔹 HEADER
// ==========================
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/media/logos/msai.png"
            alt="Media Stream AI"
            width={150}
            height={150}
            className="h-12 sm:h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu */}
        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}

// ==========================
// 🔹 MOBILE MENU
// ==========================
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
      <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black p-3 shadow-xl z-50">
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

// ==========================
// 🔹 FOOTER
// ==========================
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-4 sm:px-6 text-center text-xs sm:text-sm text-white/60">
      <div className="max-w-6xl mx-auto space-y-3">
        <p>
          © {new Date().getFullYear()} <strong>Media Stream AI Limited</strong> — All rights reserved.
        </p>
        <p>
          Built sustainably with renewable energy.{" "}
          <Link href="/esg" className="text-green-400 hover:underline">
            ESG & Responsible AI
          </Link>
        </p>
        <p>
          GDPR & EU AI Act Compliant — Data processed only within UK & EU sovereign infrastructure.{" "}
          <Link href="/privacy" className="text-blue-400 hover:underline ml-1">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}