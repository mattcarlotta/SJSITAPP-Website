import Router from "next/router";
import { mount, ReactWrapper } from "enzyme";
import Modal from "../index";

const onClick = jest.fn();

const initProps = {
  children: <h1>Example Modal Content</h1>,
  dataTestId: "modal-test",
  isOpen: false
};

const wrapper: ReactWrapper = mount(<Modal {...initProps} />);

describe("Modal", () => {
  afterEach(() => {
    onClick.mockClear();
  });

  it("renders a modal with some sample content without errors", () => {
    expect(wrapper.find("Modal").exists()).toBeTruthy();
  });

  it("redirects the user back to home if closed", () => {
    wrapper.find("button").simulate("click");
    expect(Router.push).toHaveBeenCalledWith("/");
  });

  it("calls a passed in 'onClick' prop function", () => {
    wrapper.setProps({ onClick });

    wrapper.find("button").simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("doesn't call closeModal function when 'disableClickHandler' is true", () => {
    wrapper.setProps({ onClick, disableClickHandler: true });

    expect(wrapper.find("ClickHandler")).toHaveProp("closeModal", undefined);
  });
});
