import type { Metadata } from "next";
import Link from "next/link";
import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for ZodiacToxicity. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Header />

      <main id="main-content" className="relative z-10 px-4 py-12 max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zodiac-muted hover:text-white transition-colors mb-8 text-sm"
        >
          &larr; Back to ZodiacToxicity
        </Link>

        <h1
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Privacy Policy
        </h1>

        <div className="glass-card p-6 md:p-8 space-y-6 text-white/80 text-sm leading-relaxed">
          <p className="text-white/60 text-xs">Last updated: February 2025</p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Overview
            </h2>
            <p>
              ZodiacToxicity (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is an
              entertainment website. We are committed to protecting your privacy.
              This policy explains how we collect, use, and protect information when
              you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Information We Collect
            </h2>
            <p>
              ZodiacToxicity is a static site. We do not require accounts or
              login. We may collect:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Usage data:</strong> When you visit, our hosting provider
                (e.g., Vercel) may log standard data such as IP address, browser
                type, and pages visited.
              </li>
              <li>
                <strong>Cookies:</strong> We may use analytics or advertising
                services that set cookies. See the &quot;Third-Party Services&quot;
                section below.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              How We Use Your Information
            </h2>
            <p>
              We use collected information to improve the site, understand
              traffic patterns, and deliver relevant content. We do not sell your
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Third-Party Services
            </h2>
            <p>
              Our site may include links to third-party services (e.g., social
              platforms, affiliate partners). These services have their own
              privacy policies. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Your Rights
            </h2>
            <p>
              Depending on your location, you may have rights to access, correct,
              or delete your data. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Contact Us
            </h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a
                href="mailto:info@alstonanalystics.com"
                className="text-zodiac-accent hover:underline"
              >
                info@alstonanalystics.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
