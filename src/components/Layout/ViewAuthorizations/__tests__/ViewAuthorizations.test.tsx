import { mount } from "enzyme";
import ViewAuthorizations from "../index";

const wrapper = mount(<ViewAuthorizations />);
describe("View Events", () => {
  it("renders the table without errors", async () => {
    expect(wrapper.find("Card")).toExist();
  });
});
