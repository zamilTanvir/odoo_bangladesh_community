import Link from "next/link";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { getAllBlogPosts } from "@/lib/content/loadContent";

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Section className="pb-0">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          Odoo Blog (Bangladesh)
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Neutral, practical resources for Odoo learners, professionals, and businesses in Bangladesh.
        </p>
      </Section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="p-6 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.summary}</p>

            <div className="mt-5">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read more
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

