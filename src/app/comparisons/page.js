import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { getAllComparisons } from "@/lib/content/loadContent";

export default function ComparisonsPage() {
  const items = getAllComparisons();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          Odoo Comparisons (Bangladesh)
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Explore how Odoo compares with other open-source and enterprise ERPs—so you can choose confidently.
        </p>
      </Section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.slug}
            className="p-6 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.summary}</p>

            <div className="mt-5">
              <Link
                href={`/odoo-vs-${item.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Compare
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

