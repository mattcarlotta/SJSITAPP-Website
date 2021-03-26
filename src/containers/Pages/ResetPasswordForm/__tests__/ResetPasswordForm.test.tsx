import { mount, ReactWrapper } from "enzyme";
import { ResetPasswordForm } from "../index";

const resetPassword = jest.fn();

const initProps = {
  serverError: "",
  resetPassword
};

describe("Reset Password Form", () => {
  let wrapper: ReactWrapper;
  let submitForm: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ResetPasswordForm {...initProps} />);
    submitForm = () => wrapper.find("form").simulate("submit");
  });

  it("renders without errors", () => {
    expect(wrapper.find("form")).toExist();
  });

  it("if there are errors, it doesn't submit the form", () => {
    submitForm();
    expect(resetPassword).toHaveBeenCalledTimes(0);
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      wrapper.find("input").simulate("change", {
        target: { name: "email", value: "example@test.com" }
      });

      submitForm();
    });

    afterEach(() => {
      resetPassword.mockClear();
    });

    it("submits the form after a successful validation", () => {
      expect(wrapper.find("[data-testid='submitting']")).toExist();
      expect(resetPassword).toHaveBeenCalledWith({
        email: "example@test.com"
      });
    });

    it("on submission error, enables the form submit button", () => {
      wrapper.setProps({ serverError: "Example error message." });
      wrapper.update();

      expect(wrapper.find("[data-testid='submit-button']")).toExist();
    });
  });
});
