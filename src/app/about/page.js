import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { loadSite, getPageBySlug } from "@/lib/content/loadContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  const site = loadSite();
  const page = getPageBySlug("about");
  return buildPageMetadata({
    site,
    title: page.title,
    description: page.summary,
    canonicalPath: "/about",
  });
}

export default function AboutPage() {
  const page = getPageBySlug("about");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">{page.summary}</p>
      </Section>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {(page.sections || []).map((section) => (
          <Card key={section.title} className="p-6">
            <div className="text-sm font-semibold text-foreground">{section.title}</div>
            <div className="mt-3 text-sm leading-7 text-muted">{section.content}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

