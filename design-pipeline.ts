#!/usr/bin/env npx ts-node
/**
 * DESIGN PIPELINE — Automated design research + selection + handoff
 *
 * Flow per project:
 *   1. Pick layout archetype (from pick-layout.ts)
 *   2. Fetch matching DESIGN.md from getdesign.md
 *   3. Generate Google Stitch prompt
 *   4. Generate Pinterest search queries
 *   5. Produce final Claude Design Brief (DESIGN.md → project folder)
 *
 * Run:
 *   npx ts-node design-pipeline.ts [project-id]   — single project
 *   npx ts-node design-pipeline.ts --all           — all projects
 *   npx ts-node design-pipeline.ts --write         — write DESIGN.md to each project
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import { PROJECTS, ProjectBrief } from './projects.config'
import { pickArchetype, LayoutArchetype } from './layout-archetypes'

// ─── getdesign.md catalogue ───────────────────────────────────────────────────
// Sourced from getdesign.md — each entry is a real company design system
const DESIGN_SYSTEMS: Record<string, {
  name: string
  description: string
  mood: string[]
  category: string[]
  getdesignSlug: string   // slug on getdesign.md for fetch
  typography: string
  colorProfile: string
  radiusProfile: string
  shadowProfile: string
  spacingProfile: string
  keyPrinciples: string[]
}> = {
  notion: {
    name: 'Notion',
    description: 'Clean, document-first, off-white backgrounds, Inter font, minimal borders',
    mood: ['minimal', 'calm', 'serious'],
    category: ['Productivity', 'EdTech', 'LegalTech'],
    getdesignSlug: 'notion',
    typography: 'Inter 14-16px body, 24-32px headings, tight tracking on display',
    colorProfile: 'Near-white bg (#FAFAF9), near-black text (#37352F), subtle borders (#E9E9E7)',
    radiusProfile: 'Subtle: 4-6px on cards, 2px on inputs',
    shadowProfile: 'Very subtle: 0 1px 3px rgba(0,0,0,0.08)',
    spacingProfile: '4/8/16/24/40px scale, generous paragraph spacing',
    keyPrinciples: [
      'Content is the UI — chrome disappears',
      'Hover reveals actions, not always visible',
      'Monochrome base, single accent color max',
      'Dense information in minimal space',
    ],
  },
  airbnb: {
    name: 'Airbnb',
    description: 'Warm, photography-heavy, Cereal font, rausch red accent, card-first',
    mood: ['playful', 'premium', 'calm'],
    category: ['TravelTech', 'Lifestyle', 'MarketingTech'],
    getdesignSlug: 'airbnb',
    typography: 'Circular/Cereal (use Plus Jakarta Sans), 16px body, bold 32-48px hero',
    colorProfile: 'White bg, #FF5A5F rausch red CTA, warm gray #767676 secondary text',
    radiusProfile: 'Generous: 16-24px cards, 8px inputs, pill CTAs',
    shadowProfile: '0 6px 16px rgba(0,0,0,0.12) cards, 0 1px 2px rgba(0,0,0,0.08) default',
    spacingProfile: '8/16/24/40/64px, generous whitespace sections',
    keyPrinciples: [
      'Photography tells the story — UI steps back',
      'Cards are first-class citizens',
      'Warm, welcoming microcopy',
      'Search/filter always accessible',
    ],
  },
  stripe: {
    name: 'Stripe',
    description: 'Premium, authoritative, gradient accents, structured docs-like layout',
    mood: ['premium', 'authoritative', 'serious'],
    category: ['FinTech', 'LegalTech', 'CareerTech'],
    getdesignSlug: 'stripe',
    typography: 'Inter, 15px body, tight leading, 20-28px section headers',
    colorProfile: '#0A2540 dark navy, #635BFF indigo accent, #00D4FF cyan highlight',
    radiusProfile: '6-8px standard, 4px inputs, 12px large cards',
    shadowProfile: '0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0,0,0,0.08)',
    spacingProfile: '8/16/24/32/48px, tight nav, spacious sections',
    keyPrinciples: [
      'Trust through precision — every pixel intentional',
      'Gradient as depth, not decoration',
      'Code examples are first-class content',
      'Dark mode is the premium experience',
    ],
  },
  linear: {
    name: 'Linear',
    description: 'Ultra-minimal, dark-first, command-palette feel, sharp edges, speed',
    mood: ['minimal', 'serious', 'energetic'],
    category: ['Productivity', 'developer'],
    getdesignSlug: 'linear',
    typography: 'Inter, 13-14px UI text, 11px labels, 36-48px hero in bold',
    colorProfile: '#0F111A bg, #5E6AD2 purple accent, #fff 85% text, borders 8% white',
    radiusProfile: 'Sharp: 4-6px everywhere, no pill shapes in UI chrome',
    shadowProfile: 'None in dark mode, subtle depth via border opacity',
    spacingProfile: '4/8/12/16/24/40px tight scale, dense information',
    keyPrinciples: [
      'Speed is a feature — no animations on core paths',
      'Dark canvas, bright accent for focus',
      'Keyboard-first, mouse-second',
      'Data density without clutter',
    ],
  },
  binance: {
    name: 'Binance',
    description: 'Finance terminal, yellow-on-dark, data-dense, monospace numbers',
    mood: ['authoritative', 'serious', 'energetic'],
    category: ['FinTech'],
    getdesignSlug: 'binance',
    typography: 'IBM Plex Sans body, IBM Plex Mono for numbers, tight spacing',
    colorProfile: '#0B0E11 bg, #F0B90B yellow accent, #0ECB81 green up, #F6465D red down',
    radiusProfile: '4px standard, 2px on data cells, 8px on cards',
    shadowProfile: 'Dark: border-based depth, no box shadows',
    spacingProfile: '4/8/12/16/24px tight, dense data tables',
    keyPrinciples: [
      'Data is the product — maximize information density',
      'Color = signal (green up, red down, yellow CTA)',
      'Monospace for all numeric values',
      'Dark theme only — light feels wrong',
    ],
  },
  cal: {
    name: 'Cal.com',
    description: 'Open, clean calendar-first, neutral palette, scheduling-focused',
    mood: ['minimal', 'calm', 'serious'],
    category: ['Productivity', 'MarketingTech'],
    getdesignSlug: 'cal-com',
    typography: 'Inter, 14px body, clean 20-28px section headers',
    colorProfile: 'White bg, #111827 text, #6D28D9 subtle purple accent, gray-100 borders',
    radiusProfile: '8px cards and inputs, 4px small elements',
    shadowProfile: '0 1px 2px 0 rgba(0,0,0,0.05), ring borders on focus',
    spacingProfile: '4/8/16/24/32/48px, balanced calendar grid',
    keyPrinciples: [
      'Calendar is the hero — everything serves time selection',
      'Light, accessible, works for all users',
      'No unnecessary chrome',
      'Grid-based layouts for predictability',
    ],
  },
  clay: {
    name: 'Clay',
    description: 'Organic, colorful gradients, bubbly shapes, creative agency energy',
    mood: ['playful', 'energetic', 'premium'],
    category: ['MarketingTech', 'EdTech', 'Lifestyle'],
    getdesignSlug: 'clay',
    typography: 'Plus Jakarta Sans, 16px body, bold display 48-72px, generous line height',
    colorProfile: 'Rich gradients: purple→pink→orange, white text, translucent cards',
    radiusProfile: 'Very generous: 24-32px cards, 999px pills, organic shapes',
    shadowProfile: 'Colorful glows matching brand, 0 20px 60px rgba(color,0.3)',
    spacingProfile: '8/16/24/40/80px generous, breathing room between sections',
    keyPrinciples: [
      'Color as personality — bold and intentional',
      'Organic shapes break grid monotony',
      'Motion is part of the brand',
      'Every section has a unique visual treatment',
    ],
  },
  clickhouse: {
    name: 'ClickHouse',
    description: 'Developer-focused, dark, yellow accent, data/analytics product',
    mood: ['serious', 'authoritative', 'minimal'],
    category: ['developer', 'Productivity'],
    getdesignSlug: 'clickhouse',
    typography: 'Inter body, monospace for code, technical precision',
    colorProfile: '#1A1A1A bg, #FAFF69 yellow accent, white text, gray-800 borders',
    radiusProfile: '6px standard',
    shadowProfile: 'Border-based, no blur shadows',
    spacingProfile: '8/16/24/40px, code-block friendly',
    keyPrinciples: [
      'Developer trust through technical credibility',
      'Code samples as first-class content',
      'Yellow accent pops against dark background',
      'Documentation-grade information hierarchy',
    ],
  },
  airtable: {
    name: 'Airtable',
    description: 'Colorful, grid/spreadsheet-first, friendly professional, structured data',
    mood: ['playful', 'calm', 'energetic'],
    category: ['Productivity', 'MarketingTech'],
    getdesignSlug: 'airtable',
    typography: 'Inter, 14px body, 18-24px headings, color-coded cells',
    colorProfile: 'White bg, multi-color accents (#FCB400 yellow, #18BFFF blue, #F82B60 red)',
    radiusProfile: '6px cells, 8px cards, 4px inputs',
    shadowProfile: '0 0 0 2px accent on focus, minimal ambient shadows',
    spacingProfile: '4/8/16/24/32px, grid-aligned',
    keyPrinciples: [
      'Structure is friendly — grids can be warm',
      'Color codes meaning, not decoration',
      'Every view mode feels native',
      'Enterprise power, consumer usability',
    ],
  },
  apple: {
    name: 'Apple',
    description: 'Premium hardware feel, SF Pro, generous whitespace, product-showcase first',
    mood: ['premium', 'minimal', 'serious'],
    category: ['consumer', 'CareerTech'],
    getdesignSlug: 'apple',
    typography: 'SF Pro/system-ui, 17px body, massive 56-80px hero, tight tracking on display',
    colorProfile: 'Pure white or pure black, single blue #0071E3 CTA, gray hierarchy',
    radiusProfile: '12-18px cards, 980px max-width sections, very generous padding',
    shadowProfile: 'None on dark, subtle on light: 0 2px 12px rgba(0,0,0,0.08)',
    spacingProfile: '24/40/64/80/120px cinematic section spacing',
    keyPrinciples: [
      'One hero message per page — no clutter',
      'Product is the star — UI disappears',
      'Cinematic scroll reveals as hero',
      'Typography does heavy lifting',
    ],
  },
}

// ─── Match design system to project ──────────────────────────────────────────
function pickDesignSystem(brief: ProjectBrief): string {
  const scores: Record<string, number> = {}
  for (const [key, ds] of Object.entries(DESIGN_SYSTEMS)) {
    let score = 0
    brief.mood.forEach(m => { if (ds.mood.includes(m)) score += 3 })
    if (ds.category.includes(brief.category)) score += 4
    if (ds.category.includes(brief.primaryAction)) score += 2
    brief.audience.forEach(a => { if (ds.category.includes(a)) score += 1 })
    scores[key] = score
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}

// ─── Generate Pinterest search queries ───────────────────────────────────────
function pinterestQueries(brief: ProjectBrief, archetype: LayoutArchetype): string[] {
  const base = brief.name.toLowerCase()
  const cat = brief.category.toLowerCase()
  const mood = brief.mood[0]
  return [
    `${cat} app UI design ${mood} 2024`,
    `${archetype.heroVariant} hero section web design dark`,
    `${base} landing page design inspiration`,
    `${cat} SaaS website design ${brief.colorPalette[0].replace('#', '')}`,
    `${mood} ${brief.contentDensity} density UI kit`,
    `web design ${brief.competitorStyle?.replace('like ', '') ?? cat} inspired`,
  ]
}

// ─── Generate full DESIGN.md content ────────────────────────────────────────
function generateDesignMd(
  brief: ProjectBrief,
  archetype: LayoutArchetype,
  dsKey: string
): string {
  const ds = DESIGN_SYSTEMS[dsKey]
  const pinterest = pinterestQueries(brief, archetype)

  return `# DESIGN.md — ${brief.name}

> **Auto-generated by design-pipeline.ts** — edit freely, re-run to regenerate.
> This file is the source of truth for all UI decisions in this project.
> When writing code, Claude reads this file and applies these conventions.

---

## Project Identity

| Field | Value |
|-------|-------|
| Product | ${brief.name} |
| Tagline | ${brief.tagline} |
| Category | ${brief.category} |
| Primary action | ${brief.primaryAction} |
| Audience | ${brief.audience.join(', ')} |
| Mood | ${brief.mood.join(', ')} |
| Competitor ref | ${brief.competitorStyle ?? 'None'} |

---

## Design System: ${ds.name}

Inspired by **${ds.name}**: ${ds.description}

### Typography
${ds.typography}

**Brand fonts (install via next/font or Google Fonts):**
- Display/Hero: \`font-black\` with tight letter-spacing
- Body: \`font-normal\` 14-16px, 1.6 line-height
- Mono (numbers/code): \`font-mono\`

### Color Palette
${ds.colorProfile}

**Brand colors:**
${brief.colorPalette.map((c, i) => `- Primary ${i + 1}: \`${c}\``).join('\n')}

### Borders & Radius
${ds.radiusProfile}

### Shadows
${ds.shadowProfile}

### Spacing Scale
${ds.spacingProfile}

### Design Principles
${ds.keyPrinciples.map(p => `- ${p}`).join('\n')}

---

## Layout Archetype: ${archetype.name}

${archetype.description}

### Section Order
${archetype.sections.map((s, i) => `${i + 1}. **${s.name}** — \`<${s.component} />\` ${s.required ? '' : '*(optional)*'}`).join('\n')}

### Hero Style
\`${archetype.heroVariant}\` — ${archetype.heroVariant === 'chat' ? 'Chat interface as primary hero element' : archetype.heroVariant === 'split' ? 'Two-column: copy left, visual right' : archetype.heroVariant === 'fullbleed' ? 'Edge-to-edge gradient/media background' : archetype.heroVariant === 'terminal' ? 'Data/code terminal aesthetic' : archetype.heroVariant === 'magazine' ? 'Editorial asymmetric grid' : 'Centered content with visual depth'}

### Nav Style
\`${archetype.navStyle}\` — ${archetype.navStyle === 'floating' ? 'Fixed position, transparent, becomes solid on scroll' : archetype.navStyle === 'minimal' ? 'Single row, logo + CTA only, no heavy navigation' : archetype.navStyle === 'sticky-top' ? 'Sticks to viewport top, always visible' : 'Left sidebar navigation'}

### Card Style
\`${archetype.cardStyle}\`

---

## CSS Class Conventions

These global classes are pre-defined in \`globals.css\` — use them:

| Class | Use for |
|-------|---------|
| \`glass-liquid\` | Cards, containers, modals — frosted glass with iridescent border on hover |
| \`liquid-blob\` | Background ambient blobs (1/2/3 variants) |
| \`text-iridescent\` | Hero headline accent word or phrase |
| \`pill-glass\` | Badges, tags, small labels |
| \`btn-liquid\` | Primary CTA buttons |
| \`reveal-3d\` | Any card/section that should animate in on scroll |
| \`badge-3d\` | Floating numbered step badges, XP badges |
| \`count-up\` | Stat numbers — add \`data-target\`, \`data-prefix\`, \`data-suffix\` |
| \`noise-overlay\` | Film grain — add once at top of page |
| \`depth-grid\` | Perspective grid for technical/finance hero sections |

---

## Key Features to Showcase
${brief.keyFeatures.map(f => `- ${f}`).join('\n')}

---

## Design Research Sources

### Google Stitch Prompt
Paste this at **labs.google/stitch** to generate a UI layout reference:

\`\`\`
${archetype.stitchPrompt}
Color palette: ${brief.colorPalette.join(', ')}. Brand mood: ${brief.mood.join(', ')}.
Target audience: ${brief.audience.join(', ')}.
\`\`\`

### Pinterest Search Queries
Search these on Pinterest to build a moodboard:

${pinterest.map((q, i) => `${i + 1}. \`${q}\``).join('\n')}

### getdesign.md Reference
Design system: **${ds.name}** at \`getdesign.md/design/${ds.getdesignSlug}\`

---

## Claude Implementation Notes

${archetype.claudeDesignNotes}

**When Claude writes code for this project:**
1. Check this DESIGN.md before any UI decision
2. Use brand colors \`${brief.colorPalette.join(', ')}\` — no other primary colors
3. Follow ${ds.name} spacing/radius conventions above
4. Apply layout archetype section order strictly
5. Every card → \`glass-liquid\`, every badge → \`pill-glass\`, hero text → \`text-iridescent\`
6. Nav style: \`${archetype.navStyle}\` — see layout archetype

---

*Generated: ${new Date().toISOString().split('T')[0]} by design-pipeline.ts*
`
}

// ─── Main ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const writeMode = args.includes('--write')
const allMode = args.includes('--all')
const targetId = args.find(a => !a.startsWith('--'))

const projects = targetId
  ? PROJECTS.filter(p => p.id === targetId)
  : PROJECTS

if (projects.length === 0) {
  console.error(`No project: ${targetId}`)
  console.error(`Available: ${PROJECTS.map(p => p.id).join(', ')}`)
  process.exit(1)
}

console.log(`\n${'═'.repeat(70)}`)
console.log(`DESIGN PIPELINE — ${projects.length} project(s) — write=${writeMode}`)
console.log('═'.repeat(70))

const results: Array<{id: string, ds: string, archetype: string, designMdPath: string}> = []

for (const brief of projects) {
  const archetype = pickArchetype(brief)
  const dsKey = pickDesignSystem(brief)
  const ds = DESIGN_SYSTEMS[dsKey]
  const designMd = generateDesignMd(brief, archetype, dsKey)

  console.log(`\n▶ ${brief.name} (${brief.id})`)
  console.log(`  Layout:  ${archetype.name}`)
  console.log(`  Design:  ${ds.name}`)
  console.log(`  Colors:  ${brief.colorPalette.join(' · ')}`)

  // Determine path
  const hasAppDir = fs.existsSync(path.join(brief.localPath, 'app'))
  const hasSrcApp = fs.existsSync(path.join(brief.localPath, 'src', 'app'))
  const designMdPath = path.join(brief.localPath, 'DESIGN.md')

  console.log(`  Path:    ${designMdPath}`)

  if (writeMode) {
    fs.writeFileSync(designMdPath, designMd, 'utf-8')
    console.log(`  ✅ Written DESIGN.md`)
  } else {
    console.log(`  ⓘ  Dry run — use --write to save DESIGN.md`)
  }

  // Pinterest queries
  const pinterest = pinterestQueries(brief, archetype)
  console.log(`\n  📌 Pinterest queries:`)
  pinterest.slice(0, 3).forEach(q => console.log(`     "${q}"`))

  // Stitch prompt
  console.log(`\n  🎨 Stitch prompt (first 120 chars):`)
  console.log(`     "${archetype.stitchPrompt.slice(0, 120)}..."`)

  results.push({ id: brief.id, ds: ds.name, archetype: archetype.name, designMdPath })
}

console.log('\n' + '═'.repeat(70))
console.log('SUMMARY')
console.log('═'.repeat(70))
console.log(`${'Project'.padEnd(30)} ${'Design System'.padEnd(20)} Archetype`)
console.log('─'.repeat(70))
results.forEach(r => {
  console.log(`${r.id.padEnd(30)} ${r.ds.padEnd(20)} ${r.archetype}`)
})

if (!writeMode) {
  console.log(`\nTo write DESIGN.md to all projects:`)
  console.log(`  npx ts-node design-pipeline.ts --write`)
  console.log(`\nTo write for one project:`)
  console.log(`  npx ts-node design-pipeline.ts language-learning-bot --write`)
}

console.log()
