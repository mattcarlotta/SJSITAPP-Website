import { mount } from "enzyme";
import NavLink from "../index";

const wrapper = mount(<NavLink />);

describe("NavTitle", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("sets user-select when passed a 'select' prop", () => {
    wrapper.setProps({ select: "none" });
    expect(wrapper).toHaveStyleRule("user-select", "none");
  });
});
