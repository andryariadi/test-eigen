import { render, screen } from "@testing-library/react";
import NotFoundArticle from "./NotFoundArticle";

describe.skip("NotFoundArticle Component", () => {
  it('renders correctly with the "No articles found" message', () => {
    render(<NotFoundArticle />);

    // Memeriksa elemen utama di-render
    const container = screen.getByTestId("not-found-article");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex", "items-center", "justify-center", "pb-10");

    // Memeriksa teks pesan
    const message = screen.getByText("No articles found");

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("text-xl", "text-center", "font-semibold", "text-slate-500");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<NotFoundArticle />);
    expect(asFragment()).toMatchSnapshot();
  });
});
