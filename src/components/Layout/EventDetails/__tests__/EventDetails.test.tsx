import { mount, ReactWrapper } from "enzyme";
import EventDetails from "../index";

const initProps = {
  id: "",
  loggedinUserId: "",
  event: {
    _id: "0123456789",
    eventDate: "2019-08-10T02:30:31.834+00:00",
    eventNotes: "",
    eventType: "Game",
    employeeResponse: "",
    employeeNotes: "",
    location: "SAP Center at San Jose",
    notes: "Parking will be crowded.",
    opponent: "",
    response: "",
    team: "San Jose Sharks",
    schedule: [
      {
        _id: "2019-08-09T17:45:26-07:00",
        employeeIds: [
          {
            _id: "88",
            firstName: "John",
            lastName: "Smith"
          }
        ]
      }
    ],
    uniform: "Sharks Teal Jersey"
  }
};

const employeeEventResponse = {
  _id: "0123456789",
  eventDate: "2019-08-10T02:30:31.834+00:00",
  eventNotes: "Parking will be crowded.",
  eventType: "Game",
  employeeResponse: "Not available.",
  employeeNotes: "I will be out of town.",
  notes: "",
  location: "SAP Center at San Jose",
  opponent: "Anaheim Ducks",
  response: "",
  team: "San Jose Sharks",
  schedule: [],
  uniform: "Sharks Teal Jersey"
};

describe("Event Details", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<EventDetails {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='event-details-content']")).toExist();
  });

  it("displays a team", () => {
    expect(wrapper.find("[data-testid='team']").first().text()).toEqual(
      "San Jose Sharks"
    );
  });

  it("displays a team and opponent", () => {
    wrapper.setProps({
      event: { ...initProps.event, opponent: "Anaheim Ducks" }
    });
    expect(wrapper.find("[data-testid='team']").first().text()).toEqual(
      "San Jose Sharksvs.Anaheim Ducks"
    );
  });

  it("displays event type", () => {
    expect(wrapper.find("[data-testid='event-type']").first().text()).toEqual(
      "Event Type:Game"
    );
  });

  it("displays event date", () => {
    expect(wrapper.find("[data-testid='event-date']").first().text()).toEqual(
      "Date:August 9th, 2019 @ 7:30 pm"
    );
  });

  it("displays event notes", () => {
    expect(wrapper.find("[data-testid='event-notes']").first().text()).toEqual(
      "Event Notes:Parking will be crowded."
    );
  });

  it("displays event location", () => {
    expect(
      wrapper.find("[data-testid='event-location']").first().text()
    ).toEqual("Location:SAP Center at San Jose");
  });

  it("displays event uniform", () => {
    expect(
      wrapper.find("[data-testid='event-uniform']").first().text()
    ).toEqual("Uniform:Sharks Teal Jersey");
  });

  it("displays an employee response", () => {
    wrapper.setProps({ event: employeeEventResponse });
    expect(
      wrapper.find("[data-testid='employee-response']").first().text()
    ).toEqual("Employee Response:Not available.");
  });

  it("displays an employee notes", () => {
    wrapper.setProps({ event: employeeEventResponse });
    expect(
      wrapper.find("[data-testid='employee-notes']").first().text()
    ).toEqual("Employee Notes:I will be out of town.");
  });

  it("renders a list of scheduled members", () => {
    expect(wrapper.find("[data-testid='schedule-employees']")).toExist();
  });

  it("renders a list of call times", () => {
    expect(wrapper.find("[data-testid='call-time']")).toExist();
  });

  it("highlights a member's name if an 'loggedinUserId' prop is present", () => {
    wrapper.setProps({ id: "88" });

    expect(wrapper.find("[data-testid='employee']").first()).toHaveStyle(
      "backgroundColor",
      "#006d75"
    );
    expect(wrapper.find("[data-testid='employee']").first()).toHaveStyle(
      "fontWeight",
      "bold"
    );
  });

  // it("highlights a member's name if the loggedinUser matches the 'id'", () => {
  //   wrapper.setProps({ loggedinUserId: "88", id: "88" });

  //   expect(wrapper.find("[data-testid='employee']").first()).toHaveStyle(
  //     "backgroundColor",
  //     "#006d75"
  //   );
  //   expect(wrapper.find("[data-testid='employee']").first()).toHaveStyle(
  //     "fontWeight",
  //     "bold"
  //   );
  // });
});
