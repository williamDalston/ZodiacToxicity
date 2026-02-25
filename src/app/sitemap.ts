import type { MetadataRoute } from "next";
import { SIGN_SLUGS } from "@/lib/types";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zodiac-toxicity.com";

  const comboPages = SIGN_SLUGS.flatMap((s1) =>
    SIGN_SLUGS.map((s2) => ({
      url: `${baseUrl}/${s1}-${s2}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...comboPages,
  ];
}
