import type { JournalPost } from "./types";

/**
 * Journal entries are static content with structured blocks so the article
 * renderer can stay presentational. Add a post here and it appears in
 * /journal, the sitemap and the search index automatically.
 */
export const journalPosts: JournalPost[] = [
  {
    id: "j-01",
    slug: "why-i-started-making-city-stickers",
    title: "Why I Started Making City Stickers",
    excerpt:
      "It began with a notebook full of corners I could not describe properly in words — and a printer that could cut shapes.",
    category: "Behind the Artwork",
    date: "2026-02-18",
    readTime: 6,
    image: "/artwork/nyc-skyline-at-dusk.svg",
    alt: "Illustrated New York skyline at sunset used as the lead image for this journal entry.",
    related: ["how-a-city-becomes-an-illustration", "from-sketch-to-finished-sticker", "the-story-behind-a-new-york-sticker"],
    body: [
      {
        type: "p",
        text: "I have never been good at describing a place to someone who has not been there. Ask me what a street feels like and I will point at three unrelated things. What made the difference was drawing it. A drawing forces a decision about what matters, and once the decision is made the place starts talking back.",
      },
      {
        type: "p",
        text: "Stickers made the habit practical. A sketch is a large, expensive object. A sticker is small, cheap, and lives on a laptop lid where it gets seen by strangers every day. That is a completely different relationship with the same drawing.",
      },
      { type: "h2", text: "The notebook phase" },
      {
        type: "p",
        text: "For a while the whole project lived in a pocket notebook. One drawing per page: a rickshaw, a bridge, a corner shop, a queue of people. No colour, no characters, no rules. The only rule was that I had to be able to draw it from memory.",
      },
      {
        type: "p",
        text: "That memory test is still the core of the work. If I cannot hold a place in my head well enough to redraw it a week later, I did not observe it — I photographed it, which is a different thing entirely.",
      },
      { type: "h2", text: "What stuck" },
      {
        type: "list",
        items: [
          "Keep it small enough to finish. A sticker has edges, and edges are a deadline.",
          "One idea per sticker. No dioramas.",
          "Leave white space around the subject so the die-cut has room to breathe.",
          "Reuse a limited palette across a collection so the set reads as one world.",
        ],
      },
      { type: "artwork", stickerSlug: "hot-dog-cart", caption: "The first cart I drew properly. It took four attempts." },
      {
        type: "quote",
        text: "A sticker is a small painting that insists on being touched.",
      },
      {
        type: "p",
        text: "The library has grown into collections, and the collections have started arguing with each other in the best way. A chai cup next to a takeaway coffee. A torii gate next to a subway entrance. Different places, same drawing hand, which is the whole point.",
      },
    ],
  },
  {
    id: "j-02",
    slug: "how-a-city-becomes-an-illustration",
    title: "How a City Becomes an Illustration",
    excerpt:
      "Five decisions that happen between standing on a street and having something that fits on a laptop.",
    category: "Creative Process",
    date: "2026-03-04",
    readTime: 7,
    image: "/artwork/brooklyn-bridge-crossing.svg",
    alt: "Illustrated suspension bridge used as the lead image for this journal entry.",
    related: ["why-i-started-making-city-stickers", "the-story-behind-a-new-york-sticker", "introducing-the-world-cities-collection"],
    body: [
      {
        type: "p",
        text: "Every sticker starts the same way: I am somewhere, I notice something, and I make a note. The distance between that note and a finished piece is where most of the real work happens.",
      },
      { type: "h2", text: "1. Choose one moment" },
      {
        type: "p",
        text: "A city is far too large for one square. The first cut is always a choice about which single moment carries the place. For the bridge it was the cables against open sky. For the cab it was the checker stripe. For the brownstone it was the stoop with plants on it.",
      },
      { type: "h2", text: "2. Flatten the depth" },
      {
        type: "p",
        text: "Sticker art cannot rely on perspective the way a painting can. Layers get separated into distinct colour bands — sky, far buildings, near buildings, street — each with its own value so the shapes stay readable at 40 mm tall.",
      },
      { type: "h2", text: "3. Give it a person" },
      {
        type: "p",
        text: "A place with no one in it reads as a postcard. One small character is usually enough to turn a building into somewhere. Not a crowd. One person, and the viewer quietly moves from looking at the image to standing in it.",
      },
      { type: "artwork", stickerSlug: "brooklyn-brownstone", caption: "Three windows, one door, one pot of plants. That is the whole sticker." },
      { type: "h2", text: "4. Simplify until it survives the cut" },
      {
        type: "p",
        text: "Details are the first thing to go. Anything that will not read at small size is either enlarged until it reads or removed. The die-cut line is unforgiving: a detail thinner than a millimetre becomes a printing defect rather than a detail.",
      },
      { type: "h2", text: "5. Reuse the palette" },
      {
        type: "p",
        text: "Each collection runs on a fixed set of colours. That constraint is what makes a set look designed rather than accumulated, and it means a new sticker in an existing collection is quick to draw without looking out of place.",
      },
      {
        type: "list",
        items: [
          "Choose the single moment worth keeping.",
          "Separate the scene into flat colour bands.",
          "Put one person in it.",
          "Cut anything that cannot survive small.",
          "Draw from the collection palette only.",
        ],
      },
    ],
  },
  {
    id: "j-03",
    slug: "the-story-behind-a-new-york-sticker",
    title: "The Story Behind a New York Sticker",
    excerpt:
      "Eight designs, one city, and the specific afternoon that made the whole collection worth drawing.",
    category: "Stories",
    date: "2026-01-22",
    readTime: 5,
    image: "/artwork/yellow-cab-on-the-block.svg",
    alt: "Illustrated yellow cab used as the lead image for this journal entry.",
    related: ["why-i-started-making-city-stickers", "how-a-city-becomes-an-illustration", "from-sketch-to-finished-sticker"],
    body: [
      {
        type: "p",
        text: "New York was first, so it carries the most honest version of how this started. I was walking, I had no particular destination, and I noticed how much of the city arrives as a moving object rather than a building.",
      },
      {
        type: "p",
        text: "The cab was the obvious first subject and the hardest to finish. Two early versions were technically correct and completely lifeless — the proportions were right and nothing was happening in them.",
      },
      { type: "h2", text: "The fix was the stripe" },
      {
        type: "p",
        text: "What made the third version work was pushing the checkerboard much larger than felt reasonable. It is not a realistic detail; it is a pattern, and it gives the whole drawing a rhythm. Once the body had rhythm, the rest fell into place.",
      },
      { type: "artwork", stickerSlug: "yellow-cab-on-the-block", caption: "The stripe does almost all of the work here." },
      {
        type: "p",
        text: "The brownstone came from a different kind of noticing. Nobody photographs stoops with plants on them, which is exactly why they make good stickers. Everyone in that sticker is implied — the residents, the dog, the delivery that was just signed for.",
      },
      {
        type: "p",
        text: "Eight designs later, the collection is still recognisably one place drawn by one hand. That was the aim, and it is the test I apply to every collection now.",
      },
      {
        type: "quote",
        text: "The details nobody photographs are usually the ones worth keeping.",
      },
    ],
  },
  {
    id: "j-04",
    slug: "from-sketch-to-finished-sticker",
    title: "From Sketch to Finished Sticker",
    excerpt:
      "The full route one illustration takes: thumbnail, silhouette, colour, cleanup, print test.",
    category: "Creative Process",
    date: "2026-04-02",
    readTime: 8,
    image: "/artwork/camera-and-map.svg",
    alt: "Illustrated camera resting on a folded map, used as the lead image for this journal entry.",
    related: ["how-a-city-becomes-an-illustration", "design-notes-on-using-one-red", "why-i-started-making-city-stickers"],
    body: [
      {
        type: "p",
        text: "A sticker passes through five stages, and the stage that usually takes longest is the third one.",
      },
      { type: "h2", text: "01 · Thumbnail" },
      {
        type: "p",
        text: "Rough shapes at roughly four centimetres. No detail, only composition. If the silhouette is unclear at thumbnail size, no amount of rendering will save it, so this is where most designs end.",
      },
      { type: "h2", text: "02 · Silhouette" },
      {
        type: "p",
        text: "The subject drawn cleanly as a shape, with the white border built in from the start. Designing the cut line early means the border is part of the drawing rather than a decision made at export time.",
      },
      { type: "h2", text: "03 · Colour" },
      {
        type: "p",
        text: "The slow stage. Colour goes down flat, one band at a time, from background to foreground. Working back to front keeps overlaps predictable and stops later shapes from fighting earlier ones.",
      },
      { type: "artwork", stickerSlug: "passport-stamps", caption: "Colour blocked in as separate bands, background first." },
      { type: "h2", text: "04 · Cleanup" },
      {
        type: "p",
        text: "One pass to align edges, remove stray overlap and fix anything that reads as an accident. Then the whole piece is shrunk to 40 mm and checked again — a lot of confident detail disappears at that size.",
      },
      { type: "h2", text: "05 · Print test" },
      {
        type: "p",
        text: "A real print, held in a hand, put on a real surface. Screens lie about small sizes. Paper and vinyl do not. Every colour in the library has been adjusted at least once because of this stage.",
      },
      {
        type: "list",
        items: [
          "Thumbnail at actual size.",
          "Build the die-cut into the silhouette.",
          "Colour from background forward.",
          "Check again at 40 mm.",
          "Print it once before releasing it.",
        ],
      },
    ],
  },
  {
    id: "j-05",
    slug: "introducing-the-world-cities-collection",
    title: "Introducing the World Cities Collection",
    excerpt:
      "One drawing hand, seven cities — why consistency turned out to matter more than accuracy.",
    category: "New Collections",
    date: "2026-05-11",
    readTime: 5,
    image: "/artwork/cappadocia-balloons.svg",
    alt: "Illustrated hot air balloons over a pastel valley, lead image for the World Cities collection announcement.",
    related: ["how-a-city-becomes-an-illustration", "design-notes-on-using-one-red", "the-story-behind-a-new-york-sticker"],
    body: [
      {
        type: "p",
        text: "The World Cities collection started as a consistency experiment. The rule was simple: every city drawn the same way, with the same palette, the same white border and the same level of detail, whether I knew the place well or had seen it for a single afternoon.",
      },
      { type: "h2", text: "Why not just be accurate" },
      {
        type: "p",
        text: "Accuracy is a trap for sticker art. A technically correct drawing of a landmark tends to read as a diagram, and diagrams are exactly what a sticker is not supposed to be. The compromise I keep is: get the silhouette right, and let the colour, light and small human detail carry the feeling.",
      },
      { type: "artwork", stickerSlug: "tokyo-torii-gate", caption: "The gate is roughly right. The lanterns are doing the emotional work." },
      {
        type: "p",
        text: "That decision is why a city I visited for three days sits comfortably next to a city I lived in. Viewers do not check the architecture. They check the mood, and the mood is easier to get right than the geometry.",
      },
      { type: "h2", text: "What is in it" },
      {
        type: "list",
        items: [
          "London — a double-decker and a route board.",
          "Paris — the tower with a low sun behind it.",
          "Tokyo — a gate, lanterns and warm evening light.",
          "Santorini — white walls and blue domes.",
          "Cappadocia — balloons at dawn.",
          "Rome — arches, heat and broken stone.",
          "Amsterdam — bicycles against narrow houses.",
        ],
      },
      {
        type: "p",
        text: "Seven designs, one shared palette, and a rule I expect to keep using: the second collection about a place should always contain at least one sticker that could only exist there.",
      },
    ],
  },
  {
    id: "j-06",
    slug: "design-notes-on-using-one-red",
    title: "Design Notes on Using One Red",
    excerpt: "Why the whole library runs on a single accent, and what that does to a collection.",
    category: "Design Notes",
    date: "2026-06-01",
    readTime: 4,
    image: "/artwork/morning-coffee.svg",
    alt: "Illustrated takeaway coffee cup with a red band, lead image for these design notes.",
    related: ["from-sketch-to-finished-sticker", "introducing-the-world-cities-collection", "how-a-city-becomes-an-illustration"],
    body: [
      {
        type: "p",
        text: "Every collection uses one red and a small set of neighbours. That is not an aesthetic preference so much as a practical one: a fixed palette makes a growing library look intentional without any extra effort per sticker.",
      },
      { type: "h2", text: "One accent, many jobs" },
      {
        type: "p",
        text: "The red never means one thing. It is a taxi, a torii gate, a ribbon on a bouquet, a mug band, a location dot on a map. Because it repeats across unrelated subjects, it quietly ties the library together the way a signature would.",
      },
      { type: "artwork", stickerSlug: "flower-bouquet", caption: "The same red, doing something completely different." },
      {
        type: "p",
        text: "The rule I hold myself to is that red should appear once per composition, in one place. Twice and it becomes a pattern; three times and the drawing starts to feel decorated rather than drawn.",
      },
      {
        type: "list",
        items: [
          "Pick the accent before drawing the subject.",
          "Use it once, in the place that carries the most weight.",
          "Let everything else be a neighbour of the palette.",
          "Reserve pure black for outlines and text.",
        ],
      },
      {
        type: "quote",
        text: "A limited palette is not a limitation. It is a decision made once so every drawing after it is faster.",
      },
    ],
  },
];

export const journalBySlug = new Map(journalPosts.map((post) => [post.slug, post]));