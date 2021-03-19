import { mount, ReactWrapper } from "enzyme";
import FlexMiddle from "../index";

describe("FlexMiddle", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FlexMiddle />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });
});
