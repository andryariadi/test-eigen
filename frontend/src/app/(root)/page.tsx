import ArticlesList from "@/components/ArticlesList/ArticlesList";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsSelection from "@/components/NewsSelection/NewsSelection";
import NotFoundArticle from "@/components/NotFoundArticle/NotFoundArticle";
import { getArticles } from "@/libs/actions/article.action";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string; category?: string; news_selection?: string; language?: string; page?: string; pageSize?: string }> }) {
  const { query, category, news_selection, language, page, pageSize } = await searchParams;

  const validatedType = news_selection === "top-headlines" ? "top-headlines" : "everything";

  const { articles, totalResults, currentPage } = await getArticles(validatedType, {
    query,
    category,
    language,
    page,
    pageSize,
  });

  return (
    <section className="min-h-[calc(100vh-4.5rem)] space-y-10">
      <HeroSection query={query} />

      <NewsSelection />

      {!articles || articles.length === 0 ? <NotFoundArticle /> : <ArticlesList articles={articles} totalResult={totalResults} currentPage={currentPage} isArticlesLength />}
    </section>
  );
}
