import { mount } from "enzyme";
import AvailabilityResponseChart from "../index";

const eventAvailability = [
  { id: "available", value: 100 },
  { id: "unavailable", value: 0 }
];

const wrapper = mount(
  <AvailabilityResponseChart availability={eventAvailability} />
);

describe("Availability Response Chart", () => {
  it("renders the chart", () => {
    expect(
      wrapper.find("[data-testid='availability-response-chart']")
    ).toExist();
  });

  it("renders no availability message", () => {
    wrapper.setProps({ availability: [] });
    expect(wrapper.find("[data-testid='no-availability']")).toExist();
  });
});
