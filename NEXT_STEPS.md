# ZodiacToxicity – Next Steps

## Done via CLI

- [x] Committed and pushed all changes to GitHub
- [x] Deployed to Vercel (https://zodiac-toxicity.vercel.app)

---

## 1. Custom Domain (Manual)

**What you need:** Domain `zodiac-toxicity.com` purchased and DNS access.

**Steps:**
1. Open [Vercel Project Settings → Domains](https://vercel.com/williamdalstons-projects/zodiac-toxicity/settings)
2. Add `zodiac-toxicity.com` (and optional `www.zodiac-toxicity.com`)
3. In your registrar DNS, add the records Vercel shows (usually CNAME `cname.vercel-dns.com` or A records)

**Note:** All links, OG images, and sitemap use `zodiac-toxicity.com`. Until the domain is connected, shares will still point there. After adding the domain to Vercel, it will work once DNS propagates.

---

## 2. Environment Variables (Optional)

The app **does not currently use env variables**. When you add these features, you’ll need:

| Variable | When to add | Where to set |
|----------|-------------|--------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Vercel Dashboard → Project → Settings → Environment Variables |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics | Same |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense | Same (if you add ads) |
| `NEXT_PUBLIC_SITE_URL` | If you switch SITE_URL to env | Same (then update `constants.ts` to read it) |

---

## 3. Analytics

**Option A – Vercel Analytics:**  
- Add via [Vercel Dashboard → Project → Analytics](https://vercel.com/williamdalstons-projects/zodiac-toxicity/analytics)  
- No env vars required if you use the built-in Vercel integration  

**Option B – Google Analytics / Plausible / etc.:**  
- Add tracking script and ID in layout or a client component  
- Set `NEXT_PUBLIC_GA_ID` (or equivalent) in Vercel if you use env

---

## 4. AdSense (Optional)

**What you need:** Google AdSense account and publisher ID.

**Steps:**
1. Create account at [google.com/adsense](https://www.google.com/adsense)
2. Get approved and your ad unit codes
3. Replace `AdPlaceholder` with AdSense components or scripts
4. Add `NEXT_PUBLIC_ADSENSE_ID` in Vercel if you store the ID in env

---

## 5. Affiliate Links

**Current:** Links go to Co-Star, BetterHelp, Hinge, Amazon (non-affiliate).

**To monetize:**  
- Co-Star: check their affiliate program  
- BetterHelp: [betterhelp.com/partners](https://www.betterhelp.com/partners)  
- Hinge: check partner/affiliate options  
- Amazon: [amazon.com/associates](https://affiliate-program.amazon.com)

**What you’ll need:** Affiliate URLs or IDs. You can put them in env vars and update `AffiliateCTA.tsx` to use them.

---

## 6. Future Deploys

**Automatic:** Push to GitHub → Vercel deploys from `master`.

**Manual:** From project root:
```bash
vercel --prod
```

---

## 7. Optional Cleanup

- **Remove internal docs from repo:** `04_ZodiacToxicity_Brief.docx` is ignored by `.gitignore` but still in history. To remove from future commits: `git rm --cached 04_ZodiacToxicity_Brief.docx` then commit.
- **Verify `.claude`:** `.claude/settings.local.json` is now ignored; already-committed copies stay in history but won’t appear in new commits.
