# ZodiacToxicity

**How Toxic Are You Together?**

A fun, shareable web app that calculates "toxicity" scores for zodiac sign pairings. Pick two signs, get a hilarious breakdown of communication, jealousy, arguments, and more. 144 unique combos, all for entertainment.

## Features

- 144 zodiac compatibility combos (12 × 12)
- Toxicity score with category breakdowns
- Share on X, copy link, native share
- Static export—deploy anywhere
- SEO-ready: sitemap, robots.txt, OG images, JSON-LD

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TypeScript

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Outputs a static site to the `out/` directory. The site can be served by any static host (Vercel, Netlify, GitHub Pages, etc.).

## Deploy

### Vercel (recommended)

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add your domain (e.g. zodiac-toxicity.com) in Project Settings

### Other hosts

Upload the `out/` folder to any static hosting service after running `npm run build`.

## Configuration

- **Site URL**: Edit `SITE_URL` in `src/lib/constants.ts` if your domain differs from `https://zodiac-toxicity.com`.

## Contact

info@alstonanalystics.com
