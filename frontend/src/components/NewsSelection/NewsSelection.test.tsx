import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import NewsSelection from "./NewsSelection";

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

jest.mock("@/libs/constants", () => ({
  newsSelection: ["top-headlines", "everything"],
}));

describe.skip("NewsSelection Component", () => {
  const mockPush = jest.fn();
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockImplementation(() => {
      return {
        get: (key: string) => mockSearchParams.get(key),
        // Mock toString untuk meniru behavior asli URLSearchParams
        toString: () => {
          const params = new URLSearchParams();
          mockSearchParams.forEach((value, key) => {
            params.set(key, value);
          });
          return params.toString();
        },
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it("renders all news selection buttons", () => {
    render(<NewsSelection />);

    expect(screen.getByText("top headlines")).toBeInTheDocument();
    expect(screen.getByText("everything")).toBeInTheDocument();
  });

  it("applies active styles to the selected news button", () => {
    mockSearchParams.set("news_selection", "top-headlines");

    render(<NewsSelection />);

    const allNewsButton = screen.getByText("top headlines");

    expect(allNewsButton).toHaveClass("text-blue-800");
    expect(allNewsButton.parentElement).toHaveClass("border-blue-500");
  });

  it("calls router.push with correct params when a button is clicked", async () => {
    render(<NewsSelection />);

    const user = userEvent.setup();

    await user.click(screen.getByText("top headlines"));

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("news_selection=top-headlines"));
  });

  it("removes news_selection param when clicking an active button", async () => {
    mockSearchParams.set("news_selection", "everything");

    render(<NewsSelection />);

    const user = userEvent.setup();

    await user.click(screen.getByText("everything"));

    expect(mockPush).toHaveBeenCalledWith(expect.not.stringContaining("news_selection"));
  });

  it("formats button labels correctly", () => {
    render(<NewsSelection />);

    expect(screen.getByText("top headlines")).toBeInTheDocument();
    expect(screen.queryByText("top-headlines")).not.toBeInTheDocument();
  });
});
