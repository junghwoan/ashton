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
  name: "Ashton",
  title: "Ashton — Personal Portfolio",
  description:
    "I ask how people live together. This page is Abibu, my research on South Korea’s birth rate, and DJ TY.",
  hero: {
    lede: "I ask how people live together.",
    interests: "Sociology, social policy, and psychology.",
  },
  nav: [
    { href: "#abibu", label: "Abibu" },
    { href: "#research", label: "Research" },
    { href: "#dj", label: "DJ TY" },
    { href: "#work", label: "Work" },
    { href: "#pictures", label: "Pictures" },
    { href: "#about", label: "About" },
  ],
  index: [
    { href: "#abibu", num: "01", label: "Abibu", note: "A conversation group I started" },
    { href: "#research", num: "02", label: "Research", note: "Birth rate, family, loneliness" },
    { href: "#dj", num: "03", label: "DJ TY", note: "Self-taught practice" },
    { href: "#work", num: "04", label: "Work", note: "Weekends at a gym" },
  ],
  abibu: {
    id: "abibu",
    num: "01",
    title: "Abibu",
    statement: "A place for conversations men often avoid.",
    paragraphs: [
      "I started Abibu, and I run it. I facilitate the conversations. We talk about fatherhood, masculinity, and things men usually keep to themselves.",
    ],
  },
  research: {
    id: "research",
    num: "02",
    title: "Research",
    question: "Why does South Korea’s birth rate keep falling?",
    paragraphs: [
      "I started from a question I had. It became my AP Research project, on the birth rate, family structure, and financial pressure.",
      "I am also part of a separate project on male loneliness in Korea. It sits next to the same concerns — fatherhood, masculinity, and isolation — and it is not a result of the birth-rate paper.",
    ],
    rows: [
      { label: "Starting point", value: "A question I had about the birth rate" },
      { label: "AP Research", value: "Birth rate, family structure, financial pressure" },
      { label: "Alongside it", value: "Collaborative research I’m part of, on male loneliness in Korea" },
    ],
  },
  dj: {
    id: "dj",
    num: "03",
    title: "DJ TY",
    statement: "TY comes from Tae\u2011Yeon. I wanted it pronounced “Tai.”",
    paragraphs: [
      "I taught myself. I practice at home, and I have mixed in a cafe. The music I work in is R&B, American pop, and house.",
      "The photographs and footage are from my practice, not from a booked show.",
    ],
    rows: [
      { label: "Name", value: "TY, from Tae\u2011Yeon. I say it “Tai.”" },
      { label: "How", value: "I taught myself. I practice at home. I have mixed in a cafe." },
      { label: "Music", value: "R&B, American pop, house" },
    ],
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
    num: "05",
    title: "Pictures",
    paragraphs: ["From dinner, from outside, and from a basketball game."],
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
    num: "04",
    title: "Work",
    statement: "On weekends, I clean a gym.",
    paragraphs: [
      "The job is janitorial. I show up and do the work.",
    ],
  },
  about: {
    id: "about",
    title: "About",
    paragraphs: [
      "I live in Seoul, and I have lived in Mountain View, California. I speak English and Korean.",
      "I’m interested in sociology, social policy, and psychology, and I want to study economics as well.",
    ],
  },
} as const;
