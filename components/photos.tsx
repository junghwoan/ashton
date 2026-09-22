"use client";

import { useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number; caption: string };

export function Photos({ shots }: { shots: readonly Shot[] }) {
  const [index, setIndex] = useState(0);
  const count = shots.length;
  const visible = 3;
  const atStart = index <= 0;
  const atEnd = index >= count - visible;

  return (
    <div className="visual-rail">
      <div className="visual-row">
        {shots.slice(index, index + visible).map((shot) => (
          <figure key={shot.src}>
            <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="visual-nav">
        <button type="button" onClick={() => setIndex((n) => Math.max(0, n - 1))} disabled={atStart}>
          prev
        </button>
        <button
          type="button"
          onClick={() => setIndex((n) => Math.min(count - visible, n + 1))}
          disabled={atEnd}
        >
          next
        </button>
      </div>
    </div>
  );
}
