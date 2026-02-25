import { CATEGORY_EMOJIS } from "@/lib/constants";
import { getScoreTier } from "@/lib/score";
import type { CategoryResult } from "@/lib/types";

interface CategoryBreakdownProps {
  category: CategoryResult;
  index: number;
}

export default function CategoryBreakdown({ category, index }: CategoryBreakdownProps) {
  const { color } = getScoreTier(category.score);

  return (
    <div
      className="glass-card p-5 md:p-6 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {CATEGORY_EMOJIS[category.icon] || "\u2728"}
          </span>
          <h3
            className="text-base md:text-lg font-semibold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {category.label}
          </h3>
        </div>
        <span
          className="text-xl md:text-2xl font-black tabular-nums"
          style={{ color }}
        >
          {category.score}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${category.score}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        {category.description}
      </p>
    </div>
  );
}
