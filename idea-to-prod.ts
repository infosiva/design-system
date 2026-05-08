#!/usr/bin/env npx ts-node
/**
 * IDEA → PRODUCTION PIPELINE
 *
 * Give it one sentence. It does everything:
 *   1. Parse idea → extract name, category, audience, mood, features
 *   2. Duplicate check against portfolio
 *   3. Market viability score
 *   4. Pick layout archetype
 *   5. Pick design system
 *   6. Generate DESIGN.md
 *   7. Scaffold project from template
 *   8. Write vertical.config.ts / theme
 *   9. Create GitHub repo
 *  10. Push initial commit
 *  11. Deploy to Vercel
 *  12. Add to projects.config.ts registry
 *
 * Usage:
 *   npx ts-node idea-to-prod.ts "AI tool that helps freelancers write contracts"
 *   npx ts-node idea-to-prod.ts "Recipe planner that generates grocery lists" --dry-run
 *   npx ts-node idea-to-prod.ts "Habit tracker with AI coaching" --stop-after design
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import { execSync, spawnSync } from 'child_process'
import { PROJECTS, ProjectBrief, AudienceType, MoodType, PrimaryAction } from './projects.config'
import { pickArchetype } from './layout-archetypes'
import { generateDesignMd, pickDesignSystem, DESIGN_SYSTEMS } from './pipeline-utils'

// ─── Groq AI name + feature generation (free, fast) ─────────────────────────
async function aiEnrichIdea(idea: string): Promise<{ name: string; tagline: string; keyFeatures: string[] } | null> {
  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) return null

  const prompt = `Given this product idea: "${idea}"

Return ONLY valid JSON (no markdown):
{
  "name": "CamelCase product name, 1-2 words, memorable, no spaces, no AI suffix",
  "tagline": "One punchy sentence under 10 words",
  "keyFeatures": ["feature 1", "feature 2", "feature 3", "feature 4"]
}

Name examples: ContractPilot, RecipeMind, HabitFlow, FlowTrack, SpendWise`

  return new Promise((resolve) => {
    const body = JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200, temperature: 0.7,
    })
    const req = https.request({
      hostname: 'api.groq.com', path: '/openai/v1/chat/completions', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}`, 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        try {
          const content = JSON.parse(data).choices?.[0]?.message?.content ?? ''
          resolve(JSON.parse(content.replace(/```json\n?|\n?```/g, '').trim()))
        } catch { resolve(null) }
      })
    })
    req.on('error', () => resolve(null))
    req.setTimeout(8000, () => { req.destroy(); resolve(null) })
    req.write(body); req.end()
  })
}

const AGENTS_DIR = '/Users/sivaprakasam/projects/agents'
const TEMPLATE_DIR = path.join(AGENTS_DIR, 'ai-platform-template')
const GITHUB_USER = 'infosiva'

// ─── CLI args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const idea = args.find(a => !a.startsWith('--')) ?? ''
const dryRun = args.includes('--dry-run')
const stopAfter = args.find(a => a.startsWith('--stop-after='))?.split('=')[1] ?? 'deploy'

if (!idea) {
  console.error('Usage: npx ts-node idea-to-prod.ts "your idea here"')
  console.error('  --dry-run          show plan, write nothing')
  console.error('  --stop-after=X     stop after: parse|validate|design|scaffold|github|deploy')
  process.exit(1)
}

// ─── Step 1: Parse idea → project brief via Claude/heuristics ────────────────
function parseIdea(raw: string): Partial<ProjectBrief> {
  const lower = raw.toLowerCase()

  // Category detection
  const category =
    /travel|trip|itinerary|destination/i.test(raw) ? 'TravelTech' :
    /resume|job|career|hire|cv|interview/i.test(raw) ? 'CareerTech' :
    /invest|stock|portfolio|finance|wealth|crypto|trading/i.test(raw) ? 'FinTech' :
    /learn|language|tutor|education|course|study|quiz/i.test(raw) ? 'EdTech' :
    /comply|legal|contract|regulation|gdpr|policy/i.test(raw) ? 'LegalTech' :
    /social|instagram|tiktok|twitter|content|post|calendar/i.test(raw) ? 'MarketingTech' :
    /recipe|food|meal|cook|grocery/i.test(raw) ? 'Lifestyle' :
    /health|fitness|habit|workout|meditat/i.test(raw) ? 'HealthTech' :
    /meet|transcri|notes|call|record/i.test(raw) ? 'Productivity' :
    /idea|brainstorm|business|startup|saas/i.test(raw) ? 'Productivity' :
    /weekend|event|activity|plan/i.test(raw) ? 'Lifestyle' :
    'Productivity'

  // Primary action detection
  const primaryAction: PrimaryAction =
    /track|monitor|watch/i.test(raw) ? 'track' :
    /schedul|calendar|plan/i.test(raw) ? 'schedule' :
    /learn|study|practice|quiz/i.test(raw) ? 'learn' :
    /search|find|discover|browse/i.test(raw) ? 'search' :
    /compare|vs\.|versus/i.test(raw) ? 'compare' :
    /dashboard|manage|organiz/i.test(raw) ? 'dashboard' :
    'generate'

  // Audience detection
  const audience: AudienceType[] = []
  if (/freelancer|professional|business|founder|entrepreneur/i.test(raw)) audience.push('professional')
  if (/student|learn|school|university/i.test(raw)) audience.push('student')
  if (/developer|engineer|coder|programmer/i.test(raw)) audience.push('developer')
  if (/enterprise|team|company|b2b/i.test(raw)) audience.push('enterprise')
  if (audience.length === 0) audience.push('consumer')

  // Mood detection
  const mood: MoodType[] = []
  if (/professional|business|serious|legal|comply|finance/i.test(raw)) mood.push('serious')
  if (/fun|game|play|gamif|kids|learn/i.test(raw)) mood.push('playful')
  if (/premium|luxury|professional|elite/i.test(raw)) mood.push('premium')
  if (/simple|clean|minimal|quick/i.test(raw)) mood.push('minimal')
  if (/fast|instant|quick|rapid/i.test(raw)) mood.push('energetic')
  if (mood.length === 0) mood.push('energetic')

  // Name extraction — meaningful words from idea, skip filler
  const skipWords = new Set([
    'ai', 'tool', 'app', 'that', 'which', 'to', 'for', 'with', 'and', 'or',
    'in', 'on', 'at', 'by', 'helps', 'allows', 'lets', 'makes', 'an', 'a',
    'the', 'is', 'are', 'help', 'write', 'build', 'create', 'generate',
    'using', 'use', 'via',
  ])
  const meaningful = raw.split(/\s+/).filter(w => !skipWords.has(w.toLowerCase().replace(/[^a-z]/g, '')))
  const nameWords = meaningful.slice(0, 2).map(w => w.replace(/[^a-zA-Z0-9]/g, ''))
  const rawName = nameWords.join('') || meaningful[0]?.replace(/[^a-zA-Z0-9]/g, '') || 'New'
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase() + 'AI'
  const id = rawName.toLowerCase() + '-ai'

  // Color palette by category
  const palettes: Record<string, string[]> = {
    TravelTech:    ['#0284c7', '#06b6d4', '#f59e0b'],
    CareerTech:    ['#0f172a', '#6366f1', '#22d3ee'],
    FinTech:       ['#064e3b', '#10b981', '#f59e0b'],
    EdTech:        ['#7c3aed', '#06b6d4', '#10b981'],
    LegalTech:     ['#1e40af', '#1d4ed8', '#f1f5f9'],
    MarketingTech: ['#8b5cf6', '#ec4899', '#f59e0b'],
    Lifestyle:     ['#f59e0b', '#f97316', '#10b981'],
    HealthTech:    ['#059669', '#10b981', '#6ee7b7'],
    Productivity:  ['#6366f1', '#8b5cf6', '#ec4899'],
  }

  return {
    id,
    name,
    tagline: raw.charAt(0).toUpperCase() + raw.slice(1),
    category,
    primaryAction,
    audience,
    mood,
    colorPalette: palettes[category] ?? palettes.Productivity,
    contentDensity: audience.includes('enterprise') ? 'dense' : mood.includes('minimal') ? 'sparse' : 'medium',
    keyFeatures: [
      `AI-powered ${primaryAction}`,
      'Natural language interface',
      'Instant results',
      'Export & share',
    ],
    localPath: path.join(AGENTS_DIR, id),
  }
}

// ─── Step 2: Validate ─────────────────────────────────────────────────────────
function validate(brief: Partial<ProjectBrief>): { pass: boolean; warnings: string[] } {
  const warnings: string[] = []

  // Duplicate check
  const existing = PROJECTS.find(p =>
    p.category === brief.category &&
    p.primaryAction === brief.primaryAction
  )
  if (existing) {
    warnings.push(`Similar project exists: ${existing.name} (${existing.id}) — same category + action`)
  }

  // Folder exists?
  if (fs.existsSync(brief.localPath!)) {
    warnings.push(`Folder already exists: ${brief.localPath}`)
  }

  return { pass: warnings.length === 0 || warnings.every(w => !w.includes('Folder')), warnings }
}

// ─── Step 3: Generate vertical.config content ─────────────────────────────────
function generateVerticalConfig(brief: ProjectBrief): string {
  return `import type { VerticalConfig } from './lib/types'

const config: VerticalConfig = {
  name: '${brief.name}',
  tagline: '${brief.tagline}',
  description: '${brief.tagline}',
  primaryColor: '${brief.colorPalette[0]}',
  accentColor: '${brief.colorPalette[1]}',
  category: '${brief.category}',
  primaryAction: '${brief.primaryAction}',
  audience: ${JSON.stringify(brief.audience)},
  features: ${JSON.stringify(brief.keyFeatures, null, 4)},
}

export default config
`
}

// ─── Step 4: Generate system prompt for the main API route ───────────────────
function generateSystemPrompt(brief: ProjectBrief): string {
  return `You are the AI engine for ${brief.name}.
${brief.tagline}

You help ${brief.audience.join(' and ')} users with ${brief.primaryAction}-related tasks.
Be concise, actionable, and specific. Return structured responses when asked.`
}

// ─── Step 5: Scaffold from template ──────────────────────────────────────────
function scaffold(brief: ProjectBrief, designMd: string, dry: boolean): void {
  log('3', 'Scaffolding from template...')

  if (dry) { log('3', '[dry] would cp -r template → ' + brief.localPath); return }

  // Copy template
  execSync(`cp -r "${TEMPLATE_DIR}" "${brief.localPath}"`, { stdio: 'pipe' })

  // Remove .git
  execSync(`rm -rf "${brief.localPath}/.git"`, { stdio: 'pipe' })
  // Remove node_modules (reinstall fresh)
  execSync(`rm -rf "${brief.localPath}/node_modules"`, { stdio: 'pipe' })

  // Write DESIGN.md
  fs.writeFileSync(path.join(brief.localPath, 'DESIGN.md'), designMd)

  // Write vertical.config.ts
  fs.writeFileSync(
    path.join(brief.localPath, 'vertical.config.ts'),
    generateVerticalConfig(brief)
  )

  // Update package.json name
  const pkgPath = path.join(brief.localPath, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = brief.id
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

  // Write system prompt hint into API route if exists
  const apiDir = path.join(brief.localPath, 'app', 'api')
  if (fs.existsSync(apiDir)) {
    const routes = fs.readdirSync(apiDir)
    routes.forEach(route => {
      const routeFile = path.join(apiDir, route, 'route.ts')
      if (fs.existsSync(routeFile)) {
        let content = fs.readFileSync(routeFile, 'utf-8')
        content = content.replace(
          /const SYSTEM_PROMPT\s*=\s*`[^`]*`/,
          `const SYSTEM_PROMPT = \`${generateSystemPrompt(brief)}\``
        )
        fs.writeFileSync(routeFile, content)
      }
    })
  }

  log('3', `✅ Scaffolded → ${brief.localPath}`)
}

// ─── Step 6: npm install ──────────────────────────────────────────────────────
function install(brief: ProjectBrief, dry: boolean): void {
  log('4', 'Installing dependencies...')
  if (dry) { log('4', '[dry] would npm install'); return }
  execSync('npm install --legacy-peer-deps', { cwd: brief.localPath, stdio: 'inherit' })
  log('4', '✅ Dependencies installed')
}

// ─── Step 7: GitHub repo ──────────────────────────────────────────────────────
function createGithubRepo(brief: ProjectBrief, dry: boolean): string {
  log('5', 'Creating GitHub repo...')
  const repoName = brief.id
  const repoUrl = `https://github.com/${GITHUB_USER}/${repoName}`

  if (dry) { log('5', `[dry] would create github.com/${GITHUB_USER}/${repoName}`); return repoUrl }

  // gh CLI creates repo
  execSync(
    `gh repo create ${GITHUB_USER}/${repoName} --public --description "${brief.tagline}" --confirm`,
    { cwd: brief.localPath, stdio: 'pipe' }
  )

  // Init git + push
  execSync('git init', { cwd: brief.localPath, stdio: 'pipe' })
  execSync('git add .', { cwd: brief.localPath, stdio: 'pipe' })
  execSync(`git commit -m "init: ${brief.name} — scaffolded from ai-platform-template"`, { cwd: brief.localPath, stdio: 'pipe' })
  execSync(`git remote add origin https://github.com/${GITHUB_USER}/${repoName}.git`, { cwd: brief.localPath, stdio: 'pipe' })
  execSync('git push -u origin main', { cwd: brief.localPath, stdio: 'pipe' })

  log('5', `✅ GitHub: ${repoUrl}`)
  return repoUrl
}

// ─── Step 8: Vercel deploy ────────────────────────────────────────────────────
function deployVercel(brief: ProjectBrief, dry: boolean): string {
  log('6', 'Deploying to Vercel...')

  if (dry) { log('6', `[dry] would vercel deploy → ${brief.id}.vercel.app`); return '' }

  // Link + deploy
  const result = spawnSync(
    'vercel',
    ['--yes', '--prod', `--name=${brief.id}`],
    { cwd: brief.localPath, encoding: 'utf-8' }
  )

  const url = (result.stdout ?? '').split('\n').find(l => l.includes('vercel.app')) ?? ''
  log('6', `✅ Live: ${url}`)
  return url
}

// ─── Step 9: Add to projects.config.ts ───────────────────────────────────────
function registerProject(brief: ProjectBrief, repoUrl: string, vercelUrl: string, dry: boolean): void {
  log('7', 'Adding to projects.config.ts registry...')
  if (dry) { log('7', '[dry] would append to PROJECTS array'); return }

  const configPath = path.join(__dirname, 'projects.config.ts')
  let content = fs.readFileSync(configPath, 'utf-8')

  const newEntry = `
  {
    id: '${brief.id}',
    name: '${brief.name}',
    tagline: '${brief.tagline}',
    category: '${brief.category}',
    primaryAction: '${brief.primaryAction}',
    audience: ${JSON.stringify(brief.audience)},
    mood: ${JSON.stringify(brief.mood)},
    colorPalette: ${JSON.stringify(brief.colorPalette)},
    contentDensity: '${brief.contentDensity}',
    keyFeatures: ${JSON.stringify(brief.keyFeatures)},
    localPath: '${brief.localPath}',
    vercelUrl: '${vercelUrl}',
    githubRepo: '${GITHUB_USER}/${brief.id}',
  },`

  // Insert before closing ]
  content = content.replace(/\]\s*$/, newEntry + '\n]')
  fs.writeFileSync(configPath, content)
  log('7', '✅ Registered in projects.config.ts')
}

// ─── Util ─────────────────────────────────────────────────────────────────────
function log(step: string, msg: string) {
  console.log(`  [${step}] ${msg}`)
}

function header(title: string) {
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`  ${title}`)
  console.log('─'.repeat(60))
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
;(async () => {
console.log('\n' + '═'.repeat(60))
console.log('  IDEA → PRODUCTION PIPELINE')
console.log(`  Input: "${idea}"`)
console.log(`  Mode:  ${dryRun ? 'DRY RUN' : 'LIVE'}`)
console.log('═'.repeat(60))

// Step 1: Parse + AI enrich
header('Step 1/7 — Parsing idea')
const partialBrief = parseIdea(idea)

// Try AI enrichment (Groq) for better name + features
const aiResult = await aiEnrichIdea(idea)
if (aiResult) {
  console.log(`  🤖 AI enriched: ${aiResult.name}`)
  partialBrief.name = aiResult.name
  partialBrief.id = aiResult.name.replace(/([A-Z])/g, (m, i) => (i > 0 ? '-' : '') + m).toLowerCase()
  partialBrief.tagline = aiResult.tagline
  partialBrief.keyFeatures = aiResult.keyFeatures
} else {
  console.log(`  ⓘ  No GROQ_API_KEY — using heuristic name`)
}

console.log(`  Name:     ${partialBrief.name}`)
console.log(`  ID:       ${partialBrief.id}`)
console.log(`  Category: ${partialBrief.category}`)
console.log(`  Action:   ${partialBrief.primaryAction}`)
console.log(`  Audience: ${partialBrief.audience?.join(', ')}`)
console.log(`  Mood:     ${partialBrief.mood?.join(', ')}`)
console.log(`  Colors:   ${partialBrief.colorPalette?.join(' · ')}`)
if (stopAfter === 'parse') process.exit(0)

// Step 2: Validate
header('Step 2/7 — Validating')
const brief = partialBrief as ProjectBrief
const { pass, warnings } = validate(brief)
warnings.forEach(w => console.log(`  ⚠️  ${w}`))
if (pass) console.log('  ✅ Validation passed')
else { console.log('  ❌ Blocked by validation — fix above issues'); process.exit(1) }
if (stopAfter === 'validate') process.exit(0)

// Step 3: Design
header('Step 3/7 — Design system + layout')
const archetype = pickArchetype(brief)
const dsKey = pickDesignSystem(brief)
const ds = DESIGN_SYSTEMS[dsKey]
console.log(`  Layout archetype: ${archetype.name}`)
console.log(`  Design system:    ${ds.name}`)
console.log(`  Hero:             ${archetype.heroVariant}`)
console.log(`  Nav:              ${archetype.navStyle}`)
const designMd = generateDesignMd(brief, archetype, dsKey)
console.log(`  ✅ DESIGN.md generated (${designMd.length} chars)`)

// Stitch prompt
console.log(`\n  📌 Google Stitch prompt:`)
console.log(`  "${archetype.stitchPrompt.slice(0, 100)}..."`)
if (stopAfter === 'design') {
  console.log('\n  Full DESIGN.md:\n')
  console.log(designMd)
  process.exit(0)
}

// Step 4: Scaffold
header('Step 4/7 — Scaffold project')
scaffold(brief, designMd, dryRun)
if (stopAfter === 'scaffold') process.exit(0)

// Step 5: Install
header('Step 4b/7 — npm install')
install(brief, dryRun)

// Step 6: GitHub
header('Step 5/7 — GitHub repo')
const repoUrl = createGithubRepo(brief, dryRun)
if (stopAfter === 'github') process.exit(0)

// Step 7: Deploy
header('Step 6/7 — Vercel deploy')
const vercelUrl = deployVercel(brief, dryRun)
if (stopAfter === 'deploy') process.exit(0)

// Step 8: Register
header('Step 7/7 — Register in portfolio')
registerProject(brief, repoUrl, vercelUrl, dryRun)

// Done
console.log('\n' + '═'.repeat(60))
console.log('  🚀 PIPELINE COMPLETE')
console.log('═'.repeat(60))
console.log(`  Project:  ${brief.name}`)
console.log(`  Local:    ${brief.localPath}`)
console.log(`  GitHub:   https://github.com/${GITHUB_USER}/${brief.id}`)
console.log(`  Live:     ${vercelUrl || '(dry run)'}`)
console.log(`\n  Next steps:`)
console.log(`  1. Open ${brief.localPath}/DESIGN.md — design brief ready`)
console.log(`  2. Paste Stitch prompt into labs.google/stitch`)
console.log(`  3. Search Pinterest: "${brief.category} app UI design ${brief.mood?.[0]}"`)
console.log(`  4. Run Claude on page.tsx with DESIGN.md context`)
console.log(`  5. Buy domain when MVP validates`)
console.log('═'.repeat(60))
console.log()

})().catch(e => { console.error(e); process.exit(1) })
