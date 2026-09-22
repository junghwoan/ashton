"use client";

import { useState } from "react";

type Track = { slug: string; title: string };

type Release = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  width: number;
  height: number;
  alt: string;
  tracks: readonly Track[];
};

function playerSrc(albumSlug: string, trackSlug: string | null) {
  const path = trackSlug
    ? `song/reading-portal/${trackSlug}`
    : `album/reading-portal/${albumSlug}`;
  return `https://audiomack.com/embed/${path}?background=0`;
}

export function Releases({ items }: { items: readonly Release[] }) {
  const [currentId, setCurrentId] = useState(items[0]?.id ?? "");
  const [trackSlug, setTrackSlug] = useState<string | null>(null);
  const current = items.find((item) => item.id === currentId) ?? items[0];
  if (!current) return null;

  const src = playerSrc(current.slug, trackSlug);
  const playingTitle =
    current.tracks.find((track) => track.slug === trackSlug)?.title ?? current.title;

  return (
    <div className="releases">
      <figure className="release-stage">
        <img src={current.cover} alt={current.alt} width={current.width} height={current.height} />
        <figcaption>{current.title}</figcaption>
      </figure>
      <iframe
        key={src}
        className="release-player"
        src={src}
        title={playingTitle}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen"
      />
      <ul className="tracks">
        <li>
          <button type="button" aria-pressed={trackSlug === null} onClick={() => setTrackSlug(null)}>
            {current.title}
          </button>
        </li>
        {current.tracks.map((track) => (
          <li key={track.slug}>
            <button
              type="button"
              aria-pressed={track.slug === trackSlug}
              onClick={() => setTrackSlug(track.slug)}
            >
              {track.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="release-list" role="list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={item.id === current.id ? "is-on" : undefined}
            onClick={() => {
              setCurrentId(item.id);
              setTrackSlug(null);
            }}
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
