function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateOptionalSeoFields(item, namespace) {
  if (!isRecord(item)) return;
  if (item.keywords !== undefined) {
    assert(Array.isArray(item.keywords), `${namespace}.keywords must be an array when provided`);
    assert(item.keywords.every(isNonEmptyString), `${namespace}.keywords must contain non-empty strings`);
  }
  if (item.updatedAt !== undefined) {
    assert(isNonEmptyString(item.updatedAt), `${namespace}.updatedAt must be a string when provided`);
  }
  if (item.canonicalPath !== undefined) {
    assert(isNonEmptyString(item.canonicalPath), `${namespace}.canonicalPath must be a string when provided`);
  }
}

export function validateSite(site) {
  assert(isRecord(site), "site.json must be an object");
  assert(isNonEmptyString(site.siteUrl), "site.siteUrl is required");
  assert(isNonEmptyString(site.siteName), "site.siteName is required");
  // Optional: whatsappLink, social links, etc.
}

export function validatePage(page) {
  assert(isRecord(page), "page JSON must be an object");
  assert(isNonEmptyString(page.slug), "page.slug is required");
  assert(isNonEmptyString(page.title), "page.title is required");
  assert(isNonEmptyString(page.summary), "page.summary is required");
  if (page.sections !== undefined) {
    assert(Array.isArray(page.sections), "page.sections must be an array when provided");
  }
  validateOptionalSeoFields(page, "page");
}

export function validateIndustry(industry) {
  assert(isRecord(industry), "industry JSON must be an object");
  assert(isNonEmptyString(industry.slug), "industry.slug is required");
  assert(isNonEmptyString(industry.title), "industry.title is required");
  assert(isNonEmptyString(industry.description), "industry.description is required");
  // Optional: modules, keywords, hero, etc.
  validateOptionalSeoFields(industry, "industry");
}

export function validateModule(module) {
  assert(isRecord(module), "module JSON must be an object");
  assert(isNonEmptyString(module.slug), "module.slug is required");
  assert(isNonEmptyString(module.title), "module.title is required");
  assert(isNonEmptyString(module.description), "module.description is required");
  validateOptionalSeoFields(module, "module");
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
  validateOptionalSeoFields(topic, "training");
}

export function validateBlogPost(post) {
  assert(isRecord(post), "blog post JSON must be an object");
  assert(isNonEmptyString(post.slug), "blog.slug is required");
  assert(isNonEmptyString(post.title), "blog.title is required");
  assert(isNonEmptyString(post.summary), "blog.summary is required");
  assert(Array.isArray(post.sections), "blog.sections must be an array");
  assert(post.sections.length > 0, "blog.sections cannot be empty");
  validateOptionalSeoFields(post, "blog");
}

export function validateComparison(item) {
  assert(isRecord(item), "comparison JSON must be an object");
  assert(isNonEmptyString(item.slug), "comparison.slug is required");
  assert(isNonEmptyString(item.title), "comparison.title is required");
  assert(isNonEmptyString(item.summary), "comparison.summary is required");
  validateOptionalSeoFields(item, "comparison");
}

export function validateCareerGuide(item) {
  assert(isRecord(item), "career guide JSON must be an object");
  assert(isNonEmptyString(item.slug), "career.slug is required");
  assert(isNonEmptyString(item.title), "career.title is required");
  assert(isNonEmptyString(item.summary), "career.summary is required");
  validateOptionalSeoFields(item, "career");
}

export function validateEvent(item) {
  assert(isRecord(item), "event JSON must be an object");
  assert(isNonEmptyString(item.slug), "event.slug is required");
  assert(isNonEmptyString(item.title), "event.title is required");
  assert(isNonEmptyString(item.date), "event.date is required (YYYY-MM-DD)");
  validateOptionalSeoFields(item, "event");
}

export function validateFaqCollection(item) {
  assert(isRecord(item), "faq collection must be an object");
  assert(Array.isArray(item.items), "faq.items must be an array");
}

