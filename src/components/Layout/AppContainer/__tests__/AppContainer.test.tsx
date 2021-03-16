import { mount, ReactWrapper } from "enzyme";
import AppContainer from "../index";

describe("AppContainer", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<AppContainer />);
  });

  it("renders the dropdown", () => {
    expect(wrapper).toExist();
  });

  it("sets flex-direction when passed a 'direction' prop", () => {
    expect(wrapper).toHaveStyleRule("flex-direction", "row");

    wrapper.setProps({ direction: "column" });
    expect(wrapper).toHaveStyleRule("flex-direction", "column");
  });
});
