import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-10 py-6 px-4 text-center">
      <Link href="/" className="inline-block" aria-label="ZodiacToxicity - Home">
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight text-glow"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-zodiac-accent">Zodiac</span>
          <span className="text-zodiac-pink">Toxicity</span>
        </h1>
      </Link>
    </header>
  );
}
