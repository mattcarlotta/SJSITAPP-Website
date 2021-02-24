import { mount, ReactWrapper } from "enzyme";
import Section from "../index";

describe("Section", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Section />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets flex-direction when passed a 'direction' prop", () => {
    expect(wrapper).toHaveStyleRule("flex-direction", "row");

    wrapper.setProps({ direction: "column" });
    expect(wrapper).toHaveStyleRule("flex-direction", "column");
  });

  it("sets 'overflow-x: hidden' when passed a 'hideOverflowX' prop", () => {
    wrapper.setProps({ hideOverflowX: true });
    expect(wrapper).toHaveStyleRule("overflow-x", "hidden");
  });
});
