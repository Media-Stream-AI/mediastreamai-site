import type { Metadata } from "next";
import { Anton, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralField from "@/components/NeuralField";
import TrialSignupModal from "@/components/TrialSignupModal";

// Display face: Anton - single heavy condensed weight for the chunky billboard look.
// Exposed on both --font-anton and --font-orbitron so existing `font-orbitron`
// usages across the codebase pick up the new display type automatically.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: false,
  fallback: ["Impact", "system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mediastreamai.com'),
  title: {
    default: "Media Stream AI - Full-Stack Sovereign AI: Compute, MOTHER Models & Physical AI",
    template: "%s | Media Stream AI"
  },
  description: "Media Stream AI is a European full-stack sovereign AI company: 34 MW of owned sovereign compute, seven MOTHER models totalling 240B parameters, applications including IntuiTV and IntuiStudio, and MOTHER EXO physical AI with a UK humanoid factory in Manchester.",
  keywords: [
    // Core brand
    "Media Stream AI", "MSAI", "MOTHER AI", "sovereign AI UK",
    "MOTHER EXO", "MOTHER Defence", "IntuiTV", "AI TV", "AI television",
    
    // Primary features
    "personalized TV", "AI streaming", "AI-powered streaming", "smart TV personalization",
    "AI content creation", "create TV shows with AI", "AI video generation",
    "personalized streaming service", "AI recommendations",
    
    // Use cases
    "AI TV shows", "watch AI content", "AI generated shows", "custom TV channel",
    "AI entertainment", "AI media platform", "intelligent streaming",
    
    // Platforms
    "smart TV app", "streaming app", "mobile TV app", "web TV platform",
    "Samsung TV app", "LG TV app", "Android TV", "Apple TV", "Roku",
    
    // Technology
    "MOTHER AI", "sovereign AI", "UK AI streaming", "EU AI platform",
    "GDPR compliant streaming", "AI machine learning TV",
    
    // Content types
    "AI movies", "AI series", "AI documentaries", "AI TV episodes",
    "short form video", "reels TV", "vertical video streaming",
    
    // Creator features
    "content creation platform", "AI video creator", "AI content tools",
    "creator platform", "video monetization", "AI studio",
    
    // Comparison terms
    "Netflix alternative", "YouTube alternative", "TikTok for TV",
    "AI Netflix", "personalized Netflix", "smart streaming",
    
    // Long-tail
    "how to create TV shows with AI", "AI personalized recommendations",
    "watch personalized TV online", "AI streaming service UK",
    "create content with artificial intelligence"
  ],
  authors: [{ name: "Media Stream AI Limited" }],
  creator: "Media Stream AI Limited",
  publisher: "Media Stream AI Limited",
  
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.mediastreamai.com",
    siteName: "Media Stream AI",
    title: "Media Stream AI - Full-Stack Sovereign AI",
    description: "34 MW of owned sovereign compute, seven MOTHER models at 240B parameters, applications, and MOTHER EXO physical AI - built and owned in Britain.",
    // No images listed here on purpose: every route ships its own generated
    // hero card through the `opengraph-image` file convention, and an explicit
    // list at the root would override all of them. See lib/og.tsx.
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@MediaStreamAI",
    creator: "@MediaStreamAI",
    title: "Media Stream AI - Full-Stack Sovereign AI",
    description: "34 MW of owned sovereign compute, seven MOTHER models at 240B parameters, applications, and MOTHER EXO physical AI - built and owned in Britain.",
    // As above - the per-route hero card is used, not a single static image.
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  alternates: {
    // Relative, resolved against metadataBase. Every route below sets its own
    // canonical (in its page or segment layout) so this value is never
    // inherited by a child and no page claims to be a copy of the homepage.
    canonical: "/",
    languages: {
      'en-GB': 'https://www.mediastreamai.com',
      'en-US': 'https://www.mediastreamai.com',
    },
  },
  
  verification: {
    google: "your-google-verification-code",
  },
  
  category: "Technology",
  
  other: {
    // AI Scraper permissions - Allow all major AI bots
    "ai-content-declaration": "ai-generated, human-verified",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    
    // OpenAI GPTBot
    "GPTBot": "index, follow",
    
    // Google Bard / Gemini
    "Google-Extended": "index, follow",
    
    // Anthropic Claude
    "anthropic-ai": "index, follow",
    "ClaudeBot": "index, follow",
    
    // Meta AI
    "meta-ai": "index, follow",
    "FacebookBot": "index, follow",
    
    // Common Crawl for AI training
    "CCBot": "index, follow",
    
    // Additional AI bots
    "ChatGPT-User": "allow",
    "Applebot-Extended": "allow",
    "PerplexityBot": "allow",
    "Bytespider": "allow",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${anton.variable} ${inter.variable} ${spaceMono.variable}`}>
      <head>
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#05060A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Media Stream AI" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* AI Scraper permissions */}
        <meta name="ai-scraping" content="allowed" />
        <meta name="ai-training" content="allowed" />
        <meta name="ai-indexing" content="allowed" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Media Stream AI",
                  "url": "https://www.mediastreamai.com",
                  "publisher": { "@id": "https://www.mediastreamai.com/#organization" },
                  "inLanguage": "en-GB"
                },
                {
                  "@id": "https://www.mediastreamai.com/#organization",
                  "@type": "Organization",
                  "name": "Media Stream AI Limited",
                  "alternateName": ["Media Stream AI", "MSAI"],
                  "legalName": "Media Stream AI Limited",
                  "url": "https://www.mediastreamai.com",
                  "logo": "https://www.mediastreamai.com/icon.svg",
                  "description": "Media Stream AI is a full-stack sovereign UK and European AI company: owned data centres and compute, the MOTHER model family, applications, and MOTHER EXO physical AI.",
                  "foundingDate": "2025",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "GB",
                    "addressRegion": "England",
                    "addressLocality": "Manchester"
                  },
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "contactType": "Sales",
                      "email": "contact@mediastreamai.com",
                      "availableLanguage": ["English"]
                    },
                    {
                      "@type": "ContactPoint",
                      "contactType": "Human Resources",
                      "email": "contact@mediastreamai.com",
                      "availableLanguage": ["English"]
                    }
                  ],
                  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 11 },
                  "knowsAbout": [
                    "Sovereign AI", "Foundation models", "Data centre infrastructure",
                    "Liquid cooling", "GPU compute", "Humanoid robotics", "World models",
                    "Defence AI", "AI television"
                  ]
                },
                {
                  "@type": "WebApplication",
                  "name": "IntuiTV",
                  "alternateName": "IntuiTV - Smart TV Made Personal",
                  "url": "https://intuitv.app",
                  "description": "AI-powered personalized television platform for creating and watching custom TV content",
                  "applicationCategory": "EntertainmentApplication",
                  "operatingSystem": "Web, iOS, Android, Smart TV",
                  "offers": {
                    "@type": "Offer",
                    "price": "9.99",
                    "priceCurrency": "GBP",
                    "availability": "https://schema.org/InStock"
                  },
                  "featureList": [
                    "AI-powered content personalization",
                    "Create TV shows with AI",
                    "Multi-device streaming (Mobile, TV, Web)",
                    "UK/EU data sovereignty",
                    "GDPR compliant",
                    "Biometric personalization (opt-in)",
                    "MOTHER AI technology"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "IntuiTV Mobile App",
                  "applicationCategory": "EntertainmentApplication",
                  "operatingSystem": ["iOS", "Android"],
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "GBP"
                  }
                },
                {
                  "@type": "VideoObject",
                  "name": "AI-Powered Personalized TV Content",
                  "description": "Watch and create personalized TV shows with AI technology",
                  "uploadDate": "2026-01-04",
                  "contentUrl": "https://www.mediastreamai.com"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans bg-night text-mist antialiased">
        <NeuralField />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
        {/* IntuiTV is one pillar of the group site, so its consumer trial popup is
            scoped to the IntuiTV surfaces rather than firing over colocation,
            compliance or the model pages. */}
        <TrialSignupModal
          source="mediastreamai-site"
          paths={['/intuitv', '/creators', '/studios', '/pricing', '/success']}
        />
      </body>
    </html>
  );
}
