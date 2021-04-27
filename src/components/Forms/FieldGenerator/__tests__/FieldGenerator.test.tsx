import { ReactWrapper } from "enzyme";
import withProviders from "~utils/withProviders";
import FieldGenerator from "../index";

const onChange = jest.fn();
const onFieldRemove = jest.fn();

const input = {
  type: "text",
  name: "seasonId",
  label: "Season ID",
  tooltip:
    "Select a start and end date below to automatically fill in this field.",
  icon: "id",
  value: "",
  errors: ""
};

const switchField = {
  name: "emailReminders",
  type: "switch",
  label: "Email Reminders",
  value: true,
  tooltip:
    "This setting only affects scheduled events and A/P form email reminders. Monthly schedules will remain unaffected."
};

const textarea = {
  type: "textarea",
  name: "notes",
  label: "Notes",
  icon: "note",
  value: "",
  errors: ""
};

const select = {
  name: "role",
  type: "select",
  label: "Role",
  placeholder: "Select an option...",
  icon: "usertag",
  value: "",
  errors: "",
  required: true,
  selectOptions: ["staff", "member"]
};

// const range = {
// 	type: "range",
// 	name: "seasonDuration",
// 	label: "Season Duration",
// 	value: [],
// 	errors: "",
// 	required: true,
// 	disabled: true,
// 	format: "l",
// };

const date = {
  type: "date",
  name: "eventDate",
  label: "Event Date",
  placeholder: "Select a start date and time...",
  value: null,
  errors: "",
  required: true
};

const datetime = {
  type: "datetime",
  name: "eventDate",
  label: "Event Date",
  value: null,
  errors: "",
  required: true,
  emptyLabel: "Click to select an event date and time..."
};

const time = {
  type: "time",
  name: "callTime",
  label: "Call Time",
  value: null,
  errors: "",
  required: true,
  onFieldRemove
};

const calltime = {
  ...time,
  type: "calltime"
};

// const removetime = {
// 	...time,
// 	label: "",
// 	onFieldRemove,
// };

const initProps = {
  fields: [],
  onChange
};

const radiogroup = {
  type: "radiogroup",
  name: "0123456789",
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

const transfer = {
  name: "sendTo",
  type: "transfer",
  label: "Send To",
  tooltip:
    "Select and transfer one or multiple members from the left box to the right box to include them on the mailing list.",
  value: [],
  errors: "",
  required: true,
  transferList: [
    "Bobby Axelrod <member10@example.com>",
    "Matt Polls <member11@example.com>"
  ]
};

describe("Field Generator", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<FieldGenerator {...initProps} />);
  });

  // beforeAll(async () => {
  // 	await preloadAll();
  // });

  afterEach(() => {
    onChange.mockClear();
  });

  it("initially returns an invalid component", () => {
    wrapper.setProps({ fields: [{ ...input, type: "invalid" }] });
    expect(wrapper.find("[data-testid='invalid-component']")).toExist();
  });

  it("returns an Input when type is 'text'", () => {
    wrapper.setProps({ fields: [input] });

    expect(wrapper.find("Input")).toExist();
  });

  it("returns a Input when type is 'email'", () => {
    wrapper.setProps({ fields: [{ ...input, type: "email" }] });

    expect(wrapper.find("Input")).toExist();
  });

  it("returns a Input when type is 'password'", () => {
    wrapper.setProps({ fields: [{ ...input, type: "password" }] });

    expect(wrapper.find("Input")).toExist();
  });

  it("returns a TextArea when type is 'textarea'", () => {
    wrapper.setProps({ fields: [textarea] });

    expect(wrapper.find("TextArea")).toExist();
    expect(wrapper.find("Errors")).not.toExist();

    wrapper.setProps({ fields: [{ ...textarea, errors: "Required." }] });
    expect(wrapper.find("Errors")).toExist();
  });

  it("returns a Select when type is 'select'", () => {
    wrapper.setProps({ fields: [select] });

    expect(wrapper.find("Select")).toExist();
  });

  it("returns a Switch when type is 'switch'", () => {
    wrapper.setProps({ fields: [switchField] });

    expect(wrapper.find("Switch")).toExist();
  });

  it("returns a DatePicker when type is 'date'", () => {
    wrapper.setProps({ fields: [date] });

    expect(wrapper.find("DatePickerComponent")).toExist();
  });

  it("returns a DateTimePicker when type is 'date'", () => {
    wrapper.setProps({ fields: [datetime] });

    expect(wrapper.find("DateTimePickerComponent")).toExist();
  });

  // it("returns a RangePicker when type is 'range'", () => {
  // 	wrapper.setProps({ fields: [range] });

  // 	expect(wrapper.find("RangePicker")).toExist();
  // });

  it("returns an RadioGroup when type is 'radiogroup'", () => {
    wrapper.setProps({ fields: [radiogroup] });

    expect(wrapper.find("[data-testid='radio-container']")).toExist();
  });

  // it("displays a RadioGroup with notes when passed a 'notes' prop", () => {
  // 	wrapper.setProps({
  // 		fields: [{ ...radiogroup, notes: "This is a special note!" }],
  // 	});

  // 	expect(wrapper.find("Notes")).toExist();
  // });

  // it("displays a RadioGroup with errors when passed an 'errors' prop", () => {
  // 	wrapper.setProps({
  // 		fields: [{ ...radiogroup, errors: "Required!" }],
  // 	});

  // 	expect(wrapper.find("Errors")).toExist();
  // });

  it("returns a TimePicker when type is 'time'", () => {
    wrapper.setProps({ fields: [time] });

    expect(wrapper.find("Label")).toExist();
    expect(wrapper.find("TimePickerComponent")).toExist();
  });

  it("returns a TimePicker when type is 'calltime'", () => {
    wrapper.setProps({ fields: [calltime] });

    expect(wrapper.find("Label")).toExist();
    expect(wrapper.find("TimePickerComponent")).toExist();
  });

  // it("returns a removeable TimePicker field when a 'onFieldRemove' is present", () => {
  // 	wrapper.setProps({ fields: [removetime] });

  // 	wrapper.find("Icon").first().simulate("click");

  // 	expect(onFieldRemove).toHaveBeenCalledWith("callTime");
  // 	expect(wrapper.find("Label")).not.toExist();
  // 	expect(wrapper.find("FaMinusCircle")).toExist();
  // 	expect(wrapper.find("TimePicker")).toExist();
  // });

  it("returns a Transfer field when type is 'transfer'", () => {
    wrapper.setProps({ fields: [transfer] });

    expect(wrapper.find("TransferList")).toExist();

    // 	wrapper.setProps({ fields: [{ ...transfer, errors: "Required. " }] });
    // 	expect(wrapper.find("Transfer").props().className).toEqual("has-error");
    // 	expect(wrapper.find("Errors")).toExist();

    // 	wrapper
    // 		.find("input.ant-transfer-list-search")
    // 		.first()
    // 		.simulate("change", { target: { value: "bobby" } });

    // 	expect(wrapper.find("ListItem")).toHaveLength(1);

    // 	wrapper.find(Transfer).instance().moveTo("right");

    // 	expect(onChange).toHaveBeenCalledWith({
    // 		target: {
    // 			name: "sendTo",
    // 			value: [],
    // 		},
    // 	});
  });
});
