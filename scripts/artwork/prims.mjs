/**
 * Artwork primitives.
 *
 * Every asset is a die-cut vinyl sticker: a white paper base, a soft drop
 * shadow and transparent corners. All illustrations are flat vector scenes
 * drawn on a 400px-wide grid so the whole set stays visually consistent.
 */

export const P = {
  ink: "#1A1614",
  paper: "#FFFFFF",
  cream: "#FBF7F1",
  sand: "#EADCBE",
  stone: "#DED6C8",
  grey: "#B6AEA0",
  night: "#2C3A57",
  nightDeep: "#1E2941",
  red: "#C8402F",
  redDark: "#9E2F22",
  coral: "#E8734B",
  coralLight: "#F0A184",
  mustard: "#E7A63A",
  lemon: "#F5CE63",
  teal: "#2E7C73",
  tealLight: "#74B5AA",
  tealDark: "#1E5851",
  sky: "#BEDAE7",
  skyLight: "#E2F0F6",
  skyDeep: "#88BBD1",
  sage: "#A9C0A2",
  sageDark: "#7C9B79",
  plum: "#7C4B62",
  plumLight: "#A9788B",
  brown: "#8C5B3C",
  brownDark: "#6A412A",
  brownLight: "#B07E58",
  gold: "#C9A227",
  goldLight: "#E8CE72",
};

export const n = (v) => Math.round(v * 100) / 100;

/** White "sticker separation" stroke, painted behind the fill. */
export const so = (width = 7, colour = P.paper) =>
  `stroke="${colour}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round" paint-order="stroke"`;

export const rect = (x, y, w, h, fill, rx = 0, extra = "") =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${rx}" fill="${fill}" ${extra}/>`;

export const circ = (cx, cy, r, fill, extra = "") =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}" ${extra}/>`;

export const ell = (cx, cy, rx, ry, fill, extra = "") =>
  `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}" ${extra}/>`;

export const path = (d, fill, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;

export const stroke = (d, colour, width, extra = "") =>
  `<path d="${d}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

export const line = (x1, y1, x2, y2, colour, width, extra = "") =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${colour}" stroke-width="${n(
    width,
  )}" stroke-linecap="round" ${extra}/>`;

export const poly = (points, fill, extra = "") =>
  `<polygon points="${points
    .map(([x, y]) => `${n(x)},${n(y)}`)
    .join(" ")}" fill="${fill}" ${extra}/>`;

export const text = (str, x, y, size, fill, extra = "") =>
  `<text x="${n(x)}" y="${n(y)}" font-family="'Trebuchet MS','Segoe UI',Verdana,sans-serif" font-size="${n(
    size,
  )}" font-weight="700" fill="${fill}" text-anchor="middle" ${extra}>${str}</text>`;

/* ------------------------------------------------------------------ *
 * Scene building blocks
 * ------------------------------------------------------------------ */

export const skyWash = (w, h, top = P.skyLight, bottom = P.sky, id) =>
  rect(
    0,
    0,
    w,
    h,
    `url(#sky${id})`,
    0,
  ) +
  `<linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>`;

/** Vertical gradient wash that fills the whole canvas. */
export const gradWash = (id, stops, w, h) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops
    .map(([offset, colour]) => `<stop offset="${offset}" stop-color="${colour}"/>`)
    .join("")}</linearGradient>` + rect(0, 0, w, h, `url(#${id})`);

export const sun = (cx, cy, r, fill = P.mustard, rays = 0) =>
  circ(cx, cy, r, fill) +
  (rays
    ? Array.from({ length: rays }, (_, i) => {
        const a = (Math.PI * 2 * i) / rays;
        const x1 = cx + Math.cos(a) * (r + 10);
        const y1 = cy + Math.sin(a) * (r + 10);
        const x2 = cx + Math.cos(a) * (r + 22);
        const y2 = cy + Math.sin(a) * (r + 22);
        return line(x1, y1, x2, y2, fill, 6);
      }).join("")
    : "");

export const cloud = (cx, cy, s, fill = P.paper, opacity = 1) =>
  `<g opacity="${opacity}" transform="translate(${n(cx)} ${n(cy)}) scale(${s})">` +
  ell(0, 0, 34, 20, fill) +
  ell(24, 6, 24, 14, fill) +
  ell(-26, 7, 22, 12, fill) +
  rect(-34, 0, 68, 20, fill, 10) +
  `</g>`;

export const windowGrid = (x, y, cols, rows, size, gap, fill, opacity = 1) => {
  let out = "";
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      out += rect(x + c * (size + gap), y + r * (size * 1.5 + gap), size, size * 1.5, fill, 2, `opacity="${opacity}"`);
    }
  }
  return out;
};

