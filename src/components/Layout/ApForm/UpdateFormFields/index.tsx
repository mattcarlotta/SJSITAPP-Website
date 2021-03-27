import get from "lodash.get";
import EventLabel from "~components/Layout/EventLabel";
import {
  TApEventDetails,
  TBaseFieldProps,
  TEventEmployeeResponse
} from "~types";

const updateFormFields = (
  data: Array<TApEventDetails>
): Array<TBaseFieldProps> => {
  const initializedFields = data.reduce((acc, event) => {
    const {
      _id,
      team,
      opponent,
      eventDate,
      employeeResponse,
      eventType,
      notes
    } = event;

    const response = get((employeeResponse as TEventEmployeeResponse)[0], [
      "response"
    ]);
    const employeeNotes = get((employeeResponse as TEventEmployeeResponse)[0], [
      "notes"
    ]);

    const radioFields = {
      id: _id,
      name: _id,
      type: "radiogroup",
      label: (
        <EventLabel
          eventType={eventType}
          eventDate={eventDate}
          opponent={opponent}
          team={team}
        />
      ),
      required: true,
      value: response || "",
      errors: "",
      selectOptions: [
        "I want to work.",
        "Available to work.",
        "Prefer not to work.",
        "Not available to work."
      ],
      updateEvent: !!response,
      radioLabelStyle: {
        background: team === "San Jose Sharks" ? "#0d6472" : "#ef7f00",
        color: "#fff"
      },
      notes
    };

    const noteFields = {
      id: _id,
      name: `${_id}-notes`,
      type: "textarea",
      value: employeeNotes || "",
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
    };

    return [...acc, radioFields, noteFields];
  }, [] as Array<TBaseFieldProps>);

  return initializedFields;
};

export default updateFormFields;
