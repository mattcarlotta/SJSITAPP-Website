import { mount, ReactWrapper } from "enzyme";
import Flex from "../index";

describe("Flex", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Flex data-testid="flex" />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("flex-direction", "row");
    expect(wrapper).toHaveStyleRule("flex-wrap", "nowrap");
    expect(wrapper).toHaveStyleRule("justify-content", "start");
  });

  it("sets 'flex-direction' to a 'column' when passed a 'direction' prop", () => {
    wrapper.setProps({ direction: "column" });
    expect(wrapper).toHaveStyleRule("flex-direction", "column");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });

  it("sets align-items when passed a 'align' prop", () => {
    wrapper.setProps({ align: "center" });
    expect(wrapper).toHaveStyleRule("align-items", "center");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });

  it("sets color when passed a 'color' prop", () => {
    wrapper.setProps({ color: "#fff" });
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("sets background when passed a 'background' prop", () => {
    wrapper.setProps({ background: "#fff" });
    expect(wrapper).toHaveStyleRule("background", "#fff");
  });

  it("sets flex-wrap as a 'wrap' when passed a 'wrap' prop", () => {
    wrapper.setProps({ flexwrap: "true" });
    expect(wrapper).toHaveStyleRule("flex-wrap", "wrap");
  });

  it("sets justify-content when passed a 'justify' prop", () => {
    wrapper.setProps({ justify: "center" });
    expect(wrapper).toHaveStyleRule("justify-content", "center");
  });
});
