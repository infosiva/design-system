// Layout variance gate: no two projects share an archetype. Run: npx ts-node scripts/check-layouts.ts
import { PROJECTS } from '../projects.config'
import { ARCHETYPES, pickArchetype } from '../layout-archetypes'

const taken: Record<string, string> = {}
let clash = 0
for (const p of PROJECTS) {
  const a = pickArchetype(p, Object.keys(taken), p.id)
  if (taken[a.id]) { console.error(`CLASH ${p.id} == ${taken[a.id]} (${a.id})`); clash++ }
  taken[a.id] = p.id
  console.log(`${p.id.padEnd(16)} ${a.id}`)
}
if (PROJECTS.length > ARCHETYPES.length) console.warn(`WARN ${PROJECTS.length} projects > ${ARCHETYPES.length} archetypes: add archetypes or vary heroVariant/navStyle`)
console.log(clash ? 'FAIL' : 'PASS: every project has a distinct layout')
process.exit(clash ? 2 : 0)
