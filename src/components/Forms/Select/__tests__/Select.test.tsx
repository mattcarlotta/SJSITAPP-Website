import { mount } from "enzyme";
import Select from "../index";

const initProps = {
  errors: "",
  name: "test",
  label: "Test",
  onChange: jest.fn(),
  placeholder: "Select an option...",
  selectOptions: ["option1", "option2"],
  value: ""
};

const wrapper = mount(<Select {...initProps} />);
describe("Select Component", () => {
  it("renders without errors", () => {
    expect(wrapper.find("Container")).toExist();
    expect(wrapper.find("SelectContainer")).toExist();
  });

  it("initially doesn't display errors", () => {
    expect(wrapper.find("Errors")).not.toExist();
  });

  it("displays errors", () => {
    wrapper.setProps({ errors: "Required" });
    expect(wrapper.find("Errors")).toExist();
  });
});
