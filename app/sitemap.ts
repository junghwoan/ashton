import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function origin() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const root = origin().replace(/\/$/, "");
  return [
    { url: `${root}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${root}/about/`, changeFrequency: "monthly", priority: 0.4 },
  ];
}
