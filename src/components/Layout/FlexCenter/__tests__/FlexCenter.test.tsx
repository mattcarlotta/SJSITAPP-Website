import { mount, ReactWrapper } from "enzyme";
import FlexCenter from "../index";

describe("FlexCenter", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<FlexCenter />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets flex-direction when passed a 'direction' prop", () => {
    expect(wrapper).toHaveStyleRule("flex-direction", "row");

    wrapper.setProps({ direction: "column" });
    expect(wrapper).toHaveStyleRule("flex-direction", "column");
  });

  it("sets justify-content when passed a 'justify' prop", () => {
    wrapper.setProps({ justify: "center" });
    expect(wrapper).toHaveStyleRule("justify-content", "center");
  });
});
