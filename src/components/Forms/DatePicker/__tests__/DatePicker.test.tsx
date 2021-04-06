import { ReactWrapper } from "enzyme";
import withProviders from "~utils/withProviders";
import DatePicker from "../index";

const onChange = jest.fn();

const initProps = {
  emptyLabel: "",
  errors: "",
  format: "",
  name: "example",
  label: "",
  onChange,
  style: {},
  tooltip: "",
  value: ""
};

describe("Input", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<DatePicker {...initProps} />);
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
});
