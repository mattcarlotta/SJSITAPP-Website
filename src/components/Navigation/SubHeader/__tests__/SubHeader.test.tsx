import { mount } from "enzyme";
import SubHeader from "../index";

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

const wrapper = mount(<SubHeader>Test Children</SubHeader>);

describe("SubHeader", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("converts children into a snaked cased id", () => {
    expect(wrapper.find("h3").first().props().id).toEqual("test-children");
  });
});
