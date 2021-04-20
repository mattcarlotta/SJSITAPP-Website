import { mount } from "enzyme";
import OptionsContainer from "../index";

const wrapper = mount(<OptionsContainer />);
describe("Options Container", () => {
  it("hides the scrollbar", () => {
    wrapper.setProps({ hideScrollbar: true });
    expect(wrapper).toHaveStyleRule("-ms-overflow-style", "none");
    expect(wrapper).toHaveStyleRule("scrollbar-width", "none");
    expect(wrapper).toHaveStyleRule("display", "none", {
      target: "::-webkit-scrollbar"
    });
  });
});
