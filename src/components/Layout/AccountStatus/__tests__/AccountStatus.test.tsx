import { mount } from "enzyme";
import AccountStatus from "../index";

const wrapper = mount(<AccountStatus status="active" />);

describe("Account Status", () => {
  it("renders a FaUser icon when status is active", () => {
    expect(wrapper.find("FaUser")).toExist();
  });

  it("renders a FaUserTimes icon when status is suspended", () => {
    wrapper.setProps({ status: "suspended" });
    expect(wrapper.find("FaUserTimes")).toExist();
  });
});
