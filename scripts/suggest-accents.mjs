#!/usr/bin/env node
// Suggest unique accents for given projects: node scripts/suggest-accents.mjs rideflow resumevault ...
// Picks hue-grid candidates farthest (OKLab) from every other registered accent. Report-only.
import { readFileSync } from "node:fs";
import { dE } from "./check-palettes.mjs";
const P = JSON.parse(readFileSync(new URL("../tokens/palette-registry.json", import.meta.url))).projects;
const change = process.argv.slice(2);
const hsl = (h, s, l) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, "0"); };
  return "#" + f(0) + f(8) + f(4);
};
const cands = [];
for (let h = 0; h < 360; h += 6) for (const s of [0.7, 0.85]) for (const l of [0.5, 0.6]) cands.push(hsl(h, s, l));
const pool = Object.entries(P).filter(([k]) => !change.includes(k)).map(([, v]) => v.accent);
for (const k of change) {
  let best = "", bd = -1;
  for (const c of cands) { const d = Math.min(...pool.map((p) => dE(c, p))); if (d > bd) { bd = d; best = c; } }
  console.log(k, P[k]?.accent ?? "-", "->", best, "minΔE", bd.toFixed(3));
  pool.push(best);
}
