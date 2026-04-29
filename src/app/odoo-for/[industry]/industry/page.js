import Link from "next/link";

import { getIndustryStaticParams } from "@/lib/content/buildRouteIndex";
import { getIndustryBySlug, loadSite } from "@/lib/content/loadContent";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getIndustryStaticParams();
}

export async function generateMetadata({ params }) {
  const site = loadSite();
  const { industry } = await params;
  const industryItem = getIndustryBySlug(industry);

  return buildPageMetadata({
    site,
    title: `${industryItem.title} | ${site.siteName}`,
    description: industryItem.description,
    canonicalPath: `/odoo-for-${industryItem.slug}-industry`,
  });
}

export default async function IndustryDetailPage({ params }) {
  const { industry } = await params;
  const industryItem = getIndustryBySlug(industry);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Section className="pb-6">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          {industryItem.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          {industryItem.description}
        </p>
      </Section>

      <Card className="p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <div className="text-sm font-semibold text-foreground">Relevant Odoo modules</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(industryItem.modules || []).map((moduleSlug) => (
                <Link
                  key={moduleSlug}
                  href={`/odoo-${moduleSlug}-bangladesh`}
                  className="rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs text-muted transition-colors hover:bg-foreground/[0.03]"
                >
                  {moduleSlug}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Learning path suggestion</div>
            <p className="mt-2 text-sm text-muted">
              Start with functional training topics related to this industry, then explore the modules
              directory to understand how data flows across Sales, Accounting, Inventory, and manufacturing.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

