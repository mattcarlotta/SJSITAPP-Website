import { mount, ReactWrapper } from "enzyme";
import MenuButton from "../index";

describe("MenuButton Component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<MenuButton />);
  });

  it("initially renders a default menu button", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("margin", "0px");
    expect(wrapper).toHaveStyleRule("background-color", "transparent", {
      target: ":hover"
    });
  });

  it("adds a margin rule when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });

  it("adds a background-color rule when passed a 'hoverable' prop", () => {
    wrapper.setProps({ hoverable: true });
    expect(wrapper).toHaveStyleRule("background-color", "#d8d8d8", {
      target: ":hover"
    });
  });
});
