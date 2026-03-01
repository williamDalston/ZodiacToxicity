# ZODIAC TOXICITY — FULL SITE AUDIT

---

## 1. PROJECT IDENTITY & PURPOSE

**What this site IS:** ZodiacToxicity is a static entertainment site that generates humorous "toxicity" compatibility scores for any two zodiac signs. Users pick two signs from a visual grid, and the site shows an animated percentage (always biased high for comedy) plus a 7-category breakdown covering Communication Toxicity, Jealousy Potential, Argument Style, Text Message Chaos, Long-Term Forecast, Breakup Method, and Restaurant Decision. Every combination produces unique, deterministic content via a seeded template engine. All 144 combos (12x12) are pre-rendered at build time as static HTML.

**Target audience:** 18-35, 70% female, social-media-active, casual astrology interest. Visits from TikTok/Instagram/Twitter shares. Mobile-first (estimated 75% mobile / 25% desktop). Low-to-medium tech savviness — they tap a link someone sent them in a group chat.

**Core value proposition:** Instant, shareable, absurdly specific zodiac humor. No signup, no paywall, loads instantly. The viral loop is built-in: you check your combo, laugh, then immediately want to check 3-5 more (friends, exes, crushes). Each new combo = new pageview = more ad impressions.

**Competitive landscape:**
- **Co-Star** — real astrology app, serious tone. ZodiacToxicity is pure comedy, zero seriousness.
- **Astrology.com compatibility pages** — generic, ad-heavy, slow. ZodiacToxicity has funnier, more specific content and a faster UX.
- **BuzzFeed quizzes** — similar viral mechanic but ZodiacToxicity has deeper, sign-specific content and dedicated SEO pages for every combo.

---

## 2. ARCHITECTURE OVERVIEW

**Tech stack:**do a deep UX/UI audit and fix
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.5.12 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Runtime | React 19.1.0 |
| Hosting | Vercel (static) |
| Database | None — all data is static JSON |
| Auth | None |
| APIs | None — zero external API calls |

**File/folder structure:**
```
ZodiacToxicity/
├── data/
│   ├── signs.json              # 12 sign profiles (18 trait fields each)
│   ├── templates.json          # 7 categories x 6-7 templates each
│   └── specials.json           # Hand-written lines for 17 popular combos
├── public/
│   └── og/                     # 144 pre-generated OG images (PNG, 1200x630)
├── scripts/
│   └── generate-og-images.ts   # OG image generator (run manually)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata, skip-link)
│   │   ├── page.tsx            # Homepage (hero, selector, showcase, how-it-works)
│   │   ├── globals.css         # Theme, animations, glass-card, custom scrollbar
│   │   ├── not-found.tsx       # Custom 404
│   │   ├── robots.ts           # robots.txt generator
│   │   ├── sitemap.ts          # sitemap.xml (147 URLs)
│   │   ├── [combo]/page.tsx    # Results page (144 static pages)
│   │   ├── privacy/page.tsx    # Privacy policy
│   │   └── terms/page.tsx      # Terms of service
│   ├── components/
│   │   ├── StarField.tsx       # Canvas-based animated star background (client)
│   │   ├── Header.tsx          # Site logo/branding
│   │   ├── Footer.tsx          # Disclaimer, privacy, terms, contact
│   │   ├── ComboSelector.tsx   # Two zodiac grids + CTA button (client)
│   │   ├── ZodiacGrid.tsx      # 4x3 grid of clickable sign cards (client)
│   │   ├── ZodiacCard.tsx      # Individual sign button with glow effects (client)
│   │   ├── ToxicityCounter.tsx # Animated SVG ring counter 0→score% (client)
│   │   ├── CategoryBreakdown.tsx # Score card per category (server)
│   │   ├── ShareButtons.tsx    # Twitter/Copy/Native share (client)
│   │   ├── RelatedCombos.tsx   # 6 related combo links (server)
│   │   ├── ToxicShowcase.tsx   # "Most Toxic Combos" grid (server)
│   │   ├── StatsBar.tsx        # Stats: 144 / 7 / 100% (server)
│   │   ├── ScoreBadge.tsx      # Inline colored score pill (server)
│   │   ├── MostToxicTeaser.tsx  # "Your sign's most toxic match" CTA (server)
│   │   ├── AdPlaceholder.tsx   # Ad slot placeholder, hidden until AdSense (server)
│   │   └── AffiliateCTA.tsx    # Affiliate card with CTA (server)
│   └── lib/
│       ├── types.ts            # TypeScript interfaces + SIGN_SLUGS
│       ├── constants.ts        # SITE_URL, ZODIAC_SIGNS, colors, element matrix
│       ├── utils.ts            # cn(), seededRandom(), hashCombo()
│       ├── score.ts            # Score calculation + tier classification
│       └── generate-result.ts  # Template engine (core data pipeline)
├── next.config.ts              # output: "export", images: unoptimized
├── vercel.json                 # Security headers
├── package.json                # 4 deps, 8 devDeps
├── tsconfig.json               # Strict mode, @/* path alias
└── NEXT_STEPS.md               # Deployment checklist
```

**Data flow:**
1. User taps two zodiac signs on the homepage `ComboSelector` (client-side state)
2. CTA button triggers `router.push("/{sign1}-{sign2}")` — navigates to pre-rendered static page
3. Page was generated at build time: `generateStaticParams()` produced all 144 combos
4. `generateResult(sign1, sign2)` runs at build time: seeds PRNG from combo hash → picks templates → fills placeholders with sign traits → calculates scores → returns `ComboResult`
5. Static HTML served from CDN. No server. No database. No API calls.

