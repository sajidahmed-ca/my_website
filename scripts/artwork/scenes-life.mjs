/** Travel, lifestyle and people scenes. */
import {
  P,
  so,
  rect,
  circ,
  ell,
  path,
  stroke,
  line,
  text,
  sun,
  cloud,
  tree,
  character,
  spark,
  confetti,
  bush,
  gradWash,
  n,
} from "./prims.mjs";
import { skyline } from "./scenes-cities.mjs";

const W = 400;

export const backpack = () => {
  let out = gradWash("bp", [["0", "#DCEBF0"], ["1", "#C6DEE6"]], W, W);
  out += cloud(84, 80, 0.7, P.paper, 0.8);
  out += sun(324, 70, 26, P.lemon);
  out += path("M0 336 q100 -46 200 0 q100 44 200 -10 v74 h-400 Z", P.sage);
  out += tree(52, 340, 0.5, P.brownDark, P.sageDark);
  out += tree(350, 346, 0.42, P.brownDark, P.sageDark);
  // pack
  out += path("M140 168 q0 -34 60 -34 q60 0 60 34 v150 q0 26 -26 26 h-68 q-26 0 -26 -26 Z", P.coral, so(9));
  out += path("M170 140 q0 -22 30 -22 q30 0 30 22", "none");
  out += stroke("M172 142 q28 -26 56 0", P.redDark, 9);
  out += rect(146, 214, 108, 74, P.redDark, 12, so(7));
  out += rect(154, 222, 92, 24, P.paper, 6);
  out += rect(160, 300, 80, 14, P.redDark, 6);
  out += circ(200, 200, 8, P.lemon);
  out += path("M126 200 q-22 22 -12 54", "none");
  out += stroke("M130 196 q-30 28 -14 66", P.brown, 9);
  out += path("M140 340 q-2 24 14 34 h-28 q-10 -14 -6 -34 Z", P.brown, so(5));
  out += path("M260 340 q2 24 -14 34 h28 q10 -14 6 -34 Z", P.brown, so(5));
  // travel stickers on the pocket
  out += circ(168, 234, 9, P.lemon);
  out += circ(196, 234, 9, P.teal);
  out += rect(220, 226, 18, 16, P.skyDeep, 3);
  out += spark(318, 210, 1.2, P.mustard);
  out += spark(90, 250, 0.9, P.red);
  return out;
};

export const cameraMap = () => {
  let out = rect(0, 0, W, W, "#F2EDE2");
  // folded map
  out += path("M36 232 L134 200 L200 226 L266 194 L364 226 L364 348 L266 316 L200 348 L134 320 L36 350 Z", "#EFE4CE", so(8));
  out += stroke("M134 200 L134 320 M200 226 L200 348 M266 194 L266 316", "#D6C6A6", 3);
  out += path("M60 268 q34 -20 62 0", P.teal, so(5));
  out += path("M212 296 q34 -22 62 0", P.sage, so(5));
  out += path("M40 200 q26 -22 52 -4 q22 -18 46 2", "none");
  out += stroke("M40 206 q28 -24 54 -6 q24 -20 48 2", P.sageDark, 4);
  out += circ(320, 268, 14, P.red, so(5));
  out += circ(320, 268, 6, P.paper);
  // camera
  out += rect(92, 84, 216, 138, P.ink, 22, so(9));
  out += rect(126, 62, 76, 26, P.ink, 8, so(8));
  out += circ(200, 154, 56, P.paper, so(8));
  out += circ(200, 154, 42, "#5E93A8", so(6));
  out += circ(200, 154, 22, "#2B3A55");
  out += circ(186, 140, 9, P.paper, 'opacity="0.75"');
  out += circ(278, 108, 11, P.red, so(5));
  out += rect(112, 198, 44, 12, P.paper, 4, 'opacity="0.28"');
  out += circ(56, 84, 12, P.mustard, so(5));
  out += path("M318 178 l30 -46 l8 8 l-30 46 Z", P.teal, so(5));
  out += path("M348 132 l16 -6 l-4 18 Z", P.coral, so(5));
  return out;
};

