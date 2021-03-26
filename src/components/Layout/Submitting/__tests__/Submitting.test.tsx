import { mount } from "enzyme";
import Submitting from "../index";

const wrapper = mount(<Submitting />);

describe("Submitting", () => {
  it("renders without errors", () => {
    expect(wrapper.find("Submitting")).toExist();
  });
});
