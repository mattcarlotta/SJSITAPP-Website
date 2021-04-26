import { mount, ReactWrapper } from "enzyme";
import ScheduledEmployees from "../index";

const employees = [
  {
    _id: "88",
    firstName: "Test",
    lastName: "Test"
  },
  {
    _id: "88",
    firstName: "Test",
    lastName: "Test"
  }
];

const initProps = {
  employees
};

describe("Token Status", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ScheduledEmployees {...initProps} />);
  });

  it("if employees are present it displays length of 2", () => {
    expect(wrapper.text()).toEqual("2");
  });

  it("if employees are not present it displays length of 0", () => {
    wrapper.setProps({ employees: [] });
    expect(wrapper.text()).toEqual("0");
  });
});
