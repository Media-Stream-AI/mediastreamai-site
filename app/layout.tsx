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
    default: "Media Stream AI - Sovereign UK AI: MOTHER Models, IntuiTV, MOTHER EXO & Defence",
    template: "%s | Media Stream AI"
  },
  description: "Media Stream AI is a sovereign UK AI company group: the MOTHER 7B model family, IntuiTV & IntuiStudio (Creator + Playout), MOTHER EXO (frontier world model + robotics, 2027), and MOTHER Defence. Owned, hosted and trained in Britain.",
  keywords: [
    // Core brand
    "IntuiTV", "AI TV", "AI television", "MOTHER AI",
    
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
    title: "Media Stream AI - Sovereign UK AI: MOTHER Models, IntuiTV, MOTHER EXO & Defence",
    description: "Sovereign UK AI group: the MOTHER 7B model family, IntuiTV & IntuiStudio, MOTHER EXO (world model + robotics) and MOTHER Defence. Owned, hosted and trained in Britain.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Media Stream AI - Sovereign UK AI",
        type: "image/png",
      },
      {
        url: "/hero-intuitv.jpg",
        width: 1920,
        height: 1080,
        alt: "IntuiTV Platform Interface",
      }
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@MediaStreamAI",
    creator: "@MediaStreamAI",
    title: "Media Stream AI - Sovereign UK AI: MOTHER Models, IntuiTV, MOTHER EXO & Defence",
    description: "Sovereign UK AI group: the MOTHER 7B model family, IntuiTV & IntuiStudio, MOTHER EXO (world model + robotics) and MOTHER Defence. Owned, hosted and trained in Britain.",
    images: ["/og-image.png"],
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
    canonical: "https://www.mediastreamai.com",
    languages: {
      'en-GB': 'https://www.mediastreamai.com',
      'en-US': 'https://www.mediastreamai.com',
    },
  },
  
  verification: {
    google: "your-google-verification-code",
  },
  
  category: "Entertainment",
  
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
                  "@type": "Organization",
                  "name": "Media Stream AI Limited",
                  "legalName": "Media Stream AI Limited",
                  "url": "https://www.mediastreamai.com",
                  "logo": "https://www.mediastreamai.com/logo-intuitv.png",
                  "foundingDate": "2025",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "GB",
                    "addressRegion": "England",
                    "addressLocality": "Manchester"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Customer Service",
                    "email": "hello@mediastreamai.com",
                    "availableLanguage": ["English"]
                  }
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
          paths={['/intuitv', '/viewers', '/creators', '/studios', '/pricing', '/success']}
        />
      </body>
    </html>
  );
}
