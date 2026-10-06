#!/usr/bin/env node
// Report-only. Scans sibling project dirs for favicon/icon assets + stray icon.tsx. Usage: node scripts/audit-logos.mjs [rootDir]
import { readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
const root = resolve(process.argv[2] ?? new URL("../..", import.meta.url).pathname);
const reg = JSON.parse((await import("node:fs")).readFileSync(new URL("../logos/registry.json", import.meta.url)));
const has = (d, ps) => ps.filter((p) => existsSync(join(d, p)));
const rows = [];
for (const name of readdirSync(root)) {
  const d = join(root, name);
  if (!statSync(d).isDirectory() || !existsSync(join(d, "package.json"))) continue;
  const icons = has(d, ["app/favicon.ico", "src/app/favicon.ico", "public/favicon.ico", "app/icon.svg", "src/app/icon.svg", "public/icon.svg"]);
  const apple = has(d, ["app/apple-icon.png", "src/app/apple-icon.png", "public/apple-touch-icon.png"]);
  const stray = has(d, ["app/icon.tsx", "src/app/icon.tsx"]);
  // icon.tsx is a valid generated tab icon; only a problem when it shadows a static icon file.
  rows.push({ name, icons: icons.length + stray.length, apple: apple.length, stray: icons.length && stray.length ? 1 : 0, gen: stray.length, logo: reg.projects[name]?.status ?? "none" });
}
const gap = rows.filter((r) => !r.icons || !r.apple || r.stray || r.logo === "none");
console.log(`${rows.length} projects scanned, ${gap.length} with gaps`);
console.log("project | tab-icon | apple | icon.tsx | logo status");
for (const r of gap) console.log(`${r.name} | ${r.icons ? "ok" : "MISSING"} | ${r.apple ? "ok" : "MISSING"} | ${r.stray ? "SHADOWS static icon" : r.gen ? "generated" : "-"} | ${r.logo}`);
const seen = {};
for (const [k, v] of Object.entries(reg.projects)) (seen[v.concept] ??= []).push(k);
for (const [c, ks] of Object.entries(seen)) if (ks.length > 1) console.log(`DUPLICATE concept "${c}": ${ks.join(", ")}`);
