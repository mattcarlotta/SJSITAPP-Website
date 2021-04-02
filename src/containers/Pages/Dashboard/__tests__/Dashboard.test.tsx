import { shallow } from "enzyme";
import { Dashboard } from "../index";

const initProps = {
  loggedinUserId: "88",
  role: "member"
};

const wrapper = shallow(<Dashboard {...initProps} />);

describe("Dashboard", () => {
  it("renders employee panels", () => {
    expect(wrapper.find("Events")).toExist();
    expect(wrapper.find("Forms")).toExist();
    expect(wrapper.find("Availability")).toExist();
  });

  it("renders staff panels", () => {
    wrapper.setProps({ role: "staff" });
    expect(wrapper.find("Events")).toExist();
    expect(wrapper.find("Forms")).toExist();
    expect(wrapper.find("EmployeeAvailability")).toExist();
  });
});
