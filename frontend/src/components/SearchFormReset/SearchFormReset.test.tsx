// SearchFormReset.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFormReset from "./SearchFormReset";

// Mock untuk Next.js Link dan Ant Design Icon
// Mock untuk Next.js Link dan Ant Design Icon
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@ant-design/icons", () => ({
  CloseOutlined: () => <span data-testid="close-icon">✕</span>,
}));

describe.skip("SearchFormReset Component", () => {
  // Simulasi form element di DOM
  const setupFormMock = () => {
    const form = document.createElement("form");
    form.className = "search";

    const input = document.createElement("input");
    input.value = "test value";

    form.appendChild(input);
    document.body.appendChild(form);

    return form;
  };

  afterEach(() => {
    // Bersihkan DOM setelah setiap test
    document.body.innerHTML = "";
  });

  it("renders correctly", () => {
    render(<SearchFormReset />);

    // Test button
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "reset");

    // Test link
    const link = screen.getByTestId("link");

    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass("flex");
    expect(link).toHaveClass("items-center");

    // Test icon
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("resets form when clicked", () => {
    const form = setupFormMock();
    const input = form.querySelector("input") as HTMLInputElement;

    render(<SearchFormReset />);

    // Set nilai input
    input.value = "test value";
    expect(input.value).toBe("test value");

    // Klik reset button
    fireEvent.click(screen.getByRole("button"));

    // Verifikasi form di-reset
    expect(input.value).toBe("");
  });

  it("navigates to home page when clicked", () => {
    render(<SearchFormReset />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/");
  });

  it("applies correct styling", () => {
    render(<SearchFormReset />);

    const link = screen.getByTestId("link");

    expect(link).toHaveClass("w-full");
    expect(link).toHaveClass("h-full");

    const icon = screen.getByTestId("close-icon");

    expect(icon).toBeInTheDocument();
  });

  it("does not throw error when form not found", () => {
    // Pastikan tidak ada form di DOM
    const forms = document.querySelectorAll(".search");
    forms.forEach((form) => form.remove());

    // Render dan klik seharusnya tidak throw error
    render(<SearchFormReset />);
    expect(() => {
      fireEvent.click(screen.getByRole("button"));
    }).not.toThrow();
  });
});
