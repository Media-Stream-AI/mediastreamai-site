// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RootClient from "./_components/RootClient";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Media Stream AI",
  description: "AI-powered personalised TV, virtual production, and AI data centres.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

// ✅ Fonts must exist (lowercase) at:
// app/fonts/horizon.woff2
// app/fonts/horizon_outlined.woff2
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-white antialiased ${horizon.variable} ${horizonOutlined.variable}`}
      >
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}