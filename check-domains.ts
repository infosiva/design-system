#!/usr/bin/env ts-node
/**
 * Domain availability checker
 * Priority: Vercel registrar API → Porkbun API → WHOIS fallback
 * Usage: npx ts-node check-domains.ts
 *        npx ts-node check-domains.ts --buy protoforge.app   (purchase via Vercel)
 */

import { execSync } from 'child_process'

// ── Config ─────────────────────────────────────────────────────────────────

const VERCEL_TOKEN = (() => {
  try {
    const auth = JSON.parse(
      execSync('cat ~/Library/Application\\ Support/com.vercel.cli/auth.json', { encoding: 'utf8' })
    )
    return auth.token as string
  } catch {
    return process.env.VERCEL_TOKEN ?? ''
  }
})()

// Products without domains — candidates to check
const DOMAIN_CANDIDATES: Record<string, string[]> = {
  'social-media-calendar': [
    'skedai.app', 'schedul.ai', 'postcal.app', 'aipost.app', 'postsync.app',
    'calpost.app', 'draftcal.app', 'postcalendar.app',
  ],
  'ai-investment-tracker': [
    'trackwealth.app', 'portfoliai.app', 'investiq.app', 'portai.app',
    'wealthai.app', 'portfolly.app', 'trackfolio.app',
  ],
  'ai-travel-planner': [
    'tripsync.app', 'tripai.app', 'plantrip.app', 'voyageai.app',
    'journeyai.app', 'tripwise.app', 'aitrip.app',
    'packedai.app', 'packlist.app', 'getaway.app', 'daytrip.app',
    'tripdraft.app', 'triptailor.app', 'gotrip.app', 'routeai.app',
    'tripcraft.app', 'wanderplan.app', 'flightplan.app', 'tripsketch.app',
  ],
  'language-learning-bot': [
    'speakly.app', 'learniq.app', 'lingual.app', 'verbai.app',
    'polyai.app', 'chattutor.app', 'speakiq.app',
  ],
  'complybuddy': [
    'complybuddy.app', 'policyai.app', 'complyai.app', 'auditai.app',
    'govai.app', 'ruleai.app', 'complianceai.app',
  ],
  'agenttrace': [
    'agenttrace.app', 'agentlog.app', 'traceagent.app', 'agentlens.app',
    'llmtrace.app', 'agentviz.app', 'agentmon.app',
  ],
  'protoforge': [
    'protofast.app', 'wirefast.app', 'protoai.app', 'protokit.app',
    'buildproto.app', 'protoship.app', 'protoflare.app',
  ],
}

// ── Vercel registrar check ──────────────────────────────────────────────────

interface DomainResult {
  available: boolean
  price: number | null
  source: string
}

async function vercelCheck(domain: string): Promise<DomainResult | null> {
  if (!VERCEL_TOKEN) return null
  try {
    const [availRes, priceRes] = await Promise.all([
      fetch(`https://api.vercel.com/v1/registrar/domains/${domain}/availability`, {
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      }),
      fetch(`https://api.vercel.com/v1/registrar/domains/${domain}/price`, {
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      }),
    ])
    const avail = await availRes.json() as { available: boolean }
    const price = await priceRes.json() as { purchasePrice: number | null; renewalPrice: number }
    return {
      available: avail.available,
      price: price.purchasePrice ?? price.renewalPrice ?? null,
      source: 'vercel',
    }
  } catch {
    return null
  }
}

// ── Porkbun API fallback ────────────────────────────────────────────────────
// Uses public pricing/availability endpoint (no auth required for check)

async function porkbunCheck(domain: string): Promise<DomainResult | null> {
  try {
    const res = await fetch('https://porkbun.com/api/json/v3/pricing/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secretapikey: '', apikey: '' }),
    })
    // Porkbun public pricing — use WHOIS for actual availability
    const tld = domain.split('.').slice(1).join('.')
    const data = await res.json() as { pricing?: Record<string, { registration: string }> }
    const price = data.pricing?.[tld]?.registration
    // Fall through to WHOIS for actual availability
    const whoisAvail = await whoisCheck(domain)
    return {
      available: whoisAvail,
      price: price ? parseFloat(price) : null,
      source: 'porkbun',
    }
  } catch {
    return null
  }
}

// ── WHOIS / DNS fallback ────────────────────────────────────────────────────

