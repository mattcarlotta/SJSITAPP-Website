import { mount } from "enzyme";
import { Schedule } from "../index";

const initProps = {
  loggedinUserId: "88",
  role: "member"
};

const wrapper = mount(<Schedule {...initProps} />);

describe("Schedule", () => {
  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='schedule']")).toExist();
  });
});
