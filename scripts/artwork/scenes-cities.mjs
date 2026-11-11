/** City & place scenes. */
import {
  P,
  so,
  rect,
  circ,
  ell,
  path,
  stroke,
  line,
  poly,
  text,
  sun,
  cloud,
  windowGrid,
  tree,
  character,
  gradWash,
  spark,
  n,
} from "./prims.mjs";

const W = 400;

export const skyline = (baseY, fill, seed = 0) => {
  const buildings = [
    [0, 150, 60],
    [58, 190, 52],
    [108, 130, 46],
    [152, 240, 58],
    [208, 175, 48],
    [254, 205, 54],
    [306, 145, 50],
    [354, 175, 46],
  ];
  let out = "";
  buildings.forEach(([x, h, w], i) => {
    const y = baseY - h;
    const r = (i + seed) % 3;
    out += rect(x, y, w, h + 10, fill, r === 0 ? 8 : 0);
    if (r === 1) out += circ(x + w / 2, y, 7, fill);
    if (r === 2) out += rect(x + w / 2 - 3, y - 20, 6, 22, fill, 3);
    out += windowGrid(x + 10, y + 16, w > 50 ? 3 : 2, Math.max(1, Math.floor((h - 30) / 34)), 9, 9, P.lemon, 0.55);
  });
  return out;
};

export const nycSkyline = () => {
  const id = "a";
  let out = rect(0, 0, W, W, `url(#sky${id})`);
  out += `<linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6E7D2"/><stop offset="0.55" stop-color="#F3C9A6"/><stop offset="1" stop-color="#E6A6A0"/></linearGradient>`;
  out += circ(300, 96, 54, P.lemon);
  out += circ(300, 96, 40, "#F9E2A6");
  out += cloud(96, 84, 0.85, P.paper, 0.75);
  out += cloud(330, 210, 0.6, P.paper, 0.5);
  out += skyline(330, "#3A2E3F");
  // Empire State
  out += path("M212 120 L228 120 L236 92 L244 120 L252 120 L256 330 L208 330 Z", "#2B2130");
  out += path("M236 92 L240 62 L244 92 Z", P.lemon);
  out += windowGrid(216, 140, 3, 6, 8, 12, P.lemon, 0.5);
  // Chrysler hint
  out += path("M300 132 L312 116 L324 132 L328 160 L296 160 Z", "#2B2130");
  out += line(312, 116, 312, 100, P.lemon, 5);
  out += rect(0, 330, W, 70, "#2B2130");
  out += rect(0, 330, W, 8, P.coral);
  out += rect(24, 356, 60, 44, "#241C28", 6);
  out += rect(320, 352, 56, 48, "#241C28", 6);
  out += ell(200, 402, 190, 16, "#241C28");
  out += rect(150, 352, 100, 26, P.lemon, 8, so(6));
  out += text("NEW YORK", 200, 371, 20, "#2B2130");
  return out;
};

export const yellowCab = () => {
  let out = rect(0, 0, W, 300, P.skyLight);
  out += sun(318, 66, 34);
  out += rect(0, 96, W, 130, "#E7E2D8");
  out += skyline(226, "#C9C3B6");
  out += rect(0, 226, W, 74, "#B5AFA2");
  out += rect(0, 226, W, 6, P.stone);
  // cab
  out += path("M74 210 L86 176 Q92 160 118 158 L262 158 Q288 160 296 178 L312 210 Z", P.mustard, so(8));
  out += path("M112 166 L148 166 L146 196 L96 196 Z", P.skyLight, so(6));
  out += path("M156 166 L232 166 L246 196 L156 196 Z", P.skyLight, so(6));
  out += rect(92, 196, 224, 26, P.ink);
  for (let i = 0; i < 11; i += 1) out += rect(92 + i * 20, 196, 10, 26, i % 2 === 0 ? P.ink : P.paper, 2);
  out += rect(70, 222, 246, 24, P.mustard, 10, so(8));
  out += circ(126, 250, 28, P.night, so(8));
  out += circ(126, 250, 12, P.stone);
  out += circ(268, 250, 28, P.night, so(8));
  out += circ(268, 250, 12, P.stone);
  out += rect(300, 168, 26, 14, P.paper, 4, so(6));
  out += text("TAXI", 313, 179, 9, P.ink);
  out += rect(64, 200, 12, 16, P.lemon, 4);
  out += rect(310, 200, 12, 16, P.lemon, 4);
  out += tree(46, 300, 0.62);
  out += tree(352, 306, 0.5);
  out += rect(0, 350, W, 50, "#8E8578");
  out += rect(0, 278, W, 10, "#7C7466");
  out += rect(28, 322, 96, 8, P.paper, 4, 'opacity="0.5"');
  out += rect(250, 352, 110, 8, P.paper, 4, 'opacity="0.5"');
  return out;
};

