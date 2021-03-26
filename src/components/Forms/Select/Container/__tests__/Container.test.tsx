import { mount, ReactWrapper } from "enzyme";
import Container from "../index";

describe("Select Container", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Container />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("sets display when passed a 'display' prop", () => {
    wrapper.setProps({ display: "block" });
    expect(wrapper).toHaveStyleRule("display", "block");
  });

  it("sets height when passed a 'height' prop", () => {
    wrapper.setProps({ height: "10px" });
    expect(wrapper).toHaveStyleRule("height", "10px");
  });

  it("sets max-width when passed a 'maxWidth' prop", () => {
    wrapper.setProps({ maxWidth: "10px" });
    expect(wrapper).toHaveStyleRule("max-width", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });
});
