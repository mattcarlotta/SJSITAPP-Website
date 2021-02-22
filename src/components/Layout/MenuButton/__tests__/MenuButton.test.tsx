import { mount, ReactWrapper } from "enzyme";
import MenuButton from "../index";

describe("MenuButton Component", () => {
  let wrapper: ReactWrapper;
  let findMenuButton: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<MenuButton />);
    findMenuButton = () => wrapper.find("MenuButton");
  });

  it("initially renders a default menu button", () => {
    const StyledBtnCtnr = findMenuButton();
    expect(StyledBtnCtnr.exists()).toBeTruthy();
    expect(StyledBtnCtnr).toHaveStyleRule("margin", "0px");
    expect(StyledBtnCtnr).toHaveStyleRule("background-color", "transparent", {
      target: ":hover"
    });
  });

  it("adds a margin rule when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(findMenuButton()).toHaveStyleRule("margin", "10px");
  });

  it("adds a background-color rule when passed a 'hoverable' prop", () => {
    wrapper.setProps({ hoverable: true });
    expect(findMenuButton()).toHaveStyleRule("background-color", "#d8d8d8", {
      target: ":hover"
    });
  });
});
