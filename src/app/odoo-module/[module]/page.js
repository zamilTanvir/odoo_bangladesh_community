import Link from "next/link";

import { getModuleStaticParams } from "@/lib/content/buildRouteIndex";
import { getModuleBySlug, loadSite } from "@/lib/content/loadContent";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getModuleStaticParams();
}

export async function generateMetadata({ params }) {
  const site = loadSite();
  const { module } = await params;
  const moduleItem = getModuleBySlug(module);
  return buildPageMetadata({
    site,
    title: `${moduleItem.title} | ${site.siteName}`,
    description: moduleItem.description,
    canonicalPath: `/odoo-${moduleItem.slug}-bangladesh`,
  });
}

export default async function ModuleDetailPage({ params }) {
  const { module } = await params;
  const moduleItem = getModuleBySlug(module);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Section className="pb-6">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          {moduleItem.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">{moduleItem.description}</p>
      </Section>

      <Card className="p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <div className="text-sm font-semibold text-foreground">Suggested training</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/training/functional"
                className="rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs text-muted transition-colors hover:bg-foreground/[0.03]"
              >
                Odoo Functional Training
              </Link>
              <Link
                href="/training/technical"
                className="rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs text-muted transition-colors hover:bg-foreground/[0.03]"
              >
                Odoo Technical Training
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Next step</div>
            <p className="mt-2 text-sm text-muted">
              Explore relevant training topics and request a consultation for a learning path tailored
              to your role in Bangladesh.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

