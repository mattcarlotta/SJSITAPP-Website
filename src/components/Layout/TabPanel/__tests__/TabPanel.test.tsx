import { mount, ReactWrapper } from "enzyme";
import TabPanel from "../index";

const initProps = {
  children: "Test",
  index: 0,
  value: 0
};

describe("MenuLink", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<TabPanel {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("#tabpanel-0")).toExist();
  });

  it("renders nothing when 'value' and 'index' don't match", () => {
    wrapper.setProps({ index: 1 });
    expect(wrapper.find("#tabpanel-0")).not.toExist();
  });
});
