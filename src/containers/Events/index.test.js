import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  beforeEach(() => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
  });

  it("a list of event card is displayed", async () => {
    await screen.findAllByText("avril");
  });

  describe("and an error occurred", () => {
    beforeEach(() => {
      api.loadData = jest.fn().mockRejectedValue();
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
    });

    it("an error message is displayed", async () => {
      expect(await screen.findByText("An error occurred")).toBeInTheDocument();
    });
  });

  describe("and we select a category", () => {
    beforeEach(async () => {
      await screen.findByText("Forum #productCON");
      fireEvent.click(await screen.findByTestId("collapse-button-testid"));
      fireEvent.click(
        (await screen.findAllByText("soirée entreprise"))[0]
      );
    });

    it("a filtered list is displayed", async () => {
      expect(
        screen.queryByText("Forum #productCON")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
    });
  });

  describe("and we click on an event", () => {
    beforeEach(async () => {
      fireEvent.click(await screen.findByText("Conférence #productCON"));
    });

    it("the event detail is displayed", async () => {
      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });
});
