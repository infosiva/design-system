#!/usr/bin/env node
// Probes the free-LLM chain in order and exits 0 if ANY tier answers (design-system hook never hard-fails).
// Env: FREELLM_URL (freellmapi, OpenAI-compatible), FREELLM_KEY, LITELLM_URL, LITELLM_KEY. No keys in code.
const tiers = [
  ["freellmapi", process.env.FREELLM_URL || "http://127.0.0.1:3001", process.env.FREELLM_KEY],
  ["litellm", process.env.LITELLM_URL || "http://127.0.0.1:4000", process.env.LITELLM_KEY],
  ["ollama", process.env.OLLAMA_URL || "http://127.0.0.1:11434", null],
];
const ping = async (name, base, key) => {
  const path = name === "ollama" ? "/api/tags" : "/v1/models";
  try {
    const r = await fetch(base + path, { headers: key ? { Authorization: `Bearer ${key}` } : {}, signal: AbortSignal.timeout(5000) });
    return { name, ok: r.ok || r.status === 401 || r.status === 403, status: r.status }; // 401 = alive, key missing
  } catch (e) {
    return { name, ok: false, status: String(e.cause?.code || e.message) };
  }
};
const results = [];
for (const t of tiers) results.push(await ping(...t));
for (const r of results) console.log(`${r.ok ? "UP  " : "DOWN"} ${r.name} (${r.status})`);
const up = results.filter((r) => r.ok);
console.log(up.length ? `PASS: ${up.length}/${tiers.length} tiers up, active=${up[0].name}` : "FAIL: no free tier reachable");
process.exit(up.length ? 0 : 2);
