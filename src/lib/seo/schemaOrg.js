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

