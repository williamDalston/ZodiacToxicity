"use client";

import ZodiacCard from "./ZodiacCard";
import { ZODIAC_SIGNS, SIGN_COLORS } from "@/lib/constants";
import signsData from "../../data/signs.json";

interface ZodiacGridProps {
  label: string;
  selected: string | null;
  onSelect: (slug: string) => void;
}

const signs = signsData as Record<string, { dateRange: string }>;

export default function ZodiacGrid({ label, selected, onSelect }: ZodiacGridProps) {
  return (
    <div className="flex flex-col items-center">
      <h3
        className="text-lg md:text-xl font-bold mb-4 text-zodiac-muted"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {label}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {ZODIAC_SIGNS.map((sign) => (
          <ZodiacCard
            key={sign.slug}
            slug={sign.slug}
            name={sign.name}
            symbol={sign.symbol}
            color={SIGN_COLORS[sign.slug]}
            dateRange={signs[sign.slug]?.dateRange ?? ""}
            isSelected={selected === sign.slug}
            onClick={() => onSelect(sign.slug)}
          />
        ))}
      </div>
    </div>
  );
}
