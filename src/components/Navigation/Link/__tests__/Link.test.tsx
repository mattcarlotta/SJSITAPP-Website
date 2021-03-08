import { mount, ReactWrapper } from "enzyme";
import Link from "../index";

const initProps = {
  children: "Test",
  dataTestId: "test-link",
  href: "/test"
};

describe("Styled Link", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Link {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("sets alt properties when passed an 'alt' prop", () => {
    wrapper.setProps({ alt: true });
    expect(wrapper).toHaveStyleRule("color", "#fff");
    expect(wrapper).toHaveStyleRule("background", "#025f6d");
    expect(wrapper).toHaveStyleRule("background", "#006d76", {
      target: ":hover"
    });
    expect(wrapper).toHaveStyleRule("box-shadow", "0px 0px 14px -2px #14d3e2", {
      target: ":hover"
    });
    expect(wrapper).toHaveStyleRule("border", "2px solid #006d76", {
      target: ":hover"
    });
  });

  it("sets color to #025f6d when passed a 'primary' prop", () => {
    wrapper.setProps({ primary: true });
    expect(wrapper).toHaveStyleRule("color", "#025f6d");
  });

  it("sets font-size when passed a 'fontSize' prop", () => {
    wrapper.setProps({ fontSize: "10px" });
    expect(wrapper).toHaveStyleRule("font-size", "10px");
  });

  it("hides box-shadow when passed a 'hideShadow' prop", () => {
    wrapper.setProps({ hideShadow: true });
    expect(wrapper).toHaveStyleRule("box-shadow", "none");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });

  it("sets border-radius when passed a 'borderRadius' prop", () => {
    wrapper.setProps({ borderRadius: "10px" });
    expect(wrapper).toHaveStyleRule("border-radius", "10px");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });
});
