import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";

const defaultProps = {
  name: "",
  imagePath: "",
};

const renderScoopOption = (props = defaultProps) => {
  return render(<ScoopOption {...props} />);
};

describe("ScoopOption", () => {
  it("Should shows an error on the number box when adding a wrong value", async () => {
    const user = userEvent.setup();
    renderScoopOption();

    // expect input to be einvalid with negative number
    const vanillaInput = screen.getByRole("spinbutton");
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "-1");
    expect(vanillaInput).toHaveClass("is-invalid");

    // expect input to be einvalid with decimal number
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2.5");
    expect(vanillaInput).toHaveClass("is-invalid");

    // expect input to be einvalid with too hight number
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "11");
    expect(vanillaInput).toHaveClass("is-invalid");

    // expect input not to be invalid with a valid number
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "3");
    expect(vanillaInput).not.toHaveClass("is-invalid");
  });
});
