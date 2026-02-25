export interface SignProfile {
  name: string;
  symbol: string;
  element: "Fire" | "Water" | "Earth" | "Air";
  dateRange: string;
  color: string;
  communicationStyle: string;
  jealousyTrigger: string;
  argumentWeapon: string;
  textStyle: string;
  breakupMethod: string;
  loveLanguage: string;
  apologyStyle: string;
  redFlag: string;
  petPeeve: string;
  toxicTrait: string;
  restaurantBehavior: string;
  longTermOutlook: string;
  socialMediaHabit: string;
  sleepHabit: string;
  friendGroupRole: string;
}

export type SignSlug =
  | "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo"
  | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces";

export interface CategoryTemplate {
  label: string;
  icon: string;
  traitKey: keyof SignProfile;
  weight: number;
  templates: string[];
}

export interface CategoryResult {
  key: string;
  label: string;
  icon: string;
  score: number;
  description: string;
}

export interface ComboResult {
  sign1: SignProfile;
  sign2: SignProfile;
  overallScore: number;
  scoreLabel: string;
  scoreColor: string;
  categories: CategoryResult[];
  specialLines: string[];
  metaTitle: string;
  metaDescription: string;
}

export const SIGN_SLUGS: SignSlug[] = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];
