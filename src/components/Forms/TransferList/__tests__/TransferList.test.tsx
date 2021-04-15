import { mount, ReactWrapper } from "enzyme";
import TransferList from "../index";

const onChange = jest.fn();

const initProps = {
  name: "password",
  label: "",
  errors: "",
  onChange,
  placeholder: "Enter a password...",
  transferList: ["Bob", "Jane"],
  tooltip: ""
};

describe("TransferList", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<TransferList {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    onChange.mockClear();
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='transfer-container']")).toExist();
  });

  it("displays a label and a tooltip", () => {
    wrapper.setProps({
      label: "Test",
      tooltip: "Your password must be longer than 5 characters."
    });

    expect(wrapper.find(".tooltip").first()).toExist();
    expect(wrapper.find("label").text()).toContain("Test");
  });

  it("when invalid, adds an 'error' and displays the validation errors", () => {
    wrapper.setProps({ errors: "Required." });

    expect(findById("errors")).toExist();
    expect(findById("errors").first().text()).toEqual("Required.");
  });

  it("toggles individual checkboxes", () => {
    findById("Bob").first().simulate("click");

    expect(
      wrapper.find(".Mui-checked").at(2).find("input[data-testid='Bob']")
    ).toExist();

    findById("Bob").first().simulate("click");

    expect(
      wrapper.find(".Mui-checked").at(2).find("input[data-testid='Bob']")
    ).not.toExist();
  });

  it("toggles all checkboxes", () => {
    findById("all-Employees-items").first().simulate("click");

    expect(
      wrapper
        .find(".Mui-checked")
        .first()
        .find("input[data-testid='all-Employees-items']")
    ).toExist();

    findById("all-Employees-items").first().simulate("click");

    expect(
      wrapper
        .find(".Mui-checked")
        .first()
        .find("input[data-testid='all-Employees-items']")
    ).not.toExist();
  });

  it("transfers between lists", () => {
    expect(findById("Employees").find("input[type='checkbox']")).toHaveLength(
      2
    );
    expect(findById("Send To").find("input[type='checkbox']")).toHaveLength(0);

    findById("Bob").first().simulate("click");

    findById("move-items-down").first().simulate("click");

    expect(onChange).toHaveBeenCalledWith({
      target: { name: "password", value: ["Bob"] }
    });

    expect(findById("Employees").find("input[type='checkbox']")).toHaveLength(
      1
    );
    expect(findById("Send To").find("input[type='checkbox']")).toHaveLength(1);

    findById("Bob").first().simulate("click");

    findById("move-items-up").first().simulate("click");

    expect(onChange).toHaveBeenCalledWith({
      target: { name: "password", value: [] }
    });

    expect(findById("Employees").find("input[type='checkbox']")).toHaveLength(
      2
    );
    expect(findById("Send To").find("input[type='checkbox']")).toHaveLength(0);
  });

  it("transfers all items between lists", () => {
    expect(findById("Employees").find("input[type='checkbox']")).toHaveLength(
      2
    );
    expect(findById("Send To").find("input[type='checkbox']")).toHaveLength(0);

    findById("all-Employees-items").first().simulate("click");

    findById("move-items-down").first().simulate("click");

    expect(onChange).toHaveBeenCalledWith({
      target: { name: "password", value: ["Bob", "Jane"] }
    });

    expect(findById("Employees").find("input[type='checkbox']")).toHaveLength(
      0
    );
    expect(findById("Send To").find("input[type='checkbox']")).toHaveLength(2);
  });

  // it("when disabled, adds a 'disabled-input' className and disables the input", () => {
  //   wrapper.setProps({ disabled: true });

  //   expect(wrapper.find("div.disabled-input")).toExist();
  //   expect(wrapper.find("input").prop("disabled")).toEqual(true);
  // });
});