export const brooklynBridge = () => {
  let out = rect(0, 0, W, 250, P.skyLight);
  out += sun(72, 68, 30, P.lemon);
  out += cloud(300, 70, 0.7, P.paper, 0.8);
  out += skyline(250, "#C4CFC9");
  out += rect(0, 250, W, 150, "#7FB6CE");
  out += rect(0, 246, W, 150, P.tealDark);
  // deck
  out += rect(0, 250, W, 16, "#3A4147");
  // towers
  const tower = (cx) =>
    path(`M${cx - 26} 250 L${cx - 20} 120 L${cx + 20} 120 L${cx + 26} 250 Z`, P.stone, so(7)) +
    rect(cx - 26, 112, 52, 14, P.stone, 4, so(7)) +
    stroke(`M${cx - 14} 246 L${cx - 14} 130 M${cx + 14} 246 L${cx + 14} 130`, P.sand, 6) +
    stroke(`M${cx - 14} 160 L${cx + 14} 130 M${cx + 14} 160 L${cx - 14} 130`, P.sand, 4);
  out += tower(122);
  out += tower(282);
  // cables
  out += stroke("M0 196 Q122 268 122 196 Q200 268 282 196 Q400 268 400 196", P.red, 5);
  out += stroke("M0 196 L122 196 M282 196 L400 196", P.red, 5);
  [40, 60, 80, 160, 180, 200, 240, 340, 360].forEach((x) => {
    out += line(x, 196, x, 250, P.red, 3, 'opacity="0.85"');
  });
  out += rect(0, 292, W, 108, P.skyDeep);
  out += ell(200, 300, 220, 12, P.paper, 'opacity="0.25"');
  out += stroke("M40 330 q20 -8 40 0 t40 0", P.paper, 4, 'opacity="0.5"');
  out += stroke("M230 356 q20 -8 40 0 t40 0", P.paper, 4, 'opacity="0.5"');
  return out;
};

export const pizzaSlice = () => {
  let out = rect(0, 0, W, W, "#F6EEE0");
  out += circ(200, 208, 132, P.sand);
  out += path("M200 262 L268 118 A132 132 0 0 1 336 168 Z", "#F2B96B", so(8));
  out += path("M204 254 L262 132 A118 118 0 0 1 316 172 Z", P.lemon);
  out += path("M200 262 L268 118 A132 132 0 0 0 200 262 Z", "#E9A94F");
  [
    [246, 190, 15],
    [288, 172, 13],
    [268, 224, 14],
    [312, 208, 11],
  ].forEach(([x, y, r]) => {
    out += circ(x, y, r, P.red, so(5));
    out += circ(x - 4, y - 4, 3, P.redDark);
  });
  out += path("M228 226 q10 12 22 2 q12 14 26 -4", P.sage, so(4));
  out += path("M258 152 q10 10 20 -2", P.sage, so(4));
  out += circ(88, 110, 26, P.red);
  out += circ(88, 110, 20, P.coral);
  out += path("M52 340 q22 -16 44 0 q22 -16 44 0", P.teal, so(5));
  out += circ(320, 316, 22, P.teal);
  out += circ(320, 316, 15, P.tealLight);
  out += circ(70, 268, 16, P.mustard);
  out += spark(340, 92, 1.2, P.mustard);
  out += spark(52, 200, 0.9, P.red);
  return out;
};

export const hotDogCart = () => {
  let out = rect(0, 0, W, 250, P.skyLight);
  out += sun(76, 70, 30);
  out += rect(0, 96, W, 154, "#E7E2D8");
  out += skyline(226, "#CBC5B8");
  out += rect(0, 226, W, 174, "#B5AFA2");
  out += rect(0, 226, W, 7, P.stone);
  // canopy
  out += path("M84 118 L316 118 L336 160 L64 160 Z", P.red, so(8));
  [0, 1, 2, 3, 4].forEach((i) => out += path(`M${92 + i * 44} 118 L${112 + i * 44} 118 L${104 + i * 44} 160 L${80 + i * 44} 160 Z`, P.paper));
  out += line(78, 118, 78, 96, P.brownDark, 6);
  out += line(322, 118, 322, 96, P.brownDark, 6);
  out += text("HOT DOGS", 200, 146, 20, P.red);
  // cart body
  out += rect(88, 232, 224, 84, P.teal, 16, so(8));
  out += rect(100, 250, 200, 30, P.paper, 8);
  out += text("SAJID'S CART", 200, 272, 19, P.tealDark);
  out += circ(130, 330, 16, P.night, so(6));
  out += circ(270, 330, 16, P.night, so(6));
  // hot dog
  out += path("M158 236 q42 -22 84 0 q-6 26 -42 26 q-36 0 -42 -26 Z", "#F0C383", so(6));
  out += path("M164 234 q38 -16 72 0 q-4 12 -36 12 q-32 0 -36 -12 Z", P.coral);
  out += stroke("M172 240 q16 -10 34 0 t34 0", P.mustard, 6);
  out += path("M250 210 q-8 -18 6 -28 q6 18 14 26 Z", P.mustard);
  out += path("M244 212 q-4 -16 8 -24 q2 16 6 22 Z", P.sage);
  out += rect(0, 350, W, 50, "#8E8578");
  out += rect(0, 350, W, 8, "#7C7466");
  return out;
};

