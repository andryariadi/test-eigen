import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import FilterCategory from "./FilterCategory";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/libs/constants", () => ({
  headlinesCategories: ["business", "entertainment", "health", "science", "sports", "technology"],
}));

jest.mock("antd", () => ({
  Select: jest.fn(({ placeholder, ...props }) => (
    <div>
      <select data-testid="antd-select" aria-label={placeholder} onChange={(e) => props.onChange?.(e.target.value)} value={props.value}>
        {props.options?.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span data-testid="select-placeholder">{placeholder}</span>
    </div>
  )),
}));

describe.skip("FilterCategory Component", () => {
  const mockPush = jest.fn();
  let mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<FilterCategory />);

    expect(screen.getByTestId("antd-select")).toBeInTheDocument();

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "Select category");
  });

  it("initializes with value from URL params", () => {
    mockSearchParams.set("category", "technology");
    render(<FilterCategory />);

    expect(screen.getByRole("combobox")).toHaveValue("technology");
  });

  it("updates URL when category is selected", async () => {
    render(<FilterCategory />);
    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, "business");

    expect(mockPush).toHaveBeenCalledWith("?category=business");
  });

  it("clears category when selection is removed", async () => {
    mockSearchParams.set("category", "business");

    const { rerender } = render(<FilterCategory />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "" } });

    mockSearchParams = new URLSearchParams();
    rerender(<FilterCategory />);

    expect(mockPush).toHaveBeenCalledWith("?");
  });

  it("displays all categories from constants", () => {
    render(<FilterCategory />);
    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(6);
    expect(options[0]).toHaveValue("business");
    expect(options[1]).toHaveValue("entertainment");
    // ... test other options
  });

  it("formats category labels with capital first letter", () => {
    render(<FilterCategory />);
    const options = screen.getAllByRole("option");

    expect(options[0]).toHaveTextContent("Business");
    expect(options[1]).toHaveTextContent("Entertainment");
  });

  it("filters options when searching", async () => {
    render(<FilterCategory />);
    const select = screen.getByRole("combobox");

    await userEvent.type(select, "business");
    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(6);

    expect(options[0]).toHaveValue("business");
  });

  it("preserves other query parameters when updating category", async () => {
    mockSearchParams.set("country", "us");
    render(<FilterCategory />);
    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, "health");

    expect(mockPush).toHaveBeenCalledWith("?country=us&category=health");
  });
});
