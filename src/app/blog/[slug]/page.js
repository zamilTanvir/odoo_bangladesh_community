import { getBlogStaticParams } from "@/lib/content/buildRouteIndex";
import { getBlogPostBySlug, loadSite } from "@/lib/content/loadContent";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import JsonLd from "@/components/seo/JsonLd";
import { articleJsonLd, faqPageJsonLd } from "@/lib/seo/schemaOrg";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({ params }) {
  const site = loadSite();
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return buildPageMetadata({
    site,
    title: `${post.title} | ${site.siteName}`,
    description: post.summary,
    canonicalPath: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const site = loadSite();
  const canonicalUrl = buildCanonicalUrl(site.siteUrl, `/blog/${post.slug}`);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd({ post, url: canonicalUrl, siteName: site.siteName })} />
      {post.faq?.length ? (
        <JsonLd
          data={faqPageJsonLd({
            faqs: post.faq,
            url: canonicalUrl,
          })}
        />
      ) : null}

      <Section className="pb-6">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          {post.summary}
        </p>
      </Section>

      <Card className="p-6 sm:p-8">
        <div className="space-y-6">
          {post.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/90">{section.body}</p>
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}

