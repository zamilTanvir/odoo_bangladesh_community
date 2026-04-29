import Link from "next/link";

import SyllabusDownloadForm from "@/components/forms/SyllabusDownloadForm";
import WorkshopRegistrationForm from "@/components/forms/WorkshopRegistrationForm";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import StatCounters from "@/components/marketing/StatCounters";
import FAQAccordion from "@/components/marketing/FAQAccordion";

import { getAllEvents, getFaqCollection, getAllTrainingTopics } from "@/lib/content/loadContent";

export default function Home() {
  const events = getAllEvents();
  const faqs = getFaqCollection();

  const featuredEvent = events[0] || null;

  // For the MVP: if the featured event has no track/topic, fall back to our sample topic.
  const featuredTrack = featuredEvent?.track || "functional";
  const featuredTopic = featuredEvent?.topic || "sales";

  const stats = [
    { label: "Odoo learning paths", value: 28 },
    { label: "Community workshops", value: 120 },
    { label: "Active learners (est.)", value: 1450 },
  ];

  const suggestedTraining = getAllTrainingTopics().find((t) => t.track === featuredTrack);

  return (
    <div className="relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute -top-20 -right-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-28 h-72 w-72 rounded-full bg-primary2/10 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-0 pt-12 sm:px-6">
        <Section className="pb-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-sm text-muted">
                Community-driven Odoo learning in Bangladesh
              </div>

              <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
                The Odoo Community Platform for Bangladesh
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                Learn, explore & connect with the Odoo ecosystem—functional training, technical resources,
                and practical implementation guidance for learners and businesses in Bangladesh.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Explore Resources
                </Link>
                <Link
                  href="/inquiry/consultation"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.03]"
                >
                  Request ERP Consultation
                </Link>
                <Link
                  href="/training/functional"
                  className="inline-flex items-center justify-center rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.03]"
                >
                  Explore Training Programs
                </Link>
              </div>
            </div>

            <div className="lg:pl-6">
              <Card className="p-6 sm:p-8">
                <div className="text-sm font-semibold text-foreground">
                  Built for learners, consultants & businesses
                </div>
                <div className="mt-3 grid gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Educational resources</div>
                      <div className="text-sm text-muted">
                        Guides, comparisons, and module-focused learning paths.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary2" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Training & workshops</div>
                      <div className="text-sm text-muted">
                        Functional + technical programs, plus community sessions.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Community-first support</div>
                      <div className="text-sm text-muted">
                        Connect with Bangladesh’s Odoo learners and implementers.
                      </div>
                    </div>
                  </div>
                </div>

                {suggestedTraining ? (
                  <div className="mt-6">
                    <Link
                      href={`/odoo-${suggestedTraining.track}-training/${suggestedTraining.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Suggested: {suggestedTraining.title}
                    </Link>
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        </Section>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="py-0">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="text-sm font-semibold text-foreground">Odoo in Bangladesh, at a glance</div>
              <div className="mt-1 text-sm text-muted">
                Numbers are indicative for the MVP; they will update as the community grows.
              </div>
            </div>
          </div>

          <div className="mt-6">
            <StatCounters stats={stats} />
          </div>
        </Section>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="pt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-balance text-2xl font-semibold text-foreground">Featured workshop</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Join a free community session to understand practical Odoo workflows for Bangladesh teams.
              </p>
            </div>
          </div>

          {featuredEvent ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card className="p-6 sm:p-8">
                <div className="text-sm font-semibold text-foreground">{featuredEvent.title}</div>
                <div className="mt-2 text-sm text-muted">
                  {featuredEvent.date} • {featuredEvent.location}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{featuredEvent.summary}</p>
                <div className="mt-5">
                  <Link href="/training/functional" className="text-sm font-medium text-primary hover:underline">
                    Explore functional training topics
                  </Link>
                </div>
              </Card>

              <WorkshopRegistrationForm
                track={featuredTrack}
                topic={featuredTopic}
                cohort={featuredEvent.cohort || "Next Training Batch"}
                title="Register for this Free Workshop"
              />
            </div>
          ) : (
            <Card className="p-6 sm:p-8 mt-6">
              <div className="text-sm text-muted">No workshop events added yet.</div>
            </Card>
          )}
        </Section>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="pt-12 pb-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-balance text-2xl font-semibold text-foreground">Frequently asked questions</h2>
              <p className="mt-2 text-sm text-muted">
                Neutral, educational answers about Odoo learning, training programs, and the community portal.
              </p>

              <div className="mt-6 space-y-3">
                <SyllabusDownloadForm topicSlug={featuredTopic} topicTitle={featuredTopic} compact={true} />
              </div>
            </div>

            <div>
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
