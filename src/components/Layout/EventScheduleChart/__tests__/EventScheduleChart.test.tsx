import { mount } from "enzyme";
import EventScheduleChart from "../index";

const events = [
  { id: "scheduled", events: 0 },
  { id: "available", events: 100 }
];

const wrapper = mount(<EventScheduleChart events={events} />);

describe("Event Schedule Chart", () => {
  it("renders the chart", () => {
    expect(wrapper.find("[data-testid='event-schedule-chart']")).toExist();
  });

  it("renders no availability message", () => {
    wrapper.setProps({ events: [] });
    expect(wrapper.find("[data-testid='no-availability']")).toExist();
  });
});
