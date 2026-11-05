import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Only the public home page; /cv is a private working page and stays out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/llms.txt`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