export const subwayEntrance = () => {
  let out = rect(0, 0, W, 200, "#EDE4D4");
  out += skyline(200, "#B9B0A1");
  out += rect(0, 200, W, 200, "#C6BFB0");
  out += rect(0, 200, W, 8, P.stone);
  // railings
  out += rect(40, 120, 26, 200, P.teal, 4);
  out += rect(334, 120, 26, 200, P.teal, 4);
  out += rect(30, 112, 340, 20, P.teal, 6);
  out += rect(30, 168, 340, 12, P.teal, 6);
  // lamp
  out += rect(196, 78, 12, 60, P.tealDark, 4);
  out += path("M176 66 h52 l-8 -22 h-36 Z", P.tealDark);
  out += circ(202, 82, 14, P.lemon, so(5));
  // steps
  out += rect(96, 250, 208, 130, "#4A443C", 6);
  [0, 1, 2, 3, 4].forEach((i) => out += rect(102 - i * 2, 258 + i * 22, 196 + i * 4, 20, "#3B362F", 4));
  out += rect(60, 250, 32, 130, P.tealDark, 4);
  out += rect(308, 250, 32, 130, P.tealDark, 4);
  // sign
  out += rect(24, 40, 96, 96, P.paper, 10, so(9));
  out += rect(30, 46, 84, 84, P.red, 8);
  out += rect(40, 84, 64, 9, P.paper, 3);
  out += text("NYC", 300, 76, 30, P.red);
  return out;
};

export const statueOfLiberty = () => {
  let out = rect(0, 0, W, 290, "#D8E9F0");
  out += circ(302, 82, 46, P.lemon);
  out += cloud(88, 78, 0.75, P.paper, 0.85);
  out += rect(0, 250, W, 150, "#7FB6CE");
  out += stroke("M30 300 q24 -10 48 0 t48 0", P.paper, 4, 'opacity="0.45"');
  out += stroke("M220 336 q24 -10 48 0 t48 0", P.paper, 4, 'opacity="0.45"');
  // pedestal
  out += rect(140, 300, 120, 100, "#CFC7B8", 6);
  out += rect(120, 286, 160, 22, "#E2DACB", 6);
  // pedestal detail
  out += rect(172, 328, 56, 44, "#B7AF9F", 4);
  // figure
  out += path("M200 300 L200 190 L214 176 L186 176 Z", "#7FC0B6", so(7));
  out += path("M200 196 L162 232 L182 244 L204 214 Z", "#8CCBC0", so(7));
  out += path("M204 214 L232 244 L246 232 L216 194 Z", "#8CCBC0", so(7));
  out += rect(176, 296, 48, 14, "#8CCBC0", 4);
  out += circ(200, 162, 22, "#8CCBC0", so(7));
  out += path("M182 152 L186 132 L214 132 L218 152 Z", "#8CCBC0", so(6));
  out += path("M184 130 L216 130 L212 118 L188 118 Z", "#8CCBC0", so(6));
  for (let i = 0; i < 5; i += 1) out += line(190 + i * 6, 118, 186 + i * 6, 100, "#8CCBC0", 3);
  out += circ(200, 92, 10, P.mustard);
  out += path("M206 84 l16 -10 -6 18 Z", P.lemon);
  out += circ(194, 162, 2.6, P.ink);
  out += circ(206, 162, 2.6, P.ink);
  out += stroke("M195 170 q5 4 10 0", P.ink, 2.2);
  out += tree(46, 388, 0.5, P.brownDark, P.sageDark);
  out += tree(352, 392, 0.42, P.brownDark, P.sageDark);
  return out;
};

export const brownstone = () => {
  let out = rect(0, 0, W, 250, "#E9E3D6");
  out += rect(24, 70, 352, 250, P.brown, 14);
  out += rect(24, 56, 352, 26, P.brownDark, 10);
  out += rect(24, 108, 352, 10, P.brownDark);
  [0, 1, 2].forEach((r) =>
    [0, 1, 2, 3].forEach((c) => {
      out += rect(46 + c * 84, 78 + r * 44, 54, 28, r === 0 ? "#F0C98A" : "#5E4636", 4, so(6));
      out += line(46 + c * 84 + 27, 78 + r * 44, 46 + c * 84 + 27, 78 + r * 44 + 28, P.brownDark, 3);
    }),
  );
  // door
  out += rect(160, 214, 80, 106, P.red, 6, so(7));
  out += rect(172, 226, 56, 42, "#8E2B1E", 4);
  out += circ(226, 274, 5, P.gold);
  out += path("M150 320 L150 200 L250 200 L250 320 Z", "none");
  out += stroke("M150 320 L150 198 L252 198 L252 320", P.stone, 6);
  // stoop
  out += rect(120, 320, 160, 20, P.stone, 4);
  out += rect(108, 340, 184, 20, P.stone, 4);
  out += rect(96, 360, 208, 20, P.stone, 4);
  out += line(100, 366, 128, 366, P.stone, 8);
  out += line(272, 366, 300, 366, P.stone, 8);
  out += path("M120 320 q-4 -44 26 -50 q10 -22 -4 -34", "none");
  out += stroke("M118 320 q-2 -46 30 -52 q12 -24 -6 -34", P.sageDark, 5);
  out += circ(126, 288, 14, P.sage);
  out += circ(146, 300, 12, P.sageDark);
  out += circ(112, 306, 11, P.sage);
  out += circ(322, 180, 46, P.paper);
  out += text("BROOKLYN", 322, 187, 13, P.brownDark);
  return out;
};

