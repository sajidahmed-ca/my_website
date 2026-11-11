/**
 * Artwork build step.
 *
 * Writes every sticker illustration to `public/artwork/<slug>.svg`.
 * Each file is a self-contained, transparent-background die-cut sticker:
 * white paper base + soft shadow + the illustration clipped to the cut line.
 *
 * To use real artwork later, drop your PNG/SVG files into `public/artwork`
 * using the same file names (or update `image` in `data/stickers.ts`).
 *
 *   npm run artwork
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import * as cities from "./artwork/scenes-cities.mjs";
import * as life from "./artwork/scenes-life.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "artwork");

const PAD = 26;

/** Cut-line shapes available for sticker bases. */
const cut = {
  square: (w, h) => ({ tag: "rect", attrs: `x="0" y="0" width="${w}" height="${h}" rx="${Math.round(w * 0.19)}"` }),
  tall: (w, h) => ({ tag: "rect", attrs: `x="0" y="0" width="${w}" height="${h}" rx="${Math.round(w * 0.19)}"` }),
  circle: (w) => ({ tag: "circle", attrs: `cx="${w / 2}" cy="${w / 2}" r="${w / 2}"` }),
  arch: (w, h) => ({
    tag: "path",
    attrs: `d="M0 ${h} V${Math.round(w * 0.5)} A${w / 2} ${w / 2} 0 0 1 ${w} ${Math.round(
      w * 0.5,
    )} V${h} Z"`,
  }),
};

function sticker({ slug, w = 400, h = 400, shape = "square", tilt = 0, art, id }) {
  const W = w + PAD * 2;
  const H = h + PAD * 2;
  const { tag, attrs } = cut[shape](w, h);
  const base = `<${tag} ${attrs} fill="#FFFFFF"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<defs>
<clipPath id="cut${id}"><${tag} ${attrs}/></clipPath>
<filter id="drop${id}" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
<feDropShadow dx="0" dy="7" stdDeviation="7" flood-color="#1A1614" flood-opacity="0.18"/>
</filter>
</defs>
<g transform="rotate(${tilt} ${W / 2} ${H / 2})">
<g filter="url(#drop${id})">${base}</g>
<g clip-path="url(#cut${id})" transform="translate(${PAD} ${PAD})">${art}</g>
<${tag} ${attrs} fill="none" stroke="#1A1614" stroke-opacity="0.08" stroke-width="2"/>
</g>
</svg>`;
}

const manifest = [
  // --- New York -----------------------------------------------------------
  { slug: "nyc-skyline-at-dusk", scene: cities.nycSkyline, tilt: -4, featured: true },
  { slug: "yellow-cab-on-the-block", scene: cities.yellowCab, tilt: 3 },
  { slug: "brooklyn-bridge-crossing", scene: cities.brooklynBridge, tilt: -3, featured: true },
  { slug: "pizza-slice", scene: cities.pizzaSlice, tilt: 5 },
  { slug: "hot-dog-cart", scene: cities.hotDogCart, tilt: -5 },
  { slug: "subway-entrance", scene: cities.subwayEntrance, tilt: 2 },
  { slug: "liberty-in-the-hudson", scene: cities.statueOfLiberty, tilt: -4, featured: true },
  { slug: "brooklyn-brownstone", scene: cities.brownstone, tilt: 4 },

  // --- South Asia ---------------------------------------------------------
  { slug: "taj-mahal-morning", scene: cities.tajMahal, tilt: -3, featured: true },
  { slug: "auto-rickshaw", scene: cities.autoRickshaw, tilt: 4 },
  { slug: "masala-chai", scene: cities.masalaChai, tilt: -5 },
  { slug: "samosa-cart", scene: cities.samosaCart, tilt: 3 },
  { slug: "bazaar-lanterns", scene: cities.bazaarLanterns, tilt: -3 },
  { slug: "heritage-rail", scene: cities.heritageTrain, tilt: 2 },
  { slug: "marigold-garland", scene: cities.marigoldGarland, tilt: 5 },

  // --- World cities -------------------------------------------------------
  { slug: "london-double-decker", scene: cities.londonBus, tilt: -4, featured: true },
  { slug: "paris-eiffel", scene: cities.parisEiffel, tilt: 3 },
  { slug: "tokyo-torii-gate", scene: cities.tokyoTorii, tilt: -5 },
  { slug: "santorini-blue-domes", scene: cities.santorini, tilt: 4 },
  { slug: "colosseum-rome", scene: cities.colosseum, tilt: -3 },
  { slug: "amsterdam-canal-bikes", scene: cities.amsterdamBicycles, tilt: 3 },
  { slug: "cappadocia-balloons", scene: cities.cappadociaBalloons, tilt: -4 },

  // --- Travel -------------------------------------------------------------
  { slug: "travel-backpack", scene: life.backpack, tilt: 5, featured: true },
  { slug: "camera-and-map", scene: life.cameraMap, tilt: -3 },
  { slug: "paper-plane", scene: life.paperPlane, tilt: 4 },
  { slug: "suitcase-with-stickers", scene: life.suitcase, tilt: -5 },
  { slug: "passport-stamps", scene: life.passportStamps, tilt: 3 },
  { slug: "camp-under-stars", scene: life.campTent, tilt: -4 },

  // --- Culture & lifestyle ------------------------------------------------
  { slug: "morning-coffee", scene: life.coffeeCup, tilt: 4, featured: true },
  { slug: "bicycle-basket", scene: life.bicycleBasket, tilt: -5 },
  { slug: "books-and-plants", scene: life.bookPlant, tilt: 3 },
  { slug: "record-player", scene: life.recordPlayer, tilt: -3 },
  { slug: "cat-on-the-windowsill", scene: life.catWindowsill, tilt: 4 },
  { slug: "flower-bouquet", scene: life.flowerBouquet, tilt: -4 },
  { slug: "rooftop-terrace", scene: life.rooftopTerrace, tilt: 3, featured: true },

  // --- People & characters ------------------------------------------------
  { slug: "street-musician", scene: life.streetMusician, tilt: -3 },
  { slug: "girl-with-camera", scene: life.girlWithCamera, tilt: 4, featured: true },
  { slug: "scooter-rider", scene: life.scooterRider, tilt: -4 },
  { slug: "walking-together", scene: life.walkingPair, tilt: 2 },
  { slug: "kid-with-a-kite", scene: life.kidWithKite, tilt: -5 },
  { slug: "street-duo", scene: life.miniTrio, tilt: 3 },

  // --- Special ------------------------------------------------------------
  { slug: "gold-foil-limited-edition", scene: life.foilLimited, shape: "circle", tilt: 0, featured: true },
  { slug: "holo-new-year", scene: life.holoConfetti, shape: "circle", tilt: 0 },
  { slug: "city-pack-sticker-sheet", scene: life.stickerSheetPack, h: 460, tilt: -2 },
];

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const dims = {};

  await Promise.all(
    manifest.map(async (item, i) => {
      const w = 400;
      const h = item.h ?? 400;
      const svg = sticker({
        slug: item.slug,
        w,
        h,
        shape: item.shape ?? "square",
        tilt: item.tilt ?? 0,
        art: item.scene(),
        id: i,
      });
      dims[item.slug] = { width: w + PAD * 2, height: h + PAD * 2 };
      await writeFile(join(outDir, `${item.slug}.svg`), svg, "utf8");
    }),
  );

  await writeFile(join(outDir, "dimensions.json"), `${JSON.stringify(dims, null, 2)}\n`, "utf8");
  console.log(`Generated ${manifest.length} artwork files in public/artwork`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});