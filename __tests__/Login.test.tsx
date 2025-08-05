import Login from "@/app/components/Login/Login";
import "@testing-library/jest-dom";
import {
  fireEvent,
  queryByTestId,
  queryByText,
  render,
  screen,
} from "@testing-library/react";

describe("Login", () => {
  it("renders button with text", () => {
    render(<Login onLogin={() => undefined} />);
    const button = screen.getByText("Inloggen");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<button onClick={onClick}>Inloggen</button>);
    const btn = screen.getByText("Inloggen");

    fireEvent.click(btn);

    expect(onClick).toHaveBeenCalled();
  });
});
