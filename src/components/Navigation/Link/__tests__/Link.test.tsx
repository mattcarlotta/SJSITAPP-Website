import { mount, ReactWrapper } from "enzyme";
import Link from "../index";

const initProps = {
  children: "Test",
  dataTestId: "test-link",
  href: "/test"
};

describe("Styled Link", () => {
  let wrapper: ReactWrapper;
  let linkNode: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Link {...initProps} />);
    linkNode = () => wrapper.find("[data-testid='test-link']");
  });

  it("renders without errors", () => {
    expect(linkNode()).toExist();
  });

  it("sets color to #025f6d when passed a 'primary' prop", () => {
    wrapper.setProps({ primary: true });
    expect(linkNode()).toHaveStyleRule("color", "#025f6d");
  });

  it("sets font-size when passed a 'fontSize' prop", () => {
    wrapper.setProps({ fontSize: "10px" });
    expect(linkNode()).toHaveStyleRule("font-size", "10px");
  });

  it("hides box-shadow when passed a 'hideShadow' prop", () => {
    wrapper.setProps({ hideShadow: true });
    expect(linkNode()).toHaveStyleRule("box-shadow", "none");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(linkNode()).toHaveStyleRule("padding", "10px");
  });

  it("sets border-radius when passed a 'borderRadius' prop", () => {
    wrapper.setProps({ borderRadius: "10px" });
    expect(linkNode()).toHaveStyleRule("border-radius", "10px");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(linkNode()).toHaveStyleRule("margin", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(linkNode()).toHaveStyleRule("width", "10px");
  });
});
