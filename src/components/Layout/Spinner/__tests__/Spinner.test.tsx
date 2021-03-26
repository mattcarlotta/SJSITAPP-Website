import { mount, ReactWrapper } from "enzyme";
import { SpinnerComponent } from "../index";

const initProps = {
  className: "example-class",
  children: <p>Hi</p>
};

describe("Spinner", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SpinnerComponent {...initProps} />);
  });

  it("renders nothing if not mounted in the browser", () => {
    wrapper.setState({ isMounted: false });
    expect(wrapper.find("div.container")).not.toExist();
    expect(wrapper.find("img")).not.toExist();
  });

  it("renders a dynamic spinner", () => {
    expect(wrapper.find("div.container")).toExist();
  });

  it("renders a static image for IE11", () => {
    wrapper.setState({ isIE: true });

    expect(wrapper.find("img")).toExist();
  });

  it("renders a static image for Edge", () => {
    wrapper.setState({ isEdge: true });

    expect(wrapper.find("img")).toExist();
  });
});
