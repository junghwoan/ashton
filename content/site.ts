/**
 * Public copy for Ashton V1.
 *
 * Confidence is marked so later edits do not treat missing detail as fact.
 * VERIFIED — seen directly (photo, file, or stated in the build brief as a
 *   fact Ashton gave).
 * CONFIRMED — Ashton answered it on the intake form, per the build brief.
 *   The sheet itself could not be opened during this build (Google re-auth).
 * HELD — mentioned somewhere, but not published: grade, school, conference
 *   submission, counts, methods, findings, other people's photos.
 */

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  name: "DJ TY",
  person: "Ashton",
  title: "DJ TY",
  description: "DJ TY. Bedroom DJ. R&B, American pop, and house.",
  nav: [
    { href: "/#project", label: "Project." },
    { href: "/#experience", label: "Experience." },
    { href: "/#daylife", label: "Daylife." },
    { href: "/about", label: "about" },
  ],
  abibu: {
    id: "abibu",
    title: "Abibu",
    paragraphs: [
      "I started Abibu, and I run it. Fatherhood and masculinity.",
    ],
  },
  research: {
    id: "research",
    title: "Research",
    paragraphs: [
      "South Korea’s birth rate. Family structure, money, and a separate project on male loneliness.",
    ],
  },
  portal: {
    id: "reading",
    title: "Reading Portal",
    line: "Listening is Reading.",
    enter: "Enter the page, let the book read you.",
    origin: [
      "My uncle inspired it.",
      "Music before the page, and while you are in it.",
      "I compose and mix with AI. I released the volumes. Copyright is mine.",
    ],
    states: [
      { letter: "R", name: "Relax", note: "Slow down. Leave the noise you walked in with." },
      { letter: "E", name: "Explore", note: "Stay with the text." },
      { letter: "A", name: "Awareness", note: "Notice when attention stays, and when it leaves." },
      { letter: "D", name: "Dream", note: "Let images open." },
    ],
    releases: [
      {
        id: "vol5",
        title: "Vol.5 Time of Flow",
        slug: "vol5-time-of-flow",
        cover: `${assetBase}/media/rp-vol5.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 5 cover, Time of Flow. An hourglass sits on an open book inside a gold ring.",
        tracks: [
          { slug: "rp-017-r-eternal-pause", title: "RP. 017 – R. Eternal Pause" },
          { slug: "rp-018-e-liquid-pages", title: "RP. 018 – E. Liquid Pages" },
          { slug: "rp-019-a-timeless-peak", title: "RP. 019 – A. Timeless Peak" },
          { slug: "rp-020-d-golden-hourglass", title: "RP. 020 – D. Golden Hourglass" },
        ],
      },
      {
        id: "vol4",
        title: "Vol.4 Infinite Margins",
        slug: "vol4-infinite-margins",
        cover: `${assetBase}/media/rp-vol4.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 4 cover, Infinite Margins. A person stands in a lit stone ring.",
        tracks: [
          { slug: "rp-013-r-paper-breath", title: "RP. 013 – R. Paper Breath" },
          { slug: "rp-014-e-ink-journey", title: "RP. 014 – E. Ink Journey" },
          { slug: "rp-015-a-white-insight", title: "RP. 015 – A. White Insight" },
          { slug: "rp-016-d-beyond-words", title: "RP. 016 – D. Beyond Words" },
        ],
      },
      {
        id: "vol3",
        title: "Vol.3 Secret Talk",
        slug: "vol3-secret-talk",
        cover: `${assetBase}/media/rp-vol3.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 3 cover, Secret Talk. Two people sit by a small fire inside a gold ring, facing an open book.",
        tracks: [
          { slug: "rp-009-r-hello-silence", title: "RP. 009 – R. Hello, Silence" },
          { slug: "rp-010-e-mind-explorer", title: "RP. 010 – E. Mind Explorer" },
          { slug: "rp-011-a-golden-spark", title: "RP. 011 – A. Golden Spark" },
          { slug: "rp-012-d-warm-afterglow", title: "RP. 012 – D. Warm Afterglow" },
        ],
      },
      {
        id: "vol2",
        title: "Vol.2 The Deep Room",
        slug: "vol2-the-deep-room",
        cover: `${assetBase}/media/rp-vol2.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 2 cover, The Deep Room. A round concrete opening looks into a library.",
        tracks: [
          { slug: "rp-005-r-the-first-quiet", title: "RP. 005 – R. The First Quiet" },
          { slug: "rp-006-e-tracing-lines", title: "RP. 006 – E. Tracing Lines" },
          { slug: "rp-007-a-clear-mind", title: "RP. 007 – A. Clear Mind" },
          { slug: "rp-008-d-slow-echo", title: "RP. 008 – D. Slow Echo" },
        ],
      },
      {
        id: "vol1",
        title: "Vol.1 Prologue",
        slug: "vol1-prologue",
        cover: `${assetBase}/media/rp-vol1.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 1 cover, Prologue. A round opening frames a chair, a low table, and bookshelves.",
        tracks: [
          { slug: "rp-001-r-the-silent-entry", title: "RP. 001 – R. The Silent Entry" },
          { slug: "rp-002-e-mapping-the-unseen", title: "RP. 002 – E. Mapping the Unseen" },
          { slug: "rp-003-a-the-weight-of-insight", title: "RP. 003 – A. The Weight of Insight" },
          { slug: "rp-004-d-paper-tides", title: "RP. 004 – D. Paper Tides" },
        ],
      },
    ],
  },
  dj: {
    id: "dj",
    title: "DJ TY",
    paragraphs: [
      "Self-taught. Home, and a cafe.",
    ],
    green: {
      src: `${assetBase}/media/dj-green.jpg`,
      width: 1344,
      height: 1792,
      alt: "Me at home under green light, headphones on, hands up over a white Pioneer DJ controller. The shot is blurred from moving.",
      caption: "Green light.",
    },
    portrait: {
      src: `${assetBase}/media/dj-portrait.jpg`,
      width: 1086,
      height: 1448,
      alt: "Me at home, wearing headphones, mixing on a white Pioneer DJ controller between two speakers.",
      caption: "At home.",
    },
    portrait2: {
      src: `${assetBase}/media/dj-portrait-2.jpg`,
      width: 1600,
      height: 2133,
      alt: "Me at home again, mixing on the same white controller, with more of the table and the floor visible.",
      caption: "At home.",
    },
    deck: {
      src: `${assetBase}/media/dj-deck.jpg`,
      width: 1800,
      height: 1350,
      alt: "Home practice setup with two Pioneer CDJ players and a DJM mixer on a desk.",
      caption: "The setup I practice on.",
    },
    deck2: {
      src: `${assetBase}/media/dj-deck-2.jpg`,
      width: 1800,
      height: 1350,
      alt: "The same home practice setup a moment later, two Pioneer CDJ players and a DJM mixer.",
      caption: "A moment later.",
    },
    screen: {
      src: `${assetBase}/media/dj-screen.jpg`,
      width: 1600,
      height: 2133,
      alt: "Close view of a CDJ screen during practice, with a waveform and the tempo near 125 BPM.",
      caption: "A moment from practice.",
    },
    screen2: {
      src: `${assetBase}/media/dj-screen-2.jpg`,
      width: 1600,
      height: 2133,
      alt: "Another close view of a CDJ screen during practice, with a different waveform on the display.",
      caption: "Another track.",
    },
  },
  pictures: {
    id: "pictures",
    title: "Pictures",
    paragraphs: ["Dinner, outside, and a basketball game."],
    shots: [
      {
        src: `${assetBase}/media/life-dinner.jpg`,
        width: 1800,
        height: 2400,
        alt: "A group of friends around a restaurant table after a meal.",
        caption: "Dinner.",
      },
      {
        src: `${assetBase}/media/life-outside.jpg`,
        width: 1800,
        height: 1350,
        alt: "A group sitting on outdoor bleachers in the sun.",
        caption: "Outside.",
      },
      {
        src: `${assetBase}/media/life-game.jpg`,
        width: 1800,
        height: 2700,
        alt: "Players contesting a shot during a basketball game.",
        caption: "A basketball game.",
      },
      {
        src: `${assetBase}/media/life-sideline.jpg`,
        width: 1800,
        height: 1200,
        alt: "Players standing on the sideline during a basketball game.",
        caption: "On the sideline.",
      },
    ],
  },
  work: {
    id: "work",
    title: "Work",
    paragraphs: ["On weekends I clean a gym."],
  },
  about: {
    id: "about",
    title: "About",
    paragraphs: [
      "Ashton. Seoul. Before that, Mountain View. English and Korean.",
      "I started Abibu, and I run it. Fatherhood and masculinity.",
      "On weekends I clean a gym.",
    ],
  },
} as const;
