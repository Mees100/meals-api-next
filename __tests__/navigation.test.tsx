import Navigation from "@/app/components/Navigation/Navigation";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Navigation", () => {
  it("renders a text 'Requests with fetch API'", () => {
    render(<Navigation />);

    const heading = screen.getByText("Requests with fetch API");

    expect(heading).toBeInTheDocument();
  });

  it("opens menu on click on menuBar", () => {
    render(<Navigation />);
    const menuBar = screen.getByTestId("menu-bar");
    const menuWrapper = screen.getByTestId("menu-wrapper");
    expect(menuWrapper).not.toHaveClass("headerTopWrapperMenuOpen");
    fireEvent.click(menuBar);
    expect(menuWrapper).toHaveClass("headerTopWrapperMenuOpen");
  });
});