export const tajMahal = () => {
  let out = rect(0, 0, W, 230, "#E8E4F0");
  out += sun(320, 66, 30, P.lemon);
  out += cloud(80, 70, 0.7, P.paper, 0.8);
  out += rect(0, 230, W, 60, P.sage);
  out += rect(0, 280, W, 120, "#8FC6D6");
  out += ell(200, 300, 150, 14, P.paper, 'opacity="0.5"');
  // minarets
  [72, 328].forEach((cx) => {
    out += rect(cx - 15, 150, 30, 110, "#F3EDE2", 4, so(7));
    out += path(`M${cx - 19} 150 L${cx} 108 L${cx + 19} 150 Z`, "#FBF6EC", so(7));
    out += circ(cx, 104, 8, P.gold);
    out += rect(cx - 12, 176, 24, 30, "#E4DACA", 3);
  });
  // main building
  out += rect(120, 196, 160, 64, "#F6F0E4", 4, so(7));
  out += path("M164 196 L200 122 L236 196 Z", "#FBF6EC", so(7));
  out += path("M196 130 q4 -26 12 -30 q8 4 12 30 Z", P.gold);
  out += line(200, 96, 200, 74, P.gold, 4);
  out += circ(200, 70, 6, P.gold);
  [142, 258].forEach((cx) => out += path(`M${cx - 12} 196 q0 -30 12 -40 q12 10 12 40 Z`, "#FBF6EC", so(6)));
  out += path("M176 260 v-38 a24 24 0 0 1 48 0 v38 Z", "#C9B79A");
  out += path("M182 260 v-36 a18 18 0 0 1 36 0 v36 Z", P.tealDark);
  out += [130, 250].map((x) => rect(x, 216, 20, 44, "#E4DACA", 3)).join("");
  // reflection
  out += ell(200, 302, 40, 8, P.tealDark, 'opacity="0.35"');
  out += ell(200, 320, 66, 9, P.tealDark, 'opacity="0.22"');
  out += path("M110 288 q26 -14 44 0", P.sageDark, so(4));
  out += path("M250 288 q26 -14 44 0", P.sageDark, so(4));
  return out;
};

export const autoRickshaw = () => {
  let out = rect(0, 0, W, 250, "#F2E6D2");
  out += rect(0, 250, W, 150, "#C9BBA4");
  out += rect(0, 250, W, 8, "#B5A793");
  out += skyline(250, "#CFC0A8");
  // canopy
  out += path("M104 168 L296 168 L318 206 L82 206 Z", P.teal, so(8));
  out += rect(84, 206, 236, 12, P.tealDark, 5, so(7));
  // body
  out += path("M76 232 q0 -18 24 -18 l200 0 q26 0 26 24 l0 40 q0 16 -18 16 l-214 0 q-18 0 -18 -18 Z", P.tealDark, so(8));
  out += path("M104 244 q0 -12 16 -12 l84 0 l0 44 l-100 0 Z", P.teal, so(6));
  out += circ(268, 250, 22, P.paper, so(6));
  out += rect(280, 232, 34, 30, P.paper, 8, so(6));
  out += circ(120, 296, 30, P.night, so(8));
  out += circ(120, 296, 12, P.stone);
  out += circ(232, 300, 24, P.night, so(8));
  out += circ(232, 300, 10, P.stone);
  out += text("DHAKA", 200, 268, 20, P.lemon);
  // driver
  out += character({ x: 120, y: 172, s: 0.52, hairStyle: "cap", body: P.coral, skin: "#C98F5F", hair: P.ink });
  out += path("M262 176 q16 -12 26 0", "none");
  out += stroke("M266 172 q16 -14 28 2", P.lemon, 6);
  out += rect(0, 330, W, 70, "#B5A793");
  out += rect(24, 356, 120, 8, P.paper, 4, 'opacity="0.45"');
  out += rect(220, 380, 140, 8, P.paper, 4, 'opacity="0.45"');
  return out;
};

export const masalaChai = () => {
  let out = rect(0, 0, W, W, "#F4EADB");
  out += circ(200, 200, 140, "#E9DAC2");
  out += ell(200, 320, 150, 26, "#D8C3A4", 'opacity="0.6"');
  // cup
  out += path("M132 186 h136 l-14 116 q-4 20 -24 20 h-60 q-20 0 -24 -20 Z", P.paper, so(9));
  out += path("M132 186 h136 l-4 30 h-128 Z", P.brown, so(6));
  out += path("M150 232 h100 l-8 66 q-3 16 -18 16 h-48 q-15 0 -18 -16 Z", "#C08A55", 'opacity="0.55"');
  out += ell(200, 322, 46, 12, P.paper, so(8));
  // handle
  out += path("M270 208 q42 4 34 40 q-6 30 -40 26", "none");
  out += stroke("M268 206 q46 4 38 42 q-6 32 -42 28", P.paper, 16);
  out += stroke("M268 206 q46 4 38 42 q-6 32 -42 28", P.stone, 10);
  // steam
  out += stroke("M176 160 q-14 -22 4 -40 q14 -14 4 -30", P.grey, 5, 'opacity="0.7"');
  out += stroke("M212 154 q-14 -22 4 -40 q14 -14 4 -30", P.grey, 5, 'opacity="0.7"');
  // spices
  out += ell(92, 306, 26, 16, P.red);
  out += ell(88, 300, 8, 5, P.redDark);
  out += circ(320, 122, 18, P.mustard);
  out += line(320, 104, 320, 140, P.brownDark, 4);
  out += path("M100 118 q22 -18 44 0 q-8 24 -22 24 q-14 0 -22 -24 Z", P.coral, so(5));
  out += spark(310, 268, 1.1, P.mustard);
  out += spark(96, 196, 0.8, P.teal);
  return out;
};

