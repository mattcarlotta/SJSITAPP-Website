import { mount } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import PuckSpinner from "../index";

const wrapper = mount(<PuckSpinner />);
describe("View Events", () => {
  it("renders the without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='loading']")).toExist();
    });
  });
});