export const paperPlane = () => {
  let out = gradWash("pp", [["0", "#E7F0F3"], ["1", "#CFE4EC"]], W, W);
  out += cloud(96, 96, 0.8, P.paper, 0.9);
  out += cloud(320, 200, 0.55, P.paper, 0.6);
  out += cloud(70, 260, 0.5, P.paper, 0.5);
  out += stroke("M60 350 q70 -30 140 -60 t120 -50", P.paper, 6, 'opacity="0.7" stroke-dasharray="4 16"');
  out += stroke("M60 350 q70 -30 140 -60 t120 -50", P.tealLight, 4, 'stroke-dasharray="2 16"');
  out += path("M120 168 L342 96 L246 306 L206 218 Z", P.paper, so(9));
  out += path("M120 168 L246 306 L342 96 L204 210 Z", "#F1EDE4");
  out += path("M120 168 L342 96 L206 214 Z", "#E4DED2");
  out += path("M246 306 L206 214 L342 96 Z", "#DCD5C6");
  out += stroke("M206 214 L342 96", "#C9C1AF", 3);
  out += sun(320, 84, 24, P.lemon);
  out += spark(78, 130, 1.1, P.mustard);
  return out;
};

export const suitcase = () => {
  let out = rect(0, 0, W, W, "#EFE9DD");
  out += circ(200, 200, 146, "#E4DCCC");
  out += rect(96, 150, 208, 200, P.brown, 20, so(9));
  out += rect(96, 150, 208, 44, P.brownLight, 20, so(9));
  out += rect(96, 216, 208, 12, P.brownDark);
  out += rect(180, 118, 40, 40, "none", 14, `stroke="${P.brownDark}" stroke-width="12"`);
  out += circ(150, 300, 12, P.lemon, so(5));
  out += circ(252, 300, 12, P.lemon, so(5));
  out += rect(110, 258, 180, 20, P.paper, 6, so(6));
  out += text("STICKERS", 200, 273, 15, P.brownDark);
  // luggage tag
  out += path("M282 128 l44 -18 l22 54 l-44 18 Z", P.lemon, so(6));
  out += circ(298, 128, 5, P.brownDark);
  out += text("01", 316, 138, 15, P.brownDark);
  // stickers
  out += circ(140, 196, 17, P.teal, so(5));
  out += path("M218 190 l16 16 l26 -30", "none");
  out += stroke("M216 192 l18 18 l28 -32", P.red, 7);
  out += circ(300, 340, 22, P.paper, so(6));
  out += circ(300, 340, 13, P.coral);
  out += path("M60 350 q26 -20 52 0", P.sageDark, so(5));
  out += spark(78, 100, 1.2, P.mustard);
  return out;
};

export const passportStamps = () => {
  let out = rect(0, 0, W, W, "#E9EEF1");
  out += circ(316, 92, 30, P.lemon);
  // passport
  out += rect(74, 96, 190, 250, P.tealDark, 14, so(9));
  out += rect(92, 116, 154, 210, "none", 8, `stroke="${P.teal}" stroke-width="3"`);
  out += circ(169, 200, 42, P.gold, 'opacity="0.9"');
  out += circ(169, 200, 30, "none", `stroke="${P.tealDark}" stroke-width="3"`);
  out += path("M150 200 l14 14 l26 -30", "none");
  out += stroke("M150 200 l14 14 l26 -30", P.tealDark, 6);
  out += text("PASSPORT", 169, 276, 17, P.goldLight);
  out += text("WORLD TRAVEL", 169, 298, 11, P.teal);
  // stamps
  const stamp = (x, y, s, rot, colour, label) =>
    `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-42" y="-20" width="84" height="40" fill="none" stroke="${colour}" stroke-width="4" rx="4"/><text x="0" y="6" font-family="'Trebuchet MS',Verdana,sans-serif" font-size="17" font-weight="700" fill="${colour}" text-anchor="middle">${label}</text></g>`;
  out += stamp(300, 176, 1, -10, P.red, "NYC");
  out += stamp(300, 240, 0.92, 8, P.plum, "PARIS");
  out += stamp(298, 302, 0.84, -6, P.tealDark, "TOKYO");
  out += stamp(126, 62, 0.7, -6, P.brownDark, "2026");
  out += path("M300 128 q26 -14 46 2", "none");
  out += stroke("M302 126 q26 -14 46 2", P.sageDark, 4, 'stroke-dasharray="6 8"');
  return out;
};

