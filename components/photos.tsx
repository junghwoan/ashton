"use client";

import { useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number; caption: string };

export function Photos({ shots }: { shots: readonly Shot[] }) {
  const [active, setActive] = useState(0);
  const count = shots.length;

  function move(step: number) {
    setActive((index) => (index + step + count) % count);
  }

  return (
    <div className="gallery">
      <div className="gallery-stage">
        {shots.map((shot, index) => {
          let diff = index - active;
          if (diff > count / 2) diff -= count;
          if (diff < -count / 2) diff += count;
          const hidden = Math.abs(diff) > 4;
          return (
            <figure
              key={shot.src}
              className={index === active ? "is-on" : undefined}
              style={{
                transform: hidden ? "translate3d(0,-50%,0) scale(0.8)" : `translate3d(${diff * 18}rem, -50%, 0)`,
                opacity: hidden ? 0 : index === active ? 1 : 0.72,
                zIndex: 10 - Math.abs(diff),
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <button type="button" onClick={() => setActive(index)} aria-pressed={index === active}>
                <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
                <figcaption>{shot.caption}</figcaption>
              </button>
            </figure>
          );
        })}
      </div>
      <div className="visual-nav">
        <button type="button" onClick={() => move(-1)}>
          prev
        </button>
        <button type="button" onClick={() => move(1)}>
          next
        </button>
      </div>
    </div>
  );
}
