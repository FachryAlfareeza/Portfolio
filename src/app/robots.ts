import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /cv is a private working page (also marked noindex) and /api is not content.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cv", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
