import reg from "./registry/models.json";

export interface SiteAI {
  freeOnly?: boolean;      // default true
  disabled?: string[];     // providers to skip for this site
  chains?: Record<string, string[]>; // per-task chain override
}

/** Ordered provider ids to try for a task. Hub theme.ai overrides registry; missing env keys and paid tiers are dropped. */
export function routeChain(
  task: string,
  site: SiteAI | null | undefined,
  env: Record<string, string | undefined> = process.env,
): string[] {
  const t = (reg.tasks as any)[task] ?? (reg.tasks as any).chat;
  const chain: string[] = site?.chains?.[task] ?? t.chain;
  const freeOnly = site?.freeOnly ?? reg.free_only_default;
  return chain.filter((id) => {
    const p = (reg.providers as any)[id];
    if (!p || site?.disabled?.includes(id)) return false;
    if (freeOnly && !p.free) return false;
    return p.local || !p.env || !!env[p.env];
  });
}

// ponytail: self-check, run `npx ts-node --compiler-options '{"module":"commonjs","resolveJsonModule":true}' ai-route.ts`
if (require.main === module) {
  const e = { GROQ_API_KEY: "x", ANTHROPIC_API_KEY: "x" };
  const a = routeChain("code", null, e);
  console.assert(a.join() === "groq", "free-only drops anthropic + keyless: " + a);
  const b = routeChain("code", { freeOnly: false }, e);
  console.assert(b.join() === "groq,anthropic", "paid allowed: " + b);
  const c = routeChain("trivial", { disabled: ["groq"] }, e);
  console.assert(c.join() === "ollama", "disabled+local: " + c);
  console.log("ai-route self-check done");
}
