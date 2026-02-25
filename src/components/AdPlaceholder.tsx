interface AdPlaceholderProps {
  slot: "top" | "middle" | "bottom";
  format: "banner" | "rectangle" | "leaderboard";
}

const dimensions: Record<string, string> = {
  banner: "w-full h-[90px]",
  rectangle: "w-[300px] h-[250px]",
  leaderboard: "w-full h-[90px] max-w-[728px]",
};

export default function AdPlaceholder({ slot, format }: AdPlaceholderProps) {
  return (
    <div
      className={`${dimensions[format]} mx-auto my-8 flex items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5`}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-label="Advertisement"
    >
      <span className="text-xs text-white/30 uppercase tracking-wider">
        Ad Placement
      </span>
    </div>
  );
}