export const samosaCart = () => {
  let out = rect(0, 0, W, 240, "#F6E7D0");
  out += rect(0, 240, W, 160, "#C9A97F");
  out += rect(0, 240, W, 8, "#B2916A");
  out += path("M70 110 L330 110 L348 156 L52 156 Z", P.tealDark, so(8));
  [0, 1, 2, 3, 4].forEach((i) => out += path(`M${78 + i * 48} 110 L${104 + i * 48} 110 L${92 + i * 48} 156 L${66 + i * 48} 156 Z`, P.lemon));
  out += text("SAMOSA", 200, 146, 24, P.tealDark);
  out += rect(78, 236, 244, 76, P.coral, 14, so(8));
  out += rect(90, 252, 220, 26, P.paper, 8);
  out += text("CHAI · SAMOSA · CHAAT", 200, 271, 15, P.coral);
  out += circ(120, 326, 18, P.night, so(6));
  out += circ(280, 326, 18, P.night, so(6));
  // samosas
  const samosa = (x, y, s) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-24 16 L0 -26 L24 16 Z" fill="#E0A85C" stroke="${P.paper}" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/><path d="M-10 6 L0 -14 L10 6" fill="none" stroke="#C08A3E" stroke-width="3"/></g>`;
  out += samosa(146, 214, 1.1);
  out += samosa(200, 206, 1.3);
  out += samosa(254, 214, 1.1);
  out += stroke("M186 158 q-10 -18 4 -28", P.paper, 5, 'opacity="0.7"');
  out += stroke("M212 152 q-10 -18 4 -28", P.paper, 5, 'opacity="0.7"');
  out += circ(70, 350, 22, P.mustard);
  out += rect(58, 340, 24, 18, P.paper, 3, so(5));
  return out;
};

export const bazaarLanterns = () => {
  let out = gradWash("bz", [["0", "#F6D9B4"], ["1", "#E8B48C"]], W, 260);
  out += circ(320, 78, 40, "#F2A87E");
  // stalls
  out += rect(0, 250, W, 150, "#7A5B47");
  out += rect(20, 210, 150, 46, P.red, 8, so(7));
  out += rect(230, 226, 150, 34, P.teal, 8, so(7));
  out += rect(24, 256, 142, 12, P.paper, 4);
  out += rect(234, 260, 142, 12, P.paper, 4);
  [0, 1, 2, 3].forEach((i) => out += circ(44 + i * 36, 268, 12, [P.mustard, P.coral, P.sage, P.lemon][i]));
  [0, 1, 2, 3].forEach((i) => out += circ(254 + i * 36, 274, 11, [P.plumLight, P.lemon, P.coral, P.tealLight][i]));
  // lanterns
  const lantern = (x, y, s, colour) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><line x1="0" y1="-26" x2="0" y2="-14" stroke="${P.brownDark}" stroke-width="3"/><ellipse cx="0" cy="0" rx="17" ry="21" fill="${colour}" stroke="${P.paper}" stroke-width="6" paint-order="stroke"/><ellipse cx="0" cy="0" rx="7" ry="9" fill="${P.paper}" opacity="0.5"/><rect x="-6" y="-24" width="12" height="6" fill="${P.brownDark}" rx="2"/></g>`;
  out += stroke("M0 108 q100 60 200 0 q100 -60 200 0", P.brownDark, 4);
  out += lantern(46, 130, 1, P.coral);
  out += lantern(112, 150, 0.9, P.mustard);
  out += lantern(176, 154, 1.05, P.lemon);
  out += lantern(240, 146, 0.9, P.coralLight);
  out += lantern(304, 126, 1, P.tealLight);
  out += rect(0, 306, W, 94, "#6B4E3D");
  [0, 1, 2, 3, 4, 5, 6].forEach((i) => out += rect(6 + i * 58, 330 + (i % 2) * 26, 44, 70, "#5B4133", 6));
  return out;
};

export const heritageTrain = () => {
  let out = rect(0, 0, W, 230, "#E7EEE2");
  out += sun(76, 70, 30, P.lemon);
  out += cloud(300, 64, 0.8, P.paper, 0.8);
  out += path("M0 230 q80 -60 150 -20 q90 46 250 -30 v150 h-400 Z", P.sage);
  out += path("M0 250 q120 -40 200 0 q100 44 200 -10 v160 h-400 Z", "#7FA07C");
  out += rect(0, 292, W, 20, "#8C7A62");
  out += rect(0, 322, W, 12, "#6E5F4C");
  [0, 1, 2, 3, 4, 5].forEach((i) => out += rect(10 + i * 66, 292, 44, 20, "#6B5744", 4));
  // train
  out += path("M52 200 h296 v72 q0 12 -14 12 h-268 q-14 0 -14 -12 Z", P.red, so(9));
  out += rect(66, 214, 62, 44, "#D9EAF2", 5, so(6));
  out += rect(140, 214, 62, 44, "#D9EAF2", 5, so(6));
  out += rect(214, 214, 62, 44, "#D9EAF2", 5, so(6));
  out += rect(286, 214, 48, 44, "#D9EAF2", 5, so(6));
  out += rect(48, 258, 304, 14, P.lemon, 4);
  out += circ(110, 288, 24, P.night, so(8));
  out += circ(110, 288, 9, P.stone);
  out += circ(248, 288, 24, P.night, so(8));
  out += circ(248, 288, 9, P.stone);
  out += stroke("M64 178 q-10 -22 6 -32 q10 -12 4 -24", P.paper, 6, 'opacity="0.7"');
  out += stroke("M100 172 q-10 -22 6 -32 q10 -12 4 -24", P.paper, 6, 'opacity="0.7"');
  out += text("INDIAN RAILS", 200, 330, 20, P.paper);
  out += rect(0, 342, W, 58, "#8FA98B");
  return out;
};

export const marigoldGarland = () => {
  let out = rect(0, 0, W, W, "#8A5A46");
  out += rect(30, 20, 340, 360, P.brownDark, 10);
  out += rect(56, 46, 288, 308, P.brown, 8);
  [0, 1, 2, 3, 4, 5].forEach((r) => {
    out += rect(60, 50 + r * 50, 280, 8, "#6E412A", 4, 'opacity="0.5"');
  });
  out += circ(200, 200, 62, "#9C6A4C", 'opacity="0.6"');
  out += circ(200, 200, 40, "#8A5A46", 'opacity="0.8"');
  out += stroke("M52 96 q148 150 296 0", P.sageDark, 7);
  const flower = (x, y, s, c1, c2) =>
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    Array.from({ length: 8 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 8;
      return ell(Math.cos(a) * 13, Math.sin(a) * 13, 8, 6, c1, `transform="rotate(${(a * 180) / Math.PI} ${n(
        Math.cos(a) * 13,
      )} ${n(Math.sin(a) * 13)})"`);
    }).join("") +
    circ(0, 0, 8, c2) +
    `</g>`;
  for (let i = 0; i <= 9; i += 1) {
    const t = i / 9;
    const x = 52 + t * 296;
    const y = 96 + Math.sin(Math.PI * t) * 116;
    out += flower(x, y, 1.05, i % 2 ? P.mustard : "#E8743A", P.lemon);
    if (i % 2 === 0) out += path(`M${n(x + 16)} ${n(y + 20)} q14 10 6 26 q-18 -4 -18 -20 Z`, P.sage, so(4));
  }
  out += circ(66, 300, 16, P.lemon, so(5));
  out += circ(334, 292, 13, P.coral, so(5));
  out += spark(200, 84, 1.4, P.lemon);
  return out;
};

