import { mount, ReactWrapper } from "enzyme";
import Avatar from "../index";

const initProps = {
  avatar: ""
};

describe("Avatar", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Avatar {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='avatar']")).toExist();
  });

  it("initially renders a placeholder icon", () => {
    expect(wrapper.find("BsPeopleCircle")).toExist();
  });

  it("initially renders a placeholder 30px width", () => {
    expect(wrapper.find("[data-testid='avatar']")).toHaveStyleRule(
      "width",
      "26px"
    );
  });

  it("initially renders a placeholder auto height", () => {
    expect(wrapper.find("[data-testid='avatar']")).toHaveStyleRule(
      "height",
      "auto"
    );
  });

  it("sets color according to 'primary' prop", () => {
    wrapper.setProps({ primary: true });
    expect(wrapper.find("[data-testid='avatar']")).toHaveStyleRule(
      "color",
      "#efefef"
    );
  });

  it("sets a width according to 'width' prop", () => {
    wrapper.setProps({ width: "100px" });
    expect(wrapper.find("[data-testid='avatar']")).toHaveStyleRule(
      "width",
      "100px"
    );
  });

  it("sets a height according to 'height' prop", () => {
    wrapper.setProps({ height: "100px" });
    expect(wrapper.find("[data-testid='avatar']")).toHaveStyleRule(
      "height",
      "100px"
    );
  });

  it("renders an image when an 'avatar' prop is present", () => {
    wrapper.setProps({ avatar: "1234.png" });
    expect(wrapper.find("img")).toExist();
  });
});
