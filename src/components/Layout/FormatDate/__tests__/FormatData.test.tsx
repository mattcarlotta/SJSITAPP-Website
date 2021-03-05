import { mount } from "enzyme";
import moment from "~utils/momentWithTimezone";
import FormatDate from "../index";

const initProps = {
  date: "2000-10-06T07:00:00.000+00:00",
  format: "MMM Do @ h:mm a"
};

const wrapper = mount(<FormatDate {...initProps} />);

describe("Display Date", () => {
  it("renders a date with format", () => {
    expect(wrapper.find("div").text()).toEqual("Oct 6th @ 12:00 am");
  });

  it("renders a current date if missing a 'date' prop", () => {
    wrapper.setProps({ date: "" });
    const currentDate = moment(Date.now()).format("MMM Do @ h:mm a");
    expect(wrapper.find("div").text()).toEqual(currentDate);
  });
});