**Database schema:** N/A — no database. Data lives in 3 JSON files.

**API routes/endpoints:** None. Pure static export.

**Third-party integrations:** None currently active. Placeholders exist for:
- Google AdSense (3 ad slot placeholders per results page)
- Affiliate programs: Co-Star, BetterHelp, Hinge, Amazon (links point to product homepages, no affiliate IDs)

**State management:** React `useState` in 4 client components. No global state, no context, no store. Sign selection is local to `ComboSelector`. All results are server-rendered at build time.

---

## 3. CURRENT STYLING & DESIGN AUDIT

### Color Palette

**Brand / Background:**
| Role | Hex | Usage |
|------|-----|-------|
| Primary BG | `#0f0c29` | Deep space purple — body gradient start, scrollbar track |
| Secondary BG | `#302b63` | Mid purple — body gradient mid, scrollbar thumb |
| Tertiary BG | `#24243e` | Slate purple — body gradient end |
| Primary Text | `#f0e6ff` | Light lavender — all body text |
| Muted Text | `#a78bfa` | Medium purple — subtitles, labels, muted content |
| Accent Purple | `#8b5cf6` | Buttons, links, focus outlines, scrollbar hover |
| Accent Pink | `#ec4899` | Brand accent, share button |

**Score Tiers:**
| Tier | Hex | Range |
|------|-----|-------|
| Concerning | `#EAB308` (yellow) | 60-70% |
| Volatile | `#F97316` (orange) | 71-85% |
| Catastrophic | `#EF4444` (red) | 86-95% |
| Cosmically Doomed | `#A855F7` (purple) | 96-100% |

**12 Sign Colors:**
| Sign | Hex |
|------|-----|
| Aries | `#FF4136` |
| Taurus | `#2ECC40` |
| Gemini | `#FFDC00` |
| Cancer | `#B10DC9` |
| Leo | `#FF851B` |
| Virgo | `#3D9970` |
| Libra | `#FF69B4` |
| Scorpio | `#85144B` |
| Sagittarius | `#F012BE` |
| Capricorn | `#3B82A0` |
| Aquarius | `#7FDBFF` |
| Pisces | `#0074D9` |

**Transparency effects:**
- Glass-card BG: `rgba(255,255,255,0.05)`
- Glass-card border: `rgba(255,255,255,0.1)`
- Hover states: `white/10`, `white/50`
- Muted text: `white/30`, `white/40`, `white/50`

### Typography

| Element | Font | Size (mobile → desktop) | Weight |
|---------|------|------------------------|--------|
| Display headings | Space Grotesk | `text-4xl` → `text-6xl` (h2), `text-2xl` → `text-3xl` (h3) | 900 (black) / 700 (bold) |
| Body text | Inter | `text-sm` → `text-base` | 400 |
| Score number | Space Grotesk | `text-5xl` → `text-7xl` | 900 (black), tabular-nums |
| Category score | Space Grotesk | `text-xl` → `text-2xl` | 900 (black), tabular-nums |
| Small/meta | Inter | `text-xs` | 400 |
| Zodiac symbol | Serif (system) | `text-3xl` → `text-7xl` | N/A |

### Border Radius
- Glass cards: `1rem` (16px) via `.glass-card`
- Buttons: `rounded-full` (9999px pill shape)
- Zodiac cards: `rounded-xl` (12px)
- Progress bars: `rounded-full`
- Score badge: `rounded-full`
- Affiliate cards: `rounded-2xl` (16px)

### Spacing System
- Tailwind defaults (4px base). Common patterns: `p-4`/`p-6`/`p-8`, `gap-3`/`gap-4`/`gap-6`, `mb-4`/`mb-8`/`mb-10`, `mt-12`/`mt-16`. Max-width containers: `max-w-3xl` (results), `max-w-4xl` (showcase), `max-w-5xl` (selector).

### Shadow Usage
- `box-shadow: 0 0 20px rgba(139,92,246,0.3)` → `0 0 40px rgba(139,92,246,0.6)` (pulse-glow animation)
- `filter: drop-shadow(0 0 12px {signColor})` on zodiac symbols
- `box-shadow: 0 0 8px {color}60` on progress bars
- `text-shadow: 0 0 20px/40px rgba(139,92,246,0.5/0.3)` on glow text

### Button Styles
- **Primary CTA:** `bg-gradient-to-r from-purple-600 to-pink-600`, `rounded-full`, `px-8 py-4`, `text-lg font-bold`, purple glow animation when active, gray disabled state
- **Share buttons:** `rounded-full`, `px-5 py-3`, `text-sm font-semibold` — 3 variants: black (Twitter), purple (copy), pink (share)
- **Affiliate CTA:** `bg-purple-600`, `rounded-full`, `px-6 py-3`, `text-sm`
- **Zodiac cards:** `rounded-xl`, `p-3 md:p-4`, scale on hover/select, color glow when selected

### Card/Container Styles
- `.glass-card`: `rgba(255,255,255,0.05)` bg, `blur(10px)` backdrop, `rgba(255,255,255,0.1)` border, `1rem` radius
- Affiliate cards: gradient bg (`from-purple-900/50 to-pink-900/50`), `border-purple-500/20`

