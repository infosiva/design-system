#!/usr/bin/env node
// Contrast gate: every visible text node must hit WCAG AA against its REAL rendered background.
// Usage: node design-system/scripts/contrast-gate.mjs --base http://localhost:3000 --paths /,/exam,/pricing [--min 4.5]
// Exit 2 on any offender. Walks ancestors compositing rgba backgrounds; gradients use the worst-case stop.
import { chromium } from 'playwright'

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const base = arg('base', 'http://localhost:3000')
const paths = arg('paths', '/').split(',')
const MIN = Number(arg('min', '4.5'))

const scan = (MIN) => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1
  const cx = cv.getContext('2d', { willReadFrequently: true })
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255] }
  const over = (f, b) => [0, 1, 2].map(i => f[i] * f[3] + b[i] * (1 - f[3])).concat([1])
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b) }
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05) }
  const TOK = /(rgba?\([^)]*\)|#[0-9a-f]{3,8}\b|oklch\([^)]*\)|oklab\([^)]*\)|color\([^)]*\))/gi
  // background candidates behind el (array = gradient stops, worst case checked)
  const bgs = (el) => {
    let layers = [[[255, 255, 255, 1]]]
    const chain = []; for (let e = el; e; e = e.parentElement) chain.push(e)
    for (const e of chain.reverse()) {
      const s = getComputedStyle(e)
      const stops = s.backgroundImage !== 'none' ? (s.backgroundImage.match(TOK) || []).map(rgba) : null
      const solid = rgba(s.backgroundColor)
      let next = layers
      if (solid[3] > 0) next = layers.map(l => l.map(b => over(solid, b)))
      if (stops && stops.length) next = [next.flat().flatMap(b => stops.map(st => over(st, b)))]
      layers = next
    }
    return layers.flat()
  }
  const out = []
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const seen = new Set()
  for (let n; (n = w.nextNode());) {
    if (!n.textContent.trim()) continue
    const el = n.parentElement
    if (!el || seen.has(el) || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) continue
    seen.add(el)
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el)
    if (r.width < 1 || r.height < 1 || s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) continue
    let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity
    if ((s.webkitBackgroundClip || s.backgroundClip) === 'text') continue // gradient-clipped text: fg is transparent by design, checked by eye
    const fg = rgba(s.color); fg[3] *= op
    const px = parseFloat(s.fontSize), bold = +s.fontWeight >= 700
    const need = px >= 24 || (px >= 18.66 && bold) ? 3 : MIN
    let worst = 99, bgUsed = null
    for (const b of bgs(el)) { const rr = ratio(over(fg, b), b); if (rr < worst) { worst = rr; bgUsed = b } }
    if (worst < need) out.push({ text: n.textContent.trim().slice(0, 40), ratio: +worst.toFixed(2), need, fg: s.color, bg: bgUsed.slice(0, 3).map(Math.round).join(','), sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '') })
  }
  return out
}

const br = await chromium.launch()
let bad = 0
for (const [w, h] of [[375, 812], [1280, 800]]) {
  const ctx = await br.newContext({ viewport: { width: w, height: h } })
  const ck = arg('cookie') // optional name=value for auth-gated pages (e.g. hub_auth=...)
  if (ck) { const [name, ...v] = ck.split('='); await ctx.addCookies([{ name, value: v.join('='), url: base }]) }
  const pg = await ctx.newPage()
  for (const p of paths) {
    await pg.goto(base + p, { waitUntil: 'networkidle' }).catch(() => {})
    await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=250){scrollTo(0,y);await new Promise(r=>setTimeout(r,300))}scrollTo(0,0)})
    await pg.waitForTimeout(1500) // let reveal-on-scroll finish so mid-fade opacity is not scored
    await pg.addStyleTag({ content: '*{animation:none!important;transition:none!important}' })
    const off = await pg.evaluate(scan, MIN)
    bad += off.length
    console.log(`${w}px ${p}: ${off.length} low-contrast`)
    for (const o of off.slice(0, 15)) console.log(`  ${o.ratio}<${o.need} "${o.text}" ${o.sel} fg=${o.fg} bg=rgb(${o.bg})`)
  }
}
await br.close()
console.log(bad ? `FAIL: ${bad} low-contrast text nodes` : 'PASS: all text meets contrast')
process.exit(bad ? 2 : 0)
