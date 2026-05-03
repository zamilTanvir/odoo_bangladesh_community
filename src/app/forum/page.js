import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { loadSite, getPageBySlug } from "@/lib/content/loadContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  const site = loadSite();
  const page = getPageBySlug("forum");
  return buildPageMetadata({
    site,
    title: page.title,
    description: page.summary,
    canonicalPath: "/forum",
  });
}

export default function ForumPage() {
  const page = getPageBySlug("forum");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">{page.summary}</p>
      </Section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="p-6 sm:p-8">
          <div className="text-sm font-semibold text-foreground">Starting simple (community-first)</div>
          <div className="mt-2 text-sm leading-7 text-muted">
            We’ll evolve this into a searchable Q&A space. For now, share questions and we’ll turn the best ones into
            guides and FAQs.
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div>
              <Link href="/contact" className="text-primary hover:underline">
                Ask a question via the inquiry form
              </Link>
            </div>
            <div>
              <Link href="/blog" className="text-primary hover:underline">
                Explore learning resources
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="text-sm font-semibold text-foreground">What we’ll add next</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Topic tags (functional / technical / implementation)</li>
            <li>Search across questions and answers</li>
            <li>Community moderation and contributions</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

