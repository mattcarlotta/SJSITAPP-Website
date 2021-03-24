import { mount } from "enzyme";
import Switch from "../index";

const onChange = jest.fn();
const name = "test";

const initProps = {
  errors: "",
  label: "Label",
  name,
  onChange,
  value: false
};

const wrapper = mount(<Switch {...initProps} />);

describe("Name of the group", () => {
  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='switch-container']")).toExist();
  });

  it("calls onChange when the switch is clicked", () => {
    wrapper
      .find("input[name='test']")
      .first()
      .simulate("change", { target: { name, checked: true } });

    expect(onChange).toHaveBeenCalledWith({ target: { name, value: true } });
  });
});
