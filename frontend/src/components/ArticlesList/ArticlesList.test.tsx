import { render, screen } from "@testing-library/react";
import ArticlesList from "./ArticlesList";
import { ArticleProps } from "@/libs/types";

// Mock ArticleCard component
jest.mock("../ArticleCard/ArticleCard", () => ({
  __esModule: true,
  default: ({ article }: { article: ArticleProps }) => (
    <div data-testid="article-card">
      <h3>{article.title}</h3>
      <p>{article.source.name}</p>
    </div>
  ),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe.skip("ArticlesList Component", () => {
  const mockArticles: ArticleProps[] = [
    {
      source: {
        id: "1",
        name: "Tech News",
      },
      author: "John Doe",
      title: "React Testing in 2024",
      description: "Learn how to test React components effectively",
      url: "https://example.com/react-testing",
      urlToImage: "/test1.jpg",
      publishedAt: "2024-01-01T00:00:00Z",
      content: "Lorem ipsum dolor sit amet...",
    },
  ];

  it("renders correctly with articles length info", () => {
    render(<ArticlesList articles={mockArticles} totalResult={15} isArticlesLength={true} />);

    // Test showing articles info
    const showingText = screen.getByText(`Showing: ${mockArticles.length} of 15 articles`);

    expect(showingText).toBeInTheDocument();
    expect(showingText).toHaveClass("text-slate-600");

    // Test article cards rendering
    const cards = screen.getAllByTestId("article-card");
    expect(cards).toHaveLength(mockArticles.length);

    // Test container classes
    const section = screen.getByTestId("region");
    expect(section).toHaveClass("px-4");
    expect(section).toHaveClass("pb-20");
  });

  it('renders correctly with "Other Articles" title', () => {
    render(<ArticlesList articles={mockArticles} isArticlesLength={false} />);

    const title = screen.getByText("Other Articles");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-slate-900");
    expect(title).toHaveClass("text-xl");

    expect(screen.queryByText(/Showing:/)).not.toBeInTheDocument();

    // Test container classes
    const section = screen.getByTestId("region");
    expect(section).toHaveClass("px-0");
    expect(section).toHaveClass("pb-0");
  });

  it("applies correct grid layout classes", () => {
    render(<ArticlesList articles={mockArticles} />);

    const grid = screen.getByTestId("articles-grid");

    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("lg:grid-cols-3");
    expect(grid).toHaveClass("gap-[24px]");
  });

  it("handles null values in article data", () => {
    const articlesWithNulls: ArticleProps[] = [
      {
        source: {
          id: null,
          name: "Null News",
        },
        author: null,
        title: "Article with Null Values",
        description: null,
        url: "https://example.com/null-article",
        urlToImage: null,
        publishedAt: "2024-01-03T00:00:00Z",
        content: null,
      },
    ];

    render(<ArticlesList articles={articlesWithNulls} />);

    expect(screen.getByText("Article with Null Values")).toBeInTheDocument();
    expect(screen.getByText("Null News")).toBeInTheDocument();
  });

  it('renders "No articles found" when totalResult is 0', () => {
    render(<ArticlesList articles={[]} totalResult={0} />);

    expect(screen.getByText("No articles found")).toBeInTheDocument();
  });
});
