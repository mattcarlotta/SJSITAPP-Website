import { mount, ReactWrapper } from "enzyme";
import { fullweekdayFormat, shortmonthFormat } from "~utils/dateFormats";
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
      dayDate.format(fullweekdayFormat)
    );

    expect(
      wrapper.find("[data-testid='calendar-date']").first().text()
    ).toEqual(dayDate.format(shortmonthFormat));
  });

  it("displays the calendar day and next week when passed a 'nextWeek' prop", () => {
    wrapper.setProps({ nextWeek: true });

    expect(wrapper.find("[data-testid='day-date']").first().text()).toEqual(
      `Today\u00a0to next\u00a0${weekFromDate.format(fullweekdayFormat)}`
    );

    expect(
      wrapper.find("[data-testid='calendar-date']").first().text()
    ).toEqual(
      `${dayDate.format(shortmonthFormat)}\u00a0–\u00a0${weekFromDate.format(
        shortmonthFormat
      )}`
    );
  });

  it("displays the calendar day of date when passed an 'eventDate' prop", () => {
    wrapper.setProps({ eventDate: weekFromDate.format() });

    expect(wrapper.find("[data-testid='day-date']").first().text()).toEqual(
      weekFromDate.format(fullweekdayFormat)
    );

    expect(
      wrapper.find("[data-testid='calendar-date']").first().text()
    ).toEqual(weekFromDate.format(shortmonthFormat));
  });
});