export const campTent = () => {
  let out = rect(0, 0, W, W, "#25304C");
  out += circ(304, 88, 34, "#F5E6C8");
  out += circ(292, 78, 30, "#25304C");
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => {
    out += circ(((i * 83) % 380) + 12, ((i * 149) % 240) + 20, i % 3 === 0 ? 3.4 : 2.2, "#EFE3C8", 'opacity="0.9"');
  });
  out += spark(70, 108, 1.2, "#F5E6C8");
  out += spark(348, 200, 0.9, "#F5E6C8");
  out += path("M0 340 l70 -140 l60 140 Z", "#2E5A4E");
  out += path("M110 340 l80 -180 l84 180 Z", "#2E5A4E");
  out += path("M280 340 l60 -130 l56 130 Z", "#2E5A4E");
  // pines
  out += path("M40 342 q6 -30 22 -6 q6 22 -8 30 Z", "#245044");
  out += path("M356 344 q6 -28 20 -6 q6 20 -6 28 Z", "#245044");
  // tent
  out += path("M118 348 L200 176 L282 348 Z", P.coral, so(9));
  out += path("M200 176 L282 348 L216 348 Z", P.redDark);
  out += path("M200 176 L216 348 L200 348 L170 348 Z", "#F4EFE2");
  out += rect(112, 340, 176, 18, P.paper, 6, so(6));
  out += stroke("M108 366 L188 208", P.paper, 4);
  out += stroke("M292 366 L214 208", P.paper, 4);
  out += circ(340, 306, 12, P.lemon);
  out += path("M334 300 l12 -8 l-4 16 Z", P.mustard);
  out += text("CAMP", 200, 384, 18, "#EFE3C8", 'opacity="0.8"');
  return out;
};

export const coffeeCup = () => {
  let out = rect(0, 0, W, W, "#F1E9DB");
  out += circ(200, 200, 142, "#E5D9C4");
  out += ell(200, 320, 150, 24, "#D6C6AC", 'opacity="0.6"');
  out += stroke("M172 148 q-14 -24 4 -42 q14 -14 4 -32", P.grey, 6, 'opacity="0.65"');
  out += stroke("M212 140 q-14 -24 4 -42 q14 -14 4 -32", P.grey, 6, 'opacity="0.65"');
  out += path("M126 172 h148 l-16 128 q-4 22 -26 22 h-64 q-22 0 -26 -22 Z", P.paper, so(9));
  out += path("M124 172 h152 l-6 34 h-140 Z", P.red, so(7));
  out += path("M138 218 h124 l-10 84 q-3 14 -18 14 h-68 q-15 0 -18 -14 Z", P.brown, 'opacity="0.35"');
  out += text("CITY", 200, 300, 30, P.brown);
  out += text("ROASTERS", 200, 320, 13, P.brownDark);
  out += ell(200, 172, 74, 16, "#F6F0E4", so(7));
  out += ell(200, 172, 60, 11, "#6B4632");
  out += path("M274 196 q44 6 34 42 q-8 32 -42 26", "none");
  out += stroke("M272 194 q48 6 38 44 q-8 34 -44 30", P.paper, 17);
  out += stroke("M272 194 q48 6 38 44 q-8 34 -44 30", P.stone, 11);
  out += ell(84, 300, 22, 14, "#7A4B2E");
  out += stroke("M84 286 v28", "#5E3820", 3);
  out += ell(322, 258, 20, 13, "#7A4B2E");
  out += stroke("M322 245 v26", "#5E3820", 3);
  out += spark(320, 120, 1.1, P.mustard);
  return out;
};

export const bicycleBasket = () => {
  let out = rect(0, 0, W, 340, "#E4EFE9");
  out += sun(72, 66, 28, P.lemon);
  out += rect(0, 128, W, 212, P.sage);
  out += path("M0 236 q100 -30 200 0 q100 30 200 -6 v110 h-400 Z", "#8FAF8C");
  out += tree(344, 250, 0.5, P.brownDark, P.sageDark);
  out += bush(46, 252, 1.1, P.sageDark);
  // bike
  out += circ(122, 268, 46, "none", `stroke="${P.ink}" stroke-width="10"`);
  out += circ(292, 268, 46, "none", `stroke="${P.ink}" stroke-width="10"`);
  out += circ(122, 268, 8, P.stone);
  out += circ(292, 268, 8, P.stone);
  out += stroke("M122 268 L200 168 L292 268 L122 268 M200 168 L228 168", P.ink, 9);
  out += rect(190, 154, 40, 18, P.red, 7, so(6));
  out += stroke("M292 268 L266 176", P.ink, 8);
  out += line(252, 172, 288, 166, P.ink, 8);
  // basket
  out += path("M148 122 L264 122 L250 186 L162 186 Z", "#C08A4E", so(8));
  [0, 1, 2, 3].forEach((i) => out += line(158 + i * 28, 126, 168 + i * 28, 184, "#A0703C", 3));
  out += rect(146, 112, 120, 16, "#A0703C", 6, so(6));
  out += circ(178, 112, 16, P.coral, so(6));
  out += circ(212, 110, 14, P.lemon, so(6));
  out += circ(244, 114, 12, P.plumLight, so(6));
  out += path("M168 112 q6 -18 18 -12", "none");
  out += stroke("M168 114 q4 -20 20 -14", P.sageDark, 5);
  out += circ(320, 176, 18, P.teal);
  out += stroke("M310 168 h20 M320 158 v20", P.paper, 6);
  return out;
};

