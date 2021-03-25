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

const field = {
  type: "radiogroup",
  value: "",
  errors: "",
  required: true,
  disabled: true,
  selectOptions: [
    "I want to work.",
    "Available to work.",
    "Prefer not to work.",
    "Not available to work."
  ]
};
describe("UpdateFormFields", () => {
  it("initializes a radiogroup field value, adds a label, adds an updateEvent flag, includes event notes, and enables the field", () => {
    const updatedField = updateFormFields(eventsGame);

    expect(updatedField).toEqual([
      {
        ...field,
        id: eventsGame[0]._id,
        name: eventsGame[0]._id,
        value: eventsGame[0].employeeResponse[0].response,
        label: (
          <EventLabel
            eventType={eventsGame[0].eventType}
            eventDate={eventsGame[0].eventDate}
            opponent={eventsGame[0].opponent}
            team={eventsGame[0].team}
            style={{ padding: "0 0 5px 0" }}
          />
        ),
        radioLabelStyle: {
          background: "#ef7f00",
          color: "#fff",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5
        },
        radioContainerStyle: {
          marginTop: 20,
          borderTop: "1px solid",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: "#9e9e9e",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5
        },
        updateEvent: true,
        notes: eventsGame[0].notes,
        disabled: false
      },
      {
        id: eventsGame[0]._id,
        name: `${eventsGame[0]._id}-notes`,
        type: "textarea",
        value: eventsGame[0].employeeResponse[0].notes,
        errors: "",
        placeholder:
          "(Optional) Include any special notes for the event above...",
        className: "ap-form-notes",
        required: false,
        disabled: false,
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
        ...field,
        id: eventsPromo[0]._id,
        name: eventsPromo[0]._id,
        value: "",
        label: (
          <EventLabel
            eventType={eventsPromo[0].eventType}
            eventDate={eventsPromo[0].eventDate}
            opponent={eventsPromo[0].opponent}
            team={eventsPromo[0].team}
            style={{ padding: "0 0 5px 0" }}
          />
        ),
        radioLabelStyle: {
          background: "#0d6472",
          color: "#fff",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5
        },
        radioContainerStyle: {
          marginTop: 20,
          borderTop: "1px solid",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: "#9e9e9e",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5
        },
        updateEvent: false,
        notes: eventsPromo[0].notes,
        disabled: false
      },
      {
        id: eventsPromo[0]._id,
        name: `${eventsPromo[0]._id}-notes`,
        type: "textarea",
        value: eventsPromo[0].notes,
        errors: "",
        placeholder:
          "(Optional) Include any special notes for the event above...",
        className: "ap-form-notes",
        required: false,
        disabled: false,
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
