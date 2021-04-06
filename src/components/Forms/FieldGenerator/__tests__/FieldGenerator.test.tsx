import { ReactWrapper } from "enzyme";
import withProviders from "~utils/withProviders";
import FieldGenerator from "../index";

const onChange = jest.fn();
// const onFieldRemove = jest.fn();

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

// const time = {
// 	type: "time",
// 	name: "callTime",
// 	label: "Call Time",
// 	value: moment(),
// 	errors: "",
// 	required: true,
// 	disabled: true,
// };

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

// const transfer = {
// 	name: "sendTo",
// 	type: "transfer",
// 	label: "Send To",
// 	tooltip:
// 		"Select and transfer one or multiple members from the left box to the right box to include them on the mailing list.",
// 	value: [],
// 	errors: "",
// 	required: true,
// 	disabled: true,
// 	dataSource: [
// 		{
// 			_id: "5d83d5b32bff0853d6539cb6",
// 			email: "Bobby Axelrod <member10@example.com>",
// 			key: "Bobby Axelrod <member10@example.com>",
// 		},
// 		{
// 			_id: "5d83d5b32bff0853d6539cb7",
// 			email: "Matt Polls <member11@example.com>",
// 			key: "Matt Polls <member11@example.com>",
// 		},
// 	],
// 	showSearch: true,
// 	listStyle: {
// 		width: 277,
// 		height: 300,
// 	},
// 	rowKey: record => record.email,
// 	render: item => item.email.replace(/ <.*?>/g, ""),
// };

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

  // it("renders a QuillEditor when type is 'editor'", () => {
  // 	wrapper.setProps({ fields: [editor] });
  //
  // 	wrapper
  // 		.find("#erase-message")
  // 		.first()
  // 		.simulate("click");
  // 	expect(onChange).toHaveBeenCalledWith({
  // 		target: { name: "message", value: "" },
  // 	});
  //
  // 	expect(wrapper.find("LazyQuill")).toExist();
  // });

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

  // it("returns a TimePicker when type is 'time'", () => {
  // 	wrapper.setProps({ fields: [time] });

  // 	const value = moment("2000-01-01 00:00:00");
  // 	wrapper.find(TimePicker).instance().handleChange(value);

  // 	expect(wrapper.find("Label")).toExist();
  // 	expect(wrapper.find("TimePicker")).toExist();
  // 	expect(onChange).toHaveBeenCalledWith({
  // 		target: { name: "callTime", value },
  // 	});
  // });

  // it("returns a removeable TimePicker field when a 'onFieldRemove' is present", () => {
  // 	wrapper.setProps({ fields: [removetime] });

  // 	wrapper.find("Icon").first().simulate("click");

  // 	expect(onFieldRemove).toHaveBeenCalledWith("callTime");
  // 	expect(wrapper.find("Label")).not.toExist();
  // 	expect(wrapper.find("FaMinusCircle")).toExist();
  // 	expect(wrapper.find("TimePicker")).toExist();
  // });

  // it("returns a Transfer field when type is 'transfer'", () => {
  // 	wrapper.setProps({ fields: [transfer] });

  // 	expect(wrapper.find("Transfer")).toExist();
  // 	expect(wrapper.find("Transfer").props().className).toEqual("");

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
  // });
});