export const bookPlant = () => {
  let out = rect(0, 0, W, W, "#F0EADF");
  out += rect(0, 300, W, 100, "#DED5C4");
  out += rect(0, 300, W, 8, "#CEC4B0");
  // plant
  out += path("M276 300 h84 l-10 66 h-64 Z", P.coral, so(8));
  out += rect(270, 288, 96, 18, "#E58A63", 8, so(7));
  out += stroke("M318 288 q-4 -70 -34 -96", P.sageDark, 7);
  out += stroke("M318 288 q6 -62 34 -84", P.sageDark, 7);
  out += stroke("M318 288 v-104", P.sageDark, 7);
  out += ell(288, 206, 20, 12, P.sage, `transform="rotate(-30 288 206)"`);
  out += ell(352, 216, 20, 12, P.sage, `transform="rotate(28 352 216)"`);
  out += ell(318, 172, 14, 22, P.sageDark);
  // books
  const book = (x, y, w, h, colour, spine) =>
    rect(x, y, w, h, colour, 6, so(7)) + rect(x, y, 14, h, spine, 6, so(7)) + rect(x + 22, y + h / 2 - 3, w - 40, 5, P.paper, 2, 'opacity="0.75"');
  out += book(58, 262, 172, 34, P.teal, P.tealDark);
  out += book(66, 230, 156, 32, P.mustard, "#C08A24");
  out += book(58, 200, 168, 30, P.red, P.redDark);
  out += circ(122, 190, 16, P.paper, so(5));
  out += stroke("M122 180 v12 M122 198 v1", P.red, 3);
  out += circ(200, 366, 26, P.teal, so(6));
  out += circ(200, 366, 15, P.tealLight);
  out += path("M120 366 q-16 -22 4 -34 q10 16 20 8 q12 12 -2 26 Z", P.sage, so(5));
  out += spark(96, 120, 1.2, P.mustard);
  return out;
};

export const recordPlayer = () => {
  let out = rect(0, 0, W, W, "#F2ECE0");
  out += circ(200, 200, 146, "#E6DDCA");
  out += rect(58, 152, 284, 152, P.brownDark, 18, so(9));
  out += rect(70, 164, 260, 128, "#3B3129", 12);
  out += circ(176, 228, 56, P.ink);
  [0, 1, 2, 3].forEach((i) => out += circ(176, 228, 50 - i * 11, "none", `stroke="#4A403A" stroke-width="2"`));
  out += circ(176, 228, 15, P.red);
  out += circ(176, 228, 4, P.paper);
  out += stroke("M212 190 L300 168 L306 178 L218 200 Z", P.stone, 4);
  out += circ(306, 176, 9, P.coral, so(4));
  out += circ(266, 292, 12, P.mustard);
  out += circ(306, 292, 12, P.lemon);
  out += path("M96 108 q30 -30 62 -6 q22 -22 46 4", "none");
  out += stroke("M96 108 q30 -30 62 -6 q22 -22 46 4", P.plum, 5);
  out += circ(226, 82, 9, P.plum);
  out += rect(258, 68, 8, 22, P.plum, 4);
  out += rect(284, 74, 8, 16, P.plum, 4);
  out += path("M60 350 q26 -20 52 0 q26 20 52 0", P.teal, so(5));
  out += spark(340, 120, 1.1, P.mustard);
  return out;
};

