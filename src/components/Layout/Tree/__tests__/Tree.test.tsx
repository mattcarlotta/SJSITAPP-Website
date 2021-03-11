import { mount, ReactWrapper } from "enzyme";
import Tree from "../index";

describe("Tree", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Tree collapsed={false} />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets uncollapsed CSS properties when passed a false 'collapsed' prop", () => {
    expect(wrapper).toHaveStyleRule("overflow", "auto");
    expect(wrapper).toHaveStyleRule("padding", "5px 0 5px 0");
    expect(wrapper).toHaveStyleRule("width", "266px");
    expect(wrapper).toHaveStyleRule(
      "box-shadow",
      "2px 6px 3px 2px rgba(35, 207, 234, 0.15)"
    );
  });

  it("sets collapsed CSS properties when passed a true 'collapsed' prop", () => {
    wrapper.setProps({ collapsed: true });
    expect(wrapper).toHaveStyleRule("overflow", "hidden");
    expect(wrapper).toHaveStyleRule("padding", "5px 0 0 0");
    expect(wrapper).toHaveStyleRule("width", "0px");
    expect(wrapper).toHaveStyleRule("box-shadow", "none");
  });
});
