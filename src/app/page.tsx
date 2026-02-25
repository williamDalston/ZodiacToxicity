import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComboSelector from "@/components/ComboSelector";
import ToxicShowcase from "@/components/ToxicShowcase";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Header />

      <main id="main-content" className="relative z-10 px-4 py-8 md:py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          <h2
            className="text-4xl md:text-6xl font-black mb-4 text-glow"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            How Toxic Are You Together?
          </h2>
          <p className="text-lg md:text-xl text-zodiac-muted">
            Pick two signs. Brace yourself.
          </p>
        </div>

        {/* Sign Selectors */}
        <div className="max-w-5xl mx-auto">
          <ComboSelector />
        </div>

        {/* Stats */}
        <StatsBar />

        {/* Most Toxic Combos Showcase */}
        <ToxicShowcase />

        {/* How It Works */}
        <section className="max-w-3xl mx-auto mt-16 px-4 animate-slide-up">
          <h3
            className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="glass-card p-6">
              <span className="text-4xl mb-3 block">1</span>
              <h4 className="font-bold text-white mb-2">Pick Two Signs</h4>
              <p className="text-sm text-white/50">
                Yours and theirs. Or two friends. Or two exes. We
                don&apos;t judge.
              </p>
            </div>
            <div className="glass-card p-6">
              <span className="text-4xl mb-3 block">2</span>
              <h4 className="font-bold text-white mb-2">Get Your Score</h4>
              <p className="text-sm text-white/50">
                Watch the toxicity meter climb to a number that will
                either make you laugh or cry.
              </p>
            </div>
            <div className="glass-card p-6">
              <span className="text-4xl mb-3 block">3</span>
              <h4 className="font-bold text-white mb-2">Tag &amp; Share</h4>
              <p className="text-sm text-white/50">
                Send it to the person in question. Then check another
                combo. And another.
              </p>
            </div>
          </div>
        </section>

        {/* Tagline */}
        <p className="text-center text-white/30 text-sm mt-16 italic">
          Don&apos;t blame us for what the stars already know.
        </p>
      </main>

      <Footer />
    </div>
  );
}
