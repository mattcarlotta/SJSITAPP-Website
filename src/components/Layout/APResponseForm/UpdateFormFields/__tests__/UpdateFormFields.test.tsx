import EventLabel from "~components/Layout/EventLabel";
import updateFormFields from "../index";

const eventsGame = [
  {
    employeeResponse: [
      {
        _id: "5d72dffe65ec39141ae78551",
        response: "I want to work.",
        notes: "I am ready!"
      }
    ],
    eventDate: "2019-09-06T16:30:36.000Z",
    eventType: "Game",
    location: "SAP Center at San Jose",
    notes: "This is a note.",
    opponent: "San Diego Gulls",
    team: "San Jose Barracuda",
    _id: "5d72dffe65ec39141ae78562"
  }
];

const eventsPromo = [
  {
    _id: "5d5b5ee857a6d20abf49db1a",
    eventDate: "2019-08-21T02:30:36.000Z",
    eventType: "Promotional",
    employeeResponse: [],
    location: "SAP Center at San Jose",
    notes: "",
    opponent: "",
    team: "San Jose Sharks"
  }
];

describe("UpdateFormFields", () => {
  it("initializes a radiogroup field value, adds a label, adds an updateEvent flag, includes event notes, and enables the field", () => {
    const updatedField = updateFormFields(eventsGame);

    expect(updatedField).toEqual([
      {
        type: "radiogroup",
        id: eventsGame[0]._id,
        name: eventsGame[0]._id,
        value: eventsGame[0].employeeResponse[0].response,
        errors: "",
        selectOptions: [
          "I want to work.",
          "Available to work.",
          "Prefer not to work.",
          "Not available to work."
        ],
        required: true,
        label: (
          <EventLabel
            eventType={eventsGame[0].eventType}
            eventDate={eventsGame[0].eventDate}
            opponent={eventsGame[0].opponent}
            team={eventsGame[0].team}
          />
        ),
        radioLabelStyle: {
          background: "#ef7f00",
          color: "#fff"
        },
        updateEvent: true,
        notes: eventsGame[0].notes
      },
      {
        id: eventsGame[0]._id,
        name: `${eventsGame[0]._id}-notes`,
        type: "textarea",
        value: eventsGame[0].employeeResponse[0].notes,
        errors: "",
        placeholder:
          "(Optional) Include any special notes for the event above...",
        required: false,
        maxLength: 200,
        rows: 3,
        style: {
          minHeight: "125px",
          width: "100%",
          padding: "5px",
          background: "#f5f5f5",
          borderBottom: "1px solid",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: "#9e9e9e",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginBottom: "40px"
        },
        innerStyle: {
          maxWidth: "400px",
          minHeight: "101px",
          marginBottom: "20px"
        }
      }
    ]);
  });

  it("updates a radiogroup field value, adds a label, and enables the field", () => {
    const updatedField = updateFormFields(eventsPromo);

    expect(updatedField).toEqual([
      {
        type: "radiogroup",
        id: eventsPromo[0]._id,
        name: eventsPromo[0]._id,
        value: "",
        errors: "",
        selectOptions: [
          "I want to work.",
          "Available to work.",
          "Prefer not to work.",
          "Not available to work."
        ],
        required: true,
        label: (
          <EventLabel
            eventType={eventsPromo[0].eventType}
            eventDate={eventsPromo[0].eventDate}
            opponent={eventsPromo[0].opponent}
            team={eventsPromo[0].team}
          />
        ),
        radioLabelStyle: {
          background: "#0d6472",
          color: "#fff"
        },
        updateEvent: false,
        notes: eventsPromo[0].notes
      },
      {
        id: eventsPromo[0]._id,
        name: `${eventsPromo[0]._id}-notes`,
        type: "textarea",
        value: eventsPromo[0].notes,
        errors: "",
        placeholder:
          "(Optional) Include any special notes for the event above...",
        required: false,
        maxLength: 200,
        rows: 3,
        style: {
          minHeight: "125px",
          width: "100%",
          padding: "5px",
          background: "#f5f5f5",
          borderBottom: "1px solid",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: "#9e9e9e",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginBottom: "40px"
        },
        innerStyle: {
          maxWidth: "400px",
          minHeight: "101px",
          marginBottom: "20px"
        }
      }
    ]);
  });
});