export const londonBus = () => {
  let out = rect(0, 0, W, 220, "#DCE7E4");
  out += cloud(90, 62, 0.7, P.paper, 0.85);
  out += skyline(220, "#BFC9C4");
  out += rect(0, 220, W, 180, "#9AA39C");
  out += rect(0, 220, W, 7, P.grey);
  out += path("M74 130 h252 q14 0 14 16 v166 q0 12 -14 12 h-252 q-14 0 -14 -12 v-166 q0 -16 14 -16 Z", P.red, so(9));
  out += rect(84, 148, 108, 54, "#D9E9EF", 6, so(6));
  out += rect(206, 148, 106, 54, "#D9E9EF", 6, so(6));
  out += rect(84, 220, 108, 54, "#D9E9EF", 6, so(6));
  out += rect(206, 220, 106, 54, "#D9E9EF", 6, so(6));
  out += rect(74, 210, 252, 8, P.paper);
  out += rect(70, 288, 260, 30, "#9E3324", 6);
  out += circ(120, 324, 30, P.night, so(8));
  out += circ(120, 324, 12, P.stone);
  out += circ(282, 324, 30, P.night, so(8));
  out += circ(282, 324, 12, P.stone);
  out += rect(160, 108, 82, 26, P.paper, 6, so(6));
  out += text("LONDON", 201, 127, 16, P.red);
  out += rect(140, 290, 120, 14, P.paper, 4);
  return out;
};

export const parisEiffel = () => {
  let out = rect(0, 0, W, 250, "#E6E4F0");
  out += sun(300, 84, 36, P.lemon);
  out += cloud(84, 92, 0.75, P.paper, 0.85);
  out += rect(0, 250, W, 150, "#C9C4B4");
  out += rect(0, 250, W, 8, "#B6B0A0");
  const leg = "M170 400 L192 150 L208 150 L230 400 Z";
  out += path(leg, "#6C6F76", so(8));
  out += path("M164 148 h72 l-14 22 h-44 Z", "#7C8087", so(7));
  out += path("M176 96 h48 l-10 52 h-28 Z", "#6C6F76", so(7));
  out += rect(190, 62, 20, 40, "#6C6F76", 4, so(6));
  out += circ(200, 56, 8, P.mustard);
  out += path("M200 30 v18", "none");
  out += line(200, 30, 200, 48, "#6C6F76", 4);
  // lattice
  out += stroke("M192 150 L226 400", "#5A5D63", 5);
  out += stroke("M208 150 L174 400", "#5A5D63", 5);
  [0, 1, 2, 3, 4, 5].forEach((i) => {
    const y1 = 160 + i * 40;
    out += line(190 - i * 1.6, y1, 210 + i * 1.6, y1 + 34, "#5A5D63", 3);
    out += line(210 + i * 1.6, y1, 190 - i * 1.6, y1 + 34, "#5A5D63", 3);
  });
  out += circ(200, 118, 5, P.mustard);
  out += circ(200, 196, 5, P.mustard);
  out += rect(40, 320, 84, 80, "#D9C9AE", 8);
  out += path("M30 320 L82 288 L134 320 Z", "#B8A88E");
  out += tree(340, 390, 0.55, P.brownDark, P.sageDark);
  return out;
};

