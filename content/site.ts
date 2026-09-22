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
    "Ashton’s record of questions about how people live together: Abibu, research on South Korea’s birth rate, and DJ TY.",
  hero: {
    lede: "Questions about how people live together.",
    interests: "Sociology, social policy, and psychology.",
  },
  nav: [
    { href: "#abibu", label: "Abibu" },
    { href: "#research", label: "Research" },
    { href: "#dj", label: "DJ TY" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
  ],
  index: [
    { href: "#abibu", num: "01", label: "Abibu", note: "A conversation group he started" },
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
      "Ashton started Abibu and runs it. He facilitates the conversations. The subjects are fatherhood, masculinity, and men talking about things they usually keep to themselves.",
    ],
  },
  research: {
    id: "research",
    num: "02",
    title: "Research",
    question: "Why does South Korea’s birth rate keep falling?",
    paragraphs: [
      "The question began as curiosity. It became an AP Research project on the birth rate, family structure, and financial pressure.",
      "A separate, collaborative project looks at male loneliness in Korea. It sits beside the same concerns — fatherhood, masculinity, and isolation — and it is not a result of the birth-rate paper.",
    ],
    rows: [
      { label: "Starting point", value: "A personal question about the birth rate" },
      { label: "AP Research", value: "Birth rate, family structure, financial pressure" },
      { label: "Alongside it", value: "Collaborative research on male loneliness in Korea" },
    ],
  },
  dj: {
    id: "dj",
    num: "03",
    title: "DJ TY",
    statement: "TY comes from Tae\u2011Yeon. He wanted it pronounced “Tai.”",
    paragraphs: [
      "Ashton taught himself. He practices at home, and he has mixed in a cafe. The music he works in is R&B, American pop, and house.",
      "The photographs and footage are from practice, not from a booked show.",
    ],
    rows: [
      { label: "Name", value: "TY, from Tae\u2011Yeon, said “Tai”" },
      { label: "How", value: "Self-taught. Home practice. Mixing in a cafe." },
      { label: "Music", value: "R&B, American pop, house" },
    ],
    portrait: {
      src: "/media/dj-portrait.jpg",
      width: 1086,
      height: 1448,
      alt: "Ashton at home, wearing headphones, mixing on a white Pioneer DJ controller between two speakers.",
      caption: "At home.",
    },
    deck: {
      src: "/media/dj-deck.jpg",
      width: 1800,
      height: 1350,
      alt: "Home practice setup with two Pioneer CDJ players and a DJM mixer on a desk.",
      caption: "The setup he practices on.",
    },
    screen: {
      src: "/media/dj-screen.jpg",
      width: 1600,
      height: 2133,
      alt: "Close view of a CDJ screen during practice, with a waveform and the tempo near 125 BPM.",
      caption: "A moment from practice.",
    },
    video: {
      src: `${assetBase}/media/practice.mp4`,
      poster: `${assetBase}/media/practice-poster.jpg`,
      caption: "Practice footage.",
    },
  },
  work: {
    id: "work",
    num: "04",
    title: "Work",
    statement: "On weekends, Ashton cleans a gym.",
    paragraphs: [
      "The job is janitorial. He shows up and does the work.",
    ],
  },
  about: {
    id: "about",
    title: "About",
    paragraphs: [
      "Ashton lives in Seoul and has lived in Mountain View, California. He speaks English and Korean.",
      "He is interested in sociology, social policy, and psychology, and he wants to study economics as well.",
    ],
  },
} as const;
