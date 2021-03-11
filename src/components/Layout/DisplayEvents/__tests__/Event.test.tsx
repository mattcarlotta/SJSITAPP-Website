import { mount, ReactWrapper } from "enzyme";
import Modal from "~components/Layout/Modal";
import Event from "../index";

const initProps = {
  events: [],
  folder: "",
  id: "88",
  nextWeek: false
};

const gameSchedule = [
  {
    _id: "0123456789",
    eventDate: "2019-08-10T02:30:31.834+00:00",
    eventNotes: "",
    eventType: "Game",
    employeeResponse: "",
    employeeNotes: "",
    location: "SAP Center at San Jose",
    notes: "Parking will be crowded.",
    opponent: "Anaheim Ducks",
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
];

const unscheduledGame = [
  {
    _id: "0123456789",
    eventDate: "2019-08-10T02:30:31.834+00:00",
    eventNotes: "",
    eventType: "Game",
    employeeResponse: "",
    employeeNotes: "",
    location: "SAP Center at San Jose",
    notes: "Parking will be crowded.",
    opponent: "Anaheim Ducks",
    response: "",
    team: "San Jose Sharks",
    schedule: [
      {
        _id: "2019-08-09T17:45:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-08-09T18:45:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-08-09T19:45:26-07:00",
        employeeIds: []
      }
    ],
    uniform: "Sharks Black Jersey"
  }
];

describe("Event", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Event {...initProps} />);
  });

  it("initially renders null", () => {
    expect(wrapper.find("[data-testid='upcoming-event']")).not.toExist();
    expect(wrapper.find(Modal).props().isOpen).toBeFalsy();
  });

  it("renders a button that opens and closes the modal with game events", () => {
    wrapper.setProps({
      events: gameSchedule,
      folder: "lowres"
    });

    const clickButton = (id: string): void => {
      wrapper.find(`[data-testid='${id}']`).first().simulate("click");
      wrapper.update();
    };

    clickButton("upcoming-event");
    expect(wrapper.find("List")).toExist();

    clickButton("close-modal");
    expect(wrapper.find("List")).not.toExist();
  });

  it("renders a button with a schedule icon and logos for a game", () => {
    wrapper.setProps({ events: gameSchedule });
    expect(wrapper.find("[data-testid='upcoming-event']")).toExist();
    expect(wrapper.find("FaCalendarCheck")).toExist();
    expect(wrapper.find("[data-testid='San Jose Sharks']")).toExist();
    expect(wrapper.find("[data-testid='Anaheim Ducks']")).toExist();

    wrapper.find("[data-testid='upcoming-event']").simulate("click");
    wrapper.update();
    expect(wrapper.find("List")).toExist();
    expect(wrapper.find("ListItem")).toHaveLength(8);
  });

  it("renders a button with team logos for an unschedule game", () => {
    wrapper.setProps({ events: unscheduledGame });
    expect(wrapper.find("[data-testid='upcoming-event']")).toExist();
    expect(wrapper.find("FaCalendarCheck")).not.toExist();
    expect(wrapper.find("[data-testid='San Jose Sharks']")).toExist();
    expect(wrapper.find("[data-testid='Anaheim Ducks']")).toExist();

    wrapper.find("[data-testid='upcoming-event']").simulate("click");
    wrapper.update();
    expect(wrapper.find("List").exists()).toBeTruthy();
    expect(wrapper.find("ListItem")).toHaveLength(10);
  });
});
