import { mount, ReactWrapper } from "enzyme";
import MenuLink from "../index";

const initProps = {
  children: "Test",
  dataTestId: "test-menulink",
  href: "/test"
};

describe("MenuLink", () => {
  let wrapper: ReactWrapper;
  let menuLinkNode: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<MenuLink {...initProps} />);
    menuLinkNode = () => wrapper.find("[data-testid='test-menulink']");
  });

  it("renders without errors", () => {
    expect(menuLinkNode()).toExist();
  });

  it("sets font-size when passed a 'fontSize' prop", () => {
    wrapper.setProps({ fontSize: "10px" });
    expect(menuLinkNode()).toHaveStyleRule("font-size", "10px");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(menuLinkNode()).toHaveStyleRule("padding", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(menuLinkNode()).toHaveStyleRule("width", "10px");
  });

  it("shows background-color when passed a 'hoverable' prop", () => {
    wrapper.setProps({ hoverable: true });
    expect(menuLinkNode()).toHaveStyleRule("background-color", "#d8d8d8", {
      target: ":hover"
    });
  });
});
