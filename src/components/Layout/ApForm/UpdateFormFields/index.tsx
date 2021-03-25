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
    const field = {
      name: "events",
      type: "radiogroup",
      value: "",
      errors: "",
      required: false,
      disabled: true,
      selectOptions: [
        "I want to work.",
        "Available to work.",
        "Prefer not to work.",
        "Not available to work."
      ]
    };

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
      ...field,
      id: _id,
      name: _id,
      label: (
        <EventLabel
          eventType={eventType}
          eventDate={eventDate}
          opponent={opponent}
          team={team}
          style={{ padding: "0 0 5px 0" }}
        />
      ),
      radioLabelStyle: {
        background: team === "San Jose Sharks" ? "#0d6472" : "#ef7f00",
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
      disabled: false,
      required: true,
      value: response || "",
      updateEvent: !!response,
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
      disabled: false,
      className: "ap-form-notes",
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
