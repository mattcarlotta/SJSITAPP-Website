import { mount, ReactWrapper } from "enzyme";
import Main from "../index";

describe("Main Component", () => {
  let wrapper: ReactWrapper;
  let findMain: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Main />);
    findMain = () => wrapper.find("Main");
  });

  it("initially renders a default margin", () => {
    const StyledBtnCtnr = findMain();
    expect(StyledBtnCtnr.exists()).toBeTruthy();
    expect(StyledBtnCtnr).toHaveStyleRule("margin-left", "280px");
  });

  it("removes margin when passed a 'stretch' prop", () => {
    wrapper.setProps({ stretch: true });
    expect(findMain()).toHaveStyleRule("margin-left", "0px");
  });
});
