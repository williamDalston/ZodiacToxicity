"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ZodiacGrid from "./ZodiacGrid";

interface ComboSelectorProps {
  variant?: "full" | "compact";
  initialSign1?: string;
  initialSign2?: string;
}

export default function ComboSelector({
  variant = "full",
  initialSign1,
  initialSign2,
}: ComboSelectorProps) {
  const [sign1, setSign1] = useState<string | null>(initialSign1 ?? null);
  const [sign2, setSign2] = useState<string | null>(initialSign2 ?? null);
  const router = useRouter();

  const handleCalculate = () => {
    if (sign1 && sign2) {
      router.push(`/${sign1}-${sign2}`);
    }
  };

  const isReady = sign1 !== null && sign2 !== null;

  return (
    <div className={variant === "compact" ? "" : "animate-slide-up-delay"}>
      <div
        className={`flex flex-col ${variant === "full" ? "lg:flex-row" : "md:flex-row"} gap-6 md:gap-10 justify-center items-start`}
      >
        <ZodiacGrid label="Your Sign" selected={sign1} onSelect={setSign1} />
        <div className="hidden lg:flex items-center self-center pt-10">
          <span className="text-4xl text-zodiac-muted">&times;</span>
        </div>
        <ZodiacGrid label="Their Sign" selected={sign2} onSelect={setSign2} />
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleCalculate}
          disabled={!isReady}
          className={`
            px-8 py-4 rounded-full text-lg font-bold transition-all duration-300
            ${
              isReady
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white animate-pulse-glow cursor-pointer"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }
          `}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {variant === "compact" ? "Check Another Combo" : "Calculate Our Toxicity"}
        </button>
      </div>
    </div>
  );
}
