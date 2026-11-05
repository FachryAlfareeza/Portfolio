// Absolute site origin, needed for the sitemap and social preview URLs.
// Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the
// production domain is provided automatically at build time.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
