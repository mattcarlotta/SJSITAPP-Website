import { mount } from "enzyme";
import ViewMail from "../index";

const wrapper = mount(<ViewMail />);
describe("View Mail", () => {
  it("renders the table without errors", async () => {
    expect(wrapper.find("Card")).toExist();
  });
});
