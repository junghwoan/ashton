"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Figure } from "@/components/figure";
import { Photos } from "@/components/photos";
import { site } from "@/content/site";

const albumInk: Record<string, string> = {
  vol5: "#e4982b",
  vol4: "#cc9c61",
  vol3: "#cd8a3e",
  vol2: "#df974a",
  vol1: "#90a090",
};

function playerSrc(albumSlug: string, trackSlug: string | null) {
  const path = trackSlug
    ? `song/reading-portal/${trackSlug}`
    : `album/reading-portal/${albumSlug}`;
  return `https://audiomack.com/embed/${path}?background=0&autoplay=1`;
}

const roomShots = [
  site.dj.portrait,
  site.dj.portrait2,
  site.dj.deck,
  site.dj.deck2,
  site.dj.screen,
  site.dj.screen2,
  ...site.dj.gear,
  ...site.dj.booth,
];

export function CutView() {
  const releases = site.portal.releases;
  const takes = site.dj.takes;
  const practices = site.dj.clips;
  const [album, setAlbum] = useState(0);
  const [trackSlug, setTrackSlug] = useState<string | null>(null);
  const [sound, setSound] = useState(false);
  const [take, setTake] = useState(0);
  const [practice, setPractice] = useState(0);
  const [clipMode, setClipMode] = useState<"take" | "practice">("take");
  const [drawn, setDrawn] = useState(false);
  const pathRef = useRef<HTMLDivElement>(null);
  const current = releases[album] ?? releases[0];
  const clip = clipMode === "take" ? takes[take] : practices[practice];

  useEffect(() => {
    const sync = () => setSound(document.documentElement.dataset.sound === "on");
    sync();
    window.addEventListener("djty-sound", sync);
    return () => window.removeEventListener("djty-sound", sync);
  }, []);

  useEffect(() => {
    const node = pathRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setDrawn(true);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function play(nextTrack: string | null) {
    document.documentElement.dataset.sound = "on";
    window.dispatchEvent(new Event("djty-sound"));
    setSound(true);
    setTrackSlug(nextTrack);
  }

  if (!current || !clip) return null;

  return (
    <div
      className={sound ? "cut is-on" : "cut"}
      style={{ "--album": albumInk[current.id] ?? "#c8923a" } as CSSProperties}
    >
      <section className="cut-top" id="listen">
        <div className="cut-id">
          <p className="cut-kicker">Bedroom DJ</p>
          <div className="cut-mark">
            <h1 className="cut-name">DJ TY</h1>
            <span className="cut-rule" aria-hidden="true" />
          </div>
          <p className="cut-line">{site.portal.line}</p>
        </div>

        <div className="cut-sleeve">
          <span className="cut-vinyl" aria-hidden="true" />
          <button type="button" className="cut-cover" aria-pressed={sound && trackSlug === null} onClick={() => play(null)}>
            <img src={current.cover} alt={current.alt} width={current.width} height={current.height} />
          </button>
        </div>

        <div className="cut-copy">
          <h2>{current.title}</h2>
          <p>2026. Composed and mixed by DJ TY. Copyright mine.</p>
          <ol className="cut-tracks">
            {current.tracks.map((track, index) => (
              <li key={track.slug}>
                <button type="button" aria-pressed={sound && trackSlug === track.slug} onClick={() => play(track.slug)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {track.title}
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className="cut-play" aria-pressed={sound} onClick={() => play(trackSlug)}>
            {sound ? "playing" : "play"}
          </button>
          {sound ? (
            <iframe
              className={trackSlug ? "cut-player is-song" : "cut-player"}
              title={current.title}
              src={playerSrc(current.slug, trackSlug)}
              allow="autoplay"
            />
          ) : null}
        </div>
      </section>

      <div className="cut-albums" role="list">
        {releases.map((release, index) => (
          <button
            key={release.id}
            type="button"
            aria-pressed={index === album}
            onClick={() => {
              setAlbum(index);
              setTrackSlug(null);
            }}
          >
            <img src={release.cover} alt="" width={160} height={160} />
            <span>{release.title}</span>
          </button>
        ))}
      </div>

      <section className="cut-read" id="read">
        <p className="cut-kicker">Reading Portal</p>
        <h2>{site.portal.enter}</h2>
        <p className="cut-try">{site.portal.attempt}</p>
        <div className="cut-origin">
          {site.portal.origin.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={drawn ? "cut-path is-drawn" : "cut-path"} ref={pathRef}>
          <i aria-hidden="true" />
          <ol>
            {site.portal.states.map((state) => (
              <li key={state.letter}>
                <span>{state.letter}</span>
                <strong>{state.name}</strong>
                <p>{state.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cut-room" id="room">
        <p className="cut-kicker">Practice</p>
        <p className="cut-try">{site.dj.paragraphs[0]}</p>
        <div className="keep cut-video">
          <video key={clip.src} controls playsInline preload="metadata" poster={clip.poster} src={clip.src} />
          <div className="cut-takes">
            {takes.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-pressed={clipMode === "take" && index === take}
                onClick={() => {
                  setClipMode("take");
                  setTake(index);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="cut-step">
            <button type="button" onClick={() => { setClipMode("practice"); setPractice((n) => Math.max(0, n - 1)); }} disabled={practice === 0 && clipMode === "practice"}>
              Previous
            </button>
            <button
              type="button"
              aria-pressed={clipMode === "practice"}
              onClick={() => setClipMode("practice")}
            >
              Practice {practice + 1} of {practices.length}
            </button>
            <button
              type="button"
              onClick={() => { setClipMode("practice"); setPractice((n) => Math.min(practices.length - 1, n + 1)); }}
              disabled={practice === practices.length - 1 && clipMode === "practice"}
            >
              Next
            </button>
          </div>
        </div>
        <div className="keep cut-green">
          <Figure shot={site.dj.green} />
        </div>
        <p className="cut-kicker">The room</p>
        <Photos shots={roomShots} />
        <p className="cut-kicker">Elsewhere</p>
        <Photos shots={site.pictures.shots} />
      </section>
    </div>
  );
}
