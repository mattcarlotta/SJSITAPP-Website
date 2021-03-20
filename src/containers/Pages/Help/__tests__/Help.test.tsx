import { mount, ReactWrapper } from "enzyme";
import { HelpPage } from "../index";

const initProps = {
  role: "staff"
};

describe("Help Page", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<HelpPage {...initProps} />);
  });

  it("renders staff help without errors", () => {
    expect(wrapper.find("[data-testid='help-page']")).toExist();
  });

  it("renders employee help without errors", () => {
    wrapper.setProps({ role: "employee" });
    expect(wrapper.find("[data-testid='help-page']")).toExist();
  });
});
