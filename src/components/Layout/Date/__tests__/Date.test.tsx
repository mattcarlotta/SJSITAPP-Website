import { mount, ReactWrapper } from "enzyme";
import Date from "../index";

describe("Date", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Date />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially renders CSS properties", () => {
    expect(wrapper).toHaveStyleRule(
      "animation",
      "fade-in 1s 0s ease-in-out forwards"
    );
  });

  it("sets animation timing when a 'fadeIn' prop is passed", () => {
    wrapper.setProps({ fadeIn: "500ms" });
    expect(wrapper).toHaveStyleRule(
      "animation",
      "fade-in 500ms 0s ease-in-out forwards"
    );
  });

  it("sets border-color and background when passed a 'today' prop", () => {
    wrapper.setProps({ today: true });
    expect(wrapper).toHaveStyleRule("border-color", "#1890ff");
    expect(wrapper).toHaveStyleRule("background", "#e6f7ff");
  });
});
