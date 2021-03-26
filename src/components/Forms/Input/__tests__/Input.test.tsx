import { mount, ReactWrapper } from "enzyme";
import Input from "../index";

const onChange = jest.fn();

const initProps = {
  className: "",
  containerStyle: {},
  disabled: false,
  errors: "",
  icon: "",
  inputStyle: {},
  isFocused: "",
  label: "",
  name: "password",
  onChange,
  placeholder: "Enter a password...",
  readOnly: false,
  tooltip: "",
  type: "text",
  value: ""
};

describe("Input", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Input {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("input")).toExist();
  });

  it("doesn't display an Icon if 'icon' is missing", () => {
    expect(wrapper.find("i")).not.toExist();
  });

  it("displays a Font Awesome icon by a string type", () => {
    wrapper.setProps({ icon: "key" });

    expect(wrapper.find("i")).toExist();
    expect(wrapper.find("FaKey")).toExist();
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

    expect(wrapper.find("div.error")).toExist();
    expect(wrapper.find("Errors").text()).toEqual("Required.");
  });

  it("when clicked, adds a 'focused' className", () => {
    wrapper.find("ClickHandler").setState({ isFocused: true });

    expect(wrapper.find("div.focused")).toExist();
  });

  it("when disabled, adds a 'disabled-input' className and disables the input", () => {
    wrapper.setProps({ disabled: true });

    expect(wrapper.find("div.disabled-input")).toExist();
    expect(wrapper.find("input").prop("disabled")).toEqual(true);
  });
});
