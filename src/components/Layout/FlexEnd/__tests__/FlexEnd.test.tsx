import { mount, ReactWrapper } from "enzyme";
import FlexEnd from "../index";

describe("FlexEnd", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FlexEnd />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });
});
