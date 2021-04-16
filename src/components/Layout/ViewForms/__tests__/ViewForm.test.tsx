import { mount } from "enzyme";
import ViewForms from "../index";

const wrapper = mount(<ViewForms />);
describe("View Forms", () => {
  it("renders the table without errors", async () => {
    expect(wrapper.find("Card")).toExist();
  });
});
