import { mount, ReactWrapper } from "enzyme";
import User from "../index";

const initProps = {
  isDragging: false,
  response: "No response."
};

describe("User", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<User {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially displays an unselected User", () => {
    expect(wrapper).toHaveStyleRule("background-color", "#BFBFBF");
    expect(wrapper).toHaveStyleRule("color", "#7c7c7c");
    expect(wrapper).toHaveStyleRule("box-shadow", "0 1px 0 rgba(9,30,66,.25)");
  });

  it("initially displays a 'I want to work.' User", () => {
    wrapper.setProps({ response: "I want to work." });

    expect(wrapper).toHaveStyleRule("background-color", "#247BA0");
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("initially displays a 'Available to work.' User", () => {
    wrapper.setProps({ response: "Available to work." });

    expect(wrapper).toHaveStyleRule("background-color", "#2A9D8F");
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("initially displays a 'Prefer not to work.' User", () => {
    wrapper.setProps({ response: "Prefer not to work." });

    expect(wrapper).toHaveStyleRule("background-color", "#F4A261");
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("initially displays a 'Not available to work.' User", () => {
    wrapper.setProps({ response: "Not available to work." });

    expect(wrapper).toHaveStyleRule("background-color", "#FF8060");
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("displays a selected User", () => {
    wrapper.setProps({ isDragging: true });

    expect(wrapper).toHaveStyleRule("background-color", "#03a9f3");
    expect(wrapper).toHaveStyleRule("color", "#fff");
    expect(wrapper).toHaveStyleRule(
      "box-shadow",
      "0px 10px 13px -7px #8433FF,5px 5px 5px -2px #8433FF"
    );
  });
});
