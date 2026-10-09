// Heuristic gate audit: node design-system/scripts/prod-ready-check.mjs [--md]
// Greps each project for gate signals. Flags are hints; verify by hand.
import fs from 'node:fs'; import path from 'node:path'
const root = path.resolve(import.meta.dirname, '../..')
const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'out', '.vercel'])
function walk(d, depth, acc) {
  if (depth > 5) return acc
  let es; try { es = fs.readdirSync(d, { withFileTypes: true }) } catch { return acc }
  for (const e of es) {
    if (SKIP.has(e.name) || e.name.startsWith('.')) continue
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p, depth + 1, acc)
    else if (/\.(tsx?|jsx?|mjs|css)$/.test(e.name)) acc.push(p)
  }
  return acc
}
const checks = {
  chatbot: /FloatingChat|api\/chat(bot)?/, feedback: /FeedbackWidget|api\/feedback/,
  analytics: /@vercel\/analytics|posthog|gtag|ga4/i, promo: /promo|access-codes/i,
  theme: /theme-loader|theme_|design-system|AnimatedBg/, notFound: /not-found/,
}
const rows = []
for (const n of fs.readdirSync(root)) {
  const d = path.join(root, n)
  if (!fs.statSync(d).isDirectory() || SKIP.has(n) || n.startsWith('.')) continue
  const hasApp = ['app', 'src/app', 'pages', 'public/index.html'].some(x => fs.existsSync(path.join(d, x)))
  if (!hasApp || !fs.existsSync(path.join(d, 'package.json')) && !fs.existsSync(path.join(d, 'public/index.html'))) continue
  const files = walk(d, 0, [])
  const blob = files.map(f => { try { return fs.readFileSync(f, 'utf8') } catch { return '' } }).join('\n')
  const names = files.join('\n')
  const r = { project: n }
  for (const [k, re] of Object.entries(checks)) r[k] = re.test(k === 'notFound' ? names : blob) ? 'Y' : '-'
  r.handoff = fs.existsSync(path.join(d, 'HANDOFF.md')) ? 'Y' : '-'
  rows.push(r)
}
const cols = ['project', 'chatbot', 'feedback', 'analytics', 'promo', 'theme', 'notFound', 'handoff']
const line = r => '| ' + cols.map(c => r[c]).join(' | ') + ' |'
console.log(['| ' + cols.join(' | ') + ' |', '|' + cols.map(() => '---').join('|') + '|', ...rows.map(line)].join('\n'))
console.error(rows.length + ' projects')
