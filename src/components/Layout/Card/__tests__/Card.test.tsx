import { mount, ReactWrapper } from "enzyme";
import Card from "../index";

const initProps = {
  children: "Test Body",
  dataTestId: "test-card",
  title: "Test Title"
};

describe("Card", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Card {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='test-card']")).toExist();
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(wrapper.find("[data-testid='test-card']")).toHaveStyleRule(
      "margin",
      "10px"
    );
  });

  describe("Card Head", () => {
    it("displays just the title", () => {
      expect(
        wrapper.find("[data-testid='card-head-title']").first().text()
      ).toEqual("Test Title");
    });

    it("displays the title with an icon when passed an 'icon' prop", () => {
      wrapper.setProps({ icon: "icon" });
      expect(
        wrapper.find("[data-testid='card-head-title']").first().text()
      ).toEqual("iconTest Title");
    });
  });

  describe("Card Body", () => {
    it("displays the children", () => {
      expect(wrapper.find("[data-testid='card-body']").first().text()).toEqual(
        "Test Body"
      );
    });

    it("sets the padding when passed a 'padding' prop", () => {
      wrapper.setProps({ padding: "10px" });
      expect(wrapper.find("[data-testid='card-body']").first()).toHaveStyleRule(
        "padding",
        "10px"
      );
    });
  });
});
