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
    attempt: "A project I wanted to try.",
    origin: [
      "My uncle inspired the idea.",
      "I wanted music in the room before a page, and while you are in it.",
      "I compose and mix with AI. I released the volumes. Copyright is mine. I'll keep trying.",
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
    gear: [
      {
        src: `${assetBase}/media/gear-top.jpg`,
        width: 1792,
        height: 1344,
        alt: "A white Pioneer DJ XDJ-RX2 from above, between two white KRK speakers.",
        caption: "From above.",
      },
      {
        src: `${assetBase}/media/gear-speaker.jpg`,
        width: 1792,
        height: 1344,
        alt: "The back of a white KRK Rokit speaker, with cables plugged in, and a Pioneer DJ controller behind it.",
        caption: "The speaker.",
      },
      {
        src: `${assetBase}/media/gear-speaker-2.jpg`,
        width: 1792,
        height: 1344,
        alt: "The back of the other white KRK Rokit speaker on the practice table.",
        caption: "The other one.",
      },
      {
        src: `${assetBase}/media/gear-back.jpg`,
        width: 1792,
        height: 1344,
        alt: "The back of the white Pioneer DJ controller, with a SanDisk drive and the input jacks.",
        caption: "The back.",
      },
      {
        src: `${assetBase}/media/gear-edition.jpg`,
        width: 1792,
        height: 1344,
        alt: "The back of a Pioneer DJ XDJ-RX2, with a Limited Edition plate marked No. 308.",
        caption: "No. 308.",
      },
    ],
    booth: [
      {
        src: `${assetBase}/media/drive-screen.jpg`,
        width: 1200,
        height: 1600,
        alt: "A Pioneer CDJ screen during a track, tempo at 125 BPM.",
        caption: "125.",
      },
      {
        src: `${assetBase}/media/drive-decks.jpg`,
        width: 1200,
        height: 1600,
        alt: "Two black Pioneer CDJ players and a mixer on a wooden table.",
        caption: "Another setup.",
      },
    ],
    clips: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((n) => ({
      src: `${assetBase}/media/practice/dj-practice-${n}.mp4`,
      poster: `${assetBase}/media/practice/dj-practice-${n}.jpg`,
      title: `Practice ${n}`,
    })),
    takes: [
      {
        src: `${assetBase}/media/practice/take-20260721-130057.mp4`,
        poster: `${assetBase}/media/practice/take-20260721-130057.jpg`,
        title: "July 21, 13:00",
      },
      {
        src: `${assetBase}/media/practice/take-20260721-130732.mp4`,
        poster: `${assetBase}/media/practice/take-20260721-130732.jpg`,
        title: "July 21, 13:07",
      },
      {
        src: `${assetBase}/media/practice/take-20260721-132038.mp4`,
        poster: `${assetBase}/media/practice/take-20260721-132038.jpg`,
        title: "July 21, 13:20",
      },
    ],
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
      {
        src: `${assetBase}/media/drive-court.jpg`,
        width: 1560,
        height: 1170,
        alt: "Two people on an outdoor court, one writing on a sheet of paper.",
        caption: "A court.",
      },
      {
        src: `${assetBase}/media/drive-game.jpg`,
        width: 1067,
        height: 1600,
        alt: "Players under the hoop during a basketball game.",
        caption: "Under the hoop.",
      },
      {
        src: `${assetBase}/media/drive-bus.jpg`,
        width: 1600,
        height: 1200,
        alt: "A group of friends sitting together on a bus.",
        caption: "On the way.",
      },
      {
        src: `${assetBase}/media/drive-table.jpg`,
        width: 1200,
        height: 1600,
        alt: "A group of friends around a long restaurant table.",
        caption: "A long table.",
      },
      {
        src: `${assetBase}/media/drive-evening.jpg`,
        width: 1200,
        height: 1600,
        alt: "An evening sky over apartment buildings.",
        caption: "Evening.",
      },
      {
        src: `${assetBase}/media/drive-night.jpg`,
        width: 1200,
        height: 1600,
        alt: "A street at night, trees wrapped in white lights.",
        caption: "Night.",
      },
      {
        src: `${assetBase}/media/drive-sun.jpg`,
        width: 1200,
        height: 1600,
        alt: "Two people standing in the sun on a lawn.",
        caption: "In the sun.",
      },
      {
        src: `${assetBase}/media/drive-steps.jpg`,
        width: 1600,
        height: 1200,
        alt: "A group of friends sitting on outdoor steps.",
        caption: "On the steps.",
      },
      {
        src: `${assetBase}/media/drive-water.jpg`,
        width: 1600,
        height: 1200,
        alt: "A person in sunglasses standing in a field by the water.",
        caption: "By the water.",
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
