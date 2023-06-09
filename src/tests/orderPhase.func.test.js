import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  render(<App />);

  // adpp ice cream coops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /Order Sundae/i });
  await user.click(orderButton);

  // check sumary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsTotal = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("2.00");

  const toppingsTotal = screen.getByText("Toopings: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(termsAndConditionsCheckbox).toBeInTheDocument();
  await user.click(termsAndConditionsCheckbox);

  const confirmationButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(confirmationButton).toBeInTheDocument();
  await user.click(confirmationButton);

  // Expect "loading" to show
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  // confirm order number on confirmation page

  const thankYouHeader = await screen.findByText(/thank you/i);
  expect(thankYouHeader).toBeInTheDocument();

  // Expect that loading has dissappeared
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });

  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsResetedTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsResetedTotal).toBeInTheDocument();
  const toppingsResetedTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsResetedTotal).toBeInTheDocument();

  // Unmount the component to trigget cleanup and avoid "not wrapped in act()" error
});

test("Toppings header is not on summary page if no toppings ordered", async () => {
  const user = userEvent.setup();
  render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("Toppings header is not on summary page if toppings ordered, then removed", async () => {
  const user = userEvent.setup();
  render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesTopping);
  expect(cherriesTopping).toBeChecked();
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  await user.click(cherriesTopping);
  expect(cherriesTopping).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
