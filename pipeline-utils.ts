/**
 * Shared utilities for design-pipeline.ts and idea-to-prod.ts
 */

import { ProjectBrief } from './projects.config'
import { LayoutArchetype } from './layout-archetypes'

export const DESIGN_SYSTEMS: Record<string, {
  name: string; description: string; mood: string[]; category: string[]
  getdesignSlug: string; typography: string; colorProfile: string
  radiusProfile: string; shadowProfile: string; spacingProfile: string
  keyPrinciples: string[]
}> = {
  notion: {
    name: 'Notion', description: 'Clean, document-first, off-white backgrounds, Inter font, minimal borders',
    mood: ['minimal', 'calm', 'serious'], category: ['Productivity', 'EdTech', 'LegalTech'],
    getdesignSlug: 'notion',
    typography: 'Inter 14-16px body, 24-32px headings, tight tracking on display',
    colorProfile: 'Near-white bg (#FAFAF9), near-black text (#37352F), subtle borders (#E9E9E7)',
    radiusProfile: 'Subtle: 4-6px on cards, 2px on inputs',
    shadowProfile: 'Very subtle: 0 1px 3px rgba(0,0,0,0.08)',
    spacingProfile: '4/8/16/24/40px scale, generous paragraph spacing',
    keyPrinciples: ['Content is the UI — chrome disappears', 'Hover reveals actions', 'Monochrome base, single accent max', 'Dense information in minimal space'],
  },
  airbnb: {
    name: 'Airbnb', description: 'Warm, photography-heavy, Cereal font, rausch red accent, card-first',
    mood: ['playful', 'premium', 'calm'], category: ['TravelTech', 'Lifestyle', 'MarketingTech'],
    getdesignSlug: 'airbnb',
    typography: 'Circular/Cereal (use Plus Jakarta Sans), 16px body, bold 32-48px hero',
    colorProfile: 'White bg, #FF5A5F rausch red CTA, warm gray #767676 secondary text',
    radiusProfile: 'Generous: 16-24px cards, 8px inputs, pill CTAs',
    shadowProfile: '0 6px 16px rgba(0,0,0,0.12) cards, 0 1px 2px rgba(0,0,0,0.08) default',
    spacingProfile: '8/16/24/40/64px, generous whitespace sections',
    keyPrinciples: ['Photography tells the story — UI steps back', 'Cards are first-class citizens', 'Warm, welcoming microcopy', 'Search/filter always accessible'],
  },
  stripe: {
    name: 'Stripe', description: 'Premium, authoritative, gradient accents, structured docs-like layout',
    mood: ['premium', 'authoritative', 'serious'], category: ['FinTech', 'LegalTech', 'CareerTech'],
    getdesignSlug: 'stripe',
    typography: 'Inter, 15px body, tight leading, 20-28px section headers',
    colorProfile: '#0A2540 dark navy, #635BFF indigo accent, #00D4FF cyan highlight',
    radiusProfile: '6-8px standard, 4px inputs, 12px large cards',
    shadowProfile: '0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0,0,0,0.08)',
    spacingProfile: '8/16/24/32/48px, tight nav, spacious sections',
    keyPrinciples: ['Trust through precision', 'Gradient as depth not decoration', 'Code examples first-class', 'Dark mode is premium'],
  },
  linear: {
    name: 'Linear', description: 'Ultra-minimal, dark-first, command-palette feel, sharp edges, speed',
    mood: ['minimal', 'serious', 'energetic'], category: ['Productivity', 'developer'],
    getdesignSlug: 'linear',
    typography: 'Inter, 13-14px UI text, 11px labels, 36-48px hero in bold',
    colorProfile: '#0F111A bg, #5E6AD2 purple accent, #fff 85% text, borders 8% white',
    radiusProfile: 'Sharp: 4-6px everywhere, no pill shapes in chrome',
    shadowProfile: 'None in dark mode, depth via border opacity',
    spacingProfile: '4/8/12/16/24/40px tight scale',
    keyPrinciples: ['Speed is a feature', 'Dark canvas, bright accent', 'Keyboard-first', 'Data density without clutter'],
  },
  binance: {
    name: 'Binance', description: 'Finance terminal, yellow-on-dark, data-dense, monospace numbers',
    mood: ['authoritative', 'serious', 'energetic'], category: ['FinTech'],
    getdesignSlug: 'binance',
    typography: 'IBM Plex Sans body, IBM Plex Mono for numbers',
    colorProfile: '#0B0E11 bg, #F0B90B yellow, #0ECB81 green up, #F6465D red down',
    radiusProfile: '4px standard, 2px on data cells, 8px on cards',
    shadowProfile: 'Border-based depth, no box shadows',
    spacingProfile: '4/8/12/16/24px tight',
    keyPrinciples: ['Data is product — maximize density', 'Color = signal', 'Monospace for numbers', 'Dark theme only'],
  },
  cal: {
    name: 'Cal.com', description: 'Open, clean calendar-first, neutral palette, scheduling-focused',
    mood: ['minimal', 'calm', 'serious'], category: ['Productivity', 'MarketingTech'],
    getdesignSlug: 'cal-com',
    typography: 'Inter, 14px body, clean 20-28px headers',
    colorProfile: 'White bg, #111827 text, #6D28D9 subtle purple accent',
    radiusProfile: '8px cards and inputs, 4px small elements',
    shadowProfile: '0 1px 2px 0 rgba(0,0,0,0.05)',
    spacingProfile: '4/8/16/24/32/48px, balanced calendar grid',
    keyPrinciples: ['Calendar is hero', 'Light, accessible', 'No unnecessary chrome', 'Grid-based layouts'],
  },
  clay: {
    name: 'Clay', description: 'Organic, colorful gradients, bubbly shapes, creative agency energy',
    mood: ['playful', 'energetic', 'premium'], category: ['MarketingTech', 'EdTech', 'Lifestyle', 'Entertainment'],
    getdesignSlug: 'clay',
    typography: 'Plus Jakarta Sans, 16px body, bold display 48-72px',
    colorProfile: 'Rich gradients: purple→pink→orange, white text, translucent cards',
    radiusProfile: 'Very generous: 24-32px cards, 999px pills, organic shapes',
    shadowProfile: 'Colorful glows matching brand, 0 20px 60px rgba(color,0.3)',
    spacingProfile: '8/16/24/40/80px generous',
    keyPrinciples: ['Color as personality', 'Organic shapes break grid monotony', 'Motion is brand', 'Every section unique'],
  },
  apple: {
    name: 'Apple', description: 'Premium hardware feel, SF Pro, generous whitespace, product-showcase first',
    mood: ['premium', 'minimal', 'serious'], category: ['consumer', 'CareerTech'],
    getdesignSlug: 'apple',
    typography: 'SF Pro/system-ui, 17px body, massive 56-80px hero, tight tracking',
    colorProfile: 'Pure white or black, single blue #0071E3 CTA, gray hierarchy',
    radiusProfile: '12-18px cards, 980px max-width sections',
    shadowProfile: 'None on dark, subtle on light: 0 2px 12px rgba(0,0,0,0.08)',
    spacingProfile: '24/40/64/80/120px cinematic section spacing',
    keyPrinciples: ['One hero message per page', 'Product is star — UI disappears', 'Cinematic scroll reveals', 'Typography does heavy lifting'],
  },
  airtable: {
    name: 'Airtable', description: 'Colorful, grid/spreadsheet-first, friendly professional',
    mood: ['playful', 'calm', 'energetic'], category: ['Productivity', 'MarketingTech'],
    getdesignSlug: 'airtable',
    typography: 'Inter, 14px body, 18-24px headings, color-coded cells',
    colorProfile: 'White bg, multi-color accents (#FCB400 yellow, #18BFFF blue, #F82B60 red)',
    radiusProfile: '6px cells, 8px cards, 4px inputs',
    shadowProfile: '0 0 0 2px accent on focus, minimal ambient shadows',
    spacingProfile: '4/8/16/24/32px, grid-aligned',
    keyPrinciples: ['Structure is friendly', 'Color codes meaning', 'Every view feels native', 'Enterprise power, consumer usability'],
  },
}