async function whoisCheck(domain: string): Promise<boolean> {
  try {
    // Quick DNS lookup — if NXDOMAIN, domain likely unregistered
    execSync(`dig +short NS ${domain}`, { encoding: 'utf8', timeout: 5000 })
    const result = execSync(`dig +short A ${domain}`, { encoding: 'utf8', timeout: 5000 }).trim()
    return result === '' // no A record = likely available
  } catch {
    return true // error = unresolvable = likely available
  }
}

// ── Vercel buy ─────────────────────────────────────────────────────────────

async function vercelBuy(domain: string): Promise<boolean> {
  if (!VERCEL_TOKEN) {
    console.error('No Vercel token found')
    return false
  }
  try {
    const res = await fetch('https://api.vercel.com/v1/registrar/domains', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain, expectedPrice: 20 }),
    })
    const text = await res.text()
    if (!res.ok) {
      const err = text ? JSON.parse(text) : {}
      console.error(`Buy failed (${res.status}): ${err?.error?.message ?? text}`)
      return false
    }
    // 200/201 with body or 204 no content — both mean success
    if (text) {
      const data = JSON.parse(text) as { domain?: { name: string }; error?: { message: string } }
      if (data.error) {
        console.error(`Buy failed: ${data.error.message}`)
        return false
      }
    }
    return true
  } catch (e) {
    console.error('Buy error:', e)
    return false
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

;(async () => {
  const args = process.argv.slice(2)
  const buyDomain = args.includes('--buy') ? args[args.indexOf('--buy') + 1] : null

  // --buy mode
  if (buyDomain) {
    console.log(`\n${BOLD}Purchasing ${buyDomain} via Vercel...${RESET}`)
    const check = await vercelCheck(buyDomain)
    if (!check?.available) {
      console.log(`${RED}✗ ${buyDomain} not available${RESET}`)
      process.exit(1)
    }
    console.log(`${CYAN}Price: $${check.price}/yr${RESET}`)
    const ok = await vercelBuy(buyDomain)
    if (ok) {
      console.log(`${GREEN}✓ Purchased ${buyDomain}${RESET}`)
    }
    return
  }

  // Availability check mode
  console.log(`\n${BOLD}Domain Availability Check${RESET}`)
  console.log(`Checking Vercel registrar → Porkbun → DNS fallback\n`)
  if (!VERCEL_TOKEN) {
    console.log(`${YELLOW}⚠ No Vercel token found — using DNS fallback only${RESET}\n`)
  }

  const available: Array<{ product: string; domain: string; price: number | null; source: string }> = []

  for (const [product, domains] of Object.entries(DOMAIN_CANDIDATES)) {
    console.log(`${BOLD}${CYAN}${product}${RESET}`)
    let foundOne = false

    for (const domain of domains) {
      let result = await vercelCheck(domain)

      if (!result) {
        result = await porkbunCheck(domain) ?? {
          available: await whoisCheck(domain),
          price: null,
          source: 'dns',
        }
      }

      const icon = result.available ? `${GREEN}✅` : `${RED}✗`
      const priceStr = result.price ? `  $${result.price}/yr` : ''
      const src = result.source !== 'vercel' ? ` ${YELLOW}[${result.source}]${RESET}` : ''
      console.log(`  ${icon} ${domain}${priceStr}${src}${RESET}`)

      if (result.available) {
        foundOne = true
        available.push({ product, domain, price: result.price, source: result.source })
      }
    }

    if (!foundOne) console.log(`  ${YELLOW}⚠ No candidates available — expand list${RESET}`)
    console.log()
  }

  // Summary
  console.log(`${BOLD}━━━ AVAILABLE — BUY THESE ━━━${RESET}`)
  if (available.length === 0) {
    console.log(`${RED}None found. Expand candidate list.${RESET}`)
  } else {
    for (const { product, domain, price, source } of available) {
      const priceStr = price ? `$${price}/yr` : 'price unknown'
      const buyCmd = source === 'vercel'
        ? `npx ts-node check-domains.ts --buy ${domain}`
        : `visit porkbun.com or namecheap.com`
      console.log(`  ${GREEN}${domain}${RESET}  (${product})  ${CYAN}${priceStr}${RESET}`)
      console.log(`    → ${buyCmd}`)
    }
  }

  // Best pick per product
  console.log(`\n${BOLD}━━━ RECOMMENDED (first available per product) ━━━${RESET}`)
  const seen = new Set<string>()
  for (const { product, domain, price } of available) {
    if (!seen.has(product)) {
      seen.add(product)
      console.log(`  ${BOLD}${product}${RESET} → ${GREEN}${domain}${RESET}  ($${price ?? '?'}/yr)`)
    }
  }
})()
