#!/usr/bin/env node
// Finds new design skills/plugins/tools and writes PROPOSALS to registry/candidates.json.
// Never installs or edits skills.json by itself. Approve: `node scripts/discover.mjs --approve <full_name> [kind]`.
// Optional GITHUB_TOKEN raises the unauthenticated rate limit. Free GitHub search API only.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const dir = new URL("../registry/", import.meta.url);
const rd = (f, d) => (existsSync(new URL(f, dir)) ? JSON.parse(readFileSync(new URL(f, dir))) : d);
const wr = (f, v) => writeFileSync(new URL(f, dir), JSON.stringify(v, null, 1) + "\n");

const skills = rd("skills.json", {});
const list = Array.isArray(skills) ? skills : skills.entries ?? [];
const cands = rd("candidates.json", { candidates: [] });

const i = process.argv.indexOf("--approve");
if (i > 0) {
  const name = process.argv[i + 1], kind = process.argv[i + 2] ?? "skill";
  const c = cands.candidates.find((x) => x.name === name);
  if (!c) { console.error("not a candidate: " + name); process.exit(1); }
  list.push({ id: name.split("/").pop(), kind, source: c.url, note: c.description, status: "trial", added: new Date().toISOString().slice(0, 10) });
  wr("skills.json", Array.isArray(skills) ? list : { ...skills, entries: list });
  cands.candidates = cands.candidates.filter((x) => x !== c);
  wr("candidates.json", cands);
  console.log("approved (registry entry only; install the tool yourself): " + name);
  process.exit(0);
}

const src = rd("sources.json", { github_queries: [] });
const known = new Set([...list.map((s) => s.source ?? s.id), ...cands.candidates.map((c) => c.url)]);
const since = new Date(Date.now() - (src.pushed_within_days ?? 180) * 864e5).toISOString().slice(0, 10);
const headers = { Accept: "application/vnd.github+json", ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }) };
let added = 0;
for (const q of src.github_queries) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(`${q} stars:>=${src.min_stars ?? 100} pushed:>=${since}`)}&sort=stars&per_page=5`;
  try {
    const r = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
    if (!r.ok) { console.log(`skip "${q}": HTTP ${r.status}`); continue; }
    for (const x of (await r.json()).items ?? []) {
      if (known.has(x.html_url) || known.has(x.name)) continue;
      known.add(x.html_url);
      cands.candidates.push({ name: x.full_name, url: x.html_url, stars: x.stargazers_count, license: x.license?.spdx_id ?? "none", description: x.description, found: new Date().toISOString().slice(0, 10) });
      added++;
    }
  } catch (e) { console.log(`skip "${q}": ${e.message}`); }
}
// Free models: OpenRouter lists every model with pricing; zero prompt+completion price = free. Proposals only.
const mc = rd("model-candidates.json", { candidates: [] });
const seen = new Set(mc.candidates.map((m) => m.id));
try {
  const r = await fetch("https://openrouter.ai/api/v1/models", { signal: AbortSignal.timeout(10000) });
  for (const m of (r.ok ? (await r.json()).data : []) ?? []) {
    if (Number(m.pricing?.prompt) !== 0 || Number(m.pricing?.completion) !== 0 || seen.has(m.id)) continue;
    seen.add(m.id);
    mc.candidates.push({ id: m.id, provider: "openrouter", context: m.context_length, found: new Date().toISOString().slice(0, 10) });
  }
} catch (e) { console.log("skip models: " + e.message); }
wr("model-candidates.json", mc);
console.log(`models: ${mc.candidates.length} free candidates pending in registry/model-candidates.json`);
wr("candidates.json", cands);
console.log(`PASS: ${added} new candidates (${cands.candidates.length} pending review in registry/candidates.json)`);