export const catWindowsill = () => {
  let out = rect(0, 0, W, W, "#243050");
  out += circ(300, 96, 40, "#F3E7C8");
  out += circ(312, 86, 34, "#243050");
  [0, 1, 2, 3, 4, 5].forEach((i) => out += circ(((i * 71) % 380) + 20, ((i * 131) % 200) + 24, i % 2 ? 2.4 : 3.2, "#EFE3C8"));
  // window frame
  out += rect(38, 30, 324, 250, "#3A4A72", 14);
  out += rect(52, 44, 296, 222, "#2A3757", 6);
  out += rect(192, 44, 16, 222, "#3A4A72");
  out += rect(52, 148, 296, 14, "#3A4A72");
  // cat
  out += path("M118 280 q0 -54 54 -54 q54 0 54 54 Z", P.ink, so(7));
  out += circ(172, 226, 34, P.ink, so(7));
  out += path("M148 206 l-6 -30 l28 18 Z", P.ink, so(6));
  out += path("M196 206 l6 -30 l-28 18 Z", P.ink, so(6));
  out += circ(162, 226, 4, P.lemon);
  out += circ(184, 226, 4, P.lemon);
  out += path("M168 236 h8 l-4 5 Z", P.coralLight);
  out += stroke("M140 236 q-14 2 -20 -4 M140 242 q-14 8 -22 4 M204 236 q14 2 20 -4 M204 242 q14 8 22 4", P.paper, 2.4, 'opacity="0.8"');
  out += path("M226 268 q34 -4 40 -28", "none");
  out += stroke("M228 270 q36 -6 42 -32", P.ink, 12);
  out += rect(28, 282, 344, 26, "#B0895F", 8, so(7));
  out += rect(60, 308, 44, 42, "#8E6B48", 6, so(6));
  out += path("M70 350 q14 -26 28 0 Z", P.sage, so(5));
  out += path("M300 348 q10 -30 22 -6 q8 20 -4 28 Z", P.sageDark, so(5));
  out += circ(312, 330, 12, P.coral, so(5));
  return out;
};

export const flowerBouquet = () => {
  let out = rect(0, 0, W, W, "#F3EDE1");
  out += circ(200, 200, 146, "#E7DCC6");
  out += path("M176 250 q-14 60 -10 90 M212 250 q14 60 10 90", "none");
  out += stroke("M178 252 q-12 56 -8 88 M214 252 q12 56 8 88", P.sageDark, 6);
  out += path("M150 180 l70 90 M250 180 l-70 90", "none");
  out += stroke("M152 182 l70 88 M248 182 l-70 88", P.sageDark, 7);
  out += path("M168 330 h64 l-10 46 h-44 Z", P.paper, so(8));
  out += path("M162 322 h76 l-4 16 h-68 Z", P.red, so(7));
  const bloom = (x, y, r, petals, c1, c2) =>
    `<g transform="translate(${x} ${y})">` +
    Array.from({ length: petals }, (_, i) => {
      const a = (Math.PI * 2 * i) / petals;
      return ell(Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62, r * 0.44, r * 0.32, c1, `transform="rotate(${n(
        (a * 180) / Math.PI,
      )} ${n(Math.cos(a) * r * 0.62)} ${n(Math.sin(a) * r * 0.62)})"`);
    }).join("") +
    circ(0, 0, r * 0.42, c2) +
    `</g>`;
  out += bloom(150, 168, 40, 6, P.coral, P.lemon);
  out += bloom(248, 162, 36, 6, P.lemon, P.mustard);
  out += bloom(200, 132, 34, 5, P.plumLight, P.paper);
  out += bloom(200, 214, 30, 6, P.tealLight, P.paper);
  out += path("M104 214 q30 -10 52 12 q-28 10 -52 -12 Z", P.sage, so(5));
  out += path("M296 216 q-30 -8 -50 16 q28 8 50 -16 Z", P.sage, so(5));
  out += spark(84, 108, 1.1, P.mustard);
  out += spark(330, 300, 0.9, P.teal);
  return out;
};

export const rooftopTerrace = () => {
  let out = rect(0, 0, W, 250, "#F3E0D0");
  out += circ(320, 76, 32, P.lemon);
  out += rect(0, 108, W, 142, "#E9D3C2");
  out += rect(0, 170, W, 80, "#DCC0AD");
  out += rect(0, 234, W, 16, "#CBAA95");
  // string lights
  out += stroke("M0 62 q100 40 200 0 q100 40 200 0", P.brownDark, 3);
  [0, 1, 2, 3, 4, 5].forEach((i) => {
    const t = (i + 0.5) / 6;
    const x = t * W;
    const y = 62 + Math.sin(Math.PI * t) * 32;
    out += line(x, y, x, y + 10, P.brownDark, 2);
    out += circ(x, y + 16, 7, i % 2 ? P.lemon : P.coral);
  });
  // planters
  out += rect(30, 214, 62, 40, P.teal, 8, so(6));
  out += path("M40 214 q6 -34 20 -14 q10 -22 22 14 Z", P.sage, so(5));
  out += rect(312, 222, 58, 36, P.coral, 8, so(6));
  out += path("M322 222 q6 -30 18 -12 q10 -20 20 12 Z", P.sageDark, so(5));
  // bench + characters
  out += rect(148, 240, 108, 16, P.brown, 5, so(6));
  out += rect(156, 256, 10, 26, P.brownDark);
  out += rect(238, 256, 10, 26, P.brownDark);
  out += character({ x: 168, y: 190, s: 0.56, hairStyle: "bob", body: P.red, hair: "#3A2A22", legs: P.night });
  out += character({ x: 238, y: 190, s: 0.56, hairStyle: "short", body: P.teal, skin: "#C98F5F", hair: "#2A211C", legs: P.night, flip: true });
  out += rect(0, 300, W, 100, "#C0A08C");
  out += rect(0, 300, W, 8, "#B08F79");
  out += circ(84, 344, 18, P.teal, so(5));
  out += circ(318, 352, 14, P.mustard, so(5));
  return out;
};

