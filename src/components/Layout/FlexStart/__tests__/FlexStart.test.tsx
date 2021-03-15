import { mount, ReactWrapper } from "enzyme";
import FlexStart from "../index";

describe("FlexStart", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FlexStart />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(wrapper).toHaveStyleRule("padding", "10px");
  });
});
