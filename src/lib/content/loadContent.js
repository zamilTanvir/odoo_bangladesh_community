import fs from "fs";
import path from "path";

import {
  validateBlogPost,
  validateComparison,
  validateCareerGuide,
  validateEvent,
  validateFaqCollection,
  validateIndustry,
  validateModule,
  validateSite,
  validateTrainingTopic,
} from "./validateContent.js";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

const typeConfig = {
  industries: {
    dir: "industries",
    validator: validateIndustry,
  },
  modules: {
    dir: "modules",
    validator: validateModule,
  },
  trainings: {
    dir: "trainings",
    validator: validateTrainingTopic,
  },
  blog: {
    dir: "blog",
    validator: validateBlogPost,
  },
  comparisons: {
    dir: "comparisons",
    validator: validateComparison,
  },
  careers: {
    dir: "careers",
    validator: validateCareerGuide,
  },
  events: {
    dir: "events",
    validator: validateEvent,
  },
  faqs: {
    dir: "faqs",
    validator: validateFaqCollection,
  },
};

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function listJsonFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(dirPath, name));
}

export function loadSite() {
  const filePath = path.join(CONTENT_ROOT, "site.json");
  const site = readJsonFile(filePath);
  validateSite(site);
  return site;
}

export function loadAllOfType(type) {
  const cfg = typeConfig[type];
  if (!cfg) throw new Error(`Unknown content type: ${type}`);

  const dirPath = path.join(CONTENT_ROOT, cfg.dir);
  const files = listJsonFiles(dirPath);
  const items = files.map((filePath) => {
    const json = readJsonFile(filePath);
    cfg.validator(json);
    return json;
  });

  return items;
}

export function loadBySlug(type, slug) {
  const all = loadAllOfType(type);
  const match = all.find((item) => item.slug === slug);
  if (!match) throw new Error(`${type} content not found for slug: ${slug}`);
  return match;
}

// Convenience exports (used by page templates later)
export const getAllIndustries = () => loadAllOfType("industries");
export const getIndustryBySlug = (slug) => loadBySlug("industries", slug);

export const getAllModules = () => loadAllOfType("modules");
export const getModuleBySlug = (slug) => loadBySlug("modules", slug);

export const getAllTrainingTopics = () => loadAllOfType("trainings");
export const getTrainingTopicBySlug = (slug) =>
  loadBySlug("trainings", slug);

export const getAllBlogPosts = () => loadAllOfType("blog");
export const getBlogPostBySlug = (slug) => loadBySlug("blog", slug);

export const getAllComparisons = () => loadAllOfType("comparisons");
export const getComparisonBySlug = (slug) => loadBySlug("comparisons", slug);

export const getAllCareerGuides = () => loadAllOfType("careers");
export const getCareerGuideBySlug = (slug) => loadBySlug("careers", slug);

export const getAllEvents = () => loadAllOfType("events");
export const getEventBySlug = (slug) => loadBySlug("events", slug);

export function getFaqCollection() {
  // MVP: merge all faq.*.json files into one collection.
  const all = loadAllOfType("faqs");
  return all.flatMap((c) => c.items);
}

