import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { journalPosts } from "@/data/journal";
import { getRelatedPosts } from "@/lib/content";
import { ArticleRenderer } from "@/components/journal/ArticleRenderer";
import { JournalCard } from "@/components/journal/JournalCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((entry) => entry.slug === slug);
  if (!post) {
    return buildMetadata({ title: "Entry not found", description: site.description, path: `/journal/${slug}` });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function JournalDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = journalPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleSchema({ title: post.title, excerpt: post.excerpt, image: post.image, slug: post.slug, date: post.date }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        }}
      />

      <div className="shell pt-10 sm:pt-14">
        <Link
          href="/journal"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          All journal entries
        </Link>
      </div>

      <ArticleRenderer post={post} />

      {related.length > 0 ? (
        <section className="border-t border-line bg-surface-sunk py-16 sm:py-20">
          <div className="shell">
            <SectionHeading eyebrow="Keep reading" title="Related entries" align="left" />
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {related.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 70}>
                  <JournalCard post={entry} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}