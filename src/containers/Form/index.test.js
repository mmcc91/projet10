import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await waitFor(() => {
        // Attendez que le formulaire cesse d'être dans l'état de chargement
        return !screen.queryByText("En cours");
      }, { timeout: 3000 });
      // Vérifiez que le message de succès est affiché

      await waitFor(() => {
        return !screen.queryByText("Envoyer");
      }, { timeout: 3000 })

      // Check that onSuccess function is called
      await waitFor(() => expect(onSuccess).toHaveBeenCalled(), { timeout: 5000 })
    });

  });
});

