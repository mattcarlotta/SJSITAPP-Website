import { mount, ReactWrapper } from "enzyme";
import moment from "~utils/momentWithTimezone";
import CalendarDateTitle from "../index";

const dayDate = moment();
const weekFromDate = moment().add(7, "days");

describe("CalendarDateTitle", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<CalendarDateTitle />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='date-title']")).toExist();
  });

  it("initially displays the calendar day", () => {
    expect(wrapper.find("[data-testid='day-date']").first().text()).toEqual(
      dayDate.format("dddd")
    );

    expect(
      wrapper.find("[data-testid='calendar-date']").first().text()
    ).toEqual(dayDate.format("MMM DD"));
  });

  it("displays the calendar day and next week when passed a 'nextWeek' prop", () => {
    wrapper.setProps({ nextWeek: true });

    expect(wrapper.find("[data-testid='day-date']").first().text()).toEqual(
      `Today\u00a0to next\u00a0${weekFromDate.format("dddd")}`
    );

    expect(
      wrapper.find("[data-testid='calendar-date']").first().text()
    ).toEqual(
      `${dayDate.format("MMM DD")}\u00a0–\u00a0${weekFromDate.format("MMM DD")}`
    );
  });

  it("displays the calendar day of date when passed an 'eventDate' prop", () => {
    wrapper.setProps({ eventDate: weekFromDate.format() });

    expect(wrapper.find("[data-testid='day-date']").first().text()).toEqual(
      weekFromDate.format("dddd")
    );

    expect(
      wrapper.find("[data-testid='calendar-date']").first().text()
    ).toEqual(weekFromDate.format("MMM DD"));
  });
});
