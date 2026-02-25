import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ZodiacToxicity - How Toxic Are You Together?",
    template: "%s | ZodiacToxicity",
  },
  description:
    "Find out how toxic your zodiac compatibility really is. 144 unique sign combos with hilarious toxicity breakdowns.",
  metadataBase: new URL("https://zodiac-toxicity.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZodiacToxicity",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
