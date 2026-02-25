import signsData from "../../data/signs.json";
import templatesData from "../../data/templates.json";
import specialsData from "../../data/specials.json";
import { seededRandom, hashCombo } from "./utils";
import { calculateCategoryScore, calculateOverallScore, getScoreTier } from "./score";
import type { SignProfile, CategoryResult, ComboResult, CategoryTemplate } from "./types";

const signs = signsData as Record<string, SignProfile>;
const templates = templatesData as Record<string, CategoryTemplate>;
const specials = specialsData as Record<string, string[]>;

export function generateResult(sign1Slug: string, sign2Slug: string): ComboResult {
  const sign1 = signs[sign1Slug];
  const sign2 = signs[sign2Slug];

  if (!sign1 || !sign2) {
    throw new Error(`Invalid sign slug: ${sign1Slug} or ${sign2Slug}`);
  }

  const seed = hashCombo(sign1Slug, sign2Slug);
  const rng = seededRandom(seed);

  const categories: CategoryResult[] = [];

  for (const [categoryKey, category] of Object.entries(templates)) {
    // Pick a template deterministically
    const templateIndex = Math.floor(rng() * category.templates.length);
    const template = category.templates[templateIndex];

    // Fill in placeholders
    const traitKey = category.traitKey as keyof SignProfile;
    const sign1Trait = sign1[traitKey] || "";
    const sign2Trait = sign2[traitKey] || "";

    const description = template
      .replace(/{SIGN1_NAME}/g, sign1.name)
      .replace(/{SIGN2_NAME}/g, sign2.name)
      .replace(/{SIGN1_TRAIT}/g, sign1Trait)
      .replace(/{SIGN2_TRAIT}/g, sign2Trait);

    const score = calculateCategoryScore(sign1, sign2, categoryKey, rng);

    categories.push({
      key: categoryKey,
      label: category.label,
      icon: category.icon,
      score,
      description,
    });
  }

  // Look up special hand-written lines (keys are alphabetically sorted)
  const comboKey = [sign1Slug, sign2Slug].sort().join("-");
  const specialLines = specials[comboKey] || [];

  const overallScore = calculateOverallScore(categories, templates);
  const { label: scoreLabel, color: scoreColor } = getScoreTier(overallScore);

  const metaTitle = `${sign1.name} & ${sign2.name} Toxicity: ${overallScore}% ${scoreLabel}`;
  const metaDescription = `How toxic are ${sign1.name} and ${sign2.name} together? ${overallScore}% ${scoreLabel}. See the full breakdown of communication, jealousy, arguments, and more.`;

  return {
    sign1,
    sign2,
    overallScore,
    scoreLabel,
    scoreColor,
    categories,
    specialLines,
    metaTitle,
    metaDescription,
  };
}
