import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

describe("OrderEntry", () => {
  test("Should handle error for scoops and toppings routes", async () => {
    // We overright the server methods to provoque an error responce
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<OrderEntry />);
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  test("Order button should be disabled while there is no scoops selected", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const user = userEvent.setup();

    const orderButton = screen.getByRole("button", { name: /order sundae/i });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();

    await user.clear(vanillaInput);
    expect(orderButton).toBeDisabled();
  });
});
