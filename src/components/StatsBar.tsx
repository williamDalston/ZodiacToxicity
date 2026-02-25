export default function StatsBar() {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p
            className="text-2xl md:text-3xl font-black text-zodiac-accent"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            144
          </p>
          <p className="text-xs text-white/50 mt-1">Unique Combos</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p
            className="text-2xl md:text-3xl font-black text-zodiac-pink"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            7
          </p>
          <p className="text-xs text-white/50 mt-1">Toxicity Categories</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p
            className="text-2xl md:text-3xl font-black text-score-red"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            100%
          </p>
          <p className="text-xs text-white/50 mt-1">Chaos Guaranteed</p>
        </div>
      </div>
    </div>
  );
}
