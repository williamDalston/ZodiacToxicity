import type { Metadata } from "next";
import Link from "next/link";
import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for ZodiacToxicity. Rules for using our site.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="glass-card p-6 md:p-8 space-y-6 text-white/80 text-sm leading-relaxed">
          <p className="text-white/60 text-xs">Last updated: February 2025</p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Acceptance of Terms
            </h2>
            <p>
              By using ZodiacToxicity, you agree to these Terms of Service. If you
              do not agree, please do not use our site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Entertainment Only
            </h2>
            <p>
              ZodiacToxicity is for entertainment purposes only. Our compatibility
              scores and content are not scientific, medical, or professional
              advice. Do not make life decisions based on our content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Acceptable Use
            </h2>
            <p>You agree to use our site only for lawful purposes. You may not:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Use the site to harass, abuse, or harm others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or overload our servers</li>
              <li>Reproduce or redistribute our content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Intellectual Property
            </h2>
            <p>
              The ZodiacToxicity name, branding, and content are owned by us or
              our licensors. You may share links to our site and use share
              features we provide.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Disclaimer of Warranties
            </h2>
            <p>
              Our site is provided &quot;as is&quot; without warranties of any kind. We do
              not guarantee that the site will be error-free, secure, or
              uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Limitation of Liability
            </h2>
            <p>
              We are not liable for any damages arising from your use of
              ZodiacToxicity, including but not limited to breakups, existential
              crises, or group chat meltdowns. The stars made us do it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Changes
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the
              site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              Contact
            </h2>
            <p>
              Questions? Contact us at{" "}
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
