import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { generateResult } from "@/lib/generate-result";

interface MostToxicTeaserProps {
  currentSign: string;
  excludeSign: string;
}

export default function MostToxicTeaser({ currentSign, excludeSign }: MostToxicTeaserProps) {
  // Find the most toxic pairing for currentSign (highest score)
  let mostToxic: { slug: string; name: string; symbol: string; score: number; color: string; label: string } | null = null;

  for (const sign of ZODIAC_SIGNS) {
    if (sign.slug === excludeSign) continue;
    if (sign.slug === currentSign) continue;
    const result = generateResult(currentSign, sign.slug);
    if (!mostToxic || result.overallScore > mostToxic.score) {
      mostToxic = {
        slug: `${currentSign}-${sign.slug}`,
        name: sign.name,
        symbol: sign.symbol,
        score: result.overallScore,
        color: result.scoreColor,
        label: result.scoreLabel,
      };
    }
  }

  // Also check currentSign x currentSign (same sign)
  const selfResult = generateResult(currentSign, currentSign);
  if (selfResult.overallScore > (mostToxic?.score ?? 0)) {
    const self = ZODIAC_SIGNS.find((s) => s.slug === currentSign)!;
    mostToxic = {
      slug: `${currentSign}-${currentSign}`,
      name: self.name,
      symbol: self.symbol,
      score: selfResult.overallScore,
      color: selfResult.scoreColor,
      label: selfResult.scoreLabel,
    };
  }

  if (!mostToxic) return null;

  const currentSignData = ZODIAC_SIGNS.find((s) => s.slug === currentSign);

  return (
    <Link
      href={`/${mostToxic.slug}`}
      className="block p-6 text-center rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40 hover:border-purple-500/50 transition-all hover:scale-[1.01] group"
    >
      <p className="text-xs uppercase tracking-wider text-zodiac-muted mb-3">
        Think this is bad?
      </p>
      <p
        className="text-lg md:text-xl font-bold text-white mb-3 font-display"
      >
        {currentSignData?.name}&apos;s Most Toxic Match
      </p>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="text-3xl md:text-4xl">{currentSignData?.symbol}</span>
        <span className="text-sm text-zodiac-muted">&times;</span>
        <span className="text-3xl md:text-4xl">{mostToxic.symbol}</span>
      </div>
      <span
        className="text-3xl md:text-4xl font-black font-display"
        style={{ color: mostToxic.color }}
      >
        {mostToxic.score}%
      </span>
      <p
        className="text-xs font-semibold uppercase tracking-wider mt-1 mb-3"
        style={{ color: mostToxic.color }}
      >
        {mostToxic.label}
      </p>
      <span className="text-sm text-zodiac-accent group-hover:underline">
        See full breakdown &rarr;
      </span>
    </Link>
  );
}
