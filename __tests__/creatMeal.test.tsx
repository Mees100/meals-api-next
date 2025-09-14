import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormCreateMeal from "@/app/components/CreateMeal/CreateMeal";

describe("FormCreateMeal", () => {
  it("shows success-alert if user is log in", () => {
    render(<FormCreateMeal isLoggedIn={true} />);
    const successAlert = screen.getByText("Je bent ingelogd");
    const infoAlert = screen.queryByText("Let op, je moet eerst nog inloggen");

    expect(successAlert).toBeInTheDocument();
    expect(infoAlert).not.toBeInTheDocument();
  });

  it("shows info-alert if user is not log in", () => {
    render(<FormCreateMeal isLoggedIn={false} />);
    const infoAlert = screen.getByText("Let op, je moet eerst nog inloggen");
    const successAlert = screen.queryByText("Je bent ingelogd");
    expect(infoAlert).toBeInTheDocument();
    expect(successAlert).not.toBeInTheDocument();
  });

  it("should show creatmeal form", () => {
    render(<FormCreateMeal isLoggedIn />);
    const inputNaam = screen.getByLabelText("naam");
    const inputIngrediënten = screen.getByLabelText("ingrediënten");
    const inputBeschrijving = screen.getByLabelText(
      "beschrijving (minstens 5 letters)"
    );
    const inputKenmerk = screen.getByLabelText("kenmerk(slug)");

    expect(inputNaam).toBeInTheDocument();
    expect(inputIngrediënten).toBeInTheDocument();
    expect(inputBeschrijving).toBeInTheDocument();
    expect(inputKenmerk).toBeInTheDocument();
  });

  describe("Login", () => {
    it("renders button with text", () => {
      render(<FormCreateMeal isLoggedIn />);
      const button = screen.getByText("Opslaan");
      expect(button).toBeInTheDocument();
    });
  });
});
