export const SITE_URL = "https://zodiac-toxicity.com";

export const ZODIAC_SIGNS = [
  { slug: "aries", name: "Aries", symbol: "\u2648", element: "Fire" },
  { slug: "taurus", name: "Taurus", symbol: "\u2649", element: "Earth" },
  { slug: "gemini", name: "Gemini", symbol: "\u264A", element: "Air" },
  { slug: "cancer", name: "Cancer", symbol: "\u264B", element: "Water" },
  { slug: "leo", name: "Leo", symbol: "\u264C", element: "Fire" },
  { slug: "virgo", name: "Virgo", symbol: "\u264D", element: "Earth" },
  { slug: "libra", name: "Libra", symbol: "\u264E", element: "Air" },
  { slug: "scorpio", name: "Scorpio", symbol: "\u264F", element: "Water" },
  { slug: "sagittarius", name: "Sagittarius", symbol: "\u2650", element: "Fire" },
  { slug: "capricorn", name: "Capricorn", symbol: "\u2651", element: "Earth" },
  { slug: "aquarius", name: "Aquarius", symbol: "\u2652", element: "Air" },
  { slug: "pisces", name: "Pisces", symbol: "\u2653", element: "Water" },
] as const;

export const SIGN_COLORS: Record<string, string> = {
  aries: "#FF4136",
  taurus: "#2ECC40",
  gemini: "#FFDC00",
  cancer: "#B10DC9",
  leo: "#FF851B",
  virgo: "#3D9970",
  libra: "#FF69B4",
  scorpio: "#85144B",
  sagittarius: "#F012BE",
  capricorn: "#001F3F",
  aquarius: "#7FDBFF",
  pisces: "#0074D9",
};

// Higher number = more "toxic" (funnier) pairing
export const ELEMENT_COMPATIBILITY: Record<string, Record<string, number>> = {
  Fire:  { Fire: 72, Earth: 85, Air: 75, Water: 88 },
  Earth: { Fire: 85, Earth: 70, Air: 82, Water: 74 },
  Air:   { Fire: 75, Earth: 82, Air: 68, Water: 86 },
  Water: { Fire: 88, Earth: 74, Air: 86, Water: 71 },
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  megaphone: "\uD83D\uDCE2",
  eye: "\uD83D\uDC41\uFE0F",
  swords: "\u2694\uFE0F",
  phone: "\uD83D\uDCF1",
  "crystal-ball": "\uD83D\uDD2E",
  "broken-heart": "\uD83D\uDC94",
  utensils: "\uD83C\uDF7D\uFE0F",
};
