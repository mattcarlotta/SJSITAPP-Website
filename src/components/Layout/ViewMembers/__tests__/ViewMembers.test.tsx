import { mount } from "enzyme";
import ViewMembers from "../index";

const wrapper = mount(<ViewMembers />);
describe("View Events", () => {
  it("renders the table without errors", async () => {
    expect(wrapper.find("Card")).toExist();
  });
});