export const tokyoTorii = () => {
  let out = gradWash("tk", [["0", "#F6E3DA"], ["1", "#EFC0B4"]], W, 230);
  out += rect(0, 236, W, 164, "#B9AFA2");
  out += rect(0, 236, W, 8, "#A79C8E");
  // torii
  out += rect(84, 130, 26, 220, P.red, 6, so(8));
  out += rect(290, 130, 26, 220, P.red, 6, so(8));
  out += path("M52 118 h296 l-10 26 h-276 Z", P.red, so(8));
  out += path("M74 96 h252 l-12 24 h-228 Z", P.redDark, so(8));
  out += rect(160, 152, 80, 18, P.redDark, 4, so(6));
  out += path("M182 128 h36 v30 h-36 Z", P.paper, so(5));
  out += text("TORII", 200, 152, 15, P.red);
  [40, 120, 280, 360].forEach((x, i) => {
    const y = 236 + (i % 2) * 22;
    out += rect(x - 18, y, 36, 48, P.paper, 12, so(6));
    out += rect(x - 18, y, 36, 14, P.red, 10);
    out += line(x - 12, y + 26, x + 12, y + 26, P.red, 3);
  });
  out += rect(20, 268, 360, 8, P.brownDark, 4);
  out += circ(330, 66, 32, P.paper, 'opacity="0.75"');
  out += rect(0, 340, W, 60, "#9E9284");
  [0, 1, 2, 3].forEach((i) => out += rect(24 + i * 96, 360, 60, 8, "#8C8174", 4));
  return out;
};

export const santorini = () => {
  let out = rect(0, 0, W, 210, "#DCEBF2");
  out += circ(90, 66, 30, P.lemon);
  out += rect(0, 210, W, 190, "#5FA9C6");
  out += stroke("M20 260 q22 -10 44 0 t44 0", P.paper, 4, 'opacity="0.45"');
  out += stroke("M250 300 q22 -10 44 0 t44 0", P.paper, 4, 'opacity="0.45"');
  out += path("M0 250 h400 v150 h-400 Z", "#EDEFF1");
  out += path("M0 250 q120 -22 200 0 q100 20 200 -4 v14 h-400 Z", "#DDE1E4");
  // buildings
  out += rect(20, 190, 150, 100, "#F6F6F4", 6);
  out += rect(200, 214, 130, 80, "#F2F2EF", 6);
  out += rect(40, 150, 40, 46, "#F6F6F4", 4);
  out += path("M28 152 q32 -40 64 0 Z", "#2C6E9B", so(7));
  out += circ(60, 128, 7, P.paper);
  out += line(60, 112, 60, 128, P.paper, 4);
  out += path("M186 216 q40 -46 80 0 Z", "#2C6E9B", so(7));
  out += rect(232, 244, 44, 50, "#3D7FA8", 6, so(6));
  out += rect(238, 252, 32, 26, P.paper, 4, so(4));
  out += rect(30, 216, 34, 46, "#2C6E9B", 6, so(6));
  out += rect(96, 226, 36, 36, "#3D7FA8", 5, so(6));
  out += rect(214, 240, 26, 34, "#C9D6DC", 4);
  out += circ(160, 330, 20, "#2C6E9B", so(7));
  out += rect(146, 344, 28, 44, "#F2F2EF", 4);
  // stair
  [0, 1, 2, 3].forEach((i) => {
    out += rect(300 + i * 8, 290 + i * 20, 100, 18, "#E2E4E6", 3);
  });
  out += text("OIA", 200, 100, 22, "#2C6E9B");
  return out;
};

