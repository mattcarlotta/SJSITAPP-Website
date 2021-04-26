import { mount, ReactWrapper } from "enzyme";
import Column from "../index";

describe("Column", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Column />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(wrapper).toHaveStyleRule("width", "10px");
  });
});
