import { mount } from "enzyme";
import Line from "../index";

const wrapper = mount(<Line />);

describe("Line", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially renders initial CSS props", () => {
    expect(wrapper).toHaveStyleRule("width", "100%");
  });

  it("sets width based upon 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });

  it("sets max-width based upon 'maxWidth' prop", () => {
    wrapper.setProps({ maxWidth: "10px" });
    expect(wrapper).toHaveStyleRule("max-width", "10px");
  });

  it("sets 'margin: 0 auto' based upon 'centered' prop", () => {
    wrapper.setProps({ centered: true });
    expect(wrapper).toHaveStyleRule("margin", "0 auto");
  });
});
