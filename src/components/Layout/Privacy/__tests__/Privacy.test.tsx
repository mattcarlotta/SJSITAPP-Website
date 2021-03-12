import { mount } from "enzyme";
import Privacy from "../index";

const wrapper = mount(<Privacy />);

describe("Privacy", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });
});