### Navigation
- **Header:** Centered text logo ("ZodiacToxicity"), links to `/`. No hamburger, no sidebar.
- **Results page:** `← Try Another Combo` back link to home. No sticky nav.
- **Mobile:** No hamburger menu (not needed — only 2 page types).

### Footer
- Centered disclaimer text, `text-sm text-white/40`
- Links row: Copyright, Privacy, Terms, Contact (mailto)
- Top border: `border-white/10`

### Responsive Breakpoints
| Breakpoint | Layout Changes |
|------------|---------------|
| < 768px (mobile) | Zodiac grid 3-col, stacked selectors, `text-4xl` headings, `p-4` padding |
| >= 768px (md) | Grid 4-col on zodiac, side-by-side selectors, `text-6xl` headings, `p-8` padding |
| >= 1024px (lg) | `×` divider shown between selector grids |

### Animations/Transitions
| Animation | Duration | Usage |
|-----------|----------|-------|
| `pulse-glow` | 2s infinite | Active CTA button |
| `float` | 6s infinite | × symbol between signs |
| `slide-up` | 0.6s ease-out | Page entrance elements |
| `slide-up-delay` | 1s ease-out | Delayed entrance (selector) |
| `score-pulse` | 3s infinite | ToxicityCounter ring |
| Counter tick-up | 2s cubic ease-out | Score 0→target% |
| `transition-all` | 200ms | Hover states on cards/buttons |
| `hover:scale-105` / `hover:scale-[1.03]` | | Card hover enlargement |

### Dark Mode
Site is dark-only. There is no light mode. The entire design is built around the deep purple/black palette. No `prefers-color-scheme` media query.

### Icon System
No icon library. Uses Unicode zodiac symbols (♈-♓) and emoji (📢👁️⚔️📱🔮💔🍽️). Consistent sizing per context.

### Image Handling
- No `<img>` tags in the app (pure CSS/SVG/Canvas visuals)
- OG images are pre-generated SVGs in `public/og/`
- `next.config.ts` has `images: { unoptimized: true }` (required for static export)
- StarField is a `<canvas>` element, not an image

---

## 4. TARGET AUDIENCE PSYCHOLOGY & STYLING RECOMMENDATIONS

### What visual language does this audience expect?
Gen Z / young millennials on social media expect: **bold, playful, slightly unhinged, high-contrast, dark mode, animated**. The current design nails this. The cosmic purple palette, glassmorphism cards, and animated counter create the "screenshot-worthy" aesthetic that drives shares.

### Trust signals needed
This is an entertainment site, not a purchase funnel. Trust signals should be minimal and humorous:
- The footer disclaimer already does this perfectly ("The stars made us do it")
- Privacy/Terms pages exist (required for AdSense)
- No need for testimonials or security badges — that would kill the vibe

### Styling changes made
1. ~~**Capricorn sign color `#001F3F` is too dark**~~ — **Fixed.** Updated to `#3B82A0` (visible teal-blue) in `constants.ts`, `signs.json`, and regenerated OG images
2. ~~**"How It Works" step numbers are plain text**~~ — **Fixed.** Wrapped in `w-12 h-12 rounded-full bg-zodiac-accent/20 text-zodiac-accent` styled circles
3. **Category breakdown cards lack staggered entrance** — the `animationDelay` is set via inline style but `.animate-slide-up` runs once on load, not on scroll. Consider adding an IntersectionObserver wrapper for scroll-triggered animation (low priority)
4. ~~**Ad placeholders are visible and ugly**~~ — **Fixed.** Placeholders now render `className="hidden"` until AdSense is integrated
5. **Footer contact email shows `alstonanalystics.com`** — consider switching to a `@zodiac-toxicity.com` email after domain setup for brand consistency
6. **"Sponsored" label on affiliate cards** — FTC requires clearer disclosure if these become actual paid affiliates. Current text is fine for now since links aren't monetized yet

### Mobile-first priorities
- Touch targets are adequate (zodiac cards `p-3 md:p-4` = ~48px minimum)
- The CTA button `px-8 py-4` is large and thumb-friendly
- Two-grid selector stacks vertically on mobile — good
- Consider adding a sticky "Calculate" button at the bottom of the viewport on mobile when both signs are selected (currently requires scrolling to the button)

### Conversion psychology
- The "Check Another Combo" section at the bottom of results is the key revenue multiplier — it's well-positioned
- Pre-populating the ComboSelector with current signs is implemented and smart (users change one sign, not both)
- The "Most Toxic Combos" showcase on the homepage is good for users who arrive without a specific combo in mind
- Consider adding a "Tag your [sign] friend" CTA higher on the results page (currently only in ShareButtons near the bottom)

### Page load perception
- Static HTML from CDN — extremely fast first paint
- StarField canvas renders immediately (no loading state needed)
- Counter animation creates engagement while the user reads
- No skeleton screens needed — all content is in the HTML

---

## 5. DOMAIN NAME RECOMMENDATIONS

