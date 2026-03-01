import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] px-4 text-center border-t border-white/10 mt-16">
      <p className="text-sm text-white/50 max-w-xl mx-auto">
        ZodiacToxicity is for entertainment purposes only. We are not responsible
        for any breakups, existential crises, or group chat meltdowns that result
        from using this site. The stars made us do it.
      </p>
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-xs text-white/50" aria-label="Footer links">
        <span className="py-2">&copy; {new Date().getFullYear()} ZodiacToxicity</span>
        <Link href="/privacy" className="py-2 px-1 underline decoration-white/20 underline-offset-4 hover:text-white/80 hover:decoration-white/50 transition-colors">Privacy</Link>
        <Link href="/terms" className="py-2 px-1 underline decoration-white/20 underline-offset-4 hover:text-white/80 hover:decoration-white/50 transition-colors">Terms</Link>
        <a href="mailto:info@alstonanalystics.com" className="py-2 px-1 underline decoration-white/20 underline-offset-4 hover:text-white/80 hover:decoration-white/50 transition-colors">Contact</a>
      </nav>
    </footer>
  );
}
