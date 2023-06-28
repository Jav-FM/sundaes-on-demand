import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderConfirmation from "../OrderConfirmation";

const defaultProps = {
  setOrderPhase: jest.fn(),
};

const renderOrderConfirmation = (props = defaultProps) => {
  return render(<OrderConfirmation {...props} />);
};

describe("OrderConfirmation", () => {
  test("Should show an alert on error from server", async () => {
    // We overright the server methods to provoque an error responce
    server.resetHandlers(
      rest.get("http://localhost:3030/order", (_, res, ctx) =>
        res(ctx.status(500))
      )
    );
    renderOrderConfirmation();

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(
      "An unexpected error ocurred. Please try again later."
    );
  });
});
