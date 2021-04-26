import isEmpty from "lodash.isempty";
import { TBaseFieldProps, TEvent } from "~types";

const Fields = (
  seasondIds?: Array<string>,
  teams?: Array<string>,
  event?: TEvent,
  handleRemoveField?: (name: string) => void
): Array<TBaseFieldProps> =>
  [
    {
      name: "seasonId",
      type: "select",
      label: "Season ID",
      placeholder: "Select a season id...",
      value: event ? event.seasonId : "",
      errors: "",
      required: true,
      selectOptions: seasondIds,
      style: { textAlign: "center" }
    },
    {
      type: "select",
      name: "eventType",
      label: "Event Type",
      placeholder: "Select a league...",
      value: event ? event.eventType : "Game",
      errors: "",
      required: true,
      selectOptions: ["Game", "Promotional", "Other"],
      style: { textAlign: "center" }
    },
    {
      type: "select",
      name: "team",
      label: "Team",
      placeholder: "Select a team...",
      value: event ? event.team : "San Jose Sharks",
      errors: "",
      required: true,
      selectOptions: ["San Jose Sharks", "San Jose Barracuda"],
      style: { textAlign: "center" }
    },
    {
      type: "select",
      name: "opponent",
      label: "Opponent",
      placeholder: "(Optional) Select an opponent...",
      value: event ? event.opponent : "",
      errors: "",
      required: false,
      isSearchable: true,
      selectOptions: teams,
      style: { textAlign: "center" }
    },
    {
      name: "location",
      type: "text",
      label: "Event Location",
      value: "SAP Center at San Jose",
      errors: "",
      placeholder: "Enter an event location...",
      required: true,
      inputStyle: { textAlign: "center" }
    },
    {
      type: "datetime",
      name: "eventDate",
      label: "Event Date",
      value: event ? event.eventDate : null,
      errors: "",
      required: true,
      emptyLabel: "Click to select an event date and time...",
      style: { width: "100%", height: "100px" }
    },
    {
      type: "select",
      name: "uniform",
      label: "Uniform",
      placeholder: "Select a uniform...",
      value: event ? event.uniform : "",
      errors: "",
      required: true,
      selectOptions: [
        "Sharks Teal Jersey",
        "Sharks Black Jersey",
        "Sharks Jacket",
        "Barracuda Jacket",
        "Barracuda Jersey",
        "Other"
      ],
      style: { textAlign: "center" }
    },
    {
      type: "textarea",
      name: "notes",
      label: "Notes",
      value: event ? event.notes : "",
      errors: "",
      required: false,
      placeholder: "(Optional) Include any special event notes...",
      style: { width: "100%", height: "100px" }
    },
    ...(event && !isEmpty(event.callTimes) ? event.callTimes : [""]).map(
      (time, index) => ({
        type: "time",
        name: index === 0 ? "callTime" : `callTime-${index}`,
        label: index === 0 ? "Event Call Times" : "",
        value: time || null,
        errors: "",
        required: index === 0,
        style: {
          width: "100%",
          height: index === 0 ? "100px" : "auto",
          marginBottom: index === 0 ? 0 : 10
        },
        onFieldRemove: index !== 0 ? handleRemoveField : undefined
      })
    )
  ].filter(Boolean) as Array<TBaseFieldProps>;

export default Fields;
