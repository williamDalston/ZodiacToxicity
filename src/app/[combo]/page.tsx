import type { Metadata } from "next";
import Link from "next/link";
import { SIGN_SLUGS } from "@/lib/types";
import { generateResult } from "@/lib/generate-result";
import { SIGN_COLORS, SITE_URL } from "@/lib/constants";
import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToxicityCounter from "@/components/ToxicityCounter";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import ShareButtons from "@/components/ShareButtons";
import ComboSelector from "@/components/ComboSelector";
import AdPlaceholder from "@/components/AdPlaceholder";
import AffiliateCTA from "@/components/AffiliateCTA";
import RelatedCombos from "@/components/RelatedCombos";

// Generate all 144 combo pages at build time
export function generateStaticParams() {
  const params: { combo: string }[] = [];
  for (const s1 of SIGN_SLUGS) {
    for (const s2 of SIGN_SLUGS) {
      params.push({ combo: `${s1}-${s2}` });
    }
  }
  return params;
}

// Dynamic metadata per combo
export async function generateMetadata({
  params,
}: {
  params: Promise<{ combo: string }>;
}): Promise<Metadata> {
  const { combo } = await params;
  const parts = combo.split("-");
  const sign1Slug = findSignSlug(parts);
  const sign2Slug = findSignSlug(parts, sign1Slug);

  if (!sign1Slug || !sign2Slug) {
    return { title: "Not Found" };
  }

  const result = generateResult(sign1Slug, sign2Slug);

  return {
    title: result.metaTitle,
    description: result.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${combo}`,
    },
    openGraph: {
      title: result.metaTitle,
      description: result.metaDescription,
      url: `${SITE_URL}/${combo}`,
      images: [`${SITE_URL}/og/${combo}.svg`],
    },
    twitter: {
      card: "summary_large_image",
      title: result.metaTitle,
      description: result.metaDescription,
      images: [`${SITE_URL}/og/${combo}.svg`],
    },
  };
}

function findSignSlug(parts: string[], exclude?: string | null): string | null {
  for (const slug of SIGN_SLUGS) {
    if (slug === exclude) continue;
    const idx = parts.indexOf(slug);
    if (idx !== -1) return slug;
  }
  const joined = parts.join("-");
  for (const slug of SIGN_SLUGS) {
    if (slug === exclude) continue;
    if (joined.startsWith(slug + "-") || joined.endsWith("-" + slug) || joined === slug) {
      return slug;
    }
  }
  return null;
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ combo: string }>;
}) {
  const { combo } = await params;
  const parts = combo.split("-");
  const sign1Slug = findSignSlug(parts);
  const sign2Slug = findSignSlug(parts, sign1Slug);

  if (!sign1Slug || !sign2Slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Invalid Combo</h1>
          <Link href="/" className="text-zodiac-accent hover:underline">
            Go back and try again
          </Link>
        </div>
      </div>
    );
  }

  const result = generateResult(sign1Slug, sign2Slug);
  const sign1Color = SIGN_COLORS[sign1Slug] || "#8b5cf6";
  const sign2Color = SIGN_COLORS[sign2Slug] || "#ec4899";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: result.metaTitle,
    description: result.metaDescription,
    url: `${SITE_URL}/${combo}`,
    publisher: {
      "@type": "Organization",
      name: "ZodiacToxicity",
      url: SITE_URL,
      email: "info@alstonanalystics.com",
    },
    about: {
      "@type": "Thing",
      name: `${result.sign1.name} and ${result.sign2.name} Compatibility`,
    },
  };

  return (
    <div className="min-h-screen relative">
      <StarField />
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="relative z-10 px-4 py-6 md:py-12 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zodiac-muted hover:text-white transition-colors mb-8 text-sm"
        >
          &larr; Try Another Combo
        </Link>

        {/* Sign Badges */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
            <div className="flex flex-col items-center">
              <span
                className="text-5xl md:text-7xl"
                style={{ filter: `drop-shadow(0 0 12px ${sign1Color})` }}
              >
                {result.sign1.symbol}
              </span>
              <span className="text-sm md:text-base font-semibold text-white mt-2">
                {result.sign1.name}
              </span>
              <span className="text-xs text-white/40">{result.sign1.element} Sign</span>
            </div>

            <span className="text-3xl md:text-4xl text-zodiac-muted font-light animate-float">&times;</span>

            <div className="flex flex-col items-center">
              <span
                className="text-5xl md:text-7xl"
                style={{ filter: `drop-shadow(0 0 12px ${sign2Color})` }}
              >
                {result.sign2.symbol}
              </span>
              <span className="text-sm md:text-base font-semibold text-white mt-2">
                {result.sign2.name}
              </span>
              <span className="text-xs text-white/40">{result.sign2.element} Sign</span>
            </div>
          </div>
        </div>

        {/* Toxicity Score Hero */}
        <div className="flex justify-center mb-10">
          <ToxicityCounter
            targetScore={result.overallScore}
            color={result.scoreColor}
            label={result.scoreLabel}
          />
        </div>

        {/* Special Lines */}
        {result.specialLines.length > 0 && (
          <div className="glass-card p-6 mb-8 animate-slide-up">
            <div className="space-y-3">
              {result.specialLines.map((line, i) => (
                <p key={i} className="text-gray-200 italic text-center leading-relaxed text-sm md:text-base">
                  &ldquo;{line}&rdquo;
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Ad Placement: Top */}
        <AdPlaceholder slot="top" format="leaderboard" />

        {/* Category Breakdowns */}
        <div className="space-y-4 mb-8">
          <h3
            className="text-2xl font-bold text-white text-center mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The Full Breakdown
          </h3>
          {result.categories.map((category, index) => (
            <div key={category.key}>
              <CategoryBreakdown category={category} index={index} />
              {index === 3 && (
                <AdPlaceholder slot="middle" format="rectangle" />
              )}
            </div>
          ))}
        </div>

        {/* Affiliate CTAs - all 4 types in 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <AffiliateCTA type="costar" />
          <AffiliateCTA type="betterhelp" />
          <AffiliateCTA type="dating-app" />
          <AffiliateCTA type="amazon-books" />
        </div>

        {/* Share Buttons */}
        <div className="glass-card p-6 md:p-8 mb-10">
          <ShareButtons
            sign1Name={result.sign1.name}
            sign2Name={result.sign2.name}
            score={result.overallScore}
            scoreLabel={result.scoreLabel}
            combo={combo}
          />
        </div>

        {/* Related Combos */}
        <div className="glass-card p-6 md:p-8 mb-10">
          <RelatedCombos currentSign1={sign1Slug} currentSign2={sign2Slug} />
        </div>

        {/* Check Another Combo — pre-populated with current signs */}
        <div className="glass-card p-6 md:p-8">
          <h3
            className="text-2xl font-bold text-white text-center mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Check Another Combo
          </h3>
          <ComboSelector
            variant="compact"
            initialSign1={sign1Slug}
            initialSign2={sign2Slug}
          />
        </div>

        {/* Bottom Ad */}
        <AdPlaceholder slot="bottom" format="banner" />
      </main>

      <Footer />
    </div>
  );
}
