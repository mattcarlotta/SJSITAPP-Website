import { mount, ReactWrapper } from "enzyme";
import Modal from "../index";

const onClick = jest.fn();
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

const initProps = {
  children: <h1>Example Modal Content</h1>,
  dataTestId: "modal-test",
  isOpen: true
};

describe("Modal", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Modal {...initProps} />);
  });

  afterEach(() => {
    onClick.mockClear();
  });

  it("initially doesn't render anything", () => {
    wrapper.setProps({ isOpen: false });

    expect(wrapper.find("[data-testid='modal']")).not.toExist();
  });

  it("renders a modal with some sample content without errors", () => {
    expect(wrapper.find("[data-testid='modal']")).toExist();
  });

  it("redirects the user back to home if closed", () => {
    wrapper.find("[data-testid='close-modal']").first().simulate("click");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("calls a passed in 'onClick' prop function", () => {
    wrapper.setProps({ onClick });

    wrapper.find("[data-testid='close-modal']").first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("doesn't call closeModal function when 'disableClickHandler' is true", () => {
    wrapper.setProps({ onClick, disableClickHandler: true });

    expect(wrapper.find("[data-testid='modal-clickhandler']")).toHaveProp(
      "closeModal",
      undefined
    );
  });
});
