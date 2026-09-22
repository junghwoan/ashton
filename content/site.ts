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
  description: "DJ TY. Bedroom DJ. I taught myself. R&B, American pop, and house.",
  nav: [
    { href: "/", label: "Music" },
    { href: "/#reading", label: "Portal" },
    { href: "/about", label: "About" },
  ],
  abibu: {
    id: "abibu",
    title: "Abibu",
    paragraphs: [
      "I started Abibu, and I run it. We talk about fatherhood, masculinity, and things men usually keep to themselves.",
    ],
  },
  research: {
    id: "research",
    title: "Research",
    paragraphs: [
      "I’m looking at why South Korea’s birth rate keeps falling, and at family structure and financial pressure. I’m also in a separate project on male loneliness in Korea.",
    ],
  },
  portal: {
    id: "reading",
    title: "Reading Portal",
    origin: [
      "My uncle started Reading Portal. I didn’t. His line is “Listening is Reading.” Music sets the room before you read, and while you read. “Enter the page, let the book read you.” I make the music. These are the volumes that are out.",
    ],
    states: [
      { letter: "R", name: "Relax", note: "Slow down. Leave the noise you walked in with." },
      { letter: "E", name: "Explore", note: "Stay curious. Move through the text." },
      { letter: "A", name: "Awareness", note: "Notice attention: when it stays, and when it leaves." },
      { letter: "D", name: "Dream", note: "Let images and associations open." },
    ],
    releases: [
      {
        id: "vol4",
        title: "Vol.4 Infinite Margins",
        cover: `${assetBase}/media/rp-vol4.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 4 cover, Infinite Margins. A person stands in a lit stone ring.",
      },
      {
        id: "vol5",
        title: "Vol.5 Time of Flow",
        cover: `${assetBase}/media/rp-vol5.jpg`,
        width: 1600,
        height: 1600,
        alt: "Reading Portal volume 5 cover, Time of Flow. An hourglass sits on an open book inside a gold ring.",
      },
    ],
  },
  dj: {
    id: "dj",
    title: "DJ TY",
    paragraphs: [
      "TY comes from Tae\u2011Yeon. I wanted it pronounced “Tai.”",
      "I taught myself. I practice at home, and I have mixed in a cafe.",
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
    video: {
      src: `${assetBase}/media/practice.mp4`,
      poster: `${assetBase}/media/practice-poster.jpg`,
      caption: "Practice footage.",
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
    paragraphs: ["On weekends I clean a gym. It’s a janitorial job."],
  },
  about: {
    id: "about",
    title: "About",
    paragraphs: [
      "I’m Ashton. I live in Seoul. I lived in Mountain View, California. I speak English and Korean.",
      "I started Abibu, and I run it. We talk about fatherhood, masculinity, and things men usually keep to themselves.",
      "On weekends I clean a gym. It’s a janitorial job.",
    ],
  },
} as const;
