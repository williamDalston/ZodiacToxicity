import Link from "next/link";
import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Header />

      <main id="main-content" className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center">
        <span className="text-8xl md:text-9xl mb-6 animate-float">
          {"\uD83D\uDD2E"}
        </span>

        <h1
          className="text-5xl md:text-7xl font-black text-glow mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          404
        </h1>

        <p className="text-xl md:text-2xl text-zodiac-muted mb-2">
          The stars didn&apos;t align for this page.
        </p>
        <p className="text-sm text-white/40 mb-8 max-w-md">
          Maybe Mercury is in retrograde, or maybe this URL just doesn&apos;t exist.
          Either way, the cosmos has other plans for you.
        </p>

        <Link
          href="/"
          className="px-8 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all animate-pulse-glow"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Calculate Your Toxicity
        </Link>
      </main>

      <Footer />
    </div>
  );
}
