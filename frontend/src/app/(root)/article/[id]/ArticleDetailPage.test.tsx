import { render, screen, waitFor } from "@testing-library/react";
import ArticleDetailPage from "./page";
import { getArticle, getArticles } from "@/libs/actions/article.action";
import { ArticleProps } from "@/libs/types";
import { formatNewsDate } from "@/libs/utils";
import { notFound } from "next/navigation";

// Mock komponen dan modul
jest.mock("@/components/ArticlesList/ArticlesList", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="articles-list" />),
}));

jest.mock("@/components/MarkdownArticle", () => ({
  __esModule: true,
  default: jest.fn(({ content }) => <div data-testid="markdown-article">{content}</div>),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, className }) => <img src={src} alt={alt} className={className} data-testid="article-image" />),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: jest.fn(({ children, href, target }) => (
    <a href={href} target={target} data-testid="article-link">
      {children}
    </a>
  )),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/libs/actions/article.action", () => ({
  getArticle: jest.fn(),
  getArticles: jest.fn(),
}));

jest.mock("@/libs/utils", () => ({
  formatNewsDate: jest.fn((date) => `Formatted: ${date}`),
}));

describe("ArticleDetailPage", () => {
  const mockArticle: ArticleProps = {
    source: { id: "1", name: "Tech News" },
    author: "John Doe",
    title: "React Testing in 2024",
    description: "Learn how to test React components",
    url: "https://example.com/article1",
    urlToImage: "https://example.com/image1.jpg",
    publishedAt: "2024-01-01T00:00:00Z",
    content: "Lorem ipsum dolor sit amet...",
  };

  const mockOtherArticles: ArticleProps[] = [
    {
      source: { id: "2", name: "Science Daily" },
      author: "Jane Smith",
      title: "AI Breakthrough",
      description: "New AI discoveries",
      url: "https://example.com/article2",
      urlToImage: "https://example.com/image2.jpg",
      publishedAt: "2024-01-02T00:00:00Z",
      content: "Consectetur adipiscing elit...",
    },
  ];

  beforeEach(() => {
    (getArticle as jest.Mock).mockResolvedValue(mockArticle);
    (getArticles as jest.Mock).mockResolvedValue({ articles: mockOtherArticles });
    (formatNewsDate as jest.Mock).mockImplementation((date) => `Formatted: ${date}`);
    jest.clearAllMocks();
  });

  it("merender detail artikel dengan benar", async () => {
    render(await ArticleDetailPage({ params: Promise.resolve({ id: "1" }) }));

    // Verifikasi data artikel utama
    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.description ?? "")).toBeInTheDocument();
      expect(screen.getByText(`Formatted: ${mockArticle.publishedAt}`)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.author ?? "")).toBeInTheDocument();
      expect(screen.getByText(mockArticle.source.name)).toBeInTheDocument();
    });

    // Verifikasi gambar artikel
    const image = screen.getByTestId("article-image");
    expect(image).toHaveAttribute("src", mockArticle.urlToImage);
    expect(image).toHaveAttribute("alt", mockArticle.title);

    // Verifikasi link sumber artikel
    const sourceLink = screen.getByTestId("article-link");
    expect(sourceLink).toHaveAttribute("href", mockArticle.url);
    expect(sourceLink).toHaveAttribute("target", "_blank");

    // Verifikasi konten markdown
    expect(screen.getByTestId("markdown-article")).toHaveTextContent(mockArticle.content ?? "");

    // Verifikasi artikel terkait
    expect(screen.getByTestId("articles-list")).toBeInTheDocument();
  });

  it("menangani gambar placeholder ketika urlToImage null", async () => {
    const articleWithoutImage = {
      ...mockArticle,
      urlToImage: null,
    };
    (getArticle as jest.Mock).mockResolvedValueOnce(articleWithoutImage);

    render(await ArticleDetailPage({ params: Promise.resolve({ id: "1" }) }));

    const image = await screen.findByTestId("article-image");
    expect(image).toHaveAttribute("src", "https://placehold.co/600x400/png");
  });

  it("menangani ID artikel yang tidak valid", async () => {
    (getArticle as jest.Mock).mockResolvedValueOnce(null);

    render(await ArticleDetailPage({ params: Promise.resolve({ id: "invalid" }) }));

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });

  it("menampilkan artikel terkait dengan benar", async () => {
    render(await ArticleDetailPage({ params: Promise.resolve({ id: "1" }) }));

    await waitFor(() => {
      expect(screen.getByTestId("articles-list")).toBeInTheDocument();
    });
  });
});