export const streetMusician = () => {
  let out = rect(0, 0, W, 330, "#E9DFCE");
  out += rect(0, 92, W, 150, "#DCCFBB");
  out += rect(0, 238, W, 92, "#C9BCA6");
  out += rect(0, 238, W, 7, "#B7A992");
  out += rect(20, 40, 130, 130, P.paper, 8, so(6));
  out += text("OPEN", 85, 96, 26, P.red);
  out += stroke("M28 116 h114", P.red, 4);
  // guitar
  out += `<g transform="translate(96 208) rotate(-16)">` +
    circ(0, 24, 46, P.brown, so(8)) +
    circ(0, 24, 22, "#5E3820") +
    circ(0, 24, 16, "#3A2214") +
    rect(-13, -76, 26, 74, P.brownDark, 8, so(7)) +
    rect(-18, -104, 36, 30, "#3A2A20", 6, so(6)) +
    line(0, -104, 0, -116, "#3A2A20", 6) +
    line(-8, -116, 8, -116, "#3A2A20", 6) +
    `</g>`;
  out += character({ x: 156, y: 152, s: 0.86, hairStyle: "long", body: P.teal, hair: "#2F2620", skin: "#DBA97C" });
  out += path("M186 190 q-22 26 -34 34", "none");
  out += stroke("M188 192 q-24 28 -36 34", P.teal, 14);
  out += rect(0, 330, W, 70, "#B7A992");
  out += rect(28, 356, 90, 8, P.paper, 4, 'opacity="0.4"');
  out += circ(320, 300, 22, P.paper, so(6));
  out += rect(306, 296, 28, 8, P.lemon, 3);
  return out;
};

export const girlWithCamera = () => {
  let out = gradWash("gc", [["0", "#F6E9DC"], ["1", "#EBD7C8"]], W, W);
  out += sun(70, 74, 30);
  out += rect(0, 286, W, 114, "#BFA894");
  out += rect(0, 286, W, 8, "#AE9781");
  out += character({ x: 200, y: 200, s: 1.05, hairStyle: "bob", body: P.red, hair: "#3A2A22", skin: "#E9B98F", legs: P.night });
  // camera in hands
  out += rect(150, 258, 100, 62, P.ink, 14, so(8));
  out += circ(200, 289, 22, "#5E93A8", so(5));
  out += circ(200, 289, 9, "#2B3A55");
  out += circ(232, 272, 7, P.coral, so(4));
  out += rect(174, 246, 34, 14, P.ink, 5, so(6));
  out += circ(146, 296, 12, "#E9B98F", so(6));
  out += circ(254, 296, 12, "#E9B98F", so(6));
  out += rect(118, 130, 164, 16, P.red, 8, so(6));
  out += spark(300, 180, 1.2, P.mustard);
  out += spark(96, 214, 0.9, P.teal);
  return out;
};

