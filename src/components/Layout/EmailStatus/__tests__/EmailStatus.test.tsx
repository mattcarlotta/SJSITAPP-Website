import { mount } from "enzyme";
import EmailStatus from "../index";

const initProps = {
  status: "sent"
};

const wrapper = mount(<EmailStatus {...initProps} />);
describe("Email Status", () => {
  it("displays an sent email status", async () => {
    expect(wrapper.find("FaShareSquare")).toExist();
  });

  it("displays an unsent email status", async () => {
    wrapper.setProps({ status: "unsent" });
    expect(wrapper.find("FaStopwatch")).toExist();
  });

  it("displays an unsent email status", async () => {
    wrapper.setProps({ status: "" });
    expect(wrapper.find("FaTimes")).toExist();
  });
});
