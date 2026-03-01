import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComboSelector from "@/components/ComboSelector";
import ToxicShowcase from "@/components/ToxicShowcase";
import StatsBar from "@/components/StatsBar";

export const metadata: Metadata = {
  title: "ZodiacToxicity - How Toxic Are You Together?",
  description:
    "Find out how toxic your zodiac compatibility really is. 144 unique sign combos with hilarious toxicity breakdowns across 7 categories.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "ZodiacToxicity - How Toxic Are You Together?",
    description:
      "Find out how toxic your zodiac compatibility really is. 144 unique sign combos with hilarious toxicity breakdowns.",
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Header />

      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ZodiacToxicity",
            url: SITE_URL,
            description:
              "Find out how toxic your zodiac compatibility really is. 144 unique sign combos with hilarious toxicity breakdowns.",
          }),
        }}
      />
      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ZodiacToxicity",
            url: SITE_URL,
            email: "info@alstonanalystics.com",
          }),
        }}
      />

      <main id="main-content" className="relative z-10 px-4 py-8 md:py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 text-glow font-display"
          >
            How Toxic Are You Together?
          </h2>
          <p className="text-lg md:text-xl text-zodiac-muted">
            Pick two signs. Brace yourself.
          </p>
        </div>

        {/* Sign Selectors */}
        <div id="selector" className="max-w-5xl mx-auto scroll-mt-8">
          <ComboSelector />
        </div>

        {/* Stats */}
        <StatsBar />

        {/* Most Toxic Combos Showcase */}
        <ToxicShowcase />

        {/* How It Works */}
        <section className="max-w-3xl mx-auto mt-16 px-4 animate-slide-up">
          <h3
            className="text-2xl md:text-3xl font-bold text-white text-center mb-8 font-display"
          >
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="glass-card p-6">
              <span className="w-12 h-12 rounded-full bg-zodiac-accent/20 text-zodiac-accent flex items-center justify-center text-xl font-bold mx-auto mb-3">1</span>
              <h4 className="font-bold text-white mb-2">Pick Two Signs</h4>
              <p className="text-sm text-white/60">
                Yours and theirs. Or two friends. Or two exes. We
                don&apos;t judge.
              </p>
            </div>
            <div className="glass-card p-6">
              <span className="w-12 h-12 rounded-full bg-zodiac-accent/20 text-zodiac-accent flex items-center justify-center text-xl font-bold mx-auto mb-3">2</span>
              <h4 className="font-bold text-white mb-2">Get Your Score</h4>
              <p className="text-sm text-white/60">
                Watch the toxicity meter climb to a number that will
                either make you laugh or cry.
              </p>
            </div>
            <div className="glass-card p-6">
              <span className="w-12 h-12 rounded-full bg-zodiac-accent/20 text-zodiac-accent flex items-center justify-center text-xl font-bold mx-auto mb-3">3</span>
              <h4 className="font-bold text-white mb-2">Tag &amp; Share</h4>
              <p className="text-sm text-white/60">
                Send it to the person in question. Then check another
                combo. And another.
              </p>
            </div>
          </div>
        </section>

        {/* Tagline */}
        <p className="text-center text-white/50 text-sm mt-16 italic">
          Don&apos;t blame us for what the stars already know.
        </p>
      </main>

      <Footer />
    </div>
  );
}
