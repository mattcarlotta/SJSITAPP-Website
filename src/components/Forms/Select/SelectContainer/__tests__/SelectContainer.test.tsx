import { mount, ReactWrapper } from "enzyme";
import SelectContainer from "../index";

describe("Selection Container", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SelectContainer />);
  });

  it("initially renders a default container", () => {
    expect(wrapper).toHaveStyleRule("cursor", "pointer");
    expect(wrapper).toHaveStyleRule("border", "1px solid #ccc");
    expect(wrapper).toHaveStyleRule("background", "#fff");

    expect(wrapper).toHaveStyleRule("color", "#d3dce6", { target: "svg" });
    expect(wrapper).toHaveStyleRule("border", "1px solid #bfbebe", {
      target: ":hover"
    });
    expect(wrapper).toHaveStyleRule("border", "1px solid #1e90ff", {
      target: ":focus"
    });
  });

  it("sets the background when a 'background' prop is passed", () => {
    wrapper.setProps({ background: "pink" });

    expect(wrapper).toHaveStyleRule("background", "pink");
  });

  it("renders disabled attributes when a 'disabled' prop is passed", () => {
    wrapper.setProps({ disabled: true });

    expect(wrapper).toHaveStyleRule("cursor", "not-allowed");
    expect(wrapper).toHaveStyleRule("background", "#ebebeb");

    expect(wrapper).toHaveStyleRule("color", "#ebebeb", { target: "svg" });
    expect(wrapper).toHaveStyleRule("border", "1px solid #e5e5e5", {
      target: ":hover"
    });
    expect(wrapper).toHaveStyleRule("border", "1px solid #e5e5e5", {
      target: ":focus"
    });
  });

  it("renders hoverable attributes when a 'hoverable' prop is passed", () => {
    wrapper.setProps({ hoverable: true, isVisible: true });

    expect(wrapper).toHaveStyleRule("background", "#fff");
    expect(wrapper).toHaveStyleRule("box-shadow", "0px 0px 14px -2px #a1cdf9");
    expect(wrapper).toHaveStyleRule("border-color", "#1e90ff");

    expect(wrapper).toHaveStyleRule("background", "#fff", { target: ":hover" });
    expect(wrapper).toHaveStyleRule("box-shadow", "0px 0px 14px -2px #a1cdf9", {
      target: ":hover"
    });
    expect(wrapper).toHaveStyleRule("border-color", "#1e90ff", {
      target: ":hover"
    });
  });

  it("renders a focused container when visible", () => {
    wrapper.setProps({ isVisible: true });

    expect(wrapper).toHaveStyleRule("border", "1px solid #1e90ff");
    expect(wrapper).toHaveStyleRule("background", "#fff");

    expect(wrapper).toHaveStyleRule("color", "#1e90ff", { target: "svg" });
    expect(wrapper).toHaveStyleRule("border", "1px solid #1e90ff", {
      target: ":hover"
    });
  });

  it("renders an error container when there are errors", () => {
    wrapper.setProps({ errors: "Required." });

    expect(wrapper).toHaveStyleRule("border", "1px solid #d14023!important");
    expect(wrapper).toHaveStyleRule("color", "#d14023", { target: "svg" });
  });
});
