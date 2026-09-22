"use client";

import { useEffect, useRef, useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number; caption: string };

export function Photos({ shots }: { shots: readonly Shot[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = shots.length;
  const shot = shots[active];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (rail.scrollWidth <= rail.clientWidth + 1) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const max = rail.scrollWidth - rail.clientWidth;
      const atStart = rail.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = rail.scrollLeft >= max - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    };
    const onScroll = () => {
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(rail.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const mid = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(mid - center);
        if (distance < bestDist) {
          bestDist = distance;
          best = index;
        }
      });
      setActive(best);
    };
    rail.addEventListener("wheel", onWheel, { passive: false });
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  function go(index: number) {
    const rail = railRef.current;
    const el = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }

  if (!shot) return null;

  return (
    <div className="look">
      <div className="look-meta">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <span>{shot.caption}</span>
        <span>{String(count).padStart(2, "0")}</span>
      </div>
      <div
        className="look-rail"
        ref={railRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(Math.min(count - 1, active + 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(Math.max(0, active - 1));
          }
        }}
      >
        {shots.map((item, index) => (
          <figure key={item.src} className={index === active ? "is-on" : undefined}>
            <button type="button" onClick={() => go(index)} aria-pressed={index === active} aria-label={item.caption}>
              <img src={item.src} alt={index === active ? item.alt : ""} width={item.width} height={item.height} />
            </button>
          </figure>
        ))}
      </div>
    </div>
  );
}
