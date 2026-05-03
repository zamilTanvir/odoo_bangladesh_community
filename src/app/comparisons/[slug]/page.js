import Link from "next/link";

import { getComparisonStaticParams } from "@/lib/content/buildRouteIndex";
import { getComparisonBySlug, loadSite } from "@/lib/content/loadContent";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/seo/schemaOrg";

export function generateStaticParams() {
  return getComparisonStaticParams();
}

export async function generateMetadata({ params }) {
  const site = loadSite();
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  return buildPageMetadata({
    site,
    title: `${comparison.title} | ${site.siteName}`,
    description: comparison.summary,
    canonicalPath: `/odoo-vs-${comparison.slug}`,
  });
}

export default async function ComparisonDetailPage({ params }) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  const site = loadSite();
  const canonicalPath = `/odoo-vs-${comparison.slug}`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd({
          siteUrl: site.siteUrl,
          items: [
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/comparisons" },
            { name: comparison.title, path: canonicalPath },
          ],
        })}
      />

      <Section className="pb-6">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          {comparison.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          {comparison.summary}
        </p>
      </Section>

      <Card className="p-6 sm:p-8">
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-foreground">Next steps</div>
            <p className="mt-2 text-sm text-muted">
              Use the learning center to understand Odoo workflows, then compare implementation
              effort, module fit, and community resources for your Bangladesh context.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/industries"
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:bg-foreground/[0.03]"
            >
              Browse industries
            </Link>
            <Link
              href="/modules"
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:bg-foreground/[0.03]"
            >
              Browse modules
            </Link>
            <Link
              href="/training/functional"
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:bg-foreground/[0.03]"
            >
              Explore functional training
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

