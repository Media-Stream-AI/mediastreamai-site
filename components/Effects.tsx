"use client";
import { useEffect } from "react";

/** Adds .scrolled class to header after 20px */
export function HeaderScrollEffect() {
  useEffect(() => {
    const el = document.querySelector("header.header");
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 20) el.classList.add("scrolled");
      else el.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

/** Background grid overlay for hero/footer */
export function GridBackground() {
  return <div aria-hidden className="grid-bg" />;
}
