import { mount, ReactWrapper } from "enzyme";
import { LoginForm } from "../index";

const signinUser = jest.fn();

const initProps = {
  serverError: "",
  signinUser
};

describe("Login Form", () => {
  let wrapper: ReactWrapper;
  let submitForm: any;
  beforeEach(() => {
    wrapper = mount(<LoginForm {...initProps} />);
    submitForm = () => wrapper.find("form").simulate("submit");
  });

  // it("doesn't render if a user is already signed in", () => {
  // 	expect(wrapper.find("form").exists()).toBeFalsy();
  // });

  it("renders without errors", () => {
    expect(wrapper.find("form").exists()).toBeTruthy();
  });

  it("if there are errors, it doesn't submit the form", () => {
    submitForm();
    expect(signinUser).toHaveBeenCalledTimes(0);
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      wrapper
        .find("input")
        .first()
        .simulate("change", {
          target: { name: "email", value: "test@email.com" }
        });

      wrapper
        .find("input")
        .at(1)
        .simulate("change", { target: { name: "password", value: "12345" } });

      submitForm();
    });

    afterEach(() => {
      signinUser.mockClear();
    });

    it("submits the form after a successful validation", () => {
      expect(wrapper.find("[data-testid='submitting']")).toExist();
      expect(signinUser).toHaveBeenCalledWith({
        email: "test@email.com",
        password: "12345"
      });
    });

    it("on submission error, enables the form submit button", () => {
      wrapper.setProps({ serverError: "Example error message." });
      wrapper.update();

      expect(wrapper.find("[data-testid='submitting']")).not.toExist();
      expect(wrapper.find("[data-testid='submit-button']")).toExist();
    });
  });
});
