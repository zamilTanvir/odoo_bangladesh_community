function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateSite(site) {
  assert(isRecord(site), "site.json must be an object");
  assert(isNonEmptyString(site.siteUrl), "site.siteUrl is required");
  assert(isNonEmptyString(site.siteName), "site.siteName is required");
  // Optional: whatsappLink, social links, etc.
}

export function validateIndustry(industry) {
  assert(isRecord(industry), "industry JSON must be an object");
  assert(isNonEmptyString(industry.slug), "industry.slug is required");
  assert(isNonEmptyString(industry.title), "industry.title is required");
  assert(isNonEmptyString(industry.description), "industry.description is required");
  // Optional: modules, keywords, hero, etc.
}

export function validateModule(module) {
  assert(isRecord(module), "module JSON must be an object");
  assert(isNonEmptyString(module.slug), "module.slug is required");
  assert(isNonEmptyString(module.title), "module.title is required");
  assert(isNonEmptyString(module.description), "module.description is required");
}

export function validateTrainingTopic(topic) {
  assert(isRecord(topic), "training JSON must be an object");
  assert(isNonEmptyString(topic.slug), "training.slug is required");
  assert(
    topic.track === "functional" || topic.track === "technical",
    "training.track must be 'functional' or 'technical'"
  );
  assert(isNonEmptyString(topic.title), "training.title is required");
  assert(isNonEmptyString(topic.summary), "training.summary is required");
  // Optional: syllabus, duration, target audience, downloadable assets.
}

export function validateBlogPost(post) {
  assert(isRecord(post), "blog post JSON must be an object");
  assert(isNonEmptyString(post.slug), "blog.slug is required");
  assert(isNonEmptyString(post.title), "blog.title is required");
  assert(isNonEmptyString(post.summary), "blog.summary is required");
  assert(Array.isArray(post.sections), "blog.sections must be an array");
  assert(post.sections.length > 0, "blog.sections cannot be empty");
}

export function validateComparison(item) {
  assert(isRecord(item), "comparison JSON must be an object");
  assert(isNonEmptyString(item.slug), "comparison.slug is required");
  assert(isNonEmptyString(item.title), "comparison.title is required");
  assert(isNonEmptyString(item.summary), "comparison.summary is required");
}

export function validateCareerGuide(item) {
  assert(isRecord(item), "career guide JSON must be an object");
  assert(isNonEmptyString(item.slug), "career.slug is required");
  assert(isNonEmptyString(item.title), "career.title is required");
  assert(isNonEmptyString(item.summary), "career.summary is required");
}

export function validateEvent(item) {
  assert(isRecord(item), "event JSON must be an object");
  assert(isNonEmptyString(item.slug), "event.slug is required");
  assert(isNonEmptyString(item.title), "event.title is required");
  assert(isNonEmptyString(item.date), "event.date is required (YYYY-MM-DD)");
}

export function validateFaqCollection(item) {
  assert(isRecord(item), "faq collection must be an object");
  assert(Array.isArray(item.items), "faq.items must be an array");
}

