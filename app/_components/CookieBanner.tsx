"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check localStorage for prior consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 p-4 sm:p-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Message */}
        <p className="text-sm text-white/80 leading-relaxed">
          We use cookies to improve your experience, personalize content, and
          ensure compliance with GDPR and the EU AI Act.{" "}
          <Link
            href="/privacy"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Learn more
          </Link>
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-sm hover:bg-white/20 transition"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
