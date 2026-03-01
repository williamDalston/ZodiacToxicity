export default function StatsBar() {
  return (
    <section className="max-w-3xl mx-auto mt-12 px-4" aria-label="Site statistics">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="glass-card p-3 sm:p-4 text-center">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-black text-zodiac-accent font-display"
          >
            144
          </p>
          <p className="text-[10px] sm:text-xs text-white/50 mt-1">Unique Combos</p>
        </div>
        <div className="glass-card p-3 sm:p-4 text-center">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-black text-zodiac-pink font-display"
          >
            7
          </p>
          <p className="text-[10px] sm:text-xs text-white/50 mt-1">Categories</p>
        </div>
        <div className="glass-card p-3 sm:p-4 text-center">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-black text-score-red font-display"
          >
            100%
          </p>
          <p className="text-[10px] sm:text-xs text-white/50 mt-1">Chaos Guaranteed</p>
        </div>
      </div>
    </section>
  );
}
