import { mount, ReactWrapper } from "enzyme";
import SideMenu from "../index";

const handleToggle = jest.fn();

const initProps = {
  collapsed: false,
  expandedNodeIds: [],
  handleToggle,
  role: "employee",
  selectedNodeIds: []
};

describe("SideMenu", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SideMenu {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='sidemenu-tree']")).toExist();
  });
});
