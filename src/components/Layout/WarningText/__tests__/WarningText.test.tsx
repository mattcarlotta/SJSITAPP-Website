import { mount, ReactWrapper } from "enzyme";
import WarningText from "../index";

const initProps = {
  children: "Hello"
};

describe("WarningText Component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<WarningText {...initProps} />);
  });

  it("initially renders a default CSS props", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("margin", "10px 0");
    expect(wrapper).toHaveStyleRule("padding", "10px");
    expect(wrapper).toHaveStyleRule("background", "#f56342");
    expect(wrapper).toHaveStyleRule("border-radius", "10px");
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });

  it("sets background when passed a 'background' prop", () => {
    wrapper.setProps({ background: "#fff" });
    expect(wrapper).toHaveStyleRule("background", "#fff");
  });

  it("sets border-radius when passed a 'borderRadius' prop", () => {
    wrapper.setProps({ borderRadius: "10px" });
    expect(wrapper).toHaveStyleRule("border-radius", "10px");
  });

  it("sets color when passed a 'color' prop", () => {
    wrapper.setProps({ color: "#fff" });
    expect(wrapper).toHaveStyleRule("color", "#fff");
  });
});
