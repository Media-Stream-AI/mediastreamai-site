import type { Metadata } from "next";
import "./globals.css";
import RootClient from "./_components/RootClient";
import localFont from "next/font/local";

// Regular Horizon
const horizon = localFont({
  src: [{ path: "../public/fonts/horizon.woff2", weight: "400", style: "normal" }],
  variable: "--font-horizon",
  display: "swap",
});

// Outlined Horizon
const horizonOutlined = localFont({
  src: [{ path: "../public/fonts/horizon_outlined.woff2", weight: "700", style: "normal" }],
  variable: "--font-horizon-outlined",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Media Stream AI",
  description: "AI-powered personalised TV, virtual production, and AI data centres.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${horizon.className} ${horizonOutlined.variable} bg-black text-white`}
      >
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}