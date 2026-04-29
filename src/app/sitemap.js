import {
  getAllBlogPosts,
  getAllComparisons,
  getAllIndustries,
  getAllModules,
  getAllTrainingTopics,
  loadSite,
} from "@/lib/content/loadContent";

export default function sitemap() {
  const site = loadSite();

  const urls = new Set();

  // Root + implemented index pages
  urls.add(site.siteUrl);
  urls.add(`${site.siteUrl}/industries`);
  urls.add(`${site.siteUrl}/modules`);
  urls.add(`${site.siteUrl}/training/functional`);
  urls.add(`${site.siteUrl}/training/technical`);
  urls.add(`${site.siteUrl}/comparisons`);
  urls.add(`${site.siteUrl}/blog`);

  // Programmatic SEO URLs (clean, SEO-friendly patterns)
  for (const industry of getAllIndustries()) {
    urls.add(`${site.siteUrl}/odoo-for-${industry.slug}-industry`);
  }

  for (const moduleItem of getAllModules()) {
    urls.add(`${site.siteUrl}/odoo-${moduleItem.slug}-bangladesh`);
  }

  for (const topic of getAllTrainingTopics()) {
    if (topic.track === "functional") {
      urls.add(`${site.siteUrl}/odoo-functional-training/${topic.slug}`);
    }
    if (topic.track === "technical") {
      urls.add(`${site.siteUrl}/odoo-technical-training/${topic.slug}`);
    }
  }

  for (const comparison of getAllComparisons()) {
    urls.add(`${site.siteUrl}/odoo-vs-${comparison.slug}`);
  }

  for (const post of getAllBlogPosts()) {
    urls.add(`${site.siteUrl}/blog/${post.slug}`);
  }

  return Array.from(urls).map((url) => ({ url }));
}

