import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { Search } from ".";

const mockSetValue = jest.fn();
const mockSubmit = jest.fn((e) => e.preventDefault());
const mockOptions = ["First shirt, second shirt"];

describe("Search tests", () => {
  it("Should render corretly", () => {
    const { asFragment } = renderComponent();
    expect(asFragment).toMatchSnapshot();
  });

  it("Should render input and button", () => {
    const { getByPlaceholderText, getByRole } = renderComponent();

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByPlaceholderText("Search a product")).toBeInTheDocument();
  });

  it("Should call setValue when change input value", () => {
    const { getByPlaceholderText } = renderComponent();

    const input = getByPlaceholderText("Search a product");

    fireEvent.change(input, { target: { value: "Shirt" } });

    expect(mockSetValue).toHaveBeenCalledWith("Shirt");
  });

  it("Should submit form when button was clicked", () => {
    const { getByRole } = renderComponent();

    const button = getByRole("button");

    fireEvent.click(button);

    expect(mockSubmit).toHaveBeenCalled();
  });
});

const renderComponent = () =>
  render(
    <Search
      handleSearch={mockSubmit}
      options={mockOptions}
      value={""}
      setValue={mockSetValue}
    />
  );
