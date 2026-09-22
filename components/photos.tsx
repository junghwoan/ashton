"use client";

import { useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number; caption: string };

export function Photos({ shots }: { shots: readonly Shot[] }) {
  const [active, setActive] = useState(0);
  const count = shots.length;
  const shot = shots[active];

  function move(step: number) {
    setActive((index) => (index + step + count) % count);
  }

  if (!shot) return null;

  return (
    <div className="gallery">
      <figure className="gallery-frame">
        <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
        <figcaption>{shot.caption}</figcaption>
      </figure>
      <div className="filmstrip" role="list">
        {shots.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="listitem"
            aria-pressed={index === active}
            aria-label={item.caption}
            onClick={() => setActive(index)}
          >
            <img src={item.src} alt="" width={item.width} height={item.height} />
          </button>
        ))}
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
