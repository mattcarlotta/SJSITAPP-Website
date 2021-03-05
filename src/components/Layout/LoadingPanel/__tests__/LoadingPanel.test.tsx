import { mount, ReactWrapper } from "enzyme";
import LoadingPanel from "../index";

describe("LoadingPanel", () => {
  let wrapper: ReactWrapper;
  let node: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<LoadingPanel />);
    node = () => wrapper.find("[data-testid='loading-panel']");
  });

  it("renders without errors and initial CSS", () => {
    expect(wrapper).toExist();
    expect(node()).toHaveStyleRule("border-radius", "0px");
    expect(node()).toHaveStyleRule("height", "252px");
    expect(node()).toHaveStyleRule("max-width", "auto");
    expect(node()).toHaveStyleRule("margin", "0px");
    expect(node()).toHaveStyleRule("width", "100%");
  });

  it("sets border-radius when passed a 'borderRadius' prop", () => {
    wrapper.setProps({ borderRadius: "10px" });
    expect(node()).toHaveStyleRule("border-radius", "10px");
  });

  it("sets height when passed a 'height' prop", () => {
    wrapper.setProps({ height: "10px" });
    expect(node()).toHaveStyleRule("height", "10px");
  });

  it("sets max-width when passed a 'maxWidth' prop", () => {
    wrapper.setProps({ maxWidth: "10px" });
    expect(node()).toHaveStyleRule("max-width", "10px");
  });

  it("sets margin when passed a 'margin' prop", () => {
    wrapper.setProps({ margin: "10px" });
    expect(node()).toHaveStyleRule("margin", "10px");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(node()).toHaveStyleRule("width", "10px");
  });
});
