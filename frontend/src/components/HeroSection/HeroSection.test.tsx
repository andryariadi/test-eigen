// HeroSection.test.tsx
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

// 1. Mock Child Components
jest.mock("../SearchArticle/SearchArticle", () => ({
  __esModule: true,
  default: ({ query }: { query?: string }) => <div data-testid="search-articles-mock">{query || "default-query"}</div>,
}));

// 2. Mock Next.js Server Components Features
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: jest.fn(),
  }),
}));

describe.skip("HeroSection", () => {
  // 3. Test Render Utama
  it("renders all main sections correctly", async () => {
    const JSX = await HeroSection({ query: "test-query" });
    render(JSX);

    // Test Container
    const section = screen.getByRole("region");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("relative");
    expect(section).toHaveClass("h-[624px]");

    // Test Background Layers
    const background = section.firstChild;
    expect(background).toHaveClass("absolute");
    expect(background).toHaveClass("bg-cover");

    const overlay = screen.getByTestId("blue-overlay");
    expect(overlay).toHaveStyle({
      backgroundColor: "rgba(37, 99, 235, 0.86)",
    });

    // Test Content
    const content = screen.getByTestId("content-wrapper");
    expect(content).toBeInTheDocument();
  });

  // 4. Test Text Content
  it("displays correct text content", async () => {
    const JSX = await HeroSection({});
    render(JSX);

    expect(screen.getByText("Blog Eigen")).toBeInTheDocument();
    expect(screen.getByText("The Journal : Design Resources, Interviews, and Industry News")).toBeInTheDocument();
    expect(screen.getByText("Your daily dose of design insights!")).toBeInTheDocument();
  });

  // 5. Test Search Component Integration
  it("passes query prop to SearchArticles", async () => {
    const JSX = await HeroSection({ query: "custom-query" });
    render(JSX);

    expect(screen.getByTestId("search-articles-mock")).toHaveTextContent("custom-query");
  });

  // 6. Test Responsive Classes
  it("has correct responsive classes", async () => {
    const JSX = await HeroSection({});
    render(JSX);

    const section = screen.getByRole("region");
    expect(section).toHaveClass("md:h-[500px]"); // Breakpoint md

    const titleContainer = screen.getByTestId("title-container");
    expect(titleContainer).toHaveClass("md:max-w-full");
  });
});
