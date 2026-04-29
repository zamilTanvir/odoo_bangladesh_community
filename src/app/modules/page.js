import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { getAllModules } from "@/lib/content/loadContent";

export default function ModulesPage() {
  const modules = getAllModules();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          Odoo Modules Directory (Bangladesh)
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Learn how Odoo modules connect across Sales, CRM, Accounting, Inventory, and more—tailored for
          real implementation work in Bangladesh.
        </p>
      </Section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card
            key={module.slug}
            className="p-6 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-semibold text-foreground">{module.title}</h2>
            <p className="mt-2 text-sm text-muted">{module.description}</p>

            <div className="mt-5">
              <Link
                href={`/odoo-${module.slug}-bangladesh`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Explore module
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

