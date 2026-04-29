import {
  getAllCareerGuides,
  getAllComparisons,
  getAllEvents,
  getAllBlogPosts,
  getAllIndustries,
  getAllModules,
  getAllTrainingTopics,
  getFaqCollection,
} from "./loadContent.js";

export function buildRouteIndex() {
  const industries = getAllIndustries();
  const modules = getAllModules();
  const trainings = getAllTrainingTopics();
  const blogPosts = getAllBlogPosts();
  const comparisons = getAllComparisons();
  const careers = getAllCareerGuides();
  const events = getAllEvents();
  const faqs = getFaqCollection();

  return {
    industries: industries.map((i) => ({ slug: i.slug, title: i.title })),
    modules: modules.map((m) => ({ slug: m.slug, title: m.title })),
    trainings: {
      functional: trainings
        .filter((t) => t.track === "functional")
        .map((t) => ({ slug: t.slug, title: t.title })),
      technical: trainings
        .filter((t) => t.track === "technical")
        .map((t) => ({ slug: t.slug, title: t.title })),
    },
    blogPosts: blogPosts.map((b) => ({ slug: b.slug, title: b.title })),
    comparisons: comparisons.map((c) => ({ slug: c.slug, title: c.title })),
    careers: careers.map((c) => ({ slug: c.slug, title: c.title })),
    events: events.map((e) => ({ slug: e.slug, title: e.title, date: e.date })),
    faqs,
  };
}

// Helpers specifically for Next.js generateStaticParams()
export const getIndustryStaticParams = () =>
  getAllIndustries().map((i) => ({ industry: i.slug }));

export const getModuleStaticParams = () =>
  getAllModules().map((m) => ({ module: m.slug }));

export const getTrainingStaticParamsByTrack = (track) =>
  getAllTrainingTopics()
    .filter((t) => t.track === track)
    .map((t) => ({ topic: t.slug }));

export const getBlogStaticParams = () =>
  getAllBlogPosts().map((b) => ({ slug: b.slug }));

export const getComparisonStaticParams = () =>
  getAllComparisons().map((c) => ({ slug: c.slug }));

export const getCareerStaticParams = () =>
  getAllCareerGuides().map((c) => ({ slug: c.slug }));

export const getEventStaticParams = () =>
  getAllEvents().map((e) => ({ slug: e.slug }));

