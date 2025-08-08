// SearchArticles.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchArticles from "./SearchArticle";

// Mock child components
jest.mock("../SearchFormReset/SearchFormReset", () => ({
  __esModule: true,
  default: () => <div data-testid="reset-button">Reset</div>,
}));

jest.mock("@ant-design/icons", () => ({
  SearchOutlined: () => <span data-testid="search-icon">🔍</span>,
}));

describe.skip("SearchArticles Component", () => {
  const mockAction = "/search";
  const mockPlaceholder = "Cari artikel...";

  it("renders correctly with default props", () => {
    render(<SearchArticles />);

    // Test form element
    const form = screen.getByTestId("form");

    expect(form).toHaveAttribute("action", "/");
    expect(form).toHaveClass("group");

    // Test input field
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("name", "query");
    expect(input).toHaveAttribute("placeholder", "Search articles...");
    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("py-3");
    expect(input).toHaveClass("pl-11");

    // Test search icon
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();

    // Reset button should not be visible when no query
    expect(screen.queryByTestId("reset-button")).not.toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(<SearchArticles query="test query" action={mockAction} placeholder={mockPlaceholder} />);

    // Test input with query
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("test query");
    expect(input).toHaveAttribute("placeholder", mockPlaceholder);

    // Test form action
    expect(screen.getByTestId("form")).toHaveAttribute("action", mockAction);

    // Reset button should be visible when query exists
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    render(<SearchArticles />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "new search" } });

    expect(input).toHaveValue("new search");
  });

  it("applies correct styling classes", () => {
    render(<SearchArticles />);

    const container = screen.getByTestId("form").firstChild;

    expect(container).toHaveClass("relative");
    expect(container).toHaveClass("w-full");
    expect(container).toHaveClass("max-w-2xl");

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("bg-white");
    expect(input).toHaveClass("rounded-[6px]");
    expect(input).toHaveClass("outline-none");

    // Test search button container
    const searchButton = screen.getByTestId("search-button");

    expect(searchButton.parentElement).toHaveClass("absolute");
    expect(searchButton.parentElement).toHaveClass("top-[12.5px]");
    expect(searchButton.parentElement).toHaveClass("left-3");
  });

  it("does not render reset button when query is empty", () => {
    const { rerender } = render(<SearchArticles query="" />);

    expect(screen.queryByTestId("reset-button")).not.toBeInTheDocument();

    rerender(<SearchArticles query="test" />);

    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });
});
