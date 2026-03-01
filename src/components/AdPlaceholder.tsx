interface AdPlaceholderProps {
  slot: "top" | "middle" | "bottom";
  format: "banner" | "rectangle" | "leaderboard";
}

/**
 * Ad placeholder — renders nothing until AdSense is configured.
 * When ready, replace the return with actual AdSense <ins> tags.
 *
 * To enable: set NEXT_PUBLIC_ADSENSE_ID in env, then swap in AdSense markup.
 */
export default function AdPlaceholder({ slot, format }: AdPlaceholderProps) {
  // Hidden until AdSense is integrated — keeps the slot data for future use
  return (
    <div
      className="hidden"
      data-ad-slot={slot}
      data-ad-format={format}
      aria-hidden="true"
    />
  );
}
