import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { getAllIndustries, loadSite } from "@/lib/content/loadContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  const site = loadSite();
  return buildPageMetadata({
    site,
    title: "Odoo in Bangladesh by Industry",
    description:
      "Explore Bangladesh-focused Odoo workflows, modules, and implementation guidance for real business needs.",
    canonicalPath: "/industries",
  });
}

export default function IndustriesPage() {
  const industries = getAllIndustries();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          Odoo in Bangladesh by Industry
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Explore Bangladesh-focused Odoo workflows, modules, and implementation guidance for
          real business needs.
        </p>
      </Section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Card
            key={industry.slug}
            className="p-6 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{industry.title}</h2>
                <p className="mt-2 text-sm text-muted">{industry.description}</p>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/odoo-for-${industry.slug}-industry`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Explore industry
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

