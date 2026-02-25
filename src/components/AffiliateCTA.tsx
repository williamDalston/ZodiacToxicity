interface AffiliateCTAProps {
  type: "costar" | "betterhelp" | "dating-app" | "amazon-books";
}

const AFFILIATE_CONTENT = {
  costar: {
    headline: "Understand your chart (and your terrible choices)",
    cta: "Try Co-Star Free",
    description: "Get daily horoscopes that explain why you're like this.",
    url: "#costar-affiliate",
  },
  betterhelp: {
    headline: "You might need to talk to someone",
    cta: "Try BetterHelp",
    description: "Because the stars can only do so much for this relationship.",
    url: "#betterhelp-affiliate",
  },
  "dating-app": {
    headline: "Maybe try someone with a different birthday",
    cta: "Download Hinge",
    description: "Designed to be deleted. Unlike this toxic pattern.",
    url: "#dating-affiliate",
  },
  "amazon-books": {
    headline: "Learn why you keep doing this to yourself",
    cta: "Shop Astrology Books",
    description: "Understanding your chart won't fix you, but at least you'll know why.",
    url: "#amazon-affiliate",
  },
};

export default function AffiliateCTA({ type }: AffiliateCTAProps) {
  const content = AFFILIATE_CONTENT[type];

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 my-6">
      <p className="text-xs text-purple-300 uppercase tracking-wider mb-2">
        Sponsored
      </p>
      <h4
        className="text-lg font-bold text-white mb-2"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {content.headline}
      </h4>
      <p className="text-sm text-gray-300 mb-4">{content.description}</p>
      <a
        href={content.url}
        className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        data-affiliate-type={type}
      >
        {content.cta}
      </a>
    </div>
  );
}
