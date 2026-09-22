"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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

function Shelf({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (el.scrollWidth <= el.clientWidth + 1) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="shelf-block">
      <p className="kicker">{label}</p>
      <div className="shelf" ref={ref} role="list">
        {children}
      </div>
    </div>
  );
}

export function Releases({ items }: { items: readonly Release[] }) {
  const [currentId, setCurrentId] = useState(items[0]?.id ?? "");
  const [trackSlug, setTrackSlug] = useState<string | null>(null);
  const current = items.find((item) => item.id === currentId) ?? items[0];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll<HTMLElement>(".shelf").forEach((shelf) => {
      const selected = shelf.querySelector<HTMLElement>("[aria-pressed='true']");
      if (!selected) return;
      const left = selected.offsetLeft - (shelf.clientWidth - selected.offsetWidth) / 2;
      shelf.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
    });
  }, [currentId, trackSlug]);

  if (!current) return null;

  const src = playerSrc(current.slug, trackSlug);
  const playingTitle =
    current.tracks.find((track) => track.slug === trackSlug)?.title ?? current.title;

  return (
    <div className="releases">
      <Shelf label="Volumes">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={item.id === current.id ? "is-on" : undefined}
            aria-pressed={item.id === current.id}
            onClick={() => {
              setCurrentId(item.id);
              setTrackSlug(null);
            }}
          >
            <img src={item.cover} alt={item.alt} width={item.width} height={item.height} />
            <span>{item.title}</span>
          </button>
        ))}
      </Shelf>
      <iframe
        key={src}
        className="release-player"
        src={src}
        title={playingTitle}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen"
      />
      <Shelf label="Tracks">
        <button type="button" role="listitem" aria-pressed={trackSlug === null} onClick={() => setTrackSlug(null)}>
          {current.title}
        </button>
        {current.tracks.map((track) => (
          <button
            key={track.slug}
            type="button"
            role="listitem"
            aria-pressed={track.slug === trackSlug}
            onClick={() => setTrackSlug(track.slug)}
          >
            {track.title}
          </button>
        ))}
      </Shelf>
    </div>
  );
}
