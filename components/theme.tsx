"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  return (
    <button
      type="button"
      className={dark ? "theme-toggle is-on" : "theme-toggle"}
      aria-pressed={dark}
      onClick={() => {
        const next = !dark;
        document.documentElement.dataset.theme = next ? "dark" : "light";
        try {
          localStorage.setItem("djty-theme", next ? "dark" : "light");
        } catch {
          /* private mode */
        }
        setDark(next);
      }}
    >
      {dark ? "Day" : "Night"}
    </button>
  );
}
