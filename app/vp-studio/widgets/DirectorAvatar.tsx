"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Simple talking avatar with blinking eyes and animated mouth while speaking.
 */
export default function DirectorAvatar({ speaking }: { speaking: boolean }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    }, 3200 + Math.random() * 1200);
    return () => clearInterval(id);
  }, []);

  // Mouth class depends on "speaking"
  const mouthCls = useMemo(
    () => `avatar-mouth ${speaking ? "avatar-mouth-talking" : ""}`,
    [speaking]
  );

  return (
    <div className="avatar-wrap">
      <div className="avatar-face">
        <div className={`avatar-eye left ${blink ? "blink" : ""}`} />
        <div className={`avatar-eye right ${blink ? "blink" : ""}`} />
        <div className={mouthCls} />
      </div>
    </div>
  );
}