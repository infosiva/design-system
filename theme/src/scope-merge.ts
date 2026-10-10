/** Hub config scopes, lowest to highest: bundled registry defaults < `ds_common` (all projects / shared components) < `theme_<siteId>` (one project).
 *  Both live in Edge Config, so changing either needs no code deploy. Objects merge deep; arrays and scalars are replaced by the higher scope. */
export function mergeScopes<T extends Record<string, any>>(...scopes: (Partial<T> | null | undefined)[]): T {
  const out: any = {};
  for (const s of scopes) {
    for (const [k, v] of Object.entries(s ?? {})) {
      out[k] = v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])
        ? mergeScopes(out[k], v)
        : v;
    }
  }
  return out;
}

// ponytail: self-check, run `npx ts-node --compiler-options '{"module":"commonjs"}' scope-merge.ts`
if (require.main === module) {
  const m: any = mergeScopes<any>({ design: { radius: 8, dials: { motion: 5 } }, ai: { freeOnly: true } }, { design: { dials: { motion: 2 } } }, { design: { radius: 16 } });
  console.assert(m.design.radius === 16 && m.design.dials.motion === 2 && m.ai.freeOnly === true, "site wins, common fills, deep merge: " + JSON.stringify(m));
  console.log("scope-merge self-check done");
}
