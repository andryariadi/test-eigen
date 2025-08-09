"use client";

import { ArticleProps } from "@/libs/types";
import ArticleCard from "../ArticleCard/ArticleCard";
import { cn } from "@/libs/utils";
import { useSearchParams } from "next/navigation";

const ArticlesList = ({ articles, totalResult, isArticlesLength }: { articles: ArticleProps[]; totalResult?: number; isArticlesLength?: boolean }) => {
  const searchParams = useSearchParams();

  // Pertahankan semua parameter yang ada
  const createArticleUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    return `/?${params.toString()}`;
  };

  if (totalResult === 0) return <div className="text-xl text-center font-semibold text-slate-500">No articles found</div>;

  return (
    <section data-testid="region" className={cn(`${isArticlesLength ? "px-4 md:px-10 lg:px-20 xl:px-32 pb-20" : "px-0 pb-0"} flex flex-col justify-start gap-5`)}>
      {/* News Selection */}

      {/* Articles Length */}
      {isArticlesLength ? (
        <span className="text-slate-600 text-base font-normal">
          Showing: {articles.length} of {totalResult} articles
        </span>
      ) : (
        <h5 className="text-xl font-semibold text-slate-900">Other Articles</h5>
      )}

      {/* Articles Card List */}
      <div data-testid="articles-grid" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {articles.map((article) => (
          <ArticleCard key={article.author} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesList;
