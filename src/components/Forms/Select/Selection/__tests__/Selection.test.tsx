import { mount, ReactWrapper } from "enzyme";
import Selection from "../index";

const handleSelectClick = jest.fn();
const handleSearchClear = jest.fn();
const handleInputChange = jest.fn();

const initProps = {
  disabled: false,
  errors: "",
  handleInputChange,
  handleSearchClear,
  handleSelectClick,
  icon: "",
  isVisible: false,
  isSearchable: false,
  name: "test",
  searchText: "",
  value: "",
  placeholder: "Select an option...",
  width: "100%"
};

describe("Select - Selection", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Selection {...initProps} />);
  });

  afterEach(() => {
    handleSelectClick.mockClear();
  });

  it("renders without errors", () => {
    expect(wrapper.find("SelectionContainer")).toExist();
  });

  it("doesn't display an icon if a 'hideIcon' prop is true", () => {
    wrapper.setProps({ hideIcon: true });
    expect(wrapper.find("[data-testid='search-icon']")).not.toExist();
  });

  it("calls handleSelectClick when [data-testid='select-text'] is clicked", () => {
    wrapper.find("[data-testid='select-text']").simulate("click");
    expect(handleSelectClick).toHaveBeenCalledTimes(1);
  });

  it("if disabled doesn't call handleSelectClick", () => {
    wrapper.setProps({ disabled: true });
    wrapper.find("[data-testid='select-text']").simulate("click");
    expect(handleSelectClick).toHaveBeenCalledTimes(0);
  });

  it("renders an Icon based upon an 'icon' prop", () => {
    expect(wrapper.find("Icon")).not.toExist();

    wrapper.setProps({ icon: "id" });

    expect(wrapper.find("Icon")).toExist();
  });

  describe("Display Option", () => {
    let displayOptionBtn: () => ReactWrapper;
    beforeEach(() => {
      displayOptionBtn = () => wrapper.find("DisplayOption");
    });

    it("initially contains default padding and color", () => {
      expect(displayOptionBtn()).toHaveStyleRule("padding", "8px 8px 8px 14px");
      expect(displayOptionBtn()).toHaveStyleRule("color", "#ccc");
    });

    it("changes padding when an icon is present", () => {
      wrapper.setProps({ icon: "id" });
      expect(displayOptionBtn()).toHaveStyleRule("padding", "8px 0 8px 48px");
    });

    it("initially displays a placeholder", () => {
      expect(displayOptionBtn().text()).toContain(initProps.placeholder);
    });

    it("changes color and displays a value once an option has been selected", () => {
      const value = "Test";
      wrapper.setProps({ value });

      expect(displayOptionBtn().text()).toContain(value);
      expect(displayOptionBtn()).toHaveStyleRule("color", "#282c34");
    });
  });

  describe("Chevron Icon", () => {
    let chevronIcon: () => ReactWrapper;
    beforeEach(() => {
      chevronIcon = () => wrapper.find("[data-testid='chevron-icon']");
    });

    it("initially points up when options are hidden", () => {
      expect(chevronIcon()).toHaveStyleRule("transform", "rotate(90deg)", {
        target: "svg"
      });
    });

    it("points down when option are shown", () => {
      wrapper.setProps({ isVisible: true });
      expect(chevronIcon()).toHaveStyleRule("transform", "rotate(270deg)", {
        target: "svg"
      });
    });
  });

  describe("Icon Swapping", () => {
    it("it initally renders a Chevron icon", () => {
      expect(wrapper.find("[data-testid='chevron-icon']")).toExist();
    });

    it("renders a FaSearch icon if 'isSearchable' is true and no value nor searchText is present", () => {
      wrapper.setProps({ isSearchable: true });

      expect(wrapper.find("FaSearch")).toExist();
    });

    it("renders a FaTimesCircle icon if 'isSearchable' is true and a value or searchText is present", () => {
      wrapper.setProps({ isSearchable: true, searchText: "Test" });

      expect(wrapper.find("FaTimesCircle")).toExist();
    });

    it("clicking on the FaTimesCircle calls handleSearchClear", () => {
      wrapper.setProps({ isSearchable: true, searchText: "Test" });

      wrapper.find("[data-testid='clear-selection']").simulate("click");

      expect(handleSearchClear).toHaveBeenCalledWith({
        target: {
          name: "test",
          value: ""
        }
      });
    });
  });
});
