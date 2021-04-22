import { ReactWrapper } from "enzyme";
import withProviders from "~utils/withProviders";
import TimePicker from "../index";

const onChange = jest.fn();
const onFieldRemove = jest.fn();

const initProps = {
  emptyLabel: "",
  errors: "",
  format: "",
  name: "example",
  label: "",
  onChange,
  onFieldRemove,
  style: {},
  tooltip: "",
  value: ""
};

describe("TimePicker", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<TimePicker {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("input")).toExist();
  });

  it("displays a label and a tooltip", () => {
    wrapper.setProps({
      label: "Password",
      tooltip: "Your password must be longer than 5 characters."
    });

    expect(wrapper.find(".tooltip").first()).toExist();
    expect(wrapper.find("label").text()).toContain("Password");
  });

  it("when invalid, adds a 'error' classname and displays validation errors", () => {
    wrapper.setProps({ errors: "Required." });

    expect(wrapper.find("Errors").text()).toEqual("Required.");
  });

  it("calls onFieldRemove", () => {
    wrapper.find(".remove-time-slot").first().simulate("click");

    expect(onFieldRemove).toHaveBeenCalledTimes(1);
  });

  it("calls onChange", () => {
    wrapper.find("input").simulate("click");
    wrapper
      .find(".MuiDialogActions-spacing")
      .find("button")
      .at(1)
      .simulate("click");

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
