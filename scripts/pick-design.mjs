#!/usr/bin/env node
// Prompt-driven pick: node scripts/pick-design.mjs "project scope text"
// Maps scope keywords -> LAYOUT-PROMPTS template + category accent candidates, filtered by check-palettes (unique accent).
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const scope = process.argv.slice(2).join(' ').toLowerCase();
if (!scope) { console.error('usage: pick-design.mjs "<project scope>"'); process.exit(1); }
// ponytail: keyword table; swap for a Jev `choice` call if scopes get ambiguous
const CATS = [
  { k: /financ|bill|invoice|tax|wealth|bank|pay/, t: [1, 9], bg: 'light-neutral', acc: ['#0f766e', '#1d4ed8', '#166534'] },
  { k: /quiz|learn|educat|tutor|course|study|exam/, t: [2, 16], bg: 'warm-light', acc: ['#7c3aed', '#c2410c', '#0369a1'] },
  { k: /agent|dev|api|llm|ai tool|infra|log|trace/, t: [4, 11], bg: 'dark-slate', acc: ['#22d3ee', '#a3e635', '#38bdf8'] },
  { k: /health|well|fitness|vital|med/, t: [5, 13], bg: 'soft-light', acc: ['#e11d48', '#059669', '#0ea5e9'] },
  { k: /photo|media|video|creative|design|art/, t: [6, 14, 10], bg: 'dark-cinematic', acc: ['#f472b6', '#facc15', '#fb7185'] },
  { k: /travel|local|map|discover|property|estate|home/, t: [7, 12], bg: 'light-warm', acc: ['#0891b2', '#ea580c', '#166534'] },
  { k: /news|trend|data|market|stock|price|rate/, t: [8, 15], bg: 'paper', acc: ['#b91c1c', '#1e40af', '#3f8f2a'] },
  { k: /doc|pdf|resume|contract|legal|compliance|audit/, t: [3, 17], bg: 'light-neutral', acc: ['#4338ca', '#0f766e', '#be123c'] },
];
const hit = CATS.find((c) => c.k.test(scope)) ?? { t: [3, 9], bg: 'light-neutral', acc: ['#2563eb', '#0d9488', '#d97706'] };
const ok = hit.acc.filter((a) => spawnSync('node', [join(here, 'check-palettes.mjs'), '--try', a]).status === 0);
console.log(JSON.stringify({ templates: hit.t.map((n) => `LAYOUT-PROMPTS.md TEMPLATE ${n}`), bg: hit.bg, uniqueAccents: ok, note: 'hub design.dials/brief override; ban purple bg, near-black+orange, teal mesh' }, null, 1));
