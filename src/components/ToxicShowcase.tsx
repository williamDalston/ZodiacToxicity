import Link from "next/link";
import { generateResult } from "@/lib/generate-result";

// Pre-picked "most entertaining" combos for the homepage
const SHOWCASE_COMBOS = [
  { s1: "scorpio", s2: "gemini" },
  { s1: "aries", s2: "aries" },
  { s1: "leo", s2: "leo" },
  { s1: "cancer", s2: "scorpio" },
  { s1: "sagittarius", s2: "capricorn" },
  { s1: "pisces", s2: "virgo" },
];

export default function ToxicShowcase() {
  const combos = SHOWCASE_COMBOS.map(({ s1, s2 }) => {
    const result = generateResult(s1, s2);
    return {
      slug: `${s1}-${s2}`,
      sign1: result.sign1,
      sign2: result.sign2,
      score: result.overallScore,
      label: result.scoreLabel,
      color: result.scoreColor,
    };
  });

  return (
    <section className="max-w-4xl mx-auto mt-16 px-4 animate-slide-up">
      <h3
        className="text-2xl md:text-3xl font-bold text-white text-center mb-2"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Most Toxic Combos
      </h3>
      <p className="text-zodiac-muted text-center text-sm mb-8">
        These pairings should come with a warning label.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {combos.map((combo) => (
          <Link
            key={combo.slug}
            href={`/${combo.slug}`}
            className="glass-card p-5 text-center hover:bg-white/10 transition-all hover:scale-[1.03] group cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span
                className="text-3xl md:text-4xl"
                style={{
                  filter: `drop-shadow(0 0 6px ${combo.sign1.color})`,
                }}
              >
                {combo.sign1.symbol}
              </span>
              <span className="text-sm text-zodiac-muted">&times;</span>
              <span
                className="text-3xl md:text-4xl"
                style={{
                  filter: `drop-shadow(0 0 6px ${combo.sign2.color})`,
                }}
              >
                {combo.sign2.symbol}
              </span>
            </div>
            <p className="text-sm text-white/80 font-medium mb-1">
              {combo.sign1.name} &amp; {combo.sign2.name}
            </p>
            <span
              className="text-2xl font-black"
              style={{ color: combo.color, fontFamily: "var(--font-space-grotesk)" }}
            >
              {combo.score}%
            </span>
            <p
              className="text-xs font-semibold uppercase tracking-wider mt-1"
              style={{ color: combo.color }}
            >
              {combo.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
