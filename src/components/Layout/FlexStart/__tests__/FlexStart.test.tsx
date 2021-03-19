import { mount, ReactWrapper } from "enzyme";
import FlexStart from "../index";

describe("FlexStart", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FlexStart />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });

  it("sets a media rule when passed a 'breakpoint' prop", () => {
    wrapper.setProps({ breakpoint: "true" });
    expect(wrapper).toHaveStyleRule("width", "100%", {
      media: "(max-width: 800px)"
    });
  });
});
