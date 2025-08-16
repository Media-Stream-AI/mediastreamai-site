import type { Metadata } from "next";
import "./globals.css";
import RootClient from "./_components/RootClient";
import localFont from "next/font/local";

// Load Horizon (normal)
const horizon = localFont({
  src: "./fonts/horizon.woff2",
  variable: "--font-horizon",
  display: "swap",
});

// Load Horizon_Outlined
const horizonOutlined = localFont({
  src: "./fonts/horizon_Outlined.woff2",
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
        className={`${horizon.variable} ${horizonOutlined.variable} bg-black text-white`}
      >
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