export function pickDesignSystem(brief: ProjectBrief): string {
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

export function pinterestQueries(brief: ProjectBrief, archetype: LayoutArchetype): string[] {
  const cat = brief.category.toLowerCase()
  const mood = brief.mood[0]
  return [
    `${cat} app UI design ${mood} 2024`,
    `${archetype.heroVariant} hero section web design dark`,
    `${brief.name.toLowerCase()} landing page design inspiration`,
    `${cat} SaaS website design`,
    `${mood} ${brief.contentDensity} density UI kit`,
    `web design ${brief.competitorStyle?.replace('like ', '') ?? cat} inspired`,
  ]
}

export function generateDesignMd(
  brief: ProjectBrief,
  archetype: LayoutArchetype,
  dsKey: string
): string {
  const ds = DESIGN_SYSTEMS[dsKey]
  const pinterest = pinterestQueries(brief, archetype)

  return `# DESIGN.md — ${brief.name}

> Auto-generated by design-pipeline. Edit freely, re-run to regenerate.
> This file is the source of truth for all UI decisions in this project.
> Claude reads this before writing any UI code.

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

### Color Palette
${ds.colorProfile}

**Brand colors:** ${brief.colorPalette.join(' · ')}

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

### Hero: \`${archetype.heroVariant}\` | Nav: \`${archetype.navStyle}\` | Cards: \`${archetype.cardStyle}\`

---

## CSS Classes (pre-built in globals.css)

| Class | Use for |
|-------|---------|
| \`glass-liquid\` | Cards, containers — frosted glass + iridescent border on hover |
| \`liquid-blob\` | Background ambient blobs (use liquid-blob-1/2/3) |
| \`text-iridescent\` | Hero headline accent word |
| \`pill-glass\` | Badges, tags, small labels |
| \`btn-liquid\` | Primary CTA buttons |
| \`reveal-3d\` | Cards/sections that animate in on scroll |
| \`badge-3d\` | Floating step badges, XP badges |
| \`count-up\` | Stat numbers (add data-target, data-prefix, data-suffix) |
| \`noise-overlay\` | Film grain (add once at top of page) |
| \`depth-grid\` | Perspective grid for finance/tech heroes |

---

## Key Features
${brief.keyFeatures.map(f => `- ${f}`).join('\n')}

---

## Design Research

### Google Stitch Prompt
\`\`\`
${archetype.stitchPrompt}
Colors: ${brief.colorPalette.join(', ')}. Mood: ${brief.mood.join(', ')}.
\`\`\`

### Pinterest Queries
${pinterest.map((q, i) => `${i + 1}. \`${q}\``).join('\n')}

### getdesign.md Reference
\`getdesign.md/design/${ds.getdesignSlug}\`

---

## Claude Notes
${archetype.claudeDesignNotes}

*Generated: ${new Date().toISOString().split('T')[0]}*
`
}
