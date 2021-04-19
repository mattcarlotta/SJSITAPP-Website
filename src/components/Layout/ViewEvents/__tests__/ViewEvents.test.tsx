import { mount } from "enzyme";
import ViewEvents from "../index";

const wrapper = mount(<ViewEvents />);
describe("View Events", () => {
  it("renders the table without errors", async () => {
    expect(wrapper.find("Card")).toExist();
  });
});
