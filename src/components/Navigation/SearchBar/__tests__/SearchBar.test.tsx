import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import waitFor from "~utils/waitFor";
import SearchBar from "../index";

const initProps = {
  role: "member"
};

describe("SearchBar", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SearchBar {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("pushes the URL to the help page upon selection", async () => {
    wrapper.find("[data-testid='search-icon']").simulate("click");
    wrapper
      .find("[data-testid='How do I change my avatar?']")
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(useRouter().push).toHaveBeenCalledWith(
        "/employee/help#how-do-i-change-my-avatar"
      );
    });
  });
});
