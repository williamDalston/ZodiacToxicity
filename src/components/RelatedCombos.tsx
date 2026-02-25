import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { generateResult } from "@/lib/generate-result";

interface RelatedCombosProps {
  currentSign1: string;
  currentSign2: string;
}

export default function RelatedCombos({ currentSign1, currentSign2 }: RelatedCombosProps) {
  // Get 6 related combos: 3 with sign1, 3 with sign2 (different partners)
  const related: { slug: string; sign1Name: string; sign2Name: string; sign1Symbol: string; sign2Symbol: string; score: number; color: string }[] = [];

  const allSigns = ZODIAC_SIGNS.map((s) => s.slug);

  // 3 combos with sign1 paired with different signs
  for (const s of allSigns) {
    if (s === currentSign1 || s === currentSign2) continue;
    if (related.length >= 3) break;
    const result = generateResult(currentSign1, s);
    related.push({
      slug: `${currentSign1}-${s}`,
      sign1Name: result.sign1.name,
      sign2Name: result.sign2.name,
      sign1Symbol: result.sign1.symbol,
      sign2Symbol: result.sign2.symbol,
      score: result.overallScore,
      color: result.scoreColor,
    });
  }

  // 3 combos with sign2 paired with different signs
  for (const s of allSigns) {
    if (s === currentSign1 || s === currentSign2) continue;
    if (related.filter((r) => r.slug.includes(currentSign2)).length >= 3) break;
    if (related.some((r) => r.slug === `${currentSign2}-${s}`)) continue;
    const result = generateResult(currentSign2, s);
    related.push({
      slug: `${currentSign2}-${s}`,
      sign1Name: result.sign1.name,
      sign2Name: result.sign2.name,
      sign1Symbol: result.sign1.symbol,
      sign2Symbol: result.sign2.symbol,
      score: result.overallScore,
      color: result.scoreColor,
    });
  }

  return (
    <section aria-labelledby="related-heading">
      <h3
        id="related-heading"
        className="text-xl font-bold text-white text-center mb-5"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Related Combos
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {related.map((combo) => (
          <Link
            key={combo.slug}
            href={`/${combo.slug}`}
            className="glass-card p-4 text-center hover:bg-white/10 transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{combo.sign1Symbol}</span>
              <span className="text-xs text-zodiac-muted">&times;</span>
              <span className="text-2xl">{combo.sign2Symbol}</span>
            </div>
            <p className="text-xs text-white/70 mb-1">
              {combo.sign1Name} &amp; {combo.sign2Name}
            </p>
            <span
              className="text-lg font-black"
              style={{ color: combo.color }}
            >
              {combo.score}%
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
