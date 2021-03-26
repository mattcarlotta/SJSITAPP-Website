import { mount, ReactWrapper } from "enzyme";
import Icon from "../index";

const initProps = {
  type: ""
};

const wrapper: ReactWrapper = mount(
  <Icon dataTestId="test-icon" {...initProps} />
);

describe("Icon", () => {
  it("renders without errors", () => {
    expect(wrapper.find("Icon")).toExist();
  });

  it("initially displays a bug if missing a type", () => {
    expect(wrapper.find("FaBug")).toExist();
  });

  it("displays a Font Awesome icon by a string type", () => {
    wrapper.setProps({ type: "calander" });
    expect(wrapper.find("FaCalendarAlt")).toExist();

    wrapper.setProps({ type: "erase" });
    expect(wrapper.find("FaTimesCircle")).toExist();

    wrapper.setProps({ type: "id" });
    expect(wrapper.find("FaIdCard")).toExist();

    wrapper.setProps({ type: "key" });
    expect(wrapper.find("FaKey")).toExist();

    wrapper.setProps({ type: "location" });
    expect(wrapper.find("FaStreetView")).toExist();

    wrapper.setProps({ type: "lock" });
    expect(wrapper.find("FaLock")).toExist();

    wrapper.setProps({ type: "mail" });
    expect(wrapper.find("FaEnvelope")).toExist();

    wrapper.setProps({ type: "note" });
    expect(wrapper.find("FaStickyNote")).toExist();

    wrapper.setProps({ type: "person" });
    expect(wrapper.find("MdPersonPin")).toExist();

    wrapper.setProps({ type: "puck" });
    expect(wrapper.find("FaHockeyPuck")).toExist();

    wrapper.setProps({ type: "remove" });
    expect(wrapper.find("FaMinusCircle")).toExist();

    wrapper.setProps({ type: "search" });
    expect(wrapper.find("FaSearch")).toExist();

    wrapper.setProps({ type: "tshirt" });
    expect(wrapper.find("FaTshirt")).toExist();

    wrapper.setProps({ type: "user" });
    expect(wrapper.find("FaUserCircle")).toExist();

    wrapper.setProps({ type: "usertag" });
    expect(wrapper.find("FaIdBadge")).toExist();
  });
});
