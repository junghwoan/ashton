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
  description: "DJ TY. Amateur. I taught myself. R&B, American pop, and house.",
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
      "My uncle introduced me to Reading Portal. I did not invent that idea. The line he uses is “Listening is Reading.” In it, music is not only background. It is a way to set a state before reading, and while reading: a ritual for leaving the outside and entering focus, reflection, imagination, or calm. Another line from him is “Enter the page, let the book read you.”",
      "He describes that passage with four states, R.E.A.D.",
    ],
    states: [
      { letter: "R", name: "Relax", note: "Slow down. Leave the noise you walked in with." },
      { letter: "E", name: "Explore", note: "Stay curious. Move through the text." },
      { letter: "A", name: "Awareness", note: "Notice attention: when it stays, and when it leaves." },
      { letter: "D", name: "Dream", note: "Let images and associations open." },
    ],
    experiment: [
      "I’m making my own version. I produce the music, sequence it, and mix it, then I read with it. I want to know whether sound changes how I read, focus, and think.",
      "I have not finished a test. There is no result here. This is the method.",
    ],
    steps: [
      "Choose a book, or a reading context.",
      "Name the state I want.",
      "Look for music.",
      "Set a tempo and an energy range.",
      "Put the tracks in order.",
      "Mix the transitions.",
      "Read while I listen.",
      "Notice distraction, focus, mood, and pace.",
      "Revise the mix.",
      "If it holds up, try it with another reader.",
    ],
    session: {
      code: "RP. 001",
      title: "E.",
      status: "Work in progress. I have not chosen the book, set a tempo, or recorded a mix.",
      rows: [
        { label: "State", value: "E — Explore" },
        { label: "Book", value: "Not chosen" },
        { label: "Tempo", value: "Not set" },
        { label: "Duration", value: "None" },
        { label: "Audio", value: "None yet" },
      ],
    },
  },
  dj: {
    id: "dj",
    title: "DJ TY",
    paragraphs: [
      "TY comes from Tae\u2011Yeon. I wanted it pronounced “Tai.”",
      "I taught myself. I practice at home, and I have mixed in a cafe.",
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