| # | Domain | Why It Works | TLD | Availability | SEO Keywords |
|---|--------|-------------|-----|-------------|-------------|
| 1 | **zodiac-toxicity.com** | Exact match to site name, memorable, describes the product perfectly. Hyphenated but the brand already uses it. | .com (gold standard) | Already planned per `SITE_URL` | "zodiac" + "toxicity" — both high-volume |
| 2 | **zodiacmatch.com** | Shorter, no hyphen, broader appeal. "Match" implies compatibility which is the core search term. | .com | Likely taken — check immediately | "zodiac match" = high search volume |
| 3 | **toxiccombo.com** | Catchy, provocative, shareable. Works for social media handles too. | .com | Possibly available | "toxic combo" is memorable but lower search volume |
| 4 | **howtoxic.com** | Ultra-short, question-format (matches "How Toxic Are You Together?" headline). Great for word-of-mouth. | .com | Likely taken or premium-priced | "how toxic" — moderate search |
| 5 | **signstoxicity.com** | No hyphen, clear meaning, SEO-friendly. | .com | Likely available | "signs toxicity" — niche but relevant |

**Recommendation:** Stick with `zodiac-toxicity.com`. It's already wired into the codebase (`SITE_URL`, all OG images, sitemap, JSON-LD). Changing it would require updating one constant in `constants.ts` and regenerating OG images, but there's no reason to change.

---

## 6. MONETIZATION PLAN

### Current monetization
**None active.** Three placeholder ad slots exist on every results page. Four affiliate CTAs link to product homepages without affiliate IDs.

### Primary revenue model: Display Ads (AdSense → Raptive)
The site is designed for high pageviews per session (3-5 combos per visit). At 3.5 pageviews/session:
- 3 ad slots per page = 10.5 ad impressions per session
- $12-30 RPM (entertainment niche) = $42-105 revenue per 1,000 visitors

### Secondary revenue streams
1. **Affiliate commissions** — BetterHelp ($100-150/signup), Amazon Associates (4.5%), dating app installs ($2-5/install)
2. **Sponsored content** — Once traffic is established, astrology apps and dating apps will pay for featured placement

### AdSense readiness
| Requirement | Status |
|-------------|--------|
| Original content on every page | Yes — 144 unique pages |
| Privacy Policy | Yes — `/privacy` |
| Terms of Service | Yes — `/terms` |
| Contact information | Yes — email in footer |
| Navigation | Yes — header, footer, back links |
| Ad slot placeholders | Yes — 3 per results page (top leaderboard, mid rectangle, bottom banner) |
| No prohibited content | Yes — entertainment/humor only |
| Sufficient content per page | Yes — ~500+ words per combo page |

**Where ads should go (already placed):**
1. After the score hero, before category breakdowns (leaderboard 728x90)
2. After the 4th category card (rectangle 300x250)
3. Before footer (banner 728x90)

### Pricing strategy
N/A — free site. Revenue from ads and affiliates only.

