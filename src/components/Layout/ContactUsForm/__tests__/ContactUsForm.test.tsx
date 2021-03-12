import { mount, ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import ContactUsForm from "../index";

jest.mock("~components/App/Toast");

const APIURL = "mail/contact";
const successMessage = "Successfully sent message!";
const errorMessage = "Unable to reach API";
mockApp
  .onPost(APIURL)
  .replyOnce(200, { message: successMessage })
  .onPost(APIURL)
  .reply(400, { err: errorMessage });

describe("Login Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ContactUsForm />);
    findById = (id: string) => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors", () => {
    expect(wrapper.find("form").exists()).toBeTruthy();
  });

  it("doesn't submit the form if a field has errors", () => {
    wrapper.find("form").simulate("submit");
    expect(wrapper.find("Errors")).toHaveLength(3);
  });

  describe("Form Submission", () => {
    beforeEach(async () => {
      findById("select-text").first().simulate("click");

      findById("Admin").first().simulate("click");

      findById("subject")
        .first()
        .simulate("change", {
          target: { name: "subject", value: "Test Subject" }
        });

      findById("message")
        .first()
        .simulate("change", {
          target: { name: "message", value: "Test Message" }
        });

      wrapper.update();
      wrapper.find("form").simulate("submit");

      await waitFor(() => {
        expect(findById("submitting")).toExist();
      });
    });

    it("successful validation calls updateEvent with fields", async () => {
      await waitFor(() => {
        wrapper.update();
        expect(toast).toHaveBeenCalledWith({
          message: successMessage,
          type: "success"
        });
        expect(findById("submitting")).not.toExist();
      });
    });

    it("on submission error, falls back to the form", async () => {
      await waitFor(() => {
        wrapper.update();
        expect(toast).toHaveBeenCalledWith({
          message: errorMessage,
          type: "error"
        });
        expect(findById("submitting")).not.toExist();
      });
    });
  });
});
