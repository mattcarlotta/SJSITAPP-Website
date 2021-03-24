import { mount, ReactWrapper } from "enzyme";
import FlexCenter from "../index";

describe("FlexCenter", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FlexCenter />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets a media rule when passed a 'breakpoint' prop", () => {
    wrapper.setProps({ breakpoint: "true" });
    expect(wrapper).toHaveStyleRule("flex-direction", "column", {
      media: "(max-width: 900px)"
    });
  });

  it("sets flex-direction when passed a 'direction' prop", () => {
    expect(wrapper).toHaveStyleRule("flex-direction", "row");

    wrapper.setProps({ direction: "column" });
    expect(wrapper).toHaveStyleRule("flex-direction", "column");
  });

  it("sets color when passed a 'color' prop", () => {
    wrapper.setProps({ color: "#fff" });
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("sets height when passed a 'height' prop", () => {
    wrapper.setProps({ height: "10px" });
    expect(wrapper).toHaveStyleRule("height", "10px");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });

  it("sets justify-content when passed a 'justify' prop", () => {
    wrapper.setProps({ justify: "center" });
    expect(wrapper).toHaveStyleRule("justify-content", "center");
  });
});
