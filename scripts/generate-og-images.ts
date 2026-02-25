/**
 * OG Image Generator
 * Generates 144 social sharing images (1200x630) as SVG files.
 *
 * Run: npx tsx scripts/generate-og-images.ts
 *
 * For PNG conversion, install sharp: npm i -D sharp
 * Then uncomment the sharp conversion section below.
 */

import * as fs from "fs";
import * as path from "path";

// Import data directly (we can't use @ alias in scripts)
const signsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "signs.json"), "utf-8")
);
const templatesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "templates.json"), "utf-8")
);

const SIGN_SLUGS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

const ELEMENT_COMPATIBILITY: Record<string, Record<string, number>> = {
  Fire:  { Fire: 72, Earth: 85, Air: 75, Water: 88 },
  Earth: { Fire: 85, Earth: 70, Air: 82, Water: 74 },
  Air:   { Fire: 75, Earth: 82, Air: 68, Water: 86 },
  Water: { Fire: 88, Earth: 74, Air: 86, Water: 71 },
};

// Simplified score calculation (mirrors generate-result.ts logic)
function seededRandom(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashCombo(s1: string, s2: string): number {
  const str = `${s1}-${s2}-zodiac-toxicity`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getScore(s1: string, s2: string): number {
  const sign1 = signsData[s1];
  const sign2 = signsData[s2];
  const rng = seededRandom(hashCombo(s1, s2));

  let weightedSum = 0;
  let totalWeight = 0;

  for (const [, cat] of Object.entries(templatesData) as [string, { weight: number }][]) {
    const base = ELEMENT_COMPATIBILITY[sign1.element]?.[sign2.element] ?? 75;
    const variance = Math.floor(rng() * 16) - 8;
    rng(); // consume one for template selection
    const score = Math.min(100, Math.max(60, base + variance));
    weightedSum += score * cat.weight;
    totalWeight += cat.weight;
  }

  return Math.min(100, Math.max(60, Math.round(weightedSum / totalWeight) + 4));
}

function getTier(score: number): { label: string; color: string } {
  if (score >= 96) return { label: "COSMICALLY DOOMED", color: "#A855F7" };
  if (score >= 86) return { label: "CATASTROPHIC", color: "#EF4444" };
  if (score >= 71) return { label: "VOLATILE", color: "#F97316" };
  return { label: "CONCERNING", color: "#EAB308" };
}

function generateSvg(s1: string, s2: string): string {
  const sign1 = signsData[s1];
  const sign2 = signsData[s2];
  const score = getScore(s1, s2);
  const tier = getTier(score);

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0c29"/>
      <stop offset="50%" style="stop-color:#302b63"/>
      <stop offset="100%" style="stop-color:#24243e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Stars (decorative dots) -->
  ${Array.from({ length: 40 }, () => {
    const x = Math.floor(Math.random() * 1200);
    const y = Math.floor(Math.random() * 630);
    const r = Math.random() * 1.5 + 0.5;
    const o = Math.random() * 0.5 + 0.3;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${o}"/>`;
  }).join("\n  ")}

  <!-- Sign 1 symbol -->
  <text x="300" y="300" text-anchor="middle" font-size="140" fill="${sign1.color}" filter="url(#glow)" font-family="serif">${sign1.symbol}</text>
  <text x="300" y="370" text-anchor="middle" font-size="32" fill="white" font-family="sans-serif" font-weight="bold">${sign1.name}</text>

  <!-- X between signs -->
  <text x="600" y="290" text-anchor="middle" font-size="60" fill="#a78bfa" font-family="sans-serif">\u00D7</text>

  <!-- Sign 2 symbol -->
  <text x="900" y="300" text-anchor="middle" font-size="140" fill="${sign2.color}" filter="url(#glow)" font-family="serif">${sign2.symbol}</text>
  <text x="900" y="370" text-anchor="middle" font-size="32" fill="white" font-family="sans-serif" font-weight="bold">${sign2.name}</text>

  <!-- Score -->
  <text x="600" y="480" text-anchor="middle" font-size="80" fill="${tier.color}" font-family="sans-serif" font-weight="900" filter="url(#glow)">${score}%</text>

  <!-- Tier label -->
  <text x="600" y="530" text-anchor="middle" font-size="24" fill="${tier.color}" font-family="sans-serif" font-weight="bold" letter-spacing="6">${tier.label}</text>

  <!-- Branding -->
  <text x="600" y="600" text-anchor="middle" font-size="18" fill="#a78bfa" font-family="sans-serif" opacity="0.6">zodiac-toxicity.com</text>
</svg>`;
}

// Main
const OUTPUT_DIR = path.join(__dirname, "..", "public", "og");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let count = 0;
for (const s1 of SIGN_SLUGS) {
  for (const s2 of SIGN_SLUGS) {
    const svg = generateSvg(s1, s2);
    const filename = `${s1}-${s2}.svg`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), svg);
    count++;
  }
}

console.log(`Generated ${count} OG images in ${OUTPUT_DIR}`);

// Optional: Convert SVGs to PNGs using sharp
// Uncomment if sharp is installed: npm i -D sharp
/*
import sharp from "sharp";

async function convertToPng() {
  for (const s1 of SIGN_SLUGS) {
    for (const s2 of SIGN_SLUGS) {
      const svgPath = path.join(OUTPUT_DIR, `${s1}-${s2}.svg`);
      const pngPath = path.join(OUTPUT_DIR, `${s1}-${s2}.png`);
      await sharp(svgPath).png().toFile(pngPath);
      fs.unlinkSync(svgPath);
    }
  }
  console.log("Converted all SVGs to PNGs");
}
convertToPng();
*/
