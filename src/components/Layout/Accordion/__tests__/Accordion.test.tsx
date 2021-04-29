import { mount, ReactWrapper } from "enzyme";
import waitFor from "~utils/waitFor";
import Accordion from "../index";

const initProps = {
  expanded: "",
  title: "Hello world"
};

const mockBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/",
    push: mockPush,
    replace: mockReplace,
    back: mockBack
  }))
}));

describe("Accordion", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Accordion {...initProps}>Hello world</Accordion>);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("expands the Accordion when the 'expanded' prop matches the id", async () => {
    wrapper.setProps({ expanded: "hello-world" });

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("div#hello-world").first().text()).toEqual(
        "Hello world"
      );
    });
  });

  it("expands the Accordion when the expand icon is clicked", async () => {
    await waitFor(() => {
      expect(wrapper.find("div#hello-world").first().text()).toEqual(
        "Click to expand answer"
      );
    });

    wrapper.find("div#hello-world").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("div#hello-world").first().text()).toEqual(
        "Hello world"
      );
    });
  });
});
