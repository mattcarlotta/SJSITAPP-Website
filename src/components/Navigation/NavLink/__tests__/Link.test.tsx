import { mount, ReactWrapper } from "enzyme";
import Link from "../index";

const initProps = {
  children: "Test",
  style: {},
  dataTestId: "test",
  href: "/test"
};

describe("Styled Link", () => {
  let wrapper: ReactWrapper;
  let StyledLink: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Link {...initProps} />);
    StyledLink = wrapper.find("Link");
  });

  it("renders without errors", () => {
    expect(StyledLink.exists()).toBeTruthy();
  });

  it("initially displays as white with a light teal hover", () => {
    expect(StyledLink).toHaveStyleRule("color", "#fff");
    expect(StyledLink).toHaveStyleRule("color", "#62c0ce", {
      modifier: ":hover"
    });
    expect(StyledLink).toHaveStyleRule("color", "#62c0ce", {
      modifier: ":focus"
    });
  });

  it("displays as blue with a light blue hover when passed a 'blue' prop", () => {
    wrapper.setProps({ blue: true });
    StyledLink = wrapper.find("Link");

    expect(StyledLink).toHaveStyleRule("color", "#0075e0");
    expect(StyledLink).toHaveStyleRule("color", "#40a9ff", {
      modifier: ":hover"
    });
    expect(StyledLink).toHaveStyleRule("color", "#40a9ff", {
      modifier: ":focus"
    });
  });
});
