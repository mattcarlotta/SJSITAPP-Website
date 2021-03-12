import { mount } from "enzyme";
import Licensing from "../index";

const wrapper = mount(<Licensing />);

describe("Licensing", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });
});
