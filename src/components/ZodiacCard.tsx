"use client";

import { cn } from "@/lib/utils";

interface ZodiacCardProps {
  slug: string;
  name: string;
  symbol: string;
  color: string;
  dateRange: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ZodiacCard({
  name,
  symbol,
  color,
  dateRange,
  isSelected,
  onClick,
}: ZodiacCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl transition-all duration-200 cursor-pointer",
        "hover:scale-105 hover:bg-white/10",
        isSelected
          ? "bg-white/15 scale-105"
          : "bg-white/5 border border-white/10"
      )}
      style={{
        borderColor: isSelected ? color : undefined,
        boxShadow: isSelected ? `0 0 20px ${color}40, 0 0 40px ${color}20, inset 0 0 0 2px ${color}` : undefined,
      }}
    >
      <span className="text-3xl md:text-4xl mb-1" style={{ filter: isSelected ? `drop-shadow(0 0 8px ${color})` : undefined }}>
        {symbol}
      </span>
      <span className="text-xs md:text-sm font-semibold text-white">{name}</span>
      <span className="text-[10px] text-white/40 mt-0.5 hidden md:block">{dateRange}</span>
      {isSelected && (
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          &#10003;
        </div>
      )}
    </button>
  );
}
