"use client";

import { useState } from "react";

type Release = {
  id: string;
  title: string;
  cover: string;
  width: number;
  height: number;
  alt: string;
};

export function Releases({ items }: { items: readonly Release[] }) {
  const [currentId, setCurrentId] = useState(items[0]?.id ?? "");
  const current = items.find((item) => item.id === currentId) ?? items[0];
  if (!current) return null;

  return (
    <div className="releases">
      <figure className="release-stage">
        <img src={current.cover} alt={current.alt} width={current.width} height={current.height} />
        <figcaption>{current.title}</figcaption>
      </figure>
      <div className="release-list" role="list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={item.id === current.id ? "is-on" : undefined}
            onClick={() => setCurrentId(item.id)}
            aria-pressed={item.id === current.id}
          >
            <img src={item.cover} alt="" width={160} height={160} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
