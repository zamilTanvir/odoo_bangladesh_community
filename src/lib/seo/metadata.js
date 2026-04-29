function normalizePath(path) {
  if (!path) return "/";
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

export function buildCanonicalUrl(siteUrl, canonicalPath) {
  const base = (siteUrl || "").replace(/\/+$/, "");
  const path = normalizePath(canonicalPath);
  return `${base}${path}`;
}

export function buildPageMetadata({ site, title, description, canonicalPath }) {
  const canonical = buildCanonicalUrl(site?.siteUrl, canonicalPath);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: site?.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

