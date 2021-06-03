import { mount, ReactWrapper } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import moment from "~utils/momentWithTimezone";
import EditMemberForm from "../index";

const updateUserProfile = jest.fn();
const id = "88";
const fields = {
  email: "test@test.com",
  emailReminders: true,
  firstName: "First",
  lastName: "Last",
  role: "member"
};

const initProps = {
  ...fields,
  id,
  avatar: "",
  editRole: true,
  registered: moment().format(),
  serverError: "",
  serverMessage: "",
  status: "active",
  updateUserProfile
};

describe("Edit Member Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  let submitForm: () => void;
  beforeEach(() => {
    wrapper = mount(<EditMemberForm {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
    submitForm = () => wrapper.find("form").simulate("submit");
  });

  afterEach(() => {
    updateUserProfile.mockClear();
  });

  it("renders without errors", () => {
    expect(findById("edit-member-form-container")).toExist();
  });

  it("displays errors when the form is submitted without filled out form fields", () => {
    wrapper = mount(<EditMemberForm {...initProps} email="" />);

    submitForm();

    expect(findById("errors")).toExist();
  });

  it("calls handleChange when a field is updated", () => {
    const value = "123@123.com";

    findById("email").simulate("change", {
      target: { name: "email", value }
    });

    expect(findById("email").prop("value")).toEqual(value);
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      submitForm();
    });

    it("submits the form after a successful validation", async () => {
      await waitFor(() => {
        wrapper.update();
        expect(wrapper.find("[data-testid='submitting']")).toExist();

        expect(updateUserProfile).toHaveBeenCalledWith({
          id,
          ...fields
        });
      });
    });

    it("on submission error, enables the form submit button", () => {
      wrapper.setProps({ serverError: "Example error message." });
      wrapper.update();

      expect(wrapper.find("[data-testid='submit-button']")).toExist();
    });

    it("on submission success, enables the form submit button", () => {
      wrapper.setProps({ serverMessage: "Example success message." });
      wrapper.update();

      expect(wrapper.find("[data-testid='submit-button']")).toExist();
    });
  });
});
