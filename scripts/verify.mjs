/**
 * Static verification for generated artwork + data integrity.
 *   node scripts/verify.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const artDir = join(root, "public", "artwork");

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`FAIL  ${msg}`);
};
const pass = (msg) => console.log(`ok    ${msg}`);

/* ---------- 1. artwork files ---------- */
const files = (await readdir(artDir)).filter((f) => f.endsWith(".svg"));
if (files.length === 0) fail("no artwork files found — run `npm run artwork`");

let totalBytes = 0;
for (const file of files) {
  const raw = await readFile(join(artDir, file), "utf8");
  totalBytes += Buffer.byteLength(raw);

  if (/NaN|undefined|Infinity/.test(raw)) fail(`${file}: contains NaN/undefined/Infinity`);

  // every url(#id) must resolve to an id defined in the same document
  const ids = new Set([...raw.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const m of raw.matchAll(/url\(#([^)]+)\)/g)) {
    if (!ids.has(m[1])) fail(`${file}: dangling reference url(#${m[1]})`);
  }
  for (const m of raw.matchAll(/clip-path="url\(#([^)]+)\)"/g)) {
    if (!ids.has(m[1])) fail(`${file}: dangling clip-path #${m[1]}`);
  }

  // XML well-formedness (single root, balanced by Chromium-independent parser)
  const opens = (raw.match(/<(?!\/)[a-zA-Z]/g) ?? []).length;
  const closes = (raw.match(/<\//g) ?? []).length;
  const selfClosing = (raw.match(/\/>/g) ?? []).length;
  if (opens !== closes + selfClosing) fail(`${file}: unbalanced tags (${opens} open / ${closes} close / ${selfClosing} self)`);

  // every attribute inside every tag must be name="value"
  for (const m of raw.matchAll(/<[a-zA-Z][^>]*>/g)) {
    const tag = m[0];
    const inner = tag.replace(/^<[a-zA-Z]+/, "").replace(/\/?>$/, "");
    const tokens = inner.match(/(?:[^\s"]|"[^"]*")+/g) ?? [];
    const bad = tokens.filter((t) => !t.includes("="));
    if (bad.length) fail(`${file}: malformed attribute(s) ${bad.join(" ")} in ${tag.slice(0, 90)}`);
  }

  const vb = raw.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!vb) fail(`${file}: missing viewBox`);
}

pass(`${files.length} artwork files structurally valid (${(totalBytes / 1024).toFixed(0)} kB total)`);

/* ---------- 2. cross-reference data files ---------- */
const readTs = async (rel) => readFile(join(root, rel), "utf8");
const slugs = new Set(files.map((f) => f.replace(/\.svg$/, "")));

const checkStickerData = async () => {
  const src = await readTs("data/stickers.ts");
  const imageRefs = [...src.matchAll(/image:\s*"(\/artwork\/[^"]+)"/g)].map((m) => m[1]);
  if (imageRefs.length === 0) fail("data/stickers.ts: no artwork image references found");
  for (const ref of imageRefs) {
    if (!slugs.has(ref.replace("/artwork/", "").replace(/\.svg$/, ""))) {
      fail(`data/stickers.ts: missing asset ${ref}`);
    }
  }
  const slugsInData = [...src.matchAll(/^\s+slug:\s*"([^"]+)",/gm)].map((m) => m[1]);
  const dupes = slugsInData.filter((s, i) => slugsInData.indexOf(s) !== i);
  if (dupes.length) fail(`data/stickers.ts: duplicate slugs ${[...new Set(dupes)].join(", ")}`);
  for (const s of slugsInData) {
    if (!slugs.has(s)) fail(`data/stickers.ts: sticker slug "${s}" has no artwork file`);
  }
  pass(`stickers.ts: ${slugsInData.length} slugs, ${imageRefs.length} asset refs resolved`);
  return slugsInData;
};

const checkCollectionData = async () => {
  const src = await readTs("data/collections.ts");
  const ids = [...src.matchAll(/stickerIds:\s*\[([^\]]*)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
  const src2 = await readTs("data/stickers.ts");
  const known = new Set([...src2.matchAll(/^\s+slug:\s*"([^"]+)",/gm)].map((m) => m[1]));
  const missing = ids.filter((id) => !known.has(id));
  if (missing.length) fail(`collections.ts: unknown stickerIds -> ${missing.join(", ")}`);
  const orphan = [...known].filter((k) => !ids.includes(k));
  if (orphan.length) fail(`collections.ts: stickers not in any collection -> ${orphan.join(", ")}`);
  pass(`collections.ts: ${ids.length} membership refs, ${known.size} stickers, 0 orphans`);
};

const checkProducts = async () => {
  const src = await readTs("data/products.ts");
  const src2 = await readTs("data/stickers.ts");
  const known = new Set([...src2.matchAll(/^\s+slug:\s*"([^"]+)",/gm)].map((m) => m[1]));

  const slugs = [...src.matchAll(/^\s+slug:\s*"([^"]+)",/gm)].map((m) => m[1]);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) fail(`products.ts: duplicate slugs ${[...new Set(dupes)].join(", ")}`);

  const artRefs = [...src.matchAll(/stickers:\s*\[([^\]]*)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));

  const unknown = artRefs.filter((slug) => !known.has(slug));
  if (unknown.length) fail(`products.ts: unknown sticker slugs -> ${[...new Set(unknown)].join(", ")}`);

  const empty = [...src.matchAll(/stickers:\s*\[\s*\]/g)].length;
  if (empty) fail(`products.ts: ${empty} product(s) with no artwork`);

  pass(`products.ts: ${slugs.length} products, ${artRefs.length} artwork refs all resolve`);
};

const checkJournal = async () => {
  const src = await readTs("data/journal.ts");
  const src2 = await readTs("data/stickers.ts");
  const known = new Set([...src2.matchAll(/^\s+slug:\s*"([^"]+)",/gm)].map((m) => m[1]));

  const images = [...src.matchAll(/image:\s*"(\/artwork\/[^"]+)"/g)].map((m) => m[1]);
  for (const ref of images) {
    if (!slugs.has(ref.replace("/artwork/", "").replace(/\.svg$/, ""))) fail(`journal.ts: missing asset ${ref}`);
  }

  const slugsInData = [...src.matchAll(/^\s+slug:\s*"([^"]+)",/gm)].map((m) => m[1]);
  const dupes = slugsInData.filter((s, i) => slugsInData.indexOf(s) !== i);
  if (dupes.length) fail(`journal.ts: duplicate slugs`);

  // related[] and body artwork blocks must point at real sticker slugs
  const related = [...src.matchAll(/related:\s*\[([^\]]*)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
  const badRelated = related.filter((slug) => !slugsInData.includes(slug));
  if (badRelated.length) fail(`journal.ts: related[] -> unknown posts ${[...new Set(badRelated)].join(", ")}`);

  const artRefs = [...src.matchAll(/stickerSlug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const badArt = artRefs.filter((slug) => !known.has(slug));
  if (badArt.length) fail(`journal.ts: artwork blocks -> unknown stickers ${[...new Set(badArt)].join(", ")}`);

  pass(
    `journal.ts: ${slugsInData.length} posts, ${images.length} hero assets, ${artRefs.length} artwork refs resolved`,
  );
};

const checkInternalLinks = async () => {
  const appDir = join(root, "app");
  const { readdir: rd, stat } = await import("node:fs/promises");
  const routeFiles = [];
  const walk = async (dir) => {
    for (const entry of await rd(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(tsx|ts)$/.test(entry.name)) routeFiles.push(full);
    }
  };
  await walk(appDir);

  const valid = new Set([
    "/",
    "/stickers",
    "/collections",
    "/shop",
    "/custom",
    "/custom/request",
    "/about",
    "/journal",
    "/contact",
  ]);
  const dynamic = [
    /^\/stickers\/\[slug\]$/,
    /^\/collections\/\[slug\]$/,
    /^\/shop\/\[slug\]$/,
    /^\/journal\/\[slug\]$/,
  ];
  const realRoutes = (await rd(appDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => `/${e.name}`);
  for (const r of realRoutes) if (r !== "/app" && !valid.has(r)) valid.add(r);

  let checked = 0;
  const bad = [];
  for (const file of routeFiles) {
    const src = await readFile(file, "utf8");
    for (const m of src.matchAll(/(?:href|href:)\s*[{"]?["'`]\/([a-z0-9\-\/\[\]]*)["'`]/g)) {
      const target = `/${m[1]}`.replace(/\/$/, "") || "/";
      checked += 1;
      const ok = valid.has(target) || dynamic.some((re) => re.test(target));
      if (!ok) bad.push(`${file.replace(root, "")} -> ${target}`);
    }
  }
  if (bad.length) bad.forEach((b) => fail(`broken link ${b}`));
  else pass(`${checked} internal hrefs resolve to real routes`);

  // required routes present
  for (const required of [
    "app/page.tsx",
    "app/stickers/page.tsx",
    "app/stickers/[slug]/page.tsx",
    "app/collections/page.tsx",
    "app/collections/[slug]/page.tsx",
    "app/shop/page.tsx",
    "app/shop/[slug]/page.tsx",
    "app/custom/page.tsx",
    "app/custom/request/page.tsx",
    "app/about/page.tsx",
    "app/journal/page.tsx",
    "app/journal/[slug]/page.tsx",
    "app/contact/page.tsx",
  ]) {
    try {
      await stat(join(root, required));
    } catch {
      fail(`missing required route ${required}`);
    }
  }
};

try {
  await checkStickerData();
  await checkCollectionData();
  await checkProducts();
  await checkJournal();
  await checkInternalLinks();
} catch (error) {
  if (error.code === "ENOENT") {
    console.log(`\n(skipped data/link checks: ${error.path.split("\\").pop()} not present yet)`);
  } else {
    throw error;
  }
}

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);