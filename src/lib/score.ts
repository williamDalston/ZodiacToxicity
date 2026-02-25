import { ELEMENT_COMPATIBILITY } from "./constants";
import type { SignProfile, CategoryResult, CategoryTemplate } from "./types";

export function calculateCategoryScore(
  sign1: SignProfile,
  sign2: SignProfile,
  categoryKey: string,
  rng: () => number
): number {
  // Base score from element compatibility
  const elementBase =
    ELEMENT_COMPATIBILITY[sign1.element]?.[sign2.element] ?? 75;

  // Random variance +-8
  const variance = Math.floor(rng() * 16) - 8;

  // Category-specific bonuses
  const categoryBonus = getCategoryBonus(sign1, sign2, categoryKey);

  // Same sign "mirror toxicity" boost
  const mirrorBoost = sign1.name === sign2.name ? 5 : 0;

  return Math.min(100, Math.max(60, elementBase + variance + categoryBonus + mirrorBoost));
}

function getCategoryBonus(
  sign1: SignProfile,
  sign2: SignProfile,
  categoryKey: string
): number {
  let bonus = 0;

  // Two fire signs argue louder
  if (sign1.element === "Fire" && sign2.element === "Fire") {
    if (categoryKey === "argumentStyle") bonus += 8;
    if (categoryKey === "communicationToxicity") bonus += 5;
  }

  // Two water signs = jealousy overload
  if (sign1.element === "Water" && sign2.element === "Water") {
    if (categoryKey === "jealousyPotential") bonus += 8;
    if (categoryKey === "longTermForecast") bonus += 3;
  }

  // Fire + Water = maximum chaos
  if (
    (sign1.element === "Fire" && sign2.element === "Water") ||
    (sign1.element === "Water" && sign2.element === "Fire")
  ) {
    bonus += 4;
  }

  // Earth signs have restaurant drama
  if (sign1.element === "Earth" || sign2.element === "Earth") {
    if (categoryKey === "restaurantDecision") bonus += 3;
  }

  // Air signs have text chaos
  if (sign1.element === "Air" || sign2.element === "Air") {
    if (categoryKey === "textMessageChaos") bonus += 4;
  }

  return bonus;
}

export function calculateOverallScore(
  categories: CategoryResult[],
  templatesData: Record<string, CategoryTemplate>
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const cat of categories) {
    const weight = templatesData[cat.key]?.weight ?? 0.14;
    weightedSum += cat.score * weight;
    totalWeight += weight;
  }

  // Bias upward by 4 points for humor
  const raw = Math.round(weightedSum / totalWeight) + 4;
  return Math.min(100, Math.max(60, raw));
}

export function getScoreTier(score: number): { label: string; color: string } {
  if (score >= 96) return { label: "Cosmically Doomed", color: "#A855F7" };
  if (score >= 86) return { label: "Catastrophic", color: "#EF4444" };
  if (score >= 71) return { label: "Volatile", color: "#F97316" };
  return { label: "Concerning", color: "#EAB308" };
}
