import { render, screen } from "@testing-library/react";
import { getArticles } from "@/libs/actions/article.action";
import Home from "./page";

jest.mock("@/components/HeroSection/HeroSection", () => {
  const MockHeroSection = () => <div data-testid="hero-section">HeroSection</div>;
  MockHeroSection.displayName = "MockHeroSection";
  return MockHeroSection;
});

jest.mock("@/components/NewsSelection/NewsSelection", () => {
  const MockNewsSelection = () => <div data-testid="news-selection">NewsSelection</div>;
  MockNewsSelection.displayName = "MockNewsSelection";
  return MockNewsSelection;
});

jest.mock("@/components/NotFoundArticle/NotFoundArticle", () => {
  const MockNotFoundArticle = () => <div data-testid="not-found-article">NotFoundArticle</div>;
  MockNotFoundArticle.displayName = "MockNotFoundArticle";
  return MockNotFoundArticle;
});

jest.mock("@/components/ArticlesList/ArticlesList", () => {
  type ArticlesListProps = { articles: { title: string }[] };
  function MockArticlesList({ articles }: ArticlesListProps) {
    return <div data-testid="articles-list">{`ArticlesList: ${articles.length} articles`}</div>;
  }
  MockArticlesList.displayName = "MockArticlesList";
  return MockArticlesList;
});

jest.mock("@/libs/actions/article.action", () => ({
  getArticles: jest.fn(),
}));

describe.skip("Home Page", () => {
  it("displays NotFoundArticle if articles is empty", async () => {
    (getArticles as jest.Mock).mockResolvedValue({
      articles: [],
      totalResults: 0,
      currentPage: 1,
    });

    render(
      await Home({
        searchParams: Promise.resolve({ query: "test" }),
      })
    );

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("news-selection")).toBeInTheDocument();
    expect(screen.getByTestId("not-found-article")).toBeInTheDocument();
  });

  it("display ArticlesList if there are articles", async () => {
    (getArticles as jest.Mock).mockResolvedValue({
      articles: [{ title: "Article 1" }, { title: "Article 2" }],
      totalResults: 2,
      currentPage: 1,
    });

    render(
      await Home({
        searchParams: Promise.resolve({ query: "test" }),
      })
    );

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("news-selection")).toBeInTheDocument();
    expect(screen.getByTestId("articles-list")).toHaveTextContent("2 articles");
  });
});
