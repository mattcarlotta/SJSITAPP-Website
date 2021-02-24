import { mount, ReactWrapper } from "enzyme";
import Divider from "../index";

describe("Divider", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Divider />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets margin when passed a 'margin' prop", () => {
    expect(wrapper).toHaveStyleRule("margin", "0px");

    wrapper.setProps({ margin: "10px" });
    expect(wrapper).toHaveStyleRule("margin", "10px");
  });
});
