import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormCreateMeal from "@/app/components/CreateMeal/CreateMeal";
import fetchMock from "jest-fetch-mock";

describe("FormCreateMeal", () => {
  it("shows success-alert if user is logged in", () => {
    render(<FormCreateMeal isLoggedIn={true} />);
    const successAlert = screen.getByText("Je bent ingelogd");
    const infoAlert = screen.queryByText("Let op, je moet eerst nog inloggen");
    expect(successAlert).toBeInTheDocument();
    expect(infoAlert).not.toBeInTheDocument();
  });

  it("shows info-alert if user is not logged in", () => {
    render(<FormCreateMeal isLoggedIn={false} />);
    const infoAlert = screen.getByText("Let op, je moet eerst nog inloggen");
    const successAlert = screen.queryByText("Je bent ingelogd");
    expect(infoAlert).toBeInTheDocument();
    expect(successAlert).not.toBeInTheDocument();
  });

  it("should show createmeal form fields", () => {
    render(<FormCreateMeal isLoggedIn />);
    const inputNaam = screen.getByLabelText("naam");
    const inputIngredienten = screen.getByLabelText("ingrediënten");
    const inputBeschrijving = screen.getByLabelText(
      "beschrijving (minstens 5 letters)"
    );
    const inputKenmerk = screen.getByLabelText("kenmerk(slug)");
    expect(inputNaam).toBeInTheDocument();
    expect(inputIngredienten).toBeInTheDocument();
    expect(inputBeschrijving).toBeInTheDocument();
    expect(inputKenmerk).toBeInTheDocument();
  });

  it("shows button opslaan", () => {
    render(<FormCreateMeal isLoggedIn />);
    const button = screen.getByText("Opslaan");
    expect(button).toBeInTheDocument();
  });
});

describe("FormCreateMeal POST request", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("sends POST request and shows success message", async () => {
    fetchMock.mockResponses([
      JSON.stringify({
        name: "mocked data",
        ingrediënten: ["mocked data", "mocked data"],
      }),
      { status: 200 },
    ]);
    render(<FormCreateMeal isLoggedIn={true} />);

    fireEvent.change(screen.getByLabelText("naam"), {
      target: { value: "Pizza" },
    });
    fireEvent.change(screen.getByLabelText("ingrediënten"), {
      target: { value: "kaas, tomaat" },
    });
    fireEvent.change(
      screen.getByLabelText("beschrijving (minstens 5 letters)"),
      { target: { value: "Lekkere pizza" } }
    );
    fireEvent.change(screen.getByLabelText("kenmerk(slug)"), {
      target: { value: "pizza" },
    });

    fireEvent.click(screen.getByText("Opslaan"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/meals"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-type": "application/json",
            Authorization: expect.stringContaining("Bearer"),
          }),
          body: JSON.stringify({
            name: "Pizza",
            ingredients: ["kaas", "tomaat"],
            description: "Lekkere pizza",
            slug: "pizza",
          }),
        })
      );
    });
    expect(await screen.findByText("Het is gelukt")).toBeInTheDocument();
  });
});
