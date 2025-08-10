import ArticlesList from "@/components/ArticlesList/ArticlesList";
import MarkdownArticle from "@/components/MarkdownArticle";
import { getArticle, getOtherArticles } from "@/libs/actions/article.action";
import { formatNewsDate } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: { id?: string };
  searchParams: {
    news_selection?: "top-headlines" | "everything";
    query?: string;
    category?: string;
  };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const decodedId = params.id ? decodeURIComponent(params.id) : null;
  const newsType = searchParams.news_selection || "everything";

  const article = await getArticle(decodedId, newsType, {
    query: searchParams.query,
    category: searchParams.category,
  });

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }

  const truncatedContent = article.content.substring(0, 160);
  const description = article.excerpt || truncatedContent;
  const imageUrl = article.urlToImage || "https://placehold.co/1200x630/png?text=No+Image";
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${params.id}`;

  return {
    title: `${article.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description,
      url: articleUrl,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
      creator: article.author || undefined,
    },
    other: {
      "article:published_time": article.publishedAt,
      "article:section": article.category || "General",
      "article:tag": article.tags?.join(", ") || "",
    },
  };
}

const ArticleDetailPage = async ({ params, searchParams }: PageProps) => {
  const decodedId = params.id ? decodeURIComponent(params.id) : null;
  const newsType = searchParams.news_selection || "everything";

  const article = await getArticle(decodedId, newsType, {
    query: searchParams.query,
    category: searchParams.category,
  });

  if (!article) return notFound();

  const otherArticles = await getOtherArticles(article.source.name, newsType, {
    query: searchParams.query,
    category: searchParams.category,
  });

  return (
    <section className="min-h-[calc(100vh-4.5rem)] pt-20 space-y-15">
      {/* Article Details */}
      <article className="w-full max-w-[400px] md:max-w-[650px] lg:max-w-[980px] 2xl:max-w-[1120px] mx-auto pt-10 min-h-[1500px] md:min-h-[1000px]">
        <figure className="w-full 2xl:w-[1120px] space-y-10">
          {/* Top Section */}
          <div className="flex flex-col items-center justify-center gap-3">
            {/* Author Info */}
            <div className="flex items-center justify-center gap-3 text-slate-600 text-sm font-medium">
              <span>{formatNewsDate(article.publishedAt)}</span>
              <div className="bg-slate-600 w-[5px] h-[5px] rounded-full" />
              <span className="capitalize">{article.author || "Unknown Author"}</span>
              <div className="bg-slate-600 w-[5px] h-[5px] rounded-full" />
              <div className="border border-slate-600 hover:border-blue-200 hover:bg-blue-200 transition-all duration-300 w-max px-3 py-1 rounded-full">
                <Link href={article.url} target="_blank" className="text-sm font-normal text-slate-600 hover:text-blue-900 transition-all duration-300">
                  {article.source.name}
                </Link>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-slate-900 capitalize text-center px-4">{article.title}</h1>
          </div>

          {/* Image and Description */}
          <div className="space-y-2">
            <div className="relative h-[300px] md:h-[480px] w-full">
              <Image src={article.urlToImage || "https://placehold.co/600x400/png"} fill alt={article.title} className="object-cover rounded-[12px]" priority />
            </div>

            <p className="text-[14px] font-normal text-slate-600 px-3">{article.description}</p>
          </div>

          {/* Content */}
          <figcaption className="pb-20">
            <MarkdownArticle content={article.content} />
          </figcaption>
        </figure>
      </article>

      {/* Related Articles */}
      <section className="px-4 md:px-16 lg:px-20 xl:px-36 2xl:px-48 pb-20">
        <h2 className="text-2xl font-semibold mb-6">More from {article.source.name}</h2>
        <ArticlesList articles={otherArticles} isArticlesLength={false} />
      </section>
    </section>
  );
};

export default ArticleDetailPage;
