import { site } from "@/content/site";

export type HomeShot = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type HomeCard = {
  id: string;
  href: string;
  kicker: string;
  title: string;
  line: string;
};

export type HomePillar = {
  id: string;
  href: string;
  title: string;
  line: string;
  meta: string;
};

export type HomeTrack = {
  slug: string;
  title: string;
};

export type HomeRelease = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  width: number;
  height: number;
  alt: string;
  tracks: HomeTrack[];
};

export type HomeState = {
  letter: string;
  name: string;
  note: string;
};

export type HomeNote = {
  id: string;
  n: string;
  kind: string;
  title: string;
  body: string[];
};

export type HomeDraft = {
  version: 1;
  updatedAt: number;
  name: string;
  tagline: string;
  portrait: HomeShot;
  cards: HomeCard[];
  pillars: HomePillar[];
  releases: HomeRelease[];
  credit: string;
  portalLabel: string;
  line: string;
  enter: string;
  attempt: string;
  origin: string[];
  states: HomeState[];
  notes: HomeNote[];
  practiceLabel: string;
  elsewhereLabel: string;
  decks: HomeShot[];
  practice: HomeShot[];
  elsewhere: HomeShot[];
};

function shotId(src: string) {
  const file = src.split("/").pop() ?? src;
  return file.replace(/\.[a-z0-9]+$/i, "");
}

function shot(item: { src: string; alt: string; caption: string; width: number; height: number }): HomeShot {
  return {
    id: shotId(item.src),
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    width: item.width,
    height: item.height,
  };
}

export function defaultHomeDraft(): HomeDraft {
  return {
    version: 1,
    updatedAt: 0,
    name: "DJ TY",
    tagline: "Bedroom DJ. R&B, American pop, house.",
    portrait: shot(site.dj.portrait2),
    cards: [
      { id: "latest", href: "#project", kicker: "latest release", title: "Vol.5 Time of Flow", line: "Reading Portal. 2026." },
      { id: "note", href: "#experience", kicker: "note", title: "Listening is Reading.", line: "My uncle inspired it." },
      { id: "practice", href: "#daylife", kicker: "practice", title: "At home.", line: "Self-taught. Home, and a cafe." },
    ],
    pillars: [
      { id: "project", href: "#project", title: "Project.", line: "The volumes.", meta: "five, 2026" },
      { id: "experience", href: "#experience", title: "Experience.", line: "The notes.", meta: "three" },
      { id: "daylife", href: "#daylife", title: "Daylife.", line: "The photos.", meta: "twenty-seven" },
    ],
    releases: site.portal.releases.map((release) => ({
      id: release.id,
      title: release.title,
      slug: release.slug,
      cover: release.cover,
      width: release.width,
      height: release.height,
      alt: release.alt,
      tracks: release.tracks.map((track) => ({ slug: track.slug, title: track.title })),
    })),
    credit: "2026. Composed and mixed by DJ TY. Copyright mine.",
    portalLabel: "Reading Portal",
    line: site.portal.line,
    enter: site.portal.enter,
    attempt: site.portal.attempt,
    origin: [...site.portal.origin],
    states: site.portal.states.map((state) => ({ letter: state.letter, name: state.name, note: state.note })),
    notes: [
      { id: "research", n: "02", kind: "research", title: site.research.title, body: [...site.research.paragraphs] },
      { id: "about", n: "03", kind: "note", title: "Ashton", body: [...site.about.paragraphs] },
    ],
    practiceLabel: "Practice",
    elsewhereLabel: "Elsewhere",
    decks: [shot(site.dj.deck), shot(site.dj.deck2)],
    practice: [
      shot(site.dj.green),
      shot(site.dj.portrait),
      shot(site.dj.portrait2),
      shot(site.dj.screen),
      shot(site.dj.screen2),
      ...site.dj.gear.map(shot),
      ...site.dj.booth.map(shot),
    ],
    elsewhere: site.pictures.shots.map(shot),
  };
}

export function isHomeDraft(data: unknown): data is HomeDraft {
  if (!data || typeof data !== "object") return false;
  const draft = data as Partial<HomeDraft>;
  const portrait = draft.portrait as Partial<HomeShot> | undefined;
  return (
    draft.version === 1 &&
    typeof draft.tagline === "string" &&
    typeof portrait?.src === "string" &&
    Array.isArray(draft.releases) &&
    Array.isArray(draft.practice) &&
    Array.isArray(draft.elsewhere) &&
    Array.isArray(draft.cards) &&
    Array.isArray(draft.notes)
  );
}

export function idbSources(draft: HomeDraft) {
  const sources = [
    draft.portrait.src,
    ...draft.releases.map((release) => release.cover),
    ...draft.decks.map((item) => item.src),
    ...draft.practice.map((item) => item.src),
    ...draft.elsewhere.map((item) => item.src),
  ];
  return sources.filter((src) => src.startsWith("idb:"));
}
