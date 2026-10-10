#!/bin/bash
# VPS job: free-LLM health (every 5 min) + design-system gates (weekly). Telegram alert on failure only.
# Reuses site-watchdog's Telegram env. Cron lines (owner installs):
#   */5 * * * *  bash /root/agents/design-system/scripts/vps-audit.sh health
#   0 4 * * 1    bash /root/agents/design-system/scripts/vps-audit.sh weekly
set -u
cd "$(dirname "$0")/.." || exit 1
[ -f /root/site-watchdog/.env ] && set -a && . /root/site-watchdog/.env && set +a
alert() { [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && curl -s -m10 "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID:-}" --data-urlencode "text=design-system: $1" >/dev/null; }

case "${1:-health}" in
  health)
    out=$(node scripts/free-llm-health.mjs 2>&1) || { alert "no free LLM tier reachable: $out"; exit 2; }
    ;;
  weekly)
    git pull --ff-only -q 2>&1 | tail -1
    fail=""
    out=$(node scripts/free-llm-health.mjs 2>&1) || fail="$fail free-llm-health"
    npx --yes ts-node --compiler-options '{"module":"commonjs"}' scripts/check-layouts.ts >/dev/null 2>&1 || fail="$fail check-layouts"
    node scripts/check-palettes.mjs >/dev/null 2>&1 || fail="$fail check-palettes"
    [ -n "$fail" ] && { alert "weekly FAIL:$fail"; exit 2; }
    # proposals only: new skills/tools/free models land in candidates files for owner approval, never auto-installed
    disc=$(node scripts/discover.mjs 2>&1 | tail -2 | tr '\n' ' ')
    alert "weekly audit PASS (layouts, palettes, free-llm). discover: $disc"
    ;;
esac
