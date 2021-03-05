import { mount } from "enzyme";
import { Dashboard } from "../index";

const initProps = {
  loggedinUserId: "88"
};

const wrapper = mount(<Dashboard {...initProps} />);

describe("Dashboard", () => {
  it("renders without errors", () => {
    expect(wrapper.find("Dashboard")).toExist();
  });
});
