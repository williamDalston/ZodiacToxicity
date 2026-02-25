"use client";

import { useState } from "react";

interface ShareButtonsProps {
  sign1Name: string;
  sign2Name: string;
  score: number;
  scoreLabel: string;
  combo: string;
}

export default function ShareButtons({
  sign1Name,
  sign2Name,
  score,
  scoreLabel,
  combo,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = `https://zodiac-toxicity.com/${combo}`;
  const text = `${sign1Name} + ${sign2Name} = ${score}% toxic (${scoreLabel}) \uD83D\uDD2E Check your combo:`;

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for insecure contexts
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${sign1Name} + ${sign2Name} Toxicity Score`,
          text,
          url,
        });
      } catch {
        // User cancelled or not supported
      }
    }
  };

  return (
    <div className="text-center">
      <h3
        className="text-xl md:text-2xl font-bold text-white mb-6"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Share Your Toxicity Score
      </h3>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={shareTwitter}
          className="bg-black/50 border border-white/20 text-white px-5 py-3 rounded-full hover:bg-white/10 transition-colors text-sm font-semibold cursor-pointer"
        >
          Share on X
        </button>

        <button
          onClick={copyLink}
          className="bg-zodiac-accent text-white px-5 py-3 rounded-full hover:bg-purple-500 transition-colors text-sm font-semibold cursor-pointer"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>

        <button
          onClick={shareNative}
          className="bg-zodiac-pink text-white px-5 py-3 rounded-full hover:bg-pink-500 transition-colors text-sm font-semibold cursor-pointer"
        >
          Share
        </button>
      </div>

      <p className="text-zodiac-muted text-sm mt-4">
        Tag your {sign2Name} friend who needs to see this \uD83D\uDC40
      </p>
    </div>
  );
}
