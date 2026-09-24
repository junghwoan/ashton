"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { site } from "@/content/site";

const ink: Record<string, { hot: string; cool: string }> = {
  vol5: { hot: "#e4982b", cool: "#1b2830" },
  vol4: { hot: "#cc9c61", cool: "#5c564e" },
  vol3: { hot: "#cd8a3e", cool: "#1c3344" },
  vol2: { hot: "#df974a", cool: "#3a4350" },
  vol1: { hot: "#9aab9e", cool: "#c4a36a" },
};

type Grain = { angle: number; radius: number; speed: number; size: number; offset: number };

function playerSrc(albumSlug: string, trackSlug: string) {
  return `https://audiomack.com/embed/song/reading-portal/${trackSlug}?background=0&autoplay=1`;
}

function hex(color: string) {
  const value = color.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export function V3View() {
  const releases = site.portal.releases;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const live = useRef({ album: 0, track: 0, sound: false, x: 0.5, y: 0.46 });
  const [album, setAlbum] = useState(0);
  const [track, setTrack] = useState(0);
  const [sound, setSound] = useState(false);
  const current = releases[album] ?? releases[0];
  const palette = ink[current?.id ?? "vol5"] ?? ink.vol5;

  useEffect(() => {
    live.current.album = album;
    live.current.track = track;
    live.current.sound = sound;
  }, [album, track, sound]);

  useEffect(() => {
    const sync = () => {
      const on = document.documentElement.dataset.sound === "on";
      live.current.sound = on;
      setSound(on);
    };
    sync();
    window.addEventListener("djty-sound", sync);
    return () => window.removeEventListener("djty-sound", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pictures = new Map<string, HTMLImageElement>();
    const grains: Grain[] = [];
    let frame = 0;
    let alive = true;
    let energy = 0;
    let px = 0.5;
    let py = 0.46;

    const picture = (src: string) => {
      let image = pictures.get(src);
      if (!image) {
        image = new Image();
        image.src = src;
        pictures.set(src, image);
      }
      return image;
    };

    const seed = (count: number) => {
      grains.length = 0;
      for (let index = 0; index < count; index += 1) {
        grains.push({
          angle: (index / count) * Math.PI * 2,
          radius: 0.25 + Math.random() * 0.75,
          speed: 0.15 + Math.random() * 0.85,
          size: 0.6 + Math.random() * 2.2,
          offset: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (now: number) => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width < 2 || height < 2) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const release = releases[live.current.album] ?? releases[0];
      const colors = ink[release.id] ?? ink.vol5;
      const hot = hex(colors.hot);
      const cool = hex(colors.cool);
      const mode = live.current.track;
      energy += ((live.current.sound ? 1 : 0.2) - energy) * (reduce.matches ? 1 : 0.045);
      px += (live.current.x - px) * (reduce.matches ? 1 : 0.08);
      py += (live.current.y - py) * (reduce.matches ? 1 : 0.08);
      const time = reduce.matches ? 0 : now / 1000;
      const top = Math.min(150, height * 0.22);
      const bottom = Math.min(230, height * 0.34);
      const cx = width * (0.5 + (px - 0.5) * 0.08);
      const cy = top + (height - top - bottom) * (0.5 + (py - 0.46) * 0.12);
      const reach = Math.max(84, Math.min(width * 0.34, (height - top - bottom) * 0.46));

      ctx.fillStyle = energy > 0.35 ? "rgba(7, 6, 10, 0.22)" : "#07060a";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * px, height * py, 0, width * px, height * py, reach * 1.6);
      glow.addColorStop(0, `rgba(${hot.r}, ${hot.g}, ${hot.b}, ${0.16 + energy * 0.28})`);
      glow.addColorStop(0.45, `rgba(${cool.r}, ${cool.g}, ${cool.b}, 0.18)`);
      glow.addColorStop(1, "rgba(7, 6, 10, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);
      for (let ring = 0; ring < 4; ring += 1) {
        const spin = time * (0.15 + energy * 0.55) * (ring % 2 === 0 ? 1 : -1.4);
        const pulse = reduce.matches ? 0 : Math.sin(time * (1.2 + mode * 0.35) + ring) * (4 + energy * 10);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${hot.r}, ${hot.g}, ${hot.b}, ${0.35 + energy * 0.45})`;
        ctx.lineWidth = ring === 3 ? 3 : 1.25;
        ctx.setLineDash(ring === 1 ? [8, 14] : []);
        ctx.arc(0, 0, reach * (0.62 + ring * 0.14) + pulse, spin, spin + Math.PI * (1.35 + mode * 0.12));
        ctx.stroke();
      }
      ctx.restore();

      const coverR = reach * (0.34 + energy * 0.04);
      const image = picture(release.cover);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, coverR, 0, Math.PI * 2);
      ctx.clip();
      if (image.complete && image.naturalWidth > 0) {
        ctx.drawImage(image, cx - coverR, cy - coverR, coverR * 2, coverR * 2);
      } else {
        ctx.fillStyle = colors.cool;
        ctx.fillRect(cx - coverR, cy - coverR, coverR * 2, coverR * 2);
      }
      ctx.restore();
      ctx.beginPath();
      ctx.arc(cx, cy, coverR + 1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 246, 232, ${0.35 + energy * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      grains.forEach((grain) => {
        const drift =
          mode === 0 ? Math.sin(time * 0.6 + grain.offset) * 0.04 :
          mode === 1 ? 0.12 :
          mode === 2 ? 0 :
          0.22;
        grain.angle += (reduce.matches ? 0 : grain.speed * (0.004 + energy * 0.012) * (mode === 1 ? 2.2 : 1));
        grain.radius += reduce.matches ? 0 : drift * 0.01 * (0.4 + energy);
        if (grain.radius > 1.15) grain.radius = 0.18;
        if (mode === 2) {
          const aim = Math.atan2(height * py - cy, width * px - cx);
          const gap = Math.atan2(Math.sin(aim - grain.angle), Math.cos(aim - grain.angle));
          grain.angle += reduce.matches ? 0 : gap * 0.02 * (0.3 + energy);
        }
        const dist = reach * (0.2 + grain.radius * (mode === 3 ? 1.15 : 0.95));
        const x = cx + Math.cos(grain.angle) * dist;
        const y = cy + Math.sin(grain.angle) * dist * (mode === 0 ? 0.72 : 1);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${hot.r}, ${hot.g}, ${hot.b}, ${0.25 + energy * 0.6})`;
        ctx.arc(x, y, grain.size * (mode === 3 ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const resize = () => {
      const count = Math.round(Math.min(220, Math.max(48, (root.clientWidth * root.clientHeight) / 11000)));
      if (grains.length !== count) seed(count);
      draw(performance.now());
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();

    const tick = (now: number) => {
      if (!alive) return;
      draw(now);
      if (!reduce.matches && !document.hidden) frame = requestAnimationFrame(tick);
    };
    if (!reduce.matches) frame = requestAnimationFrame(tick);
    const onReduce = () => {
      cancelAnimationFrame(frame);
      if (!reduce.matches) frame = requestAnimationFrame(tick);
      else draw(0);
    };
    const onHide = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else if (!reduce.matches) frame = requestAnimationFrame(tick);
    };
    reduce.addEventListener("change", onReduce);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduce.removeEventListener("change", onReduce);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [releases]);

  function play(nextTrack: number) {
    document.documentElement.dataset.sound = "on";
    window.dispatchEvent(new Event("djty-sound"));
    live.current.sound = true;
    live.current.track = nextTrack;
    setSound(true);
    setTrack(nextTrack);
  }

  function point(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    live.current.x = (event.clientX - rect.left) / rect.width;
    live.current.y = (event.clientY - rect.top) / rect.height;
  }

  if (!current) return null;
  const song = current.tracks[track] ?? current.tracks[0];

  return (
    <div
      className={sound ? "v3 is-on" : "v3"}
      id="portal"
      ref={rootRef}
      data-album={current.id}
      data-on={sound ? "1" : "0"}
      onPointerMove={point}
      style={{ "--album": palette.hot } as CSSProperties}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="v3-copy">
        <p className="v3-kicker">Bedroom DJ</p>
        <h1>DJ TY</h1>
        <p className="v3-line">{site.portal.line}</p>
        <p className="v3-now" aria-live="polite">
          {current.title}. {song.title}
        </p>
      </div>
      <div className="v3-dock">
        <div className="v3-modes">
          {site.portal.states.map((state, index) => (
            <button key={state.letter} type="button" aria-pressed={track === index} onClick={() => play(index)}>
              <span>{state.letter}</span>
              {state.name}
            </button>
          ))}
        </div>
        <div className="v3-albums">
          {releases.map((release, index) => (
            <button
              key={release.id}
              type="button"
              aria-pressed={index === album}
              onClick={() => {
                live.current.album = index;
                live.current.track = 0;
                setAlbum(index);
                setTrack(0);
              }}
            >
              <img src={release.cover} alt="" width={96} height={96} />
              <span>{release.title}</span>
            </button>
          ))}
        </div>
        <button type="button" className="v3-play" aria-pressed={sound} onClick={() => play(track)}>
          {sound ? "playing" : "play"}
        </button>
        <p className="v3-note">2026. Composed and mixed by DJ TY. Copyright mine.</p>
        {sound && song ? (
          <iframe className="v3-player" title={song.title} src={playerSrc(current.slug, song.slug)} allow="autoplay" />
        ) : null}
      </div>
    </div>
  );
}
