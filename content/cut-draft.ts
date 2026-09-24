import { site } from "@/content/site";

export type CutShot = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type CutTrack = {
  slug: string;
  title: string;
};

export type CutRelease = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  alt: string;
  width: number;
  height: number;
  tracks: CutTrack[];
};

export type CutState = {
  letter: string;
  name: string;
  note: string;
};

export type CutDraft = {
  version: 1;
  updatedAt: number;
  kicker: string;
  name: string;
  line: string;
  credit: string;
  releases: CutRelease[];
  readKicker: string;
  enter: string;
  attempt: string;
  origin: string[];
  states: CutState[];
  practiceKicker: string;
  practice: string;
  roomKicker: string;
  elsewhereKicker: string;
  green: CutShot;
  room: CutShot[];
  elsewhere: CutShot[];
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function shotId(src: string) {
  const file = src.split("/").pop() ?? src;
  return file.replace(/\.[a-z0-9]+$/i, "");
}

function shot(
  src: string,
  alt: string,
  caption: string,
  width: number,
  height: number,
): CutShot {
  return { id: shotId(src), src, alt, caption, width, height };
}

export function defaultCutDraft(): CutDraft {
  const room = [
    site.dj.portrait,
    site.dj.portrait2,
    site.dj.deck,
    site.dj.deck2,
    site.dj.screen,
    site.dj.screen2,
    ...site.dj.gear,
    ...site.dj.booth,
  ];
  return {
    version: 1,
    updatedAt: 0,
    kicker: "Bedroom DJ",
    name: "DJ TY",
    line: site.portal.line,
    credit: "2026. Composed and mixed by DJ TY. Copyright mine.",
    releases: site.portal.releases.map((release) => ({
      id: release.id,
      title: release.title,
      slug: release.slug,
      cover: release.cover,
      alt: release.alt,
      width: release.width,
      height: release.height,
      tracks: release.tracks.map((track) => ({ slug: track.slug, title: track.title })),
    })),
    readKicker: "Reading Portal",
    enter: site.portal.enter,
    attempt: site.portal.attempt,
    origin: [...site.portal.origin],
    states: site.portal.states.map((state) => ({
      letter: state.letter,
      name: state.name,
      note: state.note,
    })),
    practiceKicker: "Practice",
    practice: site.dj.paragraphs[0] ?? "",
    roomKicker: "The room",
    elsewhereKicker: "Elsewhere",
    green: shot(site.dj.green.src, site.dj.green.alt, site.dj.green.caption, site.dj.green.width, site.dj.green.height),
    room: room.map((item) => shot(item.src, item.alt, item.caption, item.width, item.height)),
    elsewhere: site.pictures.shots.map((item) => shot(item.src, item.alt, item.caption, item.width, item.height)),
  };
}

export function mediaSrc(src: string) {
  if (
    src.startsWith("idb:") ||
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    return src;
  }
  if (base && src.startsWith(`${base}/`)) return src;
  if (src.startsWith("/")) return `${base}${src}`;
  return `${base}/${src}`;
}

export function isCutDraft(data: unknown): data is CutDraft {
  if (!data || typeof data !== "object") return false;
  const draft = data as Partial<CutDraft>;
  return draft.version === 1 && Array.isArray(draft.releases) && Array.isArray(draft.room) && !!draft.green;
}

export function idbSources(draft: CutDraft) {
  const sources = [
    draft.green.src,
    ...draft.releases.map((release) => release.cover),
    ...draft.room.map((item) => item.src),
    ...draft.elsewhere.map((item) => item.src),
  ];
  return sources.filter((src) => src.startsWith("idb:"));
}
