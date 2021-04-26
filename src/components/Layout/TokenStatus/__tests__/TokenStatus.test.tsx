import { mount, ReactWrapper } from "enzyme";
import TokenStatus from "../index";

const initProps = {
  email: "member@example.com"
};

describe("Token Status", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<TokenStatus {...initProps} />);
  });

  it("if email is present, it displays a FaUserCheck icon", () => {
    expect(wrapper.find("FaUserCheck")).toExist();
  });

  it("if email is missing, it displays a FaUserClock icon", () => {
    wrapper.setProps({ email: "" });

    expect(wrapper.find("FaUserClock")).toExist();
  });
});
