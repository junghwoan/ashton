"use client";

import { useState } from "react";

type Clip = { src: string; poster: string; title: string };

export function Clips({ items }: { items: readonly Clip[] }) {
  const [current, setCurrent] = useState(0);
  const clip = items[current];
  if (!clip) return null;

  return (
    <div className="clips">
      <video
        key={clip.src}
        controls
        playsInline
        preload="metadata"
        poster={clip.poster}
        src={clip.src}
      />
      <div className="clip-row">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-pressed={index === current}
            onClick={() => setCurrent(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
