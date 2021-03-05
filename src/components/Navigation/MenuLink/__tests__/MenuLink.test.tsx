import { mount, ReactWrapper } from "enzyme";
import MenuLink from "../index";

const initProps = {
  children: "Test",
  dataTestId: "test-menulink",
  href: "/test"
};

describe("MenuLink", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<MenuLink {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("sets color when passed a 'primary' prop", () => {
    wrapper.setProps({ primary: true });
    expect(wrapper).toHaveStyleRule("color", "#efefef");
  });

  it("sets font-size when passed a 'fontSize' prop", () => {
    wrapper.setProps({ fontSize: "10px" });
    expect(wrapper).toHaveStyleRule("font-size", "10px");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });

  it("shows background-color when passed a 'hoverable' prop", () => {
    wrapper.setProps({ hoverable: true });
    expect(wrapper).toHaveStyleRule("background-color", "#d8d8d8", {
      target: ":hover"
    });
  });
});
