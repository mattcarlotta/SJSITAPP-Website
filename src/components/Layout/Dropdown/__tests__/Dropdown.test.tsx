import { mount, ReactWrapper } from "enzyme";
import Dropdown from "../index";

describe("Dropdown", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <div>
        <Dropdown menu={<p data-testid="menu-item">Menu Item</p>}>
          <span data-testid="menu-title">Click to drop down</span>
        </Dropdown>
        <div data-testid="outside-content" />
      </div>
    );
  });

  it("initially renders the dropdown", () => {
    expect(wrapper.find("[data-testid='select-container']")).toExist();
    expect(wrapper.find("[data-testid='dropdown-menu']")).not.toExist();
  });

  it("shows the dropdown menu", () => {
    wrapper
      .find("[data-testid='dropdown-container']")
      .first()
      .simulate("click");
    expect(wrapper.find("[data-testid='dropdown-menu']")).toExist();
    expect(wrapper.find("[data-testid='menu-title']")).toExist();
  });
});
