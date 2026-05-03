import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import WorkshopRegistrationForm from "@/components/forms/WorkshopRegistrationForm";
import { loadSite, getAllEvents, getPageBySlug } from "@/lib/content/loadContent";
import JsonLd from "@/components/seo/JsonLd";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, eventJsonLd } from "@/lib/seo/schemaOrg";

export function generateMetadata() {
  const site = loadSite();
  const page = getPageBySlug("events");
  return buildPageMetadata({
    site,
    title: page.title,
    description: page.summary,
    canonicalPath: "/events",
  });
}

export default function EventsPage() {
  const site = loadSite();
  const page = getPageBySlug("events");
  const events = getAllEvents();
  const featured = events[0] || null;

  const track = featured?.track || "functional";
  const topic = featured?.topic || "sales";
  const canonicalPath = "/events";
  const url = buildCanonicalUrl(site.siteUrl, canonicalPath);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd({
          siteUrl: site.siteUrl,
          items: [
            { name: "Home", path: "/" },
            { name: "Events & Webinars", path: canonicalPath },
          ],
        })}
      />
      {featured ? <JsonLd data={eventJsonLd({ site, event: featured, url })} /> : null}

      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">{page.summary}</p>
      </Section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          {events.length ? (
            events.map((event) => (
              <Card key={event.slug} className="p-6">
                <div className="text-sm font-semibold text-foreground">{event.title}</div>
                <div className="mt-2 text-sm text-muted">
                  {event.date} • {event.location}
                </div>
                {event.summary ? <p className="mt-3 text-sm leading-7 text-muted">{event.summary}</p> : null}
              </Card>
            ))
          ) : (
            <Card className="p-6">
              <div className="text-sm text-muted">No events published yet.</div>
              <div className="mt-4 text-sm">
                <Link href="/contact" className="text-primary hover:underline">
                  Ask to be notified about the next workshop
                </Link>
              </div>
            </Card>
          )}
        </div>

        <WorkshopRegistrationForm
          track={track}
          topic={topic}
          cohort={featured?.cohort || "Next Training Batch"}
          title="Register for a Free Workshop"
        />
      </div>
    </div>
  );
}

