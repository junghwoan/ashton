"use client";

import { useEffect, useState } from "react";

export function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    document.documentElement.dataset.intro = "shown";
    setShow(true);
    const timer = window.setTimeout(() => setShow(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <button type="button" className="intro" onClick={() => setShow(false)}>
      <span>All things</span>
      <strong>dj.ty</strong>
    </button>
  );
}
