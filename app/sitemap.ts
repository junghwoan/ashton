import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function origin() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: origin(), changeFrequency: "monthly", priority: 1 }];
}
