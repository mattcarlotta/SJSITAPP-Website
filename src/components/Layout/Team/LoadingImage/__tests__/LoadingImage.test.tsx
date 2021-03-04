import { mount } from "enzyme";
import LoadingImage from "../index";

const wrapper = mount(<LoadingImage data-testid="loading" />);

describe("LoadingImage", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially renders initial CSS props", () => {
    expect(wrapper).toHaveStyleRule("height", "50px");
    expect(wrapper).toHaveStyleRule("width", "50px");
    expect(wrapper).toHaveStyleRule("background-color", "#eee");
    expect(wrapper).toHaveStyleRule("opacity", "0.25");

    expect(wrapper).toHaveStyleRule("height", "100px", { target: ":before" });
    expect(wrapper).toHaveStyleRule("width", "6.25px", { target: ":before" });
    expect(wrapper).toHaveStyleRule(
      "animation",
      "wave 2.5s infinite ease-in-out",
      {
        target: ":before"
      }
    );

    expect(wrapper).toHaveStyleRule("height", "50px", { target: "img" });
    expect(wrapper).toHaveStyleRule("width", "50px", { target: "img" });
  });

  it("sets height and width based upon 'size' prop", () => {
    wrapper.setProps({ size: 100 });
    expect(wrapper).toHaveStyleRule("height", "100px");
    expect(wrapper).toHaveStyleRule("width", "100px");
    expect(wrapper).toHaveStyleRule("height", "200px", { target: ":before" });
    expect(wrapper).toHaveStyleRule("width", "12.5px", { target: ":before" });
    expect(wrapper).toHaveStyleRule("height", "100px", { target: "img" });
    expect(wrapper).toHaveStyleRule("width", "100px", { target: "img" });
  });

  it("sets background based upon 'bgColor' prop", () => {
    wrapper.setProps({ bgColor: "#000" });
    expect(wrapper).toHaveStyleRule("background-color", "#000");
  });

  it("sets opacity based upon 'opacity' prop", () => {
    wrapper.setProps({ opacity: 1 });
    expect(wrapper).toHaveStyleRule("opacity", "1");
  });

  it("sets animation duration based upon 'duration' prop", () => {
    wrapper.setProps({ duration: "1s" });
    expect(wrapper).toHaveStyleRule(
      "animation",
      "wave 1s infinite ease-in-out",
      {
        target: ":before"
      }
    );
  });

  it("adds display none when duration is '0s'", () => {
    wrapper.setProps({ duration: "0s" });
    expect(wrapper).toHaveStyleRule("display", "none", {
      target: ":before"
    });
  });
});
