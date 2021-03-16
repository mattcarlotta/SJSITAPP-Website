import { mount, ReactWrapper } from "enzyme";
import FixedMenu from "../index";

describe("FixedMenu", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FixedMenu collapsed={false} />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets uncollapsed CSS properties when passed a false 'collapsed' prop", () => {
    expect(wrapper).toHaveStyleRule("width", "266px");
    expect(wrapper).toHaveStyleRule(
      "box-shadow",
      "2px 6px 3px 2px rgba(35, 207, 234, 0.15)"
    );
  });

  it("sets collapsed CSS properties when passed a true 'collapsed' prop", () => {
    wrapper.setProps({ collapsed: true });
    expect(wrapper).toHaveStyleRule("width", "0px");
    expect(wrapper).toHaveStyleRule("box-shadow", "none");
  });
});
