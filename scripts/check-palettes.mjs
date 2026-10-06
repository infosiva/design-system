#!/usr/bin/env node
// Report-only: lists project pairs whose accents are too close (OKLab dE). Exit 0 always unless --strict.
// Usage: node scripts/check-palettes.mjs [--strict] [--try '#hex'] (--try = would this accent collide?)
import { readFileSync } from "node:fs";
const reg = JSON.parse(readFileSync(new URL("../tokens/palette-registry.json", import.meta.url)));

export function oklab(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const [r, g, b] = c;
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
export const dE = (a, b) => Math.hypot(...oklab(a).map((v, i) => v - oklab(b)[i]));

const entries = Object.entries(reg.projects);
const isMain = import.meta.url === new URL(process.argv[1], "file://").href;
const arg = isMain ? process.argv.indexOf("--try") : -1;
if (arg > 0) {
  const hex = process.argv[arg + 1];
  const hits = entries.filter(([, p]) => dE(p.accent, hex) < reg.minAccentDeltaE);
  console.log(hits.length ? `COLLIDES with: ${hits.map(([k]) => k).join(", ")}` : "free");
  process.exit(0);
}
const bad = [];
if (isMain) for (let i = 0; i < entries.length; i++)
  for (let j = i + 1; j < entries.length; j++) {
    const [a, pa] = entries[i], [b, pb] = entries[j];
    if (reg.sharedAllowed.some((p) => p.includes(a) && p.includes(b))) continue;
    const d = dE(pa.accent, pb.accent);
    if (d < reg.minAccentDeltaE) bad.push(`${a} (${pa.accent}) ~ ${b} (${pb.accent})  dE=${d.toFixed(3)}`);
  }
if (isMain) {
  console.log(`${entries.length} projects, threshold dE<${reg.minAccentDeltaE}\n${bad.length} accent collisions:`);
  bad.forEach((l) => console.log("  " + l));
  if (bad.length && process.argv.includes("--strict")) process.exit(2);
}
