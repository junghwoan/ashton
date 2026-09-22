"use client";

import { useEffect, useState } from "react";

export function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(document.documentElement.dataset.sound === "on");
    window.addEventListener("djty-sound", sync);
    return () => window.removeEventListener("djty-sound", sync);
  }, []);

  return (
    <button
      type="button"
      className={on ? "sound-toggle is-on" : "sound-toggle"}
      aria-pressed={on}
      onClick={() => {
        const next = !on;
        document.documentElement.dataset.sound = next ? "on" : "off";
        window.dispatchEvent(new Event("djty-sound"));
        setOn(next);
      }}
    >
      {on ? "sound on" : "sound off"}
    </button>
  );
}
