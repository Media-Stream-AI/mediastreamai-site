// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// ---- Single metadata export (keep only this one) ----
export const metadata: Metadata = {
  title: "Media Stream AI",
  description: "SMART TV, MADE PERSONAL",
  icons: {
    icon: [
      // Make sure these files exist in /public
      { url: "/favicon.png" },                       // fallback
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // Optional: good defaults
  themeColor: "#000000",
  openGraph: {
    title: "Media Stream AI",
    description: "SMART TV, MADE PERSONAL",
    url: "https://your-domain.example", // <- set your live domain
    siteName: "Media Stream AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Stream AI",
    description: "SMART TV, MADE PERSONAL",
    images: ["/og-image.png"],
  },
};

// ---- Single default export (keep only this) ----
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* If you use global bg/text colors, keep them in globals.css or here */}
      <body>{children}</body>
    </html>
  );
}