import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Media Stream AI",
  description: "Smart TV, Made Personal."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/media/MediaStreamAI-Logo-White.svg" alt="Media Stream AI" className="h-8 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/solutions" className="hover:text-white">Solutions</a>
          <a href="/technology" className="hover:text-white">Technology</a>
          <a href="/datacentre" className="hover:text-white">Data Centre</a>
          <a href="/vp-studio" className="hover:text-white">VP Studio</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="https://www.intuitv.app" target="_blank" className="hover:text-white">IntuiTV</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-white/60">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/media/MediaStreamAI-Logo-White.svg" alt="Media Stream AI" className="h-6 w-auto" />
        </div>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white/80">Privacy</a>
          <a href="/terms" className="hover:text-white/80">Terms</a>
        </div>
        <span>© {new Date().getFullYear()} Media Stream AI</span>
      </div>
    </footer>
  );
}
