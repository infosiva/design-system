#!/usr/bin/env npx ts-node
/**
 * Design Layout Picker
 * Run: npx ts-node pick-layout.ts [project-id]
 * Run all: npx ts-node pick-layout.ts
 *
 * Outputs:
 *  - Matched archetype
 *  - Stitch prompt (paste into labs.google/stitch)
 *  - Claude design brief (paste into Claude to implement)
 *  - Section component checklist
 */

import { PROJECTS } from './projects.config'
import { ARCHETYPES, pickArchetype } from './layout-archetypes'

const targetId = process.argv[2]
const projects = targetId ? PROJECTS.filter(p => p.id === targetId) : PROJECTS

if (projects.length === 0) {
  console.error(`No project found with id: ${targetId}`)
  console.error(`Available: ${PROJECTS.map(p => p.id).join(', ')}`)
  process.exit(1)
}

for (const project of projects) {
  const archetype = pickArchetype(project)

  console.log('\n' + '═'.repeat(70))
  console.log(`PROJECT: ${project.name} (${project.id})`)
  console.log(`Category: ${project.category} | Action: ${project.primaryAction}`)
  console.log(`Mood: ${project.mood.join(', ')} | Audience: ${project.audience.join(', ')}`)
  console.log('═'.repeat(70))

  console.log(`\n✅ PICKED ARCHETYPE: "${archetype.name}"`)
  console.log(`   ${archetype.description}`)

  console.log('\n📐 LAYOUT SPEC:')
  console.log(`   Hero variant:  ${archetype.heroVariant}`)
  console.log(`   Nav style:     ${archetype.navStyle}`)
  console.log(`   Card style:    ${archetype.cardStyle}`)
  console.log(`   Spacing:       ${archetype.spacing}`)

  console.log('\n📋 SECTIONS (in order):')
  archetype.sections.forEach((s, i) => {
    const req = s.required ? '✓' : '○'
    console.log(`   ${req} ${i + 1}. ${s.name} → <${s.component} />`)
  })

  console.log('\n🎨 STITCH PROMPT (paste into labs.google/stitch):')
  console.log('─'.repeat(60))
  console.log(archetype.stitchPrompt)
  console.log('─'.repeat(60))

  const claudeBrief = `
# Design Implementation Brief — ${project.name}

## Project Context
- **Name:** ${project.name}
- **Tagline:** ${project.tagline}
- **Category:** ${project.category}
- **Primary CTA action:** ${project.primaryAction}
- **Target audience:** ${project.audience.join(', ')}
- **Brand mood:** ${project.mood.join(', ')}
- **Brand colors:** ${project.colorPalette.join(', ')}
- **Competitor reference:** ${project.competitorStyle || 'None specified'}

## Layout Archetype: ${archetype.name}
${archetype.description}

## Sections to Build (in order):
${archetype.sections.map((s, i) => `${i + 1}. **${s.name}** — component: \`${s.component}\` ${s.required ? '(required)' : '(optional)'}`).join('\n')}

## Design Notes:
${archetype.claudeDesignNotes}

## Key Features to Highlight:
${project.keyFeatures.map(f => `- ${f}`).join('\n')}

## Technical Stack:
- Next.js 15 App Router
- Tailwind CSS
- Global design classes: glass-liquid, liquid-blob, text-iridescent, pill-glass, btn-liquid, reveal-3d, badge-3d, count-up
- Path: \`${project.localPath}\`

## Task:
Rewrite the page.tsx for ${project.name} using the ${archetype.name} archetype.
Make it look distinctly different from a generic template —
use the brand colors, mood, and archetype layout pattern above.
DO NOT make it look the same as other projects.
`

  console.log('\n🤖 CLAUDE DESIGN BRIEF (paste to Claude to implement):')
  console.log('─'.repeat(60))
  console.log(claudeBrief)
  console.log('─'.repeat(60))
}

console.log('\n✅ Done. Total projects:', projects.length)
