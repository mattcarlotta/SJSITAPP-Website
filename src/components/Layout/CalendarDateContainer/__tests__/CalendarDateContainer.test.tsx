import { mount, ReactWrapper } from "enzyme";
import CalendarDateContainer from "../index";

describe("CalendarDateContainer", () => {
  let wrapper: ReactWrapper;
  let node: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<CalendarDateContainer data-testid="date-container" />);
    node = () => wrapper.find("[data-testid='date-container']");
  });

  it("renders without errors", () => {
    expect(node()).toExist();
  });

  it("initially renders a 'height' props as 252px", () => {
    expect(node()).toHaveStyleRule("height", "252px");
  });

  it("sets height when passed a 'height' prop", () => {
    wrapper.setProps({ height: "10px" });
    expect(node()).toHaveStyleRule("height", "10px");
  });
});
