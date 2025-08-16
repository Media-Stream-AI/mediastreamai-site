"use client";

import React from "react";
import Header from "./Header";

export default function RootClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}