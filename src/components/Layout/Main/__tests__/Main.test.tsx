import { mount, ReactWrapper } from "enzyme";
import Main from "../index";

describe("Main Component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Main />);
  });

  it("initially renders a default margin", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("margin-left", "270px");
  });

  it("removes margin when passed a 'stretch' prop", () => {
    wrapper.setProps({ stretch: true });
    expect(wrapper).toHaveStyleRule("margin-left", "0px");
  });
});
