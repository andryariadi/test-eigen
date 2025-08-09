import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import { getArticles } from "@/libs/actions/article.action";
import { ArticleProps } from "@/libs/types";

// Mock komponen dengan implementasi yang lebih akurat
jest.mock("../../components/HeroSection/HeroSection", () => ({
  __esModule: true,
  default: jest.fn(({ query }) => <div data-testid="hero-section" data-query={query || "undefined"} />),
}));

jest.mock("../../components/ArticlesList/ArticlesList", () => ({
  __esModule: true,
  default: jest.fn(({ articles, totalResult, isArticlesLength }) => <div data-testid="articles-list" data-count={articles.length} data-total={totalResult} data-has-articles={String(isArticlesLength)} />),
}));

jest.mock("../../libs/actions/article.action", () => ({
  getArticles: jest.fn(),
}));

describe.skip("Home Page", () => {
  const mockArticles: ArticleProps[] = [
    {
      source: { id: "1", name: "Tech News" },
      author: "Jane Doe",
      title: "React Testing in 2024",
      description: "Learn how to test React components",
      url: "https://example.com/article1",
      urlToImage: "https://example.com/image1.jpg",
      publishedAt: "2024-01-01T00:00:00Z",
      content: "Lorem ipsum dolor sit amet...",
    },
    {
      source: { id: "2", name: "Science Daily" },
      author: "John Smith",
      title: "AI Breakthrough in Medicine",
      description: "New AI model detects diseases early",
      url: "https://example.com/article2",
      urlToImage: "https://example.com/image2.jpg",
      publishedAt: "2024-01-02T00:00:00Z",
      content: "Consectetur adipiscing elit...",
    },
  ];

  beforeEach(() => {
    (getArticles as jest.Mock).mockResolvedValue({
      articles: mockArticles,
      totalResults: mockArticles.length,
    });
    jest.clearAllMocks();
  });

  it("merender dengan benar tanpa query pencarian", async () => {
    render(await Home({ searchParams: Promise.resolve({}) }));

    // Verifikasi komponen dirender
    await waitFor(() => {
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
      expect(screen.getByTestId("hero-section")).toHaveAttribute("data-query", "undefined");

      const articlesList = screen.getByTestId("articles-list");
      expect(articlesList).toBeInTheDocument();
      expect(articlesList).toHaveAttribute("data-count", "2");
      expect(articlesList).toHaveAttribute("data-total", "2");
      expect(articlesList).toHaveAttribute("data-has-articles", "true");
    });
  });

  it("memfilter artikel berdasarkan query pencarian", async () => {
    const query = "React";
    render(await Home({ searchParams: Promise.resolve({ query }) }));

    // Verifikasi komponen dirender dengan query
    await waitFor(() => {
      expect(screen.getByTestId("hero-section")).toHaveAttribute("data-query", query);

      const articlesList = screen.getByTestId("articles-list");
      expect(articlesList).toHaveAttribute("data-count", "1");
      expect(articlesList).toHaveAttribute("data-total", "2");
      expect(articlesList).toHaveAttribute("data-has-articles", "true");
    });
  });

  it("menangani daftar artikel kosong", async () => {
    (getArticles as jest.Mock).mockResolvedValueOnce({
      articles: [],
      totalResults: 0,
    });

    render(await Home({ searchParams: Promise.resolve({}) }));

    // Verifikasi state kosong
    await waitFor(() => {
      const articlesList = screen.getByTestId("articles-list");

      expect(articlesList).toHaveAttribute("data-count", "0");
      expect(articlesList).toHaveAttribute("data-total", "0");
      expect(articlesList).toHaveAttribute("data-has-articles", "true");
    });
  });

  //   it("menampilkan state error ketika gagal fetch artikel", async () => {
  //     // Mock error yang lebih baik
  //     (getArticles as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

  //     const { container } = render(await Home({ searchParams: Promise.resolve({}) }));

  //     await waitFor(() => {
  //       // Verifikasi error state
  //       expect(screen.queryByTestId("articles-list")).not.toBeInTheDocument();
  //       // Anda bisa menambahkan verifikasi komponen error yang muncul
  //       expect(container).toHaveTextContent("Error"); // Sesuaikan dengan implementasi error handling Anda
  //     });
  //   });
});
