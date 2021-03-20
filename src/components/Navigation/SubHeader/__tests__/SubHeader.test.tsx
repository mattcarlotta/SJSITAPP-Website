import { mount } from "enzyme";
import SubHeader from "../index";

const wrapper = mount(<SubHeader>Test Children</SubHeader>);

describe("SubHeader", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("converts children into a snaked cased id", () => {
    expect(wrapper.find("h3").first().props().id).toEqual("test-children");
  });
});