export const scooterRider = () => {
  let out = rect(0, 0, W, 260, "#DCEAF0");
  out += cloud(310, 66, 0.7, P.paper, 0.85);
  out += rect(0, 108, W, 152, "#D3DCD6");
  out += rect(0, 226, W, 174, "#9E9689");
  out += rect(0, 226, W, 8, "#8B8477");
  out += rect(0, 300, W, 100, "#8B8477");
  [0, 1, 2].forEach((i) => out += rect(30 + i * 130, 344, 76, 9, P.paper, 4, 'opacity="0.5"'));
  // scooter
  out += circ(112, 300, 40, P.night, so(8));
  out += circ(112, 300, 14, P.stone);
  out += circ(292, 300, 40, P.night, so(8));
  out += circ(292, 300, 14, P.stone);
  out += path("M112 300 q10 -46 44 -46 h96 q30 0 40 46 Z", P.mustard, so(9));
  out += path("M156 262 h92 q24 0 34 38 h-120 Z", "#C98A24");
  out += rect(96, 232, 76, 16, "#3A2A20", 8, so(7));
  out += stroke("M292 300 L306 224", P.stone, 8);
  out += line(288, 220, 330, 214, P.stone, 9);
  out += circ(316, 226, 10, "#3A2A20", so(5));
  out += character({ x: 210, y: 196, s: 0.72, hairStyle: "cap", body: P.teal, skin: "#C98F5F", hair: "#241C18", legs: P.night });
  out += path("M262 196 q34 -12 52 6", "none");
  out += stroke("M258 194 q40 -16 62 8", P.red, 10);
  out += spark(84, 130, 1.1, P.mustard);
  return out;
};

export const walkingPair = () => {
  let out = gradWash("wp", [["0", "#F4E7D4"], ["1", "#E7D2BE"]], W, W);
  out += sun(320, 72, 32);
  out += rect(0, 300, W, 100, "#C2A98F");
  out += rect(0, 300, W, 8, "#B2987C");
  out += rect(0, 350, W, 50, "#AD9478");
  out += character({ x: 158, y: 214, s: 0.92, hairStyle: "bun", body: P.coral, hair: "#2F2620", skin: "#DBA97C" });
  out += character({ x: 254, y: 214, s: 0.92, hairStyle: "short", body: P.tealDark, skin: "#8A5A3B", hair: "#1F1815", flip: true });
  // arms joined
  out += stroke("M196 268 q22 10 44 -2", "#DBA97C", 13);
  out += stroke("M186 254 q18 12 30 8", P.coral, 12);
  out += path("M60 320 q28 -18 56 0", P.sageDark, so(5));
  out += circ(74, 152, 30, P.paper, so(6));
  out += heart(74, 152, 20, P.red);
  return out;
};

const heart = (x, y, s, colour) =>
  path(
    `M${x} ${y + s * 0.9} C${x - s} ${y} ${x - s * 0.5} ${y - s * 0.9} ${x} ${y - s * 0.25} C${
      x + s * 0.5
    } ${y - s * 0.9} ${x + s} ${y} ${x} ${y + s * 0.9} Z`,
    colour,
  );

export const kidWithKite = () => {
  let out = rect(0, 0, W, 320, "#DCEAF3");
  out += cloud(320, 70, 0.7, P.paper, 0.85);
  out += cloud(84, 220, 0.5, P.paper, 0.6);
  out += path("M0 320 q100 -30 200 4 q100 32 200 -10 v86 h-400 Z", P.sage);
  // kite
  out += path("M244 40 L306 108 L244 176 L182 108 Z", P.coral, so(8));
  out += path("M244 40 L306 108 L244 176 Z", P.redDark);
  out += stroke("M244 40 L244 176 M182 108 L306 108", P.paper, 4, 'opacity="0.85"');
  out += stroke("M244 176 q10 30 -8 50 q18 20 4 44 q20 20 2 40", P.ink, 3);
  [0, 1, 2].forEach((i) => out += path(`M${232 + i * 4} ${232 + i * 44} q22 -8 30 8`, P.mustard, so(4)));
  // character
  out += character({ x: 140, y: 232, s: 0.78, hairStyle: "short", body: P.mustard, skin: "#E9B98F", hair: "#3A2A22", legs: P.night });
  out += stroke("M172 254 q30 -20 60 -34", "#E9B98F", 12);
  out += spark(96, 140, 1.1, P.mustard);
  out += spark(340, 240, 0.9, P.teal);
  return out;
};

export const foilLimited = () => {
  let out = gradWash("fl", [["0", "#F3E2B0"], ["0.45", "#D8B758"], ["0.55", "#F0DCA4"], ["1", "#C9A227"]], W, W);
  out += circ(200, 200, 156, "none", `stroke="#C9A227" stroke-width="6"`);
  out += circ(200, 200, 138, "none", `stroke="#E8CE72" stroke-width="3" stroke-dasharray="6 10"`);
  out += skyline(280, "#B78F26");
  out += circ(200, 132, 30, "#F0DCA4");
  out += path("M156 300 q44 -34 88 0 Z", "#C9A227");
  out += text("LIMITED", 200, 344, 26, "#7A5F12");
  out += text("EDITION", 200, 372, 22, "#7A5F12");
  out += spark(96, 132, 1.3, "#FBF1CE");
  out += spark(312, 168, 1, "#FBF1CE");
  out += spark(84, 300, 1.1, "#FBF1CE");
  return out;
};

