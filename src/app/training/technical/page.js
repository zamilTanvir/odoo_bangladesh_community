import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { getAllTrainingTopics } from "@/lib/content/loadContent";

export default function TechnicalTrainingPage() {
  const topics = getAllTrainingTopics().filter((t) => t.track === "technical");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          Odoo Technical Training (Bangladesh)
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Learn the building blocks of Odoo development: Python concepts, ORM, XML Views, QWeb, APIs, OWL,
          deployment, performance, and customization.
        </p>
      </Section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card
            key={topic.slug}
            className="p-6 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
            <p className="mt-2 text-sm text-muted">{topic.summary}</p>

            <div className="mt-5">
              <Link
                href={`/odoo-technical-training/${topic.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View topic
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