### Monetization implementation steps
1. **Apply for Google AdSense** at [google.com/adsense](https://www.google.com/adsense) — needs the live domain with real traffic first
2. **Replace `AdPlaceholder` component** with actual AdSense `<ins>` tags + script
3. **Sign up for affiliate programs:** Amazon Associates, BetterHelp Partners, Co-Star (if available)
4. **Update `AffiliateCTA.tsx` URLs** with affiliate-tagged links
5. **After reaching 50K+ sessions/month:** Apply to Raptive (formerly AdThrive) for premium ad management ($15-30+ RPM vs AdSense's $8-15)

---

## 7. FEATURES — CURRENT STATE

| Feature | Status | Works | Doesn't Work | Missing |
|---------|--------|-------|-------------|---------|
| Landing page with zodiac selectors | **Complete** | Hero, two 12-sign grids, CTA, stats bar, "Most Toxic" showcase with hover CTA, "How It Works" with styled step circles | — | — |
| 144 combo results pages | **Complete** | Unique content per combo, animated counter, 7 category breakdowns, special lines for 17 combos, revenue-optimized layout | — | — |
| Animated toxicity counter | **Complete** | SVG ring, count-up animation, IntersectionObserver trigger, color-coded tiers | — | — |
| Quick share (peak emotion) | **Complete** | Server-rendered Twitter link + compact Copy/Share buttons placed right after score | — | — |
| Full share section | **Complete** | Twitter/X intent, clipboard copy with toast, native Web Share API, "Tag your friend" CTA | — | — |
| "Check Another Combo" loop | **Complete** | Compact ComboSelector at bottom of every results page, pre-populated with current signs | — | — |
| Most Toxic Match teaser | **Complete** | Computes sign1's highest-scoring pairing, prominent CTA card that drives the next pageview | — | — |
| Related combos | **Complete** | 6 related pairings (3 per sign) with scores and links | — | — |
| Ad placements | **Ready** | 3 hidden slots per page with data attributes for AdSense integration. Hidden until AdSense is configured. | — | AdSense publisher ID |
| Affiliate CTAs | **Placed** | 4 CTA cards scattered between content (Co-Star after cat 3, BetterHelp after cat 7, Hinge + Amazon at bottom). Humorous copy. | Links are non-affiliate product homepages | Actual affiliate IDs/URLs |
| SEO meta tags | **Complete** | Per-page title, description, OG tags (PNG), Twitter cards, canonical URLs | — | — |
| JSON-LD structured data | **Complete** | Article + FAQPage + BreadcrumbList schemas on every combo page | — | — |
| Sitemap | **Complete** | 147 URLs (home + privacy + terms + 144 combos) | — | — |
| Robots.txt | **Complete** | Allow all, sitemap reference | — | — |
| OG images | **Complete** | 144 PNGs (1200x630) with gradient bg, sign symbols, score, tier label. Compatible with all social platforms. | — | — |
| Custom 404 | **Complete** | Themed page with crystal ball emoji, CTA back to home | — | — |
| Privacy Policy | **Complete** | Full page, dated Feb 2026, mentions static site / no accounts / cookies | — | — |
| Terms of Service | **Complete** | Full page, dated Feb 2026, entertainment disclaimer, acceptable use, liability limits | — | — |
| StarField animation | **Complete** | Canvas-based, 200 twinkling stars, responsive resize | — | — |
| Skip-to-content link | **Complete** | sr-only, visible on focus, links to `#main-content` | — | — |
| Security headers | **Complete** | X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS, X-DNS-Prefetch-Control | — | — |
| Analytics | **Not implemented** | — | No tracking of any kind | Google Analytics or Vercel Analytics |

---

## 8. SEO & DISCOVERABILITY

### Current meta tags (per page)

**Homepage:**
- Title: `ZodiacToxicity - How Toxic Are You Together?`
- Description: `Find out how toxic your zodiac compatibility really is. 144 unique sign combos with hilarious toxicity breakdowns.`
- OG: type website, locale en_US, siteName ZodiacToxicity

**Combo pages (e.g., /aries-gemini):**
- Title: `Aries & Gemini Toxicity: 83% Volatile`
- Description: `How toxic are Aries and Gemini together? 83% Volatile. See the full breakdown of communication, jealousy, arguments, and more.`
- OG image: `/og/aries-gemini.png` (PNG format, compatible with all platforms)
- Twitter card: `summary_large_image`
- Canonical: `https://zodiac-toxicity.com/aries-gemini`

### SEO elements
| Element | Status |
|---------|--------|
| Sitemap | Present (147 URLs) |
| Robots.txt | Present |
| Canonical URLs | Present on combo pages |
| JSON-LD (Article schema) | Present on combo pages |
| JSON-LD (FAQPage schema) | Present — 3 Q&A per combo page for Google rich snippets |
| JSON-LD (BreadcrumbList) | Present — Home > [Sign1] & [Sign2] |
| Meta keywords | Not used (Google ignores them — correctly omitted) |
| `hreflang` | Not needed (English only) |

### Content strategy for organic traffic
**Target keywords per combo page:**
- `[sign1] and [sign2] compatibility` (10K-100K monthly searches per combo)
- `[sign1] [sign2] relationship`
- `are [sign1] and [sign2] compatible`
- `[sign1] and [sign2] toxic`

The 144 pages naturally target these long-tail keywords. Each page has unique, substantial content (~500+ words). This is a strong SEO foundation.

**Additional content opportunities:**
- Blog posts: "Top 10 Most Toxic Zodiac Pairings" (targets head terms)
- Element-based landing pages: "Fire Sign Compatibility" (targets mid-tail)

### Page speed concerns
- **First Load JS: 115kB** — acceptable, mostly React runtime
- **Static HTML** — served from CDN, sub-100ms TTFB
- **No external scripts** — no analytics, no ads yet (will add latency when implemented)
- **Canvas animation** — 200 stars with requestAnimationFrame. Lightweight.
- **Fonts** — Space Grotesk + Inter loaded via `next/font` (self-hosted, no FOUT)
- **No images** — site uses CSS/SVG/Canvas only. Zero image optimization needed.

### Accessibility score estimate
**Estimated: 85-90/100** (good)
- Skip-to-main-content link: present
- `aria-pressed` on toggle buttons: present
- `aria-live` on score counter: present
- `aria-hidden` on decorative canvas: present
- `aria-labelledby` on sections: present
- Focus-visible outline: `2px solid #8b5cf6`
- Semantic HTML (`<main>`, `<header>`, `<footer>`, `<section>`)
- All text contrast improved to `white/50`+ minimum (was `white/30` and `white/40`)
- Capricorn color updated from `#001F3F` to `#3B82A0` (visible teal-blue)

---

## 9. ENVIRONMENT VARIABLES & SECRETS

| Variable Name | Where It's Used | What It's For | Currently Set? | How To Get It |
|---|---|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Not yet referenced | Google Analytics tracking ID | No | [analytics.google.com](https://analytics.google.com) → Create property |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Not yet referenced | Plausible Analytics domain | No | [plausible.io](https://plausible.io) → Add site |
| `NEXT_PUBLIC_ADSENSE_ID` | Not yet referenced | Google AdSense publisher ID | No | [google.com/adsense](https://www.google.com/adsense) → Get approved |
| `NEXT_PUBLIC_SITE_URL` | Not yet referenced (hardcoded in constants.ts) | Override SITE_URL | No | Set to `https://zodiac-toxicity.com` |

**No `.env` file exists.** The `SITE_URL` is hardcoded as `https://zodiac-toxicity.com` in [constants.ts](src/lib/constants.ts#L1). No secrets are needed — this is a pure static site with no API keys.

---

## 10. MANUAL SETUP TASKS REMAINING

- [ ] **Purchase domain `zodiac-toxicity.com`** — Check Namecheap, Porkbun, or Cloudflare Registrar
- [ ] **Add domain to Vercel** — [Vercel Project Settings > Domains](https://vercel.com/williamdalstons-projects/zodiac-toxicity/settings) → Add `zodiac-toxicity.com` + `www.zodiac-toxicity.com`
- [ ] **Set DNS records** — In registrar: CNAME `cname.vercel-dns.com` (or A records Vercel provides)
- [ ] **Set up Google Analytics** — Create GA4 property, add measurement ID as env var, add tracking script to layout
- [ ] **Apply for Google AdSense** — Requires: live domain with traffic, privacy policy (done), 20+ pages of content (done). Apply at [google.com/adsense](https://www.google.com/adsense). Replace `AdPlaceholder` components with AdSense ad units after approval.
- [ ] **Sign up for Amazon Associates** — [affiliate-program.amazon.com](https://affiliate-program.amazon.com). Get associate tag. Update Amazon URL in `AffiliateCTA.tsx` to include `?tag=YOUR_TAG`.
- [ ] **Apply for BetterHelp affiliate** — [betterhelp.com/partners](https://www.betterhelp.com/partners). Get affiliate link. Update URL in `AffiliateCTA.tsx`.
- [ ] **Check Co-Star / Hinge affiliate programs** — May not have public programs. If not, keep as non-affiliate links.
- [x] ~~**Convert OG SVGs to PNGs**~~ — Done. 144 PNG files generated via sharp.
- [x] ~~**Update Privacy/Terms dates**~~ — Done. Updated to February 2026.
- [ ] **Set up email** — `info@alstonanalystics.com` is referenced in Footer, Privacy, Terms, and JSON-LD. Consider creating `hello@zodiac-toxicity.com` after domain is set up.
- [ ] **Create social media accounts** — @zodiacToxicity on TikTok, Instagram, Twitter/X for distribution
- [ ] **Record 5-10 TikTok videos** — Feature the most savage combos (Scorpio+Gemini, Aries+Aries, Leo+Leo). Use the "I checked my zodiac toxicity score with my boyfriend..." format.

---

## 11. PRIORITY ACTION LIST

### MUST DO BEFORE LAUNCH (blocking)

1. **Purchase and connect domain** — No domain = no real URL for sharing. 30 min setup.

### ALREADY DONE (completed via CLI)

- [x] Convert OG images from SVG to PNG (144 PNGs generated)
- [x] Update Privacy/Terms dates to February 2026
- [x] Fix Capricorn color (#001F3F → #3B82A0 visible teal-blue)
- [x] Hide ad placeholders until AdSense is live (render `hidden`)
- [x] Add FAQ schema to combo pages (3 Q&A per page for rich snippets)
- [x] Add BreadcrumbList schema (Home > Sign1 & Sign2)
- [x] Add Permissions-Policy, HSTS, X-DNS-Prefetch-Control security headers
- [x] Improve text contrast (white/30, white/40 → white/50-60)
- [x] Style "How It Works" step numbers (purple accent circles)
- [x] Add quick share prompt right after score (peak emotion capture)
- [x] Create "Most Toxic Match" teaser component (drives next pageview)
- [x] Revenue-optimize results page layout (scatter affiliates, share at top)
- [x] Add hover CTA on showcase cards + "Check your combo" link

### SHOULD DO BEFORE LAUNCH (quality)

1. **Add Google Analytics** — Need traffic data from day one for monetization decisions. 15 min.

### DO AFTER LAUNCH (optimization)

1. **Apply for AdSense** — Primary revenue. Need some traffic first (Google checks for real visitors). Once approved, replace hidden placeholders with ad units. 1 hour.
2. **Sign up for affiliate programs** — Amazon Associates, BetterHelp Partners. Update URLs in `AffiliateCTA.tsx`. 1 hour.
3. **Create TikTok/Instagram content** — The viral distribution engine. 5-10 videos featuring the most savage combos. Ongoing.
4. **Add more special combo lines** — Currently 17 combos have hand-written content. Expand to all 144 over time for better content quality. Ongoing.
5. **Apply to Raptive (premium ads)** — After reaching 50K sessions/month. 2-3x AdSense RPM. 30 min application.
6. **Add email capture** — "Get your full compatibility report" — collect emails for newsletter/future products. 2 hours.
7. **Blog section** — "Top 10 Most Toxic Combos" listicles for head-term SEO traffic. 4 hours.

---

## 12. ONE-LINE SITE SUMMARY

**"ZodiacToxicity is a static entertainment site for 18-35 astrology-curious social media users that generates hilarious toxicity scores for 144 zodiac pairings, monetized via display ads and astrology/dating affiliate commissions."**

---

## 13. SEO OPTIMIZATION AUDIT (Checklist-Based)

Scored against a comprehensive 18-section SEO checklist adapted from programmatic SEO best practices. Each section scored 0-2 (0=missing, 1=partial, 2=complete).

### Section Scores

| # | Section | Score | Status | Notes |
|---|---------|-------|--------|-------|
| 1 | Domain, Canonical & URL Hygiene | 1/2 | PARTIAL | Canonicals on combo pages only. Missing on homepage, privacy, terms. No trailing-slash redirect. |
| 2 | Crawl & Indexing Controls | 2/2 | COMPLETE | robots.ts + sitemap.ts with `force-static`. Allows all crawling. Sitemap referenced. |
| 3 | Sitemap Architecture | 2/2 | COMPLETE | 147 URLs. Proper priority hierarchy (1.0/0.8/0.5). Monthly change freq. Under 50K limit. |
| 4 | Indexability QA by Template | 1/2 | PARTIAL | Combo pages excellent. Homepage missing own metadata export. 404 missing metadata. Privacy/terms missing canonical. |
| 5 | On-Page SEO (Programmatic Pages) | 2/2 | COMPLETE | 144 unique titles with scores. Dynamic descriptions. Proper H1-H4 hierarchy. Unique body content per combo. |
| 6 | Structured Data (JSON-LD) | 1/2 | PARTIAL | 3 schemas per combo page (Article, FAQ, Breadcrumb). But Article missing datePublished/dateModified/author/image. Homepage has zero JSON-LD. |
| 7 | Internal Linking | 2/2 | COMPLETE | RelatedCombos (6 links), MostToxicTeaser, ToxicShowcase, back links, footer nav. All use Next.js Link. Descriptive anchor text. |
| 8 | Programmatic SEO Quality Controls | 2/2 | COMPLETE | Deterministic seeded PRNG. Unique content per combo. No thin pages. ~500+ words each. 17 combos have hand-written special lines. |
| 9 | Performance & Core Web Vitals | 1/2 | PARTIAL | Static export (fast TTFB). 115kB First Load JS. Self-hosted fonts. But no caching headers in vercel.json. Minor CLS risk from ShareButtons hydration. |
| 10 | Technical Rendering & Crawlability | 2/2 | COMPLETE | All SEO content server-rendered. Metadata in HTML source. Static export. Proper 404 page. No client-side-only SEO content. |
| 11 | Images, OG & Media SEO | 1/2 | PARTIAL | 144 PNG OG images. Proper metadata references. But no favicon.ico. No web app manifest. Build script doesn't auto-generate OG images. |
| 12 | Search Console Setup | 0/2 | MISSING | Not set up yet (pre-launch). Needs domain first. |
| 13 | Content & Trust Signals | 2/2 | COMPLETE | Entertainment disclaimer. "Sponsored" labels on affiliates. Privacy/Terms pages. Contact email. Dated legal pages. |
| 14 | Conversion UX & Behavioral Quality | 2/2 | COMPLETE | Quick share at peak emotion. MostToxicTeaser drives next pageview. Check Another Combo loop. Pre-populated selector. |
| 15 | Programmatic SEO Rollout | 2/2 | COMPLETE | All 144 pages launched simultaneously (appropriate for small site). Clean sitemap. No junk pages. |
| 16 | Off-Page & Discovery | 0/2 | MISSING | No social profiles. No backlinks yet. Pre-launch. |
| 17 | Analytics & Instrumentation | 0/2 | MISSING | No analytics. No event tracking. No conversion monitoring. |
| 18 | Launch-Day Smoke Test | 1/2 | PARTIAL | Metadata and sitemap work. Robots works. But no GSC verification. No Lighthouse baseline. |

### Overall Score: 22/36 (61%)

**Verdict: Fix fundamentals first.** The combo pages have excellent SEO bones, but the homepage, legal pages, structured data gaps, and infrastructure issues (caching, favicon, build script) need fixing before launch.

### Critical Issues Found & Fixed

| # | Issue | Severity | File(s) Changed | Fix Applied |
|---|-------|----------|-----------------|-------------|
| 1 | Homepage has NO metadata export | CRITICAL | `src/app/page.tsx` | Added homepage-specific metadata + WebSite/Organization JSON-LD |
| 2 | Homepage has NO JSON-LD | CRITICAL | `src/app/page.tsx` | Added WebSite + Organization schemas |
| 3 | Article schema missing dates/author/image | HIGH | `src/app/[combo]/page.tsx` | Added datePublished, dateModified, author, image to Article schema |
| 4 | 404 page has NO metadata | HIGH | `src/app/not-found.tsx` | Added metadata export with title and description |
| 5 | Privacy page missing canonical URL | MEDIUM | `src/app/privacy/page.tsx` | Added `alternates.canonical` |
| 6 | Terms page missing canonical URL | MEDIUM | `src/app/terms/page.tsx` | Added `alternates.canonical` |
| 7 | Combo pages OG type inherits "website" | MEDIUM | `src/app/[combo]/page.tsx` | Explicitly set `openGraph.type: "article"` |
| 8 | Affiliate links missing nofollow/sponsored | MEDIUM | `src/components/AffiliateCTA.tsx` | Changed rel to `"nofollow sponsored noopener noreferrer"` |
| 9 | No caching headers for static assets | MEDIUM | `vercel.json` | Added Cache-Control for OG images, JS, CSS, HTML |
| 10 | No trailing-slash redirect | MEDIUM | `vercel.json` | Added redirect to strip trailing slashes |
| 11 | Build script doesn't generate OG images | HIGH | `package.json` | Updated build script to run OG generation first |
| 12 | Homepage H1 is in Header component | LOW | N/A | Noted — Header uses H1 sitewide which is semantically correct for brand |

### Post-Fix Score Estimate: 28/36 (78%)

Remaining gaps (require manual/external action):
- Search Console setup (needs live domain)
- Analytics instrumentation (needs GA4 property)
- Off-page/backlinks (needs social profiles + content marketing)
- Favicon generation (needs design asset)

### SEO Checklist Detail by Section

#### 1) Domain, Canonical & URL Hygiene
- [x] `SITE_URL` set to `https://zodiac-toxicity.com` in constants.ts
- [x] `metadataBase` set correctly in layout.tsx
- [x] HTTPS enforced via HSTS header in vercel.json
- [x] Canonical URLs on all combo pages via `alternates.canonical`
- [x] **NEW**: Canonical URLs on privacy and terms pages
- [x] **NEW**: Trailing-slash redirect in vercel.json
- [ ] Domain not yet purchased/connected
- [ ] www vs non-www redirect (needs domain first)

#### 2) Crawl & Indexing Controls
- [x] robots.ts exists with `force-static`
- [x] Sitemap URL referenced in robots.txt
- [x] All pages allowed for crawling
- [x] No accidental noindex directives
- [x] No staging domain confusion (single deployment)

#### 3) Sitemap Architecture
- [x] Single sitemap (147 URLs, well under 50K limit)
- [x] Homepage priority 1.0, combos 0.8, legal 0.5
- [x] All URLs are canonical form
- [x] No 404/redirect URLs in sitemap
- [x] `lastModified` set to build time (acceptable for static site)

#### 4) Indexability QA by Template
- [x] **NEW**: Homepage has own metadata (title, description, canonical)
- [x] Combo pages: 200 status, unique title, unique description, canonical, structured data
- [x] **NEW**: 404 page has metadata
- [x] **NEW**: Privacy/Terms pages have canonical URLs
- [x] All pages have internal links

#### 5) On-Page SEO (Programmatic Pages)
- [x] 144 unique titles: "{Sign1} & {Sign2} Toxicity: {Score}% {Label}"
- [x] 144 unique descriptions with score, label, category mentions
- [x] Proper H1 (Header) → H2 (hero) → H3 (sections) → H4 (cards) hierarchy
- [x] Each combo page has ~500+ words of unique, data-driven content
- [x] No duplicate metadata across pages

#### 6) Structured Data (JSON-LD)
- [x] **NEW**: Homepage has WebSite + Organization schemas
- [x] **NEW**: Article schema includes datePublished, dateModified, author, image
- [x] FAQPage with 3 Q&A per combo (rich snippet eligible)
- [x] BreadcrumbList (Home → Combo)
- [x] All JSON-LD matches visible page content

#### 7) Internal Linking
- [x] Header logo links to homepage
- [x] Footer links: Privacy, Terms, Contact
- [x] Results pages: back link, RelatedCombos (6), MostToxicTeaser (1), ComboSelector
- [x] Homepage: ToxicShowcase links to 6 combos
- [x] All internal links use Next.js `Link` component
- [x] Descriptive anchor text throughout

#### 8) Programmatic SEO Quality
- [x] Deterministic content (seeded PRNG = same combo always same output)
- [x] No thin pages (all 144 have substantial content)
- [x] No near-duplicate pages (each combo is genuinely different)
- [x] 17 combos have hand-written special lines for extra uniqueness
- [x] Score tiers add content variety (Concerning/Volatile/Catastrophic/Cosmically Doomed)

#### 9) Performance & Core Web Vitals
- [x] Static HTML from CDN (fast TTFB)
- [x] 115kB First Load JS (acceptable)
- [x] Self-hosted fonts via next/font (no FOUT)
- [x] No external scripts (no analytics/ads yet)
- [x] **NEW**: Cache-Control headers for static assets
- [ ] Need Lighthouse baseline after deployment
- [ ] Need CrUX/field data monitoring post-launch

#### 10) Technical Rendering
- [x] Static export — all content in initial HTML
- [x] Canonical tags in HTML source (not JS-injected)
- [x] Proper 404 status on not-found page
- [x] No client-side API calls for SEO content
- [x] Server-rendered metadata per route

#### 11) Images, OG & Media
- [x] 144 PNG OG images (1200x630)
- [x] OG images referenced in metadata correctly
- [x] Twitter card: summary_large_image
- [x] **NEW**: Build script auto-generates OG images before build
- [ ] No favicon.ico (needs design)
- [ ] No web app manifest (low priority)

#### 12) Search Console (Post-Launch)
- [ ] Domain verification
- [ ] Sitemap submission
- [ ] URL inspection on key templates
- [ ] Coverage report monitoring
- [ ] Rich result report monitoring

#### 13) Content & Trust Signals
- [x] "For entertainment purposes only" disclaimer in footer
- [x] "Sponsored" label on affiliate CTAs
- [x] Privacy Policy (dated Feb 2026)
- [x] Terms of Service (dated Feb 2026)
- [x] Contact email in footer
- [x] **NEW**: `rel="nofollow sponsored"` on affiliate links

#### 14) Conversion UX
- [x] Quick share at peak emotion (right after score reveal)
- [x] MostToxicTeaser drives next pageview
- [x] Check Another Combo loop at page bottom
- [x] Pre-populated ComboSelector with current signs
- [x] RelatedCombos for exploration
- [x] ToxicShowcase on homepage for undecided visitors

#### 15) Rollout Strategy
- [x] All 144 pages launched simultaneously (correct for small site)
- [x] Clean sitemap with no junk URLs
- [x] Canonical URLs prevent crawl waste
- [x] Internal linking ensures discovery

#### 16) Off-Page (Post-Launch)
- [ ] Reserve social handles (@zodiacToxicity)
- [ ] Pinterest pins using OG images
- [ ] Parenting/astrology community engagement
- [ ] Content marketing: "Top 10 Most Toxic Combos" etc.

#### 17) Analytics (Post-Launch)
- [ ] Google Analytics 4 property
- [ ] Event tracking: page_view, share, combo_select
- [ ] Conversion tracking: affiliate clicks, ad impressions
- [ ] Template-level performance segmentation

#### 18) Launch-Day Smoke Test
- [x] Homepage shows correct metadata in source
- [x] Combo page shows correct canonical + JSON-LD
- [x] Robots.txt loads and references sitemap
- [x] Sitemap loads with all URLs
- [x] No accidental noindex
- [ ] GSC URL inspection after deploy
- [ ] Mobile Lighthouse check
