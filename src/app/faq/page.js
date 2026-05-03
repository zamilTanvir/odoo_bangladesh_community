import FAQAccordion from "@/components/marketing/FAQAccordion";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { loadSite, getFaqCollection, getPageBySlug } from "@/lib/content/loadContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  const site = loadSite();
  const page = getPageBySlug("faq");
  return buildPageMetadata({
    site,
    title: page.title,
    description: page.summary,
    canonicalPath: "/faq",
  });
}

export default function FaqPage() {
  const page = getPageBySlug("faq");
  const faqs = getFaqCollection();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">{page.summary}</p>
      </Section>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FAQAccordion items={faqs} />
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6 sm:p-8">
            <div className="text-sm font-semibold text-foreground">Still unsure where to start?</div>
            <div className="mt-2 text-sm leading-7 text-muted">
              Share your context (learner, developer, business) and we’ll route you to the right resources.
            </div>
            <div className="mt-4 text-sm text-muted">
              Use the consultation form: <a className="text-primary hover:underline" href="/inquiry/consultation">Request guidance</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

