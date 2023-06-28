import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

const renderOptionsComponent = (optionType) => {
  render(<Options optionType={optionType} />);
};

describe("Options", () => {
  test("Should displays image for each scoop option from server", async () => {
    renderOptionsComponent("scoops");

    //find images
    // (on /scoop$/ the $ indicates that the name finishes with that word)
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("Should displays image for each topping option from server", async () => {
    renderOptionsComponent("toppings");

    //find images
    // (on /scoop$/ the $ indicates that the name finishes with that word)
    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    // confirm alt text of images
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });
  test("Don't update total if scoops input is invalid", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    const scoopsSubtotal = screen.getByText("Scoops total: $0.00");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2.5");
    expect(scoopsSubtotal).toHaveTextContent("$0.00");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "100");
    expect(scoopsSubtotal).toHaveTextContent("$0.00");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "-1");
    expect(scoopsSubtotal).toHaveTextContent("$0.00");
  });
});
