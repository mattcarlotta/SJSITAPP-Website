import { mount } from "enzyme";
import ListItem from "../index";

const wrapper = mount(<ListItem data-testid="loading" />);

describe("ListItem", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially renders initial CSS props", () => {
    expect(wrapper).toHaveStyleRule("display", "block");
    expect(wrapper).toHaveStyleRule("color", "#010404");
    expect(wrapper).toHaveStyleRule("background", "transparent");
    expect(wrapper).toHaveStyleRule("margin", "10px 0");
    expect(wrapper).toHaveStyleRule("padding", "0 10px");
  });

  it("sets a media rule when passed a 'breakpoint' prop", () => {
    wrapper.setProps({ breakpoint: "true" });
    expect(wrapper).toHaveStyleRule("padding", "0px", {
      media: "(max-width: 500px)"
    });
    expect(wrapper).toHaveStyleRule("margin", "5px 0", {
      media: "(max-width: 500px)"
    });
  });

  it("sets display based upon 'display' prop", () => {
    wrapper.setProps({ display: "flex" });
    expect(wrapper).toHaveStyleRule("display", "flex");
  });

  it("sets color based upon 'color' prop", () => {
    wrapper.setProps({ color: "#000" });
    expect(wrapper).toHaveStyleRule("color", "#000");
  });

  it("sets background based upon 'team' prop", () => {
    wrapper.setProps({ team: "San Jose Sharks" });
    expect(wrapper).toHaveStyleRule("background", "#006d76");

    wrapper.setProps({ team: "San Jose Barracuda" });
    expect(wrapper).toHaveStyleRule("background", "#ef512d");
  });

  it("sets margin based upon 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });

  it("sets text-align based upon 'textAlign' prop", () => {
    wrapper.setProps({ textAlign: "center" });
    expect(wrapper).toHaveStyleRule("text-align", "center");
  });

  it("sets padding based upon 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });
});
