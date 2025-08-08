import ArticlesList from "@/components/ArticlesList/ArticlesList";
import HeroSection from "@/components/HeroSection/HeroSection";
import { getArticles } from "@/libs/actions/article.action";
import { ArticleProps } from "@/libs/types";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;

  const articlesRes = await getArticles();
  const totalResults = articlesRes.totalResults;
  let articles = articlesRes.articles;

  if (query) {
    articles = articles.filter(
      (article: ArticleProps) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        (article.content && article.content.toLowerCase().includes(query.toLowerCase())) ||
        article.source.name.toLowerCase().includes(query.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
    );
  }

  // console.log({ articles }, "<---articleHome");

  return (
    <section className="b-amber-500 min-h-[calc(100vh-4.5rem)] space-y-10">
      <HeroSection query={query} />
      <ArticlesList articles={articles} totalResult={totalResults} isArticlesLength />
    </section>
  );
}
