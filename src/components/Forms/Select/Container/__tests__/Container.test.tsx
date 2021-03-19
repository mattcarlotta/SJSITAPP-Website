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

  it("sets height when passed a 'height' prop", () => {
    wrapper.setProps({ height: "10px" });
    expect(wrapper).toHaveStyleRule("height", "10px");
  });
});
