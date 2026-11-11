import type { Collection } from "./types";

/**
 * Collections group stickers into editorial worlds.
 * Order here is the order of the collection directory and the
 * previous / next navigation on a collection page.
 */
export const collections: Collection[] = [
  {
    id: "c-01",
    slug: "new-york",
    title: "New York",
    tagline: "Stories of New York, one sticker at a time.",
    description:
      "Cab ranks, corner carts, brownstone stoops and the skyline going gold. The first collection, and the one that started the habit of drawing the city I kept walking through.",
    coverImage: "/artwork/nyc-skyline-at-dusk.svg",
    alt: "Illustrated New York skyline at sunset used as the cover for the New York collection.",
    stickerIds: [
      "nyc-skyline-at-dusk",
      "yellow-cab-on-the-block",
      "brooklyn-bridge-crossing",
      "pizza-slice",
      "hot-dog-cart",
      "subway-entrance",
      "liberty-in-the-hudson",
      "brooklyn-brownstone",
    ],
    accent: "accent",
  },
  {
    id: "c-02",
    slug: "south-asia",
    title: "South Asia",
    tagline: "Marigold, chai and a well-travelled railway line.",
    description:
      "Marble monuments, street carts, bazaars after dark and the deep green of an auto rickshaw. A collection about colour, heat and hospitality.",
    coverImage: "/artwork/taj-mahal-morning.svg",
    alt: "Illustrated white marble monument reflected in a pool, cover art for the South Asia collection.",
    stickerIds: [
      "taj-mahal-morning",
      "auto-rickshaw",
      "masala-chai",
      "samosa-cart",
      "bazaar-lanterns",
      "heritage-rail",
      "marigold-garland",
    ],
    accent: "mustard",
  },
  {
    id: "c-03",
    slug: "world-cities",
    title: "World Cities",
    tagline: "The same sky over a different street.",
    description:
      "Bus routes, blue domes, torii gates, balloons over a pale valley. Cities drawn the same way so they end up in conversation with each other.",
    coverImage: "/artwork/cappadocia-balloons.svg",
    alt: "Illustrated hot air balloons over a pastel valley, cover art for the World Cities collection.",
    stickerIds: [
      "london-double-decker",
      "paris-eiffel",
      "tokyo-torii-gate",
      "santorini-blue-domes",
      "cappadocia-balloons",
      "colosseum-rome",
      "amsterdam-canal-bikes",
    ],
    accent: "teal",
  },
  {
    id: "c-04",
    slug: "travel",
    title: "Travel",
    tagline: "Everything that goes in the bag.",
    description:
      "Backpacks, folded maps, boarding passes and a tent under stars. The in-between parts of a trip, drawn small enough to fit on a laptop lid.",
    coverImage: "/artwork/travel-backpack.svg",
    alt: "Illustrated coral backpack covered in stickers, cover art for the Travel collection.",
    stickerIds: [
      "travel-backpack",
      "camera-and-map",
      "paper-plane",
      "suitcase-with-stickers",
      "passport-stamps",
      "camp-under-stars",
    ],
    accent: "sage",
  },
  {
    id: "c-05",
    slug: "culture-lifestyle",
    title: "Culture & Lifestyle",
    tagline: "Small rituals, drawn carefully.",
    description:
      "The first coffee, a bicycle with a basket, a record still turning, a cat claiming the good windowsill. The everyday stuff that makes a place feel lived in.",
    coverImage: "/artwork/morning-coffee.svg",
    alt: "Illustrated takeaway coffee cup with steam, cover art for the Culture and Lifestyle collection.",
    stickerIds: [
      "morning-coffee",
      "bicycle-basket",
      "books-and-plants",
      "record-player",
      "cat-on-the-windowsill",
      "flower-bouquet",
      "rooftop-terrace",
    ],
    accent: "plum",
  },
  {
    id: "c-06",
    slug: "people-characters",
    title: "People & Characters",
    tagline: "Somebody is always waiting in the frame.",
    description:
      "A musician under an OPEN sign, a photographer raising a camera, two people walking home. The cast that keeps appearing across the other collections.",
    coverImage: "/artwork/girl-with-camera.svg",
    alt: "Illustrated character holding a camera up to their face, cover art for the People and Characters collection.",
    stickerIds: [
      "street-musician",
      "girl-with-camera",
      "scooter-rider",
      "walking-together",
      "kid-with-a-kite",
      "street-duo",
    ],
    accent: "accent",
  },
  {
    id: "c-07",
    slug: "special-editions",
    title: "Special Editions",
    tagline: "Different stock, different finish.",
    description:
      "Short runs, foil and holographic finishes, and sheets that collect several designs into one. Made in smaller numbers than the rest of the library.",
    coverImage: "/artwork/gold-foil-limited-edition.svg",
    alt: "Round gold metallic limited edition sticker used as cover art for Special Editions.",
    stickerIds: ["gold-foil-limited-edition", "holo-new-year", "city-pack-sticker-sheet"],
    accent: "mustard",
  },
];

export const collectionBySlug = new Map(collections.map((collection) => [collection.slug, collection]));