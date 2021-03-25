import { mount } from "enzyme";
import Radio from "../index";

const onChange = jest.fn();
const name = "test";

const initProps = {
  errors: "",
  label: "Label",
  selectOptions: ["Hello", "Goodbye", "Maybe"],
  name,
  onChange,
  value: ""
};

const wrapper = mount(<Radio {...initProps} />);

describe("Name of the group", () => {
  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='radio-container']")).toExist();
  });

  it("calls onChange when a toggle button is clicked", () => {
    wrapper
      .find("button[value='Hello']")
      .first()
      .simulate("change", { target: { name } });

    expect(onChange).toHaveBeenCalledWith({ target: { name } });
  });

  it("displays notes", () => {
    wrapper.setProps({ notes: "Hello" });

    expect(wrapper.find("Notes")).toExist();
  });

  it("displays errors", () => {
    wrapper.setProps({ errors: "Hello" });

    expect(wrapper.find("Errors")).toExist();
  });
});
