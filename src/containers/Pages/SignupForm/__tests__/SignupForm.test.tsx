import { mount, ReactWrapper } from "enzyme";
import { SignupForm } from "../index";
import fields from "../Fields";

const signupUser = jest.fn();
const token =
  "GHPtUGSNGwkA1VC4P2O$f05eBQT/HLDR6sdKz2.v8.KzmWn36KsEVCROrLaQzVH5";

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: {
      token
    },
    asPath: ""
  })
}));

const initProps = {
  serverError: "",
  signupUser
};

describe("Signup Form", () => {
  let wrapper: ReactWrapper;
  let submitForm: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SignupForm {...initProps} />);
    submitForm = () => wrapper.find("form").simulate("submit");
  });

  it("renders without errors", () => {
    expect(wrapper.find("form").exists()).toBeTruthy();
  });

  it("initializes and disables the 'token' field when a token is present in the URL", () => {
    const tokenField = wrapper.find("input").first();
    expect(tokenField.prop("disabled")).toBeTruthy();
    expect(tokenField.prop("value")).toEqual(token);
  });

  it("if there are errors, it doesn't submit the form", () => {
    submitForm();

    expect(signupUser).toHaveBeenCalledTimes(0);
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      const values = [token, "test@example.com", "Bob", "Smith", "password123"];
      fields().forEach(({ name }, idx) => {
        wrapper
          .find("input")
          .at(idx)
          .simulate("change", { target: { name, value: values[idx] } });
      });

      submitForm();
    });

    afterEach(() => {
      signupUser.mockClear();
    });

    it("submits the form after a successful validation", () => {
      expect(wrapper.find("[data-testid='submitting']")).toExist();
      expect(signupUser).toHaveBeenCalledWith({
        email: "test@example.com",
        firstName: "Bob",
        lastName: "Smith",
        password: "password123",
        token
      });
    });

    it("on submission error, enables the form submit button", () => {
      wrapper.setProps({ serverError: "Example error message." });
      wrapper.update();

      expect(wrapper.find("[data-testid='submit-button']")).toExist();
    });
  });
});
