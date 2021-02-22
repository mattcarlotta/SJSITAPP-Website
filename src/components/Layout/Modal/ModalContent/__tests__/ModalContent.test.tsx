import { mount, ReactWrapper } from "enzyme";
import ModalContent from "../index";

describe("ModalContent Component", () => {
  let wrapper: ReactWrapper;
  let findModalContent: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ModalContent />);
    findModalContent = () => wrapper.find("ModalContent");
  });

  it("initially renders a default menu button", () => {
    const StyledBtnCtnr = findModalContent();
    expect(StyledBtnCtnr.exists()).toBeTruthy();
    expect(StyledBtnCtnr).toHaveStyleRule("max-width", "500px");
    expect(StyledBtnCtnr).toHaveStyleRule("background-color", "#fff");
  });

  it("adds a max-width rule when passed a 'maxWidth' prop", () => {
    wrapper.setProps({ maxWidth: "10px" });
    expect(findModalContent()).toHaveStyleRule("max-width", "10px");
  });

  it("adds a background-color rule when passed a 'background' prop", () => {
    wrapper.setProps({ background: "#d8d8d8" });
    expect(findModalContent()).toHaveStyleRule("background-color", "#d8d8d8");
  });
});
