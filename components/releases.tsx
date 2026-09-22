"use client";

import { useEffect, useRef, useState } from "react";

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
  return `https://audiomack.com/embed/${path}?background=0&autoplay=1`;
}

export function Releases({ items }: { items: readonly Release[] }) {
  const stageRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [trackSlug, setTrackSlug] = useState<string | null>(null);
  const [sound, setSound] = useState(false);
  const [reduce, setReduce] = useState(false);
  const current = items[active] ?? items[0];

  useEffect(() => {
    const sync = () => setSound(document.documentElement.dataset.sound === "on");
    sync();
    window.addEventListener("djty-sound", sync);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => window.removeEventListener("djty-sound", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const speeds = items.map(() => 0);
    const angles = items.map(() => 0);
    let last = 0;
    let raf = 0;

    const tick = () => {
      const stage = stageRef.current;
      const rail = railRef.current;
      if (stage && rail) {
        const rect = stage.getBoundingClientRect();
        const travel = Math.max(1, stage.offsetHeight - window.innerHeight);
        const scrolled = Math.min(Math.max(-rect.top, 0), travel);
        const progress = scrolled / travel;
        const maxX = Math.max(0, rail.scrollWidth - window.innerWidth);
        rail.style.transform = `translate3d(${-maxX * progress}px,0,0)`;

        const center = window.innerWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(rail.children).forEach((child, index) => {
          const box = (child as HTMLElement).getBoundingClientRect();
          const distance = Math.abs(box.left + box.width / 2 - center);
          if (distance < bestDist) {
            bestDist = distance;
            best = index;
          }
        });
        if (best !== last) {
          last = best;
          activeRef.current = best;
          setActive(best);
          setTrackSlug(null);
        }
      }

      railRef.current?.querySelectorAll<HTMLElement>(".vinyl").forEach((el, index) => {
        speeds[index] += ((index === last ? 1 : 0) - speeds[index]) * 0.08;
        if (speeds[index] > 0.002) {
          angles[index] += speeds[index] * 2.6;
          el.style.transform = `rotate(${angles[index]}deg)`;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items, reduce]);

  function enableSound() {
    document.documentElement.dataset.sound = "on";
    window.dispatchEvent(new Event("djty-sound"));
    setSound(true);
  }

  function chooseAlbum(index: number) {
    if (reduce) {
      setActive(index);
      setTrackSlug(null);
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;
    const travel = Math.max(0, stage.offsetHeight - window.innerHeight);
    const progress = items.length <= 1 ? 0 : index / (items.length - 1);
    const top = stage.getBoundingClientRect().top + window.scrollY + travel * progress;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (!current) return null;
  const src = sound ? playerSrc(current.slug, trackSlug) : "";

  return (
    <section className={reduce ? "audio-stage is-plain" : "audio-stage"} id="audio" ref={stageRef}>
      <div className="audio-sticky">
        <p className="audio-bg" aria-hidden="true">
          {current.title}
        </p>
        <div className="audio-rail" ref={railRef}>
          {items.map((item, index) => (
            <article key={item.id} className={index === active ? "disc is-on" : "disc"}>
              <button type="button" aria-pressed={index === active} onClick={() => chooseAlbum(index)}>
                <span className="disc-art">
                  <img src={item.cover} alt="" width={92} height={92} />
                  <span className="vinyl" aria-hidden="true" />
                </span>
                <span className="disc-title">{item.title}</span>
                <span className="disc-year">(2026)</span>
                <span className="disc-line">Composed and mixed by DJ TY.</span>
              </button>
              <button
                type="button"
                className="rf-btn"
                onClick={() => {
                  chooseAlbum(index);
                  enableSound();
                }}
              >
                view album
              </button>
            </article>
          ))}
        </div>
        <div className={sound ? "sleeve is-playing" : "sleeve"}>
          <button
            type="button"
            className="sleeve-art"
            aria-pressed={trackSlug === null}
            onClick={() => {
              enableSound();
              setTrackSlug(null);
            }}
          >
            <span className="sleeve-vinyl" aria-hidden="true" />
            <img src={current.cover} alt={current.alt} width={current.width} height={current.height} />
          </button>
          <div className="sleeve-copy">
            <h2>{current.title}</h2>
            <p>2026. Composed and mixed by DJ TY. Copyright mine.</p>
            <ol className="sleeve-tracks">
              {current.tracks.map((track, index) => (
                <li key={track.slug}>
                  <button
                    type="button"
                    aria-pressed={track.slug === trackSlug}
                    onClick={() => {
                      enableSound();
                      setTrackSlug(track.slug);
                    }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{track.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            {sound ? (
              <iframe
                key={src}
                className="release-player"
                src={src}
                title={current.tracks.find((track) => track.slug === trackSlug)?.title ?? current.title}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen"
              />
            ) : (
              <button type="button" className="rf-btn" onClick={enableSound}>
                Play
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
