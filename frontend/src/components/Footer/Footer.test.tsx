// Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock untuk Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => <img src={src} alt={alt} width={width} height={height} data-testid="footer-logo" />,
}));

describe.skip("Footer Component", () => {
  it("renders correctly with logo and copyright text", () => {
    render(<Footer />);

    // Test logo footer
    const logo = screen.getByTestId("footer-logo");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logofooter.png");
    expect(logo).toHaveAttribute("alt", "Logo");
    expect(logo).toHaveAttribute("width", "140");
    expect(logo).toHaveAttribute("height", "140");

    // Test copyright text
    const copyrightText = screen.getByText(/© 2023 Eigen Articles/i);

    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveClass("text-white");
    expect(copyrightText).toHaveClass("text-center");
  });

  it("has correct responsive classes", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveClass("flex-col"); // Mobile
    expect(footer).toHaveClass("md:flex-row"); // Desktop
    expect(footer).toHaveClass("h-[6.5rem]"); // Mobile height
    expect(footer).toHaveClass("md:h-[4.5rem]"); // Desktop height
    expect(footer).toHaveClass("gap-2"); // Mobile gap
    expect(footer).toHaveClass("md:gap-5"); // Desktop gap
  });

  it("applies correct styling", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveClass("bg-sky-500");
    expect(footer).toHaveClass("bg-opacity-90");
    expect(footer).toHaveClass("backdrop-blur-md");
    expect(footer).toHaveClass("shadow-lg");
  });
});