export const tree = (x, y, s = 1, trunk = P.brownDark, leaf = P.sage, flip = false) =>
  `<g transform="translate(${n(x)} ${n(y)}) scale(${flip ? -s : s} ${s})">` +
  rect(-6, -34, 12, 40, trunk, 5) +
  circ(0, -54, 26, leaf) +
  circ(-22, -38, 18, leaf) +
  circ(22, -40, 17, leaf) +
  `</g>`;

export const bush = (x, y, s = 1, fill = P.sage) =>
  `<g transform="translate(${n(x)} ${n(y)}) scale(${s})">` +
  ell(0, 0, 30, 18, fill) +
  ell(-22, 6, 18, 12, fill) +
  ell(22, 6, 17, 11, fill) +
  `</g>`;

export const spark = (x, y, s = 1, fill = P.lemon) =>
  path(
    `M${n(x)} ${n(y - 14 * s)} Q${n(x + 3 * s)} ${n(y - 3 * s)} ${n(x + 14 * s)} ${n(y)} Q${n(
      x + 3 * s,
    )} ${n(y + 3 * s)} ${n(x)} ${n(y + 14 * s)} Q${n(x - 3 * s)} ${n(y + 3 * s)} ${n(x - 14 * s)} ${n(
      y,
    )} Q${n(x - 3 * s)} ${n(y - 3 * s)} ${n(x)} ${n(y - 14 * s)} Z`,
    fill,
  );

export const confetti = (w, h, colours) => {
  let out = "";
  const spots = [
    [0.14, 0.1, -18],
    [0.82, 0.14, 22],
    [0.24, 0.78, 12],
    [0.72, 0.7, -24],
    [0.5, 0.06, 8],
    [0.9, 0.46, -12],
    [0.08, 0.48, 26],
    [0.62, 0.9, 16],
  ];
  spots.forEach(([px, py, rot], i) => {
    const colour = colours[i % colours.length];
    out += rect(px * w - 6, py * h - 3, 13, 7, colour, 3, `transform="rotate(${rot} ${n(px * w)} ${n(py * h)})"`);
  });
  return out;
};

/** Cute character: head, hair, blush, body. Origin = top of the head. */
export const character = ({
  x = 0,
  y = 0,
  s = 1,
  skin = "#E9B98F",
  hair = P.ink,
  hairStyle = "short",
  body = P.teal,
  legs = P.night,
  flip = false,
}) => {
  const styles = {
    short: circ(0, -6, 33, hair) + path(`M-33 -8 A33 33 0 0 1 33 -8 L33 -14 A33 33 0 0 0 -33 -14 Z`, hair),
    bob: circ(0, -6, 36, hair) + rect(-36, -8, 72, 40, hair, 16),
    bun: circ(0, -40, 12, hair) + circ(0, -6, 33, hair),
    cap: circ(0, -8, 33, hair) + path(`M-34 -18 A34 34 0 0 1 34 -18 Z`, P.coral) + rect(6, -22, 34, 8, P.red, 4),
    turban: path(`M-35 -10 A35 30 0 0 1 35 -10 Z`, P.mustard) + circ(0, -34, 8, P.coral),
    long: circ(0, -6, 35, hair) + rect(-35, -6, 70, 62, hair, 18),
  };
  const chosen = styles[hairStyle] ?? styles.short;
  return (
    `<g transform="translate(${n(x)} ${n(y)}) scale(${flip ? -s : s} ${s})">` +
    // legs
    rect(-19, 58, 15, 30, legs, 7) +
    rect(5, 58, 15, 30, legs, 7) +
    rect(-24, 84, 22, 12, P.ink, 6) +
    rect(3, 84, 22, 12, P.ink, 6) +
    // body
    path("M-30 34 Q-30 16 0 16 Q30 16 30 34 L30 62 Q0 70 -30 62 Z", body) +
    // head
    circ(0, -6, 33, skin) +
    chosen +
    // face
    circ(-12, -4, 3.6, P.ink) +
    circ(12, -4, 3.6, P.ink) +
    ell(-21, 6, 6, 4, P.coralLight, 'opacity="0.75"') +
    ell(21, 6, 6, 4, P.coralLight, 'opacity="0.75"') +
    stroke("M-7 8 Q0 14 7 8", P.ink, 2.6) +
    `</g>`
  );
};

export const sparkleDust = (w, h, fill = P.paper, opacity = 0.5) =>
  `<g opacity="${opacity}">` +
  circ(w * 0.12, h * 0.16, 3, fill) +
  circ(w * 0.86, h * 0.1, 2.4, fill) +
  circ(w * 0.92, h * 0.62, 3, fill) +
  circ(w * 0.2, h * 0.86, 2.6, fill) +
  `</g>`;