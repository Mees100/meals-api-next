import Login, { getToken } from "@/app/components/Login/Login";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

describe("Token", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  // See: https://www.browserstack.com/guide/jest-mock-fetch-requests
  it("returns a token with valid credentials", async () => {
    fetchMock.mockResponse(JSON.stringify({ access_token: "mocked data" }));
    const actualToken = await getToken("me@example.com", "jhsdfjvhbdfxjvh");
    expect(actualToken).toBeDefined();
    expect(actualToken).toHaveProperty("access_token");
  });
});

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
