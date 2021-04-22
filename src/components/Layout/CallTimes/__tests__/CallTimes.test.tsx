import { mount } from "enzyme";
import moment from "~utils/momentWithTimezone";
import CallTimes from "../index";

const wrapper = mount(<CallTimes times={[]} />);

describe("Add Field", () => {
  it("renders a tooltip with text", () => {
    expect(wrapper.find("CustomTooltip")).toExist();
    expect(wrapper.text()).toEqual("0");
  });

  it("calls onClick when button is clicked", () => {
    wrapper.setProps({ times: [moment().format()] });
    expect(wrapper.find("CustomTooltip")).toExist();
    expect(wrapper.text()).toEqual("1");
  });
});
