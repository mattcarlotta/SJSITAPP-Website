import { mount, ReactWrapper } from "enzyme";
import UserContainer from "../index";

const initProps = {
  isDraggingOver: false
};

describe("User Container", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<UserContainer {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("initially displays an unselected User", () => {
    expect(wrapper).toHaveStyleRule("background-color", "#ebecf0");
  });

  it("displays a selected User", () => {
    wrapper.setProps({ isDraggingOver: true });
    expect(wrapper).toHaveStyleRule("background-color", "#ffebe6");
  });
});
