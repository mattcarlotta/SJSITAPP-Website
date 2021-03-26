import { mount, ReactWrapper } from "enzyme";
import Badge from "../index";

const initProps = {
  response: "",
  children: "Hello"
};

describe("Badge", () => {
  let wrapper: ReactWrapper;
  let icon: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Badge {...initProps} />);
    icon = () => wrapper.find("FaCircle");
  });

  it("renders without errors", () => {
    expect(wrapper.find("div")).toExist();
  });

  it("initially renders a transparent color", () => {
    expect(icon()).toHaveStyle("color", "transparent");
  });

  it("renders 'Scheduled Games' response color", () => {
    wrapper.setProps({ response: "Scheduled Games" });
    expect(icon()).toHaveStyle("color", "#247BA0");
  });

  it("renders 'I want to work.' response color", () => {
    wrapper.setProps({ response: "I want to work." });
    expect(icon()).toHaveStyle("color", "#247BA0");
  });

  it("renders 'Available Games' response color", () => {
    wrapper.setProps({ response: "Available Games" });
    expect(icon()).toHaveStyle("color", "#2A9D8F");
  });

  it("renders 'Available to work.' response color", () => {
    wrapper.setProps({ response: "Available to work." });
    expect(icon()).toHaveStyle("color", "#2A9D8F");
  });

  it("renders 'Prefer not to work.' response color", () => {
    wrapper.setProps({ response: "Prefer not to work." });
    expect(icon()).toHaveStyle("color", "#F4A261");
  });

  it("renders 'Not available to work.' response color", () => {
    wrapper.setProps({ response: "Not available to work." });
    expect(icon()).toHaveStyle("color", "#FF8060");
  });

  it("renders 'No response.' response color", () => {
    wrapper.setProps({ response: "No response." });
    expect(icon()).toHaveStyle("color", "#BFBFBF");
  });

  it("renders 'Scheduled.' response color", () => {
    wrapper.setProps({ response: "Scheduled." });
    expect(icon()).toHaveStyle("color", "limegreen");
  });
});
