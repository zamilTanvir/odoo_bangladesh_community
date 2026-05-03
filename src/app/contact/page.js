import Link from "next/link";

import LeadInquiryForm from "@/components/forms/LeadInquiryForm";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { loadSite, getPageBySlug } from "@/lib/content/loadContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  const site = loadSite();
  const page = getPageBySlug("contact");
  return buildPageMetadata({
    site,
    title: page.title,
    description: page.summary,
    canonicalPath: "/contact",
  });
}

export default function ContactPage() {
  const site = loadSite();
  const page = getPageBySlug("contact");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">{page.summary}</p>
      </Section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <LeadInquiryForm
          title="Send an inquiry"
          inquiryType="GENERAL"
          ctaLabel="Send message"
          defaultMessage="I want help with learning/training/implementation guidance in Bangladesh."
        />

        <Card className="p-6 sm:p-8">
          <div className="text-sm font-semibold text-foreground">Other contact options</div>
          <div className="mt-2 text-sm leading-7 text-muted">
            For faster guidance, you can also use the dedicated consultation page. We keep messaging educational and
            resource-oriented.
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div>
              <div className="font-medium text-foreground">Support email</div>
              <div className="text-muted">{site.supportEmail || "hello@odoobangladesh.com"}</div>
            </div>
            <div>
              <div className="font-medium text-foreground">WhatsApp</div>
              {site.whatsappLink ? (
                <a className="text-primary hover:underline" href={site.whatsappLink} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              ) : (
                <div className="text-muted">WhatsApp link will be added soon.</div>
              )}
            </div>
            <div>
              <Link href="/inquiry/consultation" className="text-primary hover:underline">
                Go to consultation page
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

