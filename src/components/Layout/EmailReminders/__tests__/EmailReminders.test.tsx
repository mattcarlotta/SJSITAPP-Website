import { mount } from "enzyme";
import EmailReminders from "../index";

const initProps = {
  status: false
};

const wrapper = mount(<EmailReminders {...initProps} />);
describe("Email Status", () => {
  it("displays an unsent email status", async () => {
    expect(wrapper.find("FaStopwatch")).toExist();
  });

  it("displays a sent email status", async () => {
    wrapper.setProps({ status: true });

    expect(wrapper.find("FaShareSquare")).toExist();
  });
});
