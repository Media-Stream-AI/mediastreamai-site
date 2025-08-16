import type { Metadata } from "next";
import "./globals.css";
import RootClient from "./_components/RootClient";

export const metadata: Metadata = {
  title: "Media Stream AI",
  description:
    "AI-powered personalised TV, virtual production, and AI data centres.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}