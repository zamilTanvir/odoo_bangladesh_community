import Link from "next/link";

import SyllabusDownloadForm from "@/components/forms/SyllabusDownloadForm";
import WorkshopRegistrationForm from "@/components/forms/WorkshopRegistrationForm";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import StatCounters from "@/components/marketing/StatCounters";
import FAQAccordion from "@/components/marketing/FAQAccordion";
import HeroAppsShowcase from "@/components/marketing/HeroAppsShowcase";

import {
  getAllComparisons,
  getAllEvents,
  getAllIndustries,
  getAllModules,
  getAllTrainingTopics,
  getFaqCollection,
} from "@/lib/content/loadContent";

export default function Home() {
  const modules = getAllModules();
  const industries = getAllIndustries();
  const comparisons = getAllComparisons();
  const events = getAllEvents();
  const faqs = getFaqCollection();
  const trainings = getAllTrainingTopics();

  const featuredEvent = events[0] || null;

  // For the MVP: if the featured event has no track/topic, fall back to our sample topic.
  const featuredTrack = featuredEvent?.track || "functional";
  const featuredTopic = featuredEvent?.topic || "sales";

  const stats = [
    { label: "Learning guides & paths", value: 28 },
    { label: "Workshops & webinars hosted", value: 120 },
    { label: "Active learners (est.)", value: 1450 },
  ];

  const suggestedTraining = trainings.find((t) => t.track === featuredTrack) || trainings[0] || null;
  const featuredFunctional = trainings.find((t) => t.track === "functional") || null;
  const featuredTechnical = trainings.find((t) => t.track === "technical") || null;

  const featuredModule = modules[0] || null;
  const featuredIndustry = industries[0] || null;
  const featuredComparison = comparisons[0] || null;

  return (
    <div className="relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute -top-20 -right-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-28 h-72 w-72 rounded-full bg-primary2/10 blur-3xl" />

      {/* HERO */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-0 pt-12 sm:px-6">
        <Section className="pb-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-sm text-muted backdrop-blur">
                Independent, community-driven Odoo learning in Bangladesh
              </div>

              <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
                Learn Odoo, connect with experts, and grow your skills on{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">one community platform</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 -z-0 h-4 rounded-full bg-primary/20"
                  />
                </span>
                .
              </h1>

              <div className="mt-3 text-lg leading-7 text-muted">
                <span className="font-[var(--font-accent)] text-2xl text-foreground/80">
                  Simple, guided, and Bangladesh-focused.
                </span>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                A neutral, educational portal for Odoo ERP: implementation guidance, functional & technical
                training, and community resources—built for learners, professionals, and organizations.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/blog" variant="primary" size="lg">
                  Explore resources
                </Button>
                <Button href="/inquiry/consultation" variant="outline" size="lg">
                  Request ERP consultation
                </Button>
                <Button href="/training/functional" variant="ghost" size="lg">
                  Explore training
                </Button>
              </div>

              {suggestedTraining ? (
                <div className="mt-6 text-sm text-muted">
                  Suggested next step:{" "}
                  <Link
                    href={`/odoo-${suggestedTraining.track}-training/${suggestedTraining.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {suggestedTraining.title}
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="lg:pl-6">
              <HeroAppsShowcase
                eventHref="/events"
                eventLabel={
                  featuredEvent
                    ? `${featuredEvent.title} • ${featuredEvent.location} • ${featuredEvent.date}`
                    : "Community workshop — register for the next session"
                }
              />
            </div>
          </div>
        </Section>
      </div>

      {/* TRUST STRIP */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="py-0">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="text-sm font-semibold text-foreground">Odoo learning in Bangladesh, at a glance</div>
              <div className="mt-1 text-sm text-muted">
                Early-stage stats to set expectations; they’ll evolve with community contributions.
              </div>
            </div>
          </div>

          <div className="mt-6">
            <StatCounters stats={stats} />
          </div>
        </Section>
      </div>

      {/* PILLARS */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="pt-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-balance text-2xl font-semibold text-foreground">A community-first platform</h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                This site is positioned as an independent portal—designed to help people learn Odoo, plan
                implementations, and grow ERP careers in Bangladesh.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <Link href="/blog" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
                  Blog
                </Link>
                <Link href="/modules" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
                  Modules directory
                </Link>
                <Link href="/industries" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
                  Industries
                </Link>
                <Link href="/comparisons" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
                  Comparisons
                </Link>
              </div>
            </div>

            <div className="grid gap-4 lg:col-span-7 sm:grid-cols-3">
              <Card className="p-5">
                <div className="text-sm font-semibold text-foreground">Learn</div>
                <div className="mt-2 text-sm text-muted">
                  Start from fundamentals—what Odoo is, how modules work, and how implementations are planned.
                </div>
              </Card>
              <Card className="p-5">
                <div className="text-sm font-semibold text-foreground">Implement</div>
                <div className="mt-2 text-sm text-muted">
                  Explore Bangladesh-oriented guides for accounting, inventory, manufacturing, retail, and SMEs.
                </div>
              </Card>
              <Card className="p-5">
                <div className="text-sm font-semibold text-foreground">Grow</div>
                <div className="mt-2 text-sm text-muted">
                  Follow structured training topics to become a functional consultant or an Odoo developer.
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </div>

      {/* IMPLEMENTATION / SEO BLOCKS */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="pt-2">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-balance text-2xl font-semibold text-foreground">
                Start with Bangladesh-focused landing pages
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                These pages are designed for topical authority: modules, industries, comparisons, and training topics,
                with internal linking between related guides.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {featuredModule ? (
              <Link href={`/odoo-${featuredModule.slug}-bangladesh`} className="group">
                <Card className="p-6 transition-transform group-hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-foreground">{featuredModule.title}</div>
                  <p className="mt-2 text-sm leading-7 text-muted">{featuredModule.description}</p>
                  <div className="mt-4 text-sm font-medium text-primary">Explore module page →</div>
                </Card>
              </Link>
            ) : (
              <Card className="p-6">
                <div className="text-sm font-semibold text-foreground">Modules (directory)</div>
                <p className="mt-2 text-sm leading-7 text-muted">Explore module-by-module learning pages.</p>
                <div className="mt-4">
                  <Button href="/modules" variant="soft" size="md">
                    Browse modules
                  </Button>
                </div>
              </Card>
            )}

            {featuredIndustry ? (
              <Link href={`/odoo-for-${featuredIndustry.slug}-industry`} className="group">
                <Card className="p-6 transition-transform group-hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-foreground">{featuredIndustry.title}</div>
                  <p className="mt-2 text-sm leading-7 text-muted">{featuredIndustry.description}</p>
                  <div className="mt-4 text-sm font-medium text-primary">Explore industry guide →</div>
                </Card>
              </Link>
            ) : (
              <Card className="p-6">
                <div className="text-sm font-semibold text-foreground">Industries</div>
                <p className="mt-2 text-sm leading-7 text-muted">See how Odoo fits Bangladesh industry workflows.</p>
                <div className="mt-4">
                  <Button href="/industries" variant="soft" size="md">
                    Browse industries
                  </Button>
                </div>
              </Card>
            )}

            {featuredComparison ? (
              <Link href={`/odoo-vs-${featuredComparison.slug}`} className="group">
                <Card className="p-6 transition-transform group-hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-foreground">{featuredComparison.title}</div>
                  <p className="mt-2 text-sm leading-7 text-muted">{featuredComparison.summary}</p>
                  <div className="mt-4 text-sm font-medium text-primary">Compare options →</div>
                </Card>
              </Link>
            ) : (
              <Card className="p-6">
                <div className="text-sm font-semibold text-foreground">ERP comparisons</div>
                <p className="mt-2 text-sm leading-7 text-muted">Neutral comparisons for Bangladesh buyers.</p>
                <div className="mt-4">
                  <Button href="/comparisons" variant="soft" size="md">
                    View comparisons
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </Section>
      </div>

      {/* TRAINING SPLIT */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="pt-2">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <Card className="p-6 sm:p-8">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Functional training
              </div>
              <h2 className="mt-4 text-balance text-xl font-semibold text-foreground">
                Build business workflow confidence
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Ideal for graduates, analysts, accountants, and career switchers aiming to become functional consultants.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/training/functional" variant="primary" size="md">
                  Explore functional track
                </Button>
                {featuredFunctional ? (
                  <Button
                    href={`/odoo-functional-training/${featuredFunctional.slug}`}
                    variant="outline"
                    size="md"
                  >
                    Start: {featuredFunctional.slug}
                  </Button>
                ) : null}
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                Technical training
              </div>
              <h2 className="mt-4 text-balance text-xl font-semibold text-foreground">
                Learn to customize and build modules
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                For developers and CS students: Python, ORM, XML views, integrations, deployment, and performance basics.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/training/technical" variant="primary" size="md">
                  Explore technical track
                </Button>
                {featuredTechnical ? (
                  <Button
                    href={`/odoo-technical-training/${featuredTechnical.slug}`}
                    variant="outline"
                    size="md"
                  >
                    Start: {featuredTechnical.slug}
                  </Button>
                ) : null}
              </div>
            </Card>
          </div>
        </Section>
      </div>

      {/* FEATURED WORKSHOP */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Section className="pt-2">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-balance text-2xl font-semibold text-foreground">Featured workshop</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Join a free community session to understand practical Odoo workflows for Bangladesh teams.
              </p>
            </div>
            <div className="hidden sm:block">
              <Button href="/events" variant="ghost" size="md">
                View events
              </Button>
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
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href="/training/functional" variant="soft" size="md">
                    Explore functional topics
                  </Button>
                  <Button href="/inquiry/consultation" variant="outline" size="md">
                    Ask a question
                  </Button>
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
              <div className="mt-4">
                <Button href="/events" variant="soft" size="md">
                  Check upcoming events
                </Button>
              </div>
            </Card>
          )}
        </Section>
      </div>

      {/* FAQ + CTA BAND */}
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

              <div className="mt-6 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                <div className="text-sm font-semibold text-foreground">Need guidance for your context?</div>
                <div className="mt-2 text-sm text-muted">
                  Share what you want to learn or implement. We’ll route your inquiry to the right resources or people.
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button href="/inquiry/consultation" variant="primary" size="md">
                    Request consultation
                  </Button>
                  <Button href="/blog" variant="outline" size="md">
                    Browse learning resources
                  </Button>
                </div>
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
