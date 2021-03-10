import { mount, ReactWrapper } from "enzyme";
import NavLink from "../index";

const initProps = {
  children: "Test",
  style: {},
  dataTestId: "test-navlink",
  href: "/test"
};

describe("Styled NavLink", () => {
  let wrapper: ReactWrapper;
  let navLinkNode: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<NavLink {...initProps} />);
    navLinkNode = () => wrapper.find("[data-testid='test-navlink']");
  });

  it("renders without errors", () => {
    expect(navLinkNode()).toExist();
  });

  it("hides text-decoration when passed a 'nounderline' prop", () => {
    wrapper.setProps({ nounderline: true });
    expect(navLinkNode()).toHaveStyleRule("text-decoration", "none", {
      target: ":hover"
    });
  });

  it("initially displays as white with a light teal hover", () => {
    expect(navLinkNode()).toHaveStyleRule("color", "#fff");
    expect(navLinkNode()).toHaveStyleRule("color", "#d2d2d2", {
      target: ":hover"
    });
    expect(navLinkNode()).toHaveStyleRule("color", "#fff", {
      target: ":focus"
    });
  });

  it("displays as blue with a light blue hover when passed a 'blue' prop", () => {
    wrapper.setProps({ blue: true });

    expect(navLinkNode()).toHaveStyleRule("color", "#0075e0");
    expect(navLinkNode()).toHaveStyleRule("color", "#40a9ff", {
      target: ":hover"
    });
    expect(navLinkNode()).toHaveStyleRule("color", "#40a9ff", {
      target: ":focus"
    });
  });

  it("displays as green with a green hover when passed a 'green' prop", () => {
    wrapper.setProps({ green: true });

    expect(navLinkNode()).toHaveStyleRule("color", "#025f6d");
    expect(navLinkNode()).toHaveStyleRule("color", "#025f6d", {
      target: ":hover"
    });
    expect(navLinkNode()).toHaveStyleRule("color", "#025f6d", {
      target: ":focus"
    });
  });
});
