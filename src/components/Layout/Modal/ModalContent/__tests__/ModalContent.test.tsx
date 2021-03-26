import { mount, ReactWrapper } from "enzyme";
import ModalContent from "../index";

describe("ModalContent Component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ModalContent />);
  });

  it("initially renders a default menu button", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("max-width", "500px");
    expect(wrapper).toHaveStyleRule("background-color", "#fff");
  });

  it("adds a max-width rule when passed a 'maxWidth' prop", () => {
    wrapper.setProps({ maxWidth: "10px" });
    expect(wrapper).toHaveStyleRule("max-width", "10px");
  });

  it("adds a background-color rule when passed a 'background' prop", () => {
    wrapper.setProps({ background: "#d8d8d8" });
    expect(wrapper).toHaveStyleRule("background-color", "#d8d8d8");
  });
});
