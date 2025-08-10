import { render, screen } from "@testing-library/react";
import { getArticle, getOtherArticles } from "@/libs/actions/article.action";
import { formatNewsDate } from "@/libs/utils";
import { notFound } from "next/navigation";
import ArticleDetailPage from "./page";

// Mock komponen anak
jest.mock("@/components/ArticlesList/ArticlesList", () => {
  function MockArticlesList({ articles }: { articles: Array<unknown> }) {
    return <div data-testid="articles-list">{`ArticlesList: ${articles.length} articles`}</div>;
  }
  MockArticlesList.displayName = "MockArticlesList";
  return MockArticlesList;
});

jest.mock("@/components/MarkdownArticle", () => {
  type MarkdownArticleProps = { content: string };
  function MockMarkdownArticle({ content }: MarkdownArticleProps) {
    return <div data-testid="markdown-article">{`Markdown: ${content}`}</div>;
  }
  MockMarkdownArticle.displayName = "MockMarkdownArticle";
  return MockMarkdownArticle;
});

// Mock fungsi external
jest.mock("@/libs/actions/article.action", () => ({
  getArticle: jest.fn(),
  getOtherArticles: jest.fn(),
}));
jest.mock("@/libs/utils", () => ({
  formatNewsDate: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe.skip("ArticleDetailPage", () => {
  const mockArticle = {
    publishedAt: "2025-08-10T12:00:00Z",
    author: "John Doe",
    source: { name: "News Source" },
    url: "https://example.com",
    title: "Sample Article",
    urlToImage: "https://example.com/image.jpg",
    description: "This is a description",
    content: "This is content",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatNewsDate as jest.Mock).mockReturnValue("Formatted Date");
  });

  it("displays article details and other articles when an article is found", async () => {
    (getArticle as jest.Mock).mockResolvedValue(mockArticle);
    (getOtherArticles as jest.Mock).mockResolvedValue([{ title: "Other 1" }, { title: "Other 2" }]);

    render(
      await ArticleDetailPage({
        params: Promise.resolve({ id: encodeURIComponent("123") }),
        searchParams: Promise.resolve({
          news_selection: "top-headlines",
          query: "tech",
          category: "science",
        }),
      })
    );

    expect(getArticle).toHaveBeenCalledWith("123", "top-headlines", { query: "tech", category: "science" });

    expect(formatNewsDate).toHaveBeenCalledWith(mockArticle.publishedAt);
    expect(screen.getByText("Formatted Date")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("News Source")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /Sample Article/i })).toBeInTheDocument();

    expect(screen.getByText("This is a description")).toBeInTheDocument();

    expect(screen.getByTestId("markdown-article")).toHaveTextContent("This is content");

    expect(screen.getByTestId("articles-list")).toHaveTextContent("2 articles");
  });

  it("call notFound() when article is not found", async () => {
    (getArticle as jest.Mock).mockResolvedValue(null);

    await ArticleDetailPage({
      params: Promise.resolve({ id: encodeURIComponent("not-exist") }),
      searchParams: Promise.resolve({}),
    });

    expect(notFound).toHaveBeenCalled();
    expect(getOtherArticles).not.toHaveBeenCalled();
  });
});
