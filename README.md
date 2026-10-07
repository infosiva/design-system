# design-system

Automated design pipeline: idea → DESIGN.md → scaffold → GitHub → Vercel

## Tech stack
TypeScript

## Run locally
```bash
git clone https://github.com/infosiva/design-system.git && cd design-system
npm install
cp .env.example .env.local   # names only, fill in your own values
npm run dev                    # http://localhost:3000
```

## Scripts

## Environment variables
Names only; never commit real values. Everything is optional unless the feature needs it.

**AI providers (free-first chain; any one is enough):** `GROQ_API_KEY`

- `VERCEL_TOKEN`

## Deploy
Vercel (`vercel --prod`). Set the variables above in the project settings.

## Status & open items
See `HANDOFF.md` if present; otherwise open an issue.