export const holoConfetti = () => {
  let out = gradWash("hc", [["0", "#F7C9D6"], ["0.5", "#D9D2F0"], ["1", "#C7E7E0"]], W, W);
  out += confetti(W, W, [P.red, P.lemon, P.teal, P.plum, P.paper]);
  out += circ(200, 200, 118, P.paper, so(9));
  out += circ(200, 200, 104, "none", `stroke="${P.red}" stroke-width="5" stroke-dasharray="10 10"`);
  out += text("2026", 200, 214, 60, P.red);
  out += text("NEW YEAR", 200, 250, 20, P.night);
  out += spark(200, 140, 1.5, P.mustard);
  out += spark(200, 262, 1.2, P.teal);
  return out;
};

export const stickerSheetPack = () => {
  let out = rect(0, 0, W, W, "#F4EFE6");
  out += rect(28, 28, 344, 344, P.paper, 24, so(9));
  out += text("CITY PACK · 12 STICKERS", 200, 62, 15, P.brown);
  const cell = (x, y, draw) => circ(x, y, 42, P.paper, `stroke="${P.stone}" stroke-width="2"`) + `<g transform="translate(${x} ${y}) scale(0.2)">${draw}</g>`;
  const mini = [
    () => path("M-50 40 L-50 -20 L-10 -20 L-10 -60 L10 -60 L10 -20 L50 -20 L50 40 Z", P.mustard),
    () => circ(0, 0, 34, P.teal) + circ(0, 0, 16, P.paper),
    () => path("M-34 30 L0 -34 L34 30 Z", P.coral) + circ(0, 6, 8, P.lemon),
    () => path("M-40 34 v-52 h30 q22 0 22 26 q0 26 -22 26 h-30 Z", P.skyDeep),
    () => circ(-16, -6, 8, P.paper) + circ(16, -6, 8, P.paper) + circ(0, 18, 14, P.red),
    () => path("M-36 20 q36 -40 72 0 Z", P.plum) + circ(0, -8, 20, P.tealLight),
    () => path("M-34 30 L0 -30 L34 30 Z", "#E0A85C"),
    () => circ(0, 0, 30, P.lemon) + rect(-4, -30, 8, 60, P.red),
    () => path("M-30 34 v-56 a10 10 0 0 1 20 0 v56 Z", P.tealDark) + path("M10 34 v-56 a10 10 0 0 1 20 0 v56 Z", P.tealDark),
    () => rect(-30, -30, 60, 60, P.brown, 10) + rect(-14, -30, 28, 60, P.paper),
    () => path("M0 -36 c20 0 34 16 34 32 c0 12 -8 18 -16 26 l-36 0 c-8 -8 -16 -14 -16 -26 c0 -16 14 -32 34 -32 Z", P.plumLight),
    () => path("M-30 20 L0 -26 L30 20 Z", P.sage) + rect(-36, 18, 72, 10, P.brown, 4),
  ];
  mini.forEach((draw, i) => {
    const x = 84 + (i % 3) * 116;
    const y = 122 + Math.floor(i / 3) * 88;
    out += cell(x, y, draw());
  });
  return out;
};

export const miniTrio = () => {
  let out = rect(0, 0, W, W, "#F3EEE4");
  out += circ(200, 200, 150, "#EAE2D2");
  const item = (x, y, s, draw) =>
    circ(x, y, 54, P.paper, so(7)) + `<g transform="translate(${x} ${y}) scale(${s})">${draw}</g>`;
  out += item(132, 146, 0.62, circ(0, 0, 40, P.mustard) + circ(0, 0, 26, "#F5CE63") + rect(-4, -34, 8, 68, P.red));
  out += item(268, 168, 0.62, path("M-38 30 L0 -38 L38 30 Z", P.teal) + path("M-14 4 L0 -14 L14 4 Z", P.paper));
  out += item(200, 282, 0.62, circ(0, 0, 38, P.coral) + circ(-12, -8, 6, P.paper) + circ(12, -8, 6, P.paper) + path("M-12 12 q12 12 24 0 Z", P.paper));
  out += spark(84, 84, 1.1, P.mustard);
  out += spark(330, 300, 1, P.teal);
  return out;
};