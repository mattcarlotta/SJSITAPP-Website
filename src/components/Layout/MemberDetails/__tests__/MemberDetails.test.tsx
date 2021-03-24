import { mount, ReactWrapper } from "enzyme";
import moment from "~utils/momentWithTimezone";
import MemberDetails from "../index";

const initProps = {
  editRole: false,
  registered: moment().format(),
  role: "employee",
  status: "active"
};

describe("Member Details", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<MemberDetails {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='member-details']")).toExist();
  });

  it("renders a suspended user", () => {
    wrapper.setProps({ status: "suspended" });
    expect(wrapper.find("[data-testid='member-status']").text()).toContain(
      "suspended"
    );
  });

  it("hides the user role when it's being edited", () => {
    wrapper.setProps({ editRole: true });
    expect(wrapper.find("[data-testid='member-role']")).not.toExist();
  });
});
