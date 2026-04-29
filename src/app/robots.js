import { loadSite } from "@/lib/content/loadContent";

export default function robots() {
  const site = loadSite();
  const sitemapUrl = `${site.siteUrl}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: sitemapUrl,
  };
}

