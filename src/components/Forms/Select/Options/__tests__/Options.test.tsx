import { mount, ReactWrapper } from "enzyme";
import Options from "../index";

const handleOptionSelect = jest.fn();

const initProps = {
  handleOptionSelect,
  isVisible: false,
  name: "test",
  selected: "",
  searchText: "",
  selectOptions: ["Ducks", "Kings"]
};

describe("Options", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Options {...initProps} />);
  });

  it("initally renders nothing when invisible", () => {
    expect(wrapper.find("DropContainer").exists()).toBeFalsy();
  });

  describe("When the options menu is visible", () => {
    beforeEach(() => {
      wrapper.setProps({ isVisible: true });
    });

    it("displays two options", () => {
      expect(wrapper.find("Option").first().find("div").text()).toContain(
        "Ducks"
      );
      expect(wrapper.find("Option").at(1).find("div").text()).toContain(
        "Kings"
      );
    });

    it("calls handleOptionSelect when clicked or when enter is pressed", () => {
      const option1 = wrapper.find("Option").first();
      const target = {
        dataset: {
          name: "test",
          value: "Ducks"
        }
      };

      option1.simulate("click", { target });
      option1.simulate("keypress", { key: "Enter", target });
      option1.simulate("keypress", { key: "Tab", target });

      expect(handleOptionSelect).toHaveBeenCalledTimes(2);
    });

    it("finds an option by searchText", () => {
      wrapper.setProps({ searchText: "Ducks" });

      expect(wrapper.find("Option")).toHaveLength(1);
    });

    it("filters the options by searchText", () => {
      wrapper.setProps({ searchText: "option3" });

      expect(wrapper.find("Option")).toHaveLength(0);
      expect(wrapper.find("NoOptions").exists()).toBeTruthy();
    });

    it("calls handleScroll when an option has been selected", () => {
      // @ts-ignore
      const spy = jest.spyOn(wrapper.instance(), "handleScroll");

      wrapper.setProps({ selected: "Ducks" });
      wrapper.setProps({ isVisible: false });

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    describe("Individual Option", () => {
      let optionNode: () => ReactWrapper;
      beforeEach(() => {
        optionNode = () => wrapper.find("Option").first().find("div");
      });

      it("initially renders a default option", () => {
        expect(optionNode()).toHaveStyleRule("color", "#282c34");
        expect(optionNode()).toHaveStyleRule("color", "#282c34", {
          target: ":hover"
        });
        expect(optionNode()).toHaveStyleRule("color", "#282c34", {
          target: ":focus"
        });
      });

      it("highlights the selected option", () => {
        wrapper.setProps({ value: "Ducks", selected: "Ducks" });

        expect(optionNode()).toHaveStyleRule("color", "#0f7ae5");
        expect(optionNode()).toHaveStyleRule("color", "#0f7ae5", {
          target: ":hover"
        });
        expect(optionNode()).toHaveStyleRule("color", "#0f7ae5", {
          target: ":focus"
        });
      });
    });
  });
});
