import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("Should have a Checkbox that is unchecked and a disabled button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
  test("Should enable button on first click of checkbox, and disable on the second click", async () => {
    render(<SummaryForm />);
    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    await user.click(checkbox);
    expect(button).toBeEnabled();
    await user.click(checkbox);
    expect(button).toBeDisabled();
  });
  test("Should render a popover only when cursor is over Terms and Conditions text", async () => {
    render(<SummaryForm />);
    const user = userEvent.setup();
    const text = screen.getByText(/terms and conditions/i);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    await user.hover(text);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    await user.unhover(text);
    expect(popover).not.toBeInTheDocument();
  });
});
