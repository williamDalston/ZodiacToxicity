"use client";

import { useState, useEffect } from "react";
import { SITE_URL } from "@/lib/constants";

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
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const url = `${SITE_URL}/${combo}`;
  const text = `${sign1Name} + ${sign2Name} = ${score}% toxic (${scoreLabel}) \uD83D\uDD2E Check your combo:`;

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    const w = window.open(twitterUrl, "_blank", "width=550,height=420");
    if (w) w.opener = null;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(textarea);
      }
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
        // User cancelled or error
      }
    }
  };

  return (
    <section className="text-center" aria-labelledby="share-heading">
      <h3
        id="share-heading"
        className="text-xl md:text-2xl font-bold text-white mb-6"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Share Your Toxicity Score
      </h3>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={shareTwitter}
          aria-label="Share on X (Twitter)"
          className="bg-black/50 border border-white/20 text-white px-5 py-3 rounded-full hover:bg-white/10 transition-colors text-sm font-semibold cursor-pointer"
        >
          Share on X
        </button>

        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link to clipboard"}
          className="bg-zodiac-accent text-white px-5 py-3 rounded-full hover:bg-purple-500 transition-colors text-sm font-semibold cursor-pointer"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>

        {canShare && (
          <button
            type="button"
            onClick={shareNative}
            aria-label="Share using device share sheet"
            className="bg-zodiac-pink text-white px-5 py-3 rounded-full hover:bg-pink-500 transition-colors text-sm font-semibold cursor-pointer"
          >
            Share
          </button>
        )}
      </div>

      <p className="text-zodiac-muted text-sm mt-4">
        Tag your {sign2Name} friend who needs to see this \uD83D\uDC40
      </p>
    </section>
  );
}
