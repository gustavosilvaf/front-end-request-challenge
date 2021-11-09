import { render } from "@testing-library/react";
import { Product } from ".";

describe("Test product render", () => {
  const mockedProductName = "Fake Shirt";

  it("Should render product corretly", () => {
    const { asFragment } = render(<Product name={mockedProductName} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("Should find name that was passed", () => {
    const { getByText } = render(<Product name={mockedProductName} />);

    expect(getByText(mockedProductName)).toBeInTheDocument();
  });
});
