import { mount, ReactWrapper } from "enzyme";
import Title from "../index";

describe("Title", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Title />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets 'text-align: center' when passed a 'centered' prop", () => {
    wrapper.setProps({ centered: true });
    expect(wrapper).toHaveStyleRule("text-align", "center");
  });
});
