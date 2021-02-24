import { mount, ReactWrapper } from "enzyme";
import { NewPasswordForm } from "../index";

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

const updateUserPassword = jest.fn();

const initProps = {
  serverError: "",
  updateUserPassword
};

describe("New Password Form", () => {
  let wrapper: ReactWrapper;
  let submitForm: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<NewPasswordForm {...initProps} />);
    submitForm = () => wrapper.find("form").simulate("submit");
  });

  it("renders without errors", () => {
    expect(wrapper.find("form")).toExist();
  });

  it("if there are errors, it doesn't submit the form", () => {
    submitForm();

    expect(updateUserPassword).toHaveBeenCalledTimes(0);
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      wrapper
        .find("input")
        .simulate("change", { target: { name: "password", value: "12345" } });

      submitForm();
    });

    afterEach(() => {
      updateUserPassword.mockClear();
    });

    it("submits the form after a successful validation", () => {
      expect(wrapper.find("[data-testid='submitting']")).toExist();
      expect(updateUserPassword).toHaveBeenCalledWith({
        password: "12345",
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
