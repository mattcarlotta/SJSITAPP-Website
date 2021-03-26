import { mount, ReactWrapper } from "enzyme";
import Word from "../index";

describe("Word Component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Word />);
  });

  it("initially renders a default margin", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("margin-top", "0px");
    expect(wrapper).toHaveStyleRule("margin-right", "0px");
    expect(wrapper).toHaveStyleRule("margin-bottom", "0px");
    expect(wrapper).toHaveStyleRule("margin-left", "0px");
  });

  it("sets a media rule when passed a 'breakpoint' prop", () => {
    wrapper.setProps({ breakpoint: "true" });
    expect(wrapper).toHaveStyleRule("display", "block", {
      media: "(max-width: 500px)"
    });
  });

  it("sets margin-top when passed a 'top' prop", () => {
    wrapper.setProps({ top: "10px" });
    expect(wrapper).toHaveStyleRule("margin-top", "10px");
  });

  it("sets margin-right when passed a 'right' prop", () => {
    wrapper.setProps({ right: "10px" });
    expect(wrapper).toHaveStyleRule("margin-right", "10px");
  });

  it("sets margin-bottom when passed a 'bottom' prop", () => {
    wrapper.setProps({ bottom: "10px" });
    expect(wrapper).toHaveStyleRule("margin-bottom", "10px");
  });

  it("sets margin-left when passed a 'left' prop", () => {
    wrapper.setProps({ left: "10px" });
    expect(wrapper).toHaveStyleRule("margin-left", "10px");
  });
});
