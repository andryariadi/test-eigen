// ArticleCard.test.tsx
import { render, screen } from "@testing-library/react";
import ArticleCard from "./ArticleCard";
import { ArticleProps } from "@/libs/types";
import { formatNewsDate, stripHtmlTags } from "@/libs/utils";

// Mock Next.js components and utils
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => <img src={src} alt={alt} className={className} data-testid="article-image" />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("../../libs/utils", () => ({
  __esModule: true,
  formatNewsDate: jest.fn((date: string) => `Formatted: ${date}`),
  stripHtmlTags: jest.fn((text: string | null) => (text ? text.replace(/<[^>]*>/g, "") : "")),
}));

describe("ArticleCard Component", () => {
  const mockArticle: ArticleProps = {
    source: {
      id: "1",
      name: "Tech News",
    },
    author: "John Doe",
    title: "React Testing in 2024",
    description: "<p>Learn how to test React components</p>",
    url: "https://example.com/article",
    urlToImage: "https://example.com/image.jpg",
    publishedAt: "2024-01-01T00:00:00Z",
    content: "Lorem ipsum dolor sit amet...",
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("renders correctly with all article data", () => {
    render(<ArticleCard article={mockArticle} />);

    // 1. Test images
    const image = screen.getByTestId("article-image");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockArticle.urlToImage);
    expect(image).toHaveAttribute("alt", mockArticle.title);
    expect(image).toHaveClass("object-cover");

    // 2. Test date format
    expect(formatNewsDate).toHaveBeenCalledWith(mockArticle.publishedAt);
    expect(screen.getByText(`Formatted: ${mockArticle.publishedAt}`)).toBeInTheDocument();

    // 3. Test link to article
    const titleLink = screen.getByTestId("article-title-link");

    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", `/article/${mockArticle.source.name}`);

    // 4. Test article title
    const titleText = screen.getByText(mockArticle.title);

    expect(titleText).toHaveClass("capitalize");
    expect(titleText).toHaveClass("line-clamp-1");
    expect(titleText).toHaveClass("text-lg");
    expect(titleText).toHaveClass("text-slate-900");
    expect(titleText).toHaveClass("font-semibold");

    // 5. Test description
    expect(stripHtmlTags).toHaveBeenCalledWith(mockArticle.description);
    expect(screen.getByText("Learn how to test React components")).toBeInTheDocument();
    expect(screen.getByText("Learn how to test React components")).toHaveClass("line-clamp-2");

    // 6. Test category
    const categoryLink = screen.getByRole("link", { name: mockArticle.source.name });

    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveAttribute("href", mockArticle.url);
    expect(categoryLink).toHaveAttribute("target", "_blank");
    expect(categoryLink).toHaveClass("text-blue-900");
  });

  it("uses placeholder image when urlToImage is null", () => {
    const articleWithoutImage = {
      ...mockArticle,
      urlToImage: null,
    };
    render(<ArticleCard article={articleWithoutImage} />);

    expect(screen.getByTestId("article-image")).toHaveAttribute("src", "https://placehold.co/600x400/png");
  });

  it("handles empty description safely", () => {
    const articleWithoutDesc = {
      ...mockArticle,
      description: null,
    };
    render(<ArticleCard article={articleWithoutDesc} />);

    expect(stripHtmlTags).toHaveBeenCalledWith(null);
    expect(screen.queryByTestId("article-description")).toBeNull();
  });

  it("applies correct hover styles", () => {
    render(<ArticleCard article={mockArticle} />);

    const card = screen.getByRole("figure");

    expect(card).toHaveClass("group");
    expect(card).toHaveClass("hover:bg-white");
    expect(card).toHaveClass("hover:shadow-lg");
    expect(card).toHaveClass("transition-all");

    const caption = screen.getByTestId("figcaption");

    expect(caption).toHaveClass("group-hover:px-2");
  });

  it("matches snapshot with complete article data", () => {
    const { asFragment } = render(<ArticleCard article={mockArticle} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with minimal article data", () => {
    const minimalArticle = {
      source: {
        id: null,
        name: "Minimal News",
      },
      title: "Minimal Article",
      url: "https://example.com/minimal",
      publishedAt: "2024-01-02T00:00:00Z",
    } as ArticleProps;

    const { asFragment } = render(<ArticleCard article={minimalArticle} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
