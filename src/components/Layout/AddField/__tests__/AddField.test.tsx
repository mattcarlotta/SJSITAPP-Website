import { mount } from "enzyme";
import AddField from "../index";

const onClick = jest.fn();
const text = "Add Field";

const initProps = {
  onClick,
  text
};

const wrapper = mount(<AddField {...initProps} />);

describe("Add Field", () => {
  it("renders a button and button icon", () => {
    expect(wrapper.find("FaPlusCircle")).toExist();
    expect(wrapper.text()).toEqual(text);
  });

  it("calls onClick when button is clicked", () => {
    wrapper.find("button").first().simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