export const colosseum = () => {
  let out = rect(0, 0, W, 230, "#F2E6D0");
  out += sun(320, 70, 32, P.lemon);
  out += cloud(84, 70, 0.6, P.paper, 0.8);
  out += rect(0, 232, W, 168, "#D8C79F");
  out += rect(0, 232, W, 8, "#C7B48B");
  out += ell(200, 330, 210, 40, "#C2AE84");
  // tiers
  const tier = (y, h, arches, colour) => {
    let o = path(`M40 ${y + h} q0 -${h * 0.2} 40 -${h * 0.34} q160 -${h * 0.7} 280 0 q40 ${h * 0.14} 40 ${h * 0.34} Z`, colour, so(8));
    for (let i = 0; i < arches; i += 1) {
      const x = 62 + i * ((280 / arches) * 1);
      o += path(`M${n(x)} ${n(y + h - 4)} v-${h * 0.42} a${n((280 / arches) * 0.32)} ${n(h * 0.34)} 0 0 1 ${n(
        (280 / arches) * 0.64,
      )} 0 v${h * 0.42} Z`, "#9A8560", so(4));
    }
    return o;
  };
  out += tier(292, 96, 7, "#E4D3AC");
  out += tier(226, 76, 6, "#EADBBB");
  out += tier(170, 62, 5, "#EFE2C6");
  out += path("M46 168 h308 q-40 -34 -154 -34 t-154 34 Z", "#D9C79F", so(7));
  [0, 1, 2, 3].forEach((i) => out += rect(40 + i * 88, 130, 10, 40, "#D9C79F", 4));
  out += path("M126 134 q0 -40 74 -40 q74 0 74 40 Z", "#EFE2C6", so(7));
  out += text("ROMA", 200, 118, 22, P.brown);
  out += circ(340, 350, 22, P.sage, so(6));
  out += circ(66, 352, 18, P.sageDark, so(6));
  return out;
};

export const amsterdamBicycles = () => {
  let out = rect(0, 0, W, 190, "#DCE9EE");
  out += cloud(300, 56, 0.6, P.paper, 0.8);
  // canal houses
  const houses = [
    [10, 120, "#B9705E"],
    [72, 96, "#C98F4E"],
    [134, 140, "#7E9AA6"],
    [190, 110, "#9C6E8A"],
    [246, 150, "#6E9070"],
    [302, 104, "#B08A4E"],
  ];
  houses.forEach(([x, h, colour], i) => {
    out += rect(x, 190 - h, 58, h, colour, 4);
    out += path(`M${x - 6} ${190 - h} L${x + 29} ${190 - h - (i % 2 ? 30 : 20)} L${x + 64} ${190 - h} Z`, colour);
    [0, 1, 2, 3].forEach((r) =>
      [0, 1].forEach((c) => out += rect(x + 10 + c * 30, 190 - h + 22 + r * 34, 18, 22, "#F4EBD6", 3, so(4))),
    );
  });
  out += rect(0, 190, W, 210, "#5E93A8");
  out += stroke("M0 244 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0", P.paper, 4, 'opacity="0.4"');
  out += rect(0, 200, W, 14, "#4E7F92");
  // bike
  const bike = (cx, cy, s, colour) =>
    `<g transform="translate(${cx} ${cy}) scale(${s})">` +
    circ(-40, 0, 30, "none", `stroke="${colour}" stroke-width="8"`) +
    circ(40, 0, 30, "none", `stroke="${colour}" stroke-width="8"`) +
    path("M-40 0 L0 -44 L40 0 L-40 0 M0 -44 L18 -44", "none", `stroke="${colour}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`) +
    rect(-6, -50, 22, 10, colour, 4) +
    path("M40 0 L26 -40", "none", `stroke="${colour}" stroke-width="6"`) +
    line(26, -40, 44, -46, colour, 6) +
    `</g>`;
  out += bike(140, 300, 1, P.ink);
  out += bike(258, 340, 0.82, P.red);
  out += rect(120, 246, 44, 34, P.mustard, 6, so(6));
  out += circ(130, 256, 6, P.coral);
  out += circ(144, 264, 5, P.sageDark);
  out += circ(156, 252, 6, P.plumLight);
  out += rect(160, 40, 84, 40, P.paper, 8, so(6));
  out += text("FIETS", 202, 67, 18, P.teal);
  return out;
};

export const cappadociaBalloons = () => {
  let out = gradWash(
    "cp",
    [["0", "#DCD3E8"], ["0.6", "#F3E3D2"], ["1", "#F7D9BE"]],
    W,
    W,
  );
  out += circ(88, 84, 34, "#FBE3B4");
  const balloon = (x, y, s, c1, c2) =>
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    path("M0 -46 c22 0 38 18 38 36 c0 16 -10 24 -18 32 c-8 8 -10 12 -10 18 l-20 0 c0 -6 -2 -10 -10 -18 c-8 -8 -18 -16 -18 -32 c0 -18 16 -36 38 -36 Z", c1, so(7)) +
    path("M0 -46 c22 0 38 18 38 36 c0 16 -10 24 -18 32 c-8 8 -10 12 -10 18 l-10 0 l0 -86 Z", c2, 'opacity="0.55"') +
    rect(-14, 40, 28, 20, P.brown, 5, so(5)) +
    `</g>`;
  out += balloon(300, 110, 1, P.coral, P.lemon);
  out += balloon(140, 74, 0.72, P.teal, P.tealLight);
  out += balloon(226, 178, 0.58, P.mustard, P.lemon);
  out += balloon(84, 206, 0.46, P.plumLight, P.paper);
  // valley
  out += path("M0 320 q60 -60 130 -20 q70 40 150 -10 q80 -46 120 30 v80 h-400 Z", "#C9A98C");
  out += path("M0 356 q80 -50 160 -6 q90 48 240 -20 v70 h-400 Z", "#B08A6C");
  [0, 1, 2, 3, 4].forEach((i) => out += path(`M${40 + i * 80} 300 q10 -26 24 -6 q10 18 -6 22 Z`, "#9E7A5E"));
  out += circ(320, 60, 16, "#FBE3B4");
  return out;
};