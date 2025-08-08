// NavbarUser.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import NavbarUser from "./Navbar";

// Mock Next.js hooks and components
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className: string }) => <img src={src} alt={alt} width={width} height={height} className={className} data-testid="image-mock" />,
}));

describe.skip("NavbarUser Component", () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  beforeEach(() => {
    // Reset mock before each test
    mockUsePathname.mockReturnValue("/");
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders correctly on homepage", () => {
    render(<NavbarUser />);

    // Test logo
    const logo = screen.getAllByTestId("image-mock")[0];

    expect(logo).toHaveAttribute("src", "/logo.png");
    expect(logo).toHaveClass("w-[122px] md:w-40");

    // Test avatar
    const avatar = screen.getAllByTestId("image-mock")[1];

    expect(avatar).toHaveAttribute("src", "/avatar.jpg");
    expect(avatar).toHaveClass("rounded-full");

    // Test username
    expect(screen.getByText("Andry Ariadi")).toBeInTheDocument();
  });

  it("applies scrolled styles when page is scrolled", () => {
    render(<NavbarUser />);

    // Initial state
    const header = screen.getByRole("banner");

    expect(header).not.toHaveClass("backdrop-blur-md");
    expect(header).not.toHaveClass("shadow-md");

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 20 });
    fireEvent.scroll(window);

    // After scroll
    expect(header).toHaveClass("backdrop-blur-md");
    expect(header).toHaveClass("shadow-md");
  });

  it("changes text color on article page", () => {
    mockUsePathname.mockReturnValue("/article/some-article");
    render(<NavbarUser />);

    const username = screen.getByText("Andry Ariadi");

    expect(username).toHaveClass("text-slate-600");
  });

  it("does not apply scrolled styles on top of page", () => {
    // Simulate scroll then back to top
    Object.defineProperty(window, "scrollY", { value: 20 });
    render(<NavbarUser />);

    // Back to top
    Object.defineProperty(window, "scrollY", { value: 0 });
    fireEvent.scroll(window);

    const header = screen.getByRole("banner");
    expect(header).not.toHaveClass("backdrop-blur-md");
  });

  it("cleans up scroll event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<NavbarUser />);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
