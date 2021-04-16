import { mount } from "enzyme";
import ViewSeasons from "../index";

const wrapper = mount(<ViewSeasons />);
describe("View Seasons", () => {
  it("renders the table without errors", async () => {
    expect(wrapper.find("Card")).toExist();
  });
});
