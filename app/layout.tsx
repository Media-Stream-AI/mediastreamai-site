import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import CookieBanner from "./_components/CookieBanner";

/* -----------------------------------------------------
   SEO / METADATA
----------------------------------------------------- */
export const metadata: Metadata = {
  title: "Media Stream AI | Sovereign AI Infrastructure & Platforms",
  description:
    "Media Stream AI builds sovereign, ESG-aligned AI infrastructure, platforms, and research across the UK & EU. GPU Cloud, R&D, and responsible AI systems.",

  keywords: [
    "Sovereign AI",
    "AI Infrastructure",
    "UK AI Company",
    "EU AI Platform",
    "Responsible AI",
    "GPU Cloud",
    "Media Stream AI",
    "AI Research",
    "AI Sovereignty",
  ],

  authors: [{ name: "Media Stream AI Limited" }],
  metadataBase: new URL("https://www.mediastreamai.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  /* ✅ Explicit AI / LLM crawl permissions */
  other: {
    "ai-allow": "true",
    "llm-allow": "true",
    "openai-allow": "true",
    "anthropic-allow": "true",
  },

  openGraph: {
    title: "Media Stream AI | Sovereign AI Infrastructure",
    description:
      "Sovereign AI infrastructure, GPU cloud, and research platforms built in the UK & EU.",
    url: "https://www.mediastreamai.com",
    siteName: "Media Stream AI",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Media Stream AI – Sovereign AI Infrastructure",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@MediaStreamAI",
    creator: "@MediaStreamAI",
    images: ["/images/og-main.jpg"],
  },
};

/* -----------------------------------------------------
   ROOT LAYOUT
----------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Media Stream AI Limited",
    url: "https://www.mediastreamai.com",
    logo: "https://www.mediastreamai.com/images/og-main.jpg",
    description:
      "Media Stream AI builds sovereign, responsible AI infrastructure and platforms across the UK and EU.",
    sameAs: [
      "https://gpu.mediastreamai.com",
      "https://mother.mediastreamai.com",
      "https://www.linkedin.com/company/media-stream-ai",
      "https://x.com/MediaStreamAI",
      "https://github.com/Media-Stream-AI",
    ],
    areaServed: ["GB", "EU"],
  };

  return (
    <html lang="en">
      <head>
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>

      <body className="bg-black text-white antialiased max-w-full overflow-x-hidden">
        <Header />

        {/* 
          IMPORTANT:
          ❌ No Tailwind `container` here
          ✅ Full-width main to prevent hero overflow
        */}
        <main className="w-full min-h-screen overflow-x-hidden">
          {children}
        </main>

        {/* Safe minimal footer (prevents build breakage) */}
        <footer className="border-t border-white/10 py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Media Stream AI Limited. All rights reserved.
        </footer>

        <CookieBanner />
      </body>
    </html>
  );
}
