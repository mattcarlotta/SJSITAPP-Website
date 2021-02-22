import { mount } from "enzyme";
import Link from "../index";

const initProps = {
  children: "Test",
  dataTestId: "test-link",
  href: "/test"
};

const wrapper = mount(<Link {...initProps} />);

describe("Styled Link", () => {
  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='test-link']")).toExist();
  });
});
