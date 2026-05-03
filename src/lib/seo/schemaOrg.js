function toISOStringMaybe(value) {
  if (!value) return undefined;
  // Accept YYYY-MM-DD or ISO-like strings.
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function organizationJsonLd(site) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.siteName,
    url: site.siteUrl,
    description: site.brandTagline || undefined,
    email: site.supportEmail || undefined,
  };
}

export function websiteJsonLd(site) {
  if (!site?.siteUrl) return null;

  const base = site.siteUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.siteName,
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbListJsonLd({ siteUrl, items = [] }) {
  const base = (siteUrl || "").replace(/\/+$/, "");
  const itemListElement = items
    .filter((i) => i?.name && i?.path)
    .map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${base}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function articleJsonLd({ post, url, siteName }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: toISOStringMaybe(post.publishedAt),
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
}

export function faqPageJsonLd({ faqs, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs || []).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function courseJsonLd({ site, topic, url, providerName }) {
  if (!topic?.title) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: topic.title,
    description: topic.summary,
    url,
    provider: {
      "@type": "Organization",
      name: providerName || site?.siteName,
      url: site?.siteUrl,
    },
  };
}

export function eventJsonLd({ site, event, url }) {
  if (!event?.title) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary || undefined,
    startDate: toISOStringMaybe(event.date),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: event.location
      ? { "@type": "Place", name: event.location }
      : { "@type": "VirtualLocation", url: site?.siteUrl },
    organizer: {
      "@type": "Organization",
      name: site?.siteName,
      url: site?.siteUrl,
    },
    url,
  };
}

