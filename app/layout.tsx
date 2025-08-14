import "../styles/globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Media Stream AI",
  description:
    "Smart TV, Made Personal — Media Stream AI delivers personalized, emotionally aware television through AI-powered playout, IntuiTV, sustainable data centres, and virtual production studios.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/media/MediaStreamAI-Logo-White.svg"
            alt="Media Stream AI"
            width={150}
            height={40}
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link href="/about" className="nav-link hover:text-white">About</Link>
          <Link href="/solutions" className="nav-link hover:text-white">Solutions</Link>
          <Link href="/technology" className="nav-link hover:text-white">Technology</Link>
          <Link href="/datacentre" className="nav-link hover:text-white">Data Centre</Link>
          <Link href="/vp-studio" className="nav-link hover:text-white">VP Studio</Link>
          <Link href="/contact" className="nav-link hover:text-white">Contact</Link>
          <a href="https://www.intuitv.app" target="_blank" className="nav-link hover:text-white">
            IntuiTV ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-white/60 relative overflow-hidden">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Image
            src="/media/MediaStreamAI-Logo-White.svg"
            alt="Media Stream AI"
            width={120}
            height={32}
          />
        </div>

        <div className="flex gap-6">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <span>© {new Date().getFullYear()} Media Stream AI</span>
      </div>
    </footer>
  );
}
