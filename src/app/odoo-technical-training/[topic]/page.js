import { getTrainingStaticParamsByTrack } from "@/lib/content/buildRouteIndex";
import { getTrainingTopicBySlug, loadSite } from "@/lib/content/loadContent";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo/metadata";
import SyllabusDownloadForm from "@/components/forms/SyllabusDownloadForm";
import LeadInquiryForm from "@/components/forms/LeadInquiryForm";
import WorkshopRegistrationForm from "@/components/forms/WorkshopRegistrationForm";

export function generateStaticParams() {
  return getTrainingStaticParamsByTrack("technical");
}

export async function generateMetadata({ params }) {
  const site = loadSite();
  const { topic } = await params;
  const topicItem = getTrainingTopicBySlug(topic);
  return buildPageMetadata({
    site,
    title: `${topicItem.title} | ${site.siteName}`,
    description: topicItem.summary,
    canonicalPath: `/odoo-technical-training/${topicItem.slug}`,
  });
}

export default async function TechnicalTrainingTopicPage({ params }) {
  const { topic } = await params;
  const topicItem = getTrainingTopicBySlug(topic);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Section className="pb-6">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          {topicItem.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          {topicItem.summary}
        </p>
      </Section>

      <Card className="p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <div className="text-sm font-semibold text-foreground">Who this is for</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(topicItem.targetAudience || []).map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs text-muted"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Next steps</div>
            <p className="mt-2 text-sm text-muted">
              Explore development resources, prepare for module development tasks, or request a
              consultation for your learning path in Bangladesh.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-8 space-y-6">
        <SyllabusDownloadForm
          topicSlug={topicItem.slug}
          topicTitle={topicItem.title}
          downloadTitle="Download Technical Syllabus (PDF)"
        />

        <LeadInquiryForm
          inquiryType="CONTACT"
          title="Course Inquiry"
          ctaLabel="Submit Inquiry"
          defaultMessage={`I want to learn more about: ${topicItem.title}`}
        />

        <WorkshopRegistrationForm
          track={topicItem.track}
          topic={topicItem.slug}
          cohort="Next Training Batch"
          title="Register for a Free Workshop"
        />
      </div>
    </div>
  );
}

