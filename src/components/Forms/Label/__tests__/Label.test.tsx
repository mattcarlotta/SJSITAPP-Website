import { mount } from "enzyme";
import Label from "../index";

const initProps = {
  name: "email",
  label: "email",
  tooltip: ""
};

const wrapper = mount(<Label {...initProps} />);

describe("Label", () => {
  it("renders without errors", () => {
    expect(wrapper.find("label")).toExist();
  });

  it("renders a icon with a tooltip", () => {
    const tooltip = "Testing a tooltip.";
    wrapper.setProps({ tooltip });

    expect(wrapper.find("div.tooltip")).toExist();
    expect(wrapper.find("GoQuestion")).toExist();
  });
});
