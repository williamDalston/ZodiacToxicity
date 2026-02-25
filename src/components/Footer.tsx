export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 text-center border-t border-white/10 mt-16">
      <p className="text-sm text-white/40 max-w-xl mx-auto">
        ZodiacToxicity is for entertainment purposes only. We are not responsible
        for any breakups, existential crises, or group chat meltdowns that result
        from using this site. The stars made us do it.
      </p>
      <div className="flex justify-center gap-6 mt-4 text-xs text-white/30">
        <span>&copy; {new Date().getFullYear()} ZodiacToxicity</span>
        <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
        <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
      </div>
    </footer>
  );
}
