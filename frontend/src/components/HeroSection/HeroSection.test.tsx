import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSection from "./HeroSection";

// Mock komponen SearchArticles karena ini adalah dependency eksternal
jest.mock("./SearchArticles", () => ({
  __esModule: true,
  default: ({ query }: { query?: string }) => <div data-testid="search-articles-mock">{query || "default-query"}</div>,
}));

describe("HeroSection Component", () => {
  const renderHeroSection = (query?: string) => {
    return render(<HeroSection query={query} />);
  };

  it("renders correctly with default props", () => {
    renderHeroSection();

    // Assert judul dan deskripsi
    expect(screen.getByText("Blog Eigen")).toBeInTheDocument();
    expect(screen.getByText("The Journal : Design Resources, Interviews, and Industry News")).toBeInTheDocument();
    expect(screen.getByText("Your daily dose of design insights!")).toBeInTheDocument();

    // Assert mock SearchArticles dirender
    expect(screen.getByTestId("search-articles-mock")).toHaveTextContent("default-query");
  });

  it("passes query prop to SearchArticles", () => {
    renderHeroSection("test-query");
    expect(screen.getByTestId("search-articles-mock")).toHaveTextContent("test-query");
  });

  it("has correct styling classes", () => {
    renderHeroSection();

    // Test container styling
    const section = screen.getByRole("region");
    expect(section).toHaveClass("relative");
    expect(section).toHaveClass("h-[624px]");
    expect(section).toHaveClass("md:h-[500px]");

    // Test overlay color
    const overlay = screen.getByTestId("blue-overlay");
    expect(overlay).toHaveStyle({ backgroundColor: "rgba(37, 99, 235, 0.86)" });
  });
});
