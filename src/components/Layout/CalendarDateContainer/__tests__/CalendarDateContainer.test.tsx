import { mount, ReactWrapper } from "enzyme";
import CalendarDateContainer from "../index";

describe("CalendarDateContainer", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<CalendarDateContainer data-testid="date-container" />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially renders a 'height' props as 252px", () => {
    expect(wrapper).toHaveStyleRule("height", "252px");
  });

  it("sets height when passed a 'height' prop", () => {
    wrapper.setProps({ height: "10px" });
    expect(wrapper).toHaveStyleRule("height", "10px");
  });
});
