import { mount, ReactWrapper } from "enzyme";
import DisplayOption from "../index";

describe("DisplayOption Component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<DisplayOption />);
  });

  it("initially renders a default CSS properties", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("color", "#ccc");
    expect(wrapper).toHaveStyleRule("padding", "8px 8px 8px 14px");
  });

  it("sets color when passed a 'value' prop", () => {
    wrapper.setProps({ value: "hello" });
    expect(wrapper).toHaveStyleRule("color", "#282c34");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });

  it("sets padding when passed an 'icon' prop", () => {
    wrapper.setProps({ icon: "id" });
    expect(wrapper).toHaveStyleRule("padding", "8px 0 8px 48px");
  });

  it("sets justify-content when passed a 'justifyContent' prop", () => {
    wrapper.setProps({ justifyContent: "center" });
    expect(wrapper).toHaveStyleRule("justify-content", "center");
  });
});
