import { ArticleProps } from "@/libs/types";
import ArticleCard from "../ArticleCard/ArticleCard";
import { cn } from "@/libs/utils";

const ArticlesList = ({ articles, totalResult, isArticlesLength }: { articles: ArticleProps[]; totalResult?: number; isArticlesLength?: boolean }) => {
  console.log({ articles }, "<---articlesList");

  return (
    <section className={cn(`${isArticlesLength ? "px-4 md:px-10 lg:px-20 xl:px-32 pb-20" : "px-0 pb-0"} flex flex-col justify-start gap-5`)}>
      {/* Articles Length */}
      {isArticlesLength ? (
        <span className="text-slate-600 text-base font-normal">
          Showing: {articles.length} of {totalResult} articles
        </span>
      ) : (
        <h5 className="text-xl font-semibold text-slate-900">Other Articles</h5>
      )}

      {/* Articles Card List */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {articles.map((article) => (
          <ArticleCard key={article.author} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesList;
