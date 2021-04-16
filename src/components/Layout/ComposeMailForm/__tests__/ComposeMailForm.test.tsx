import { ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import withProviders from "~utils/withProviders";
import ComposeMailForm from "../index";

jest.mock("~components/App/Toast");

const APIURL = "members/emails";
const mockErrorMessage = "Unable to reach API";
const mockSuccessMessage = "Successfully created AP form!";
mockApp
  .onGet(APIURL)
  .replyOnce(404) // loading
  .onGet(APIURL)
  .replyOnce(404) // error fetching season ids
  .onGet(APIURL)
  .reply(200, [
    "Bob Dole<bobdole@example.com>",
    "Jane Doe<janedoe@example.com>"
  ]);

const { push, replace } = useRouter();

describe("Contact Us Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<ComposeMailForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    (push as jest.Mock).mockClear();
    (replace as jest.Mock).mockClear();
  });

  it("renders a loading placeholder", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("loading-mail-form")).toExist();
    });
  });

  it("pushes back to viewall mail page on failing to fetch member emails", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(replace).toHaveBeenCalledWith("/employee/mail/viewall?page=1");
    });
  });

  it("doesn't submit the form if form fields have errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("compose-mail-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("Errors")).toHaveLength(3);
    });
  });

  it("previews the email within a custom template", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("compose-mail-form")).toExist();
    });

    findById("preview-email-button").simulate("click");

    expect(findById("email-preview")).toExist();
  });

  // describe("Form Submission", () => {
  //   beforeEach(async () => {
  //     await waitFor(() => {
  //       wrapper.update();
  //       expect(findById("ap-form")).toExist();
  //     });

  //     findById("seasonId")
  //       .find("[data-testid='select-text']")
  //       .first()
  //       .simulate("click");

  //     findById("20202021").first().simulate("click");

  //     const setMUIDateField = async (
  //       field: string,
  //       index: number
  //     ): Promise<void> => {
  //       wrapper.find(`input[name='${field}']`).simulate("click");

  //       await waitFor(() => {
  //         wrapper.update();
  //         expect(wrapper.find(".MuiDialog-container")).toExist();
  //         expect(wrapper.find(".MuiDialog-root")).toExist();
  //       });

  //       wrapper
  //         .find(".MuiDialog-root")
  //         .at(index)
  //         .find(".MuiDialogActions-root")
  //         .find("button")
  //         .at(1)
  //         .simulate("click");

  //       await waitFor(() => {
  //         wrapper.update();
  //         expect(wrapper.find(".MuiDialog-container")).not.toExist();
  //       });

  //       await waitFor(() => {
  //         wrapper.update();
  //         expect(
  //           wrapper.find(`input[name='${field}']`).prop("value")
  //         ).toBeDefined();
  //       });
  //     };

  //     await setMUIDateField("startMonth", 0);
  //     await setMUIDateField("endMonth", 1);
  //     await setMUIDateField("expirationDate", 2);
  //   });

  //   it("on submission error, falls back to the form", async () => {
  //     wrapper.find("form").simulate("submit");

  //     await waitFor(() => {
  //       expect(findById("submitting")).toExist();
  //     });

  //     await waitFor(() => {
  //       wrapper.update();
  //       expect(toast).toHaveBeenCalledWith({
  //         message: mockErrorMessage,
  //         type: "error"
  //       });
  //       expect(findById("submitting")).not.toExist();
  //     });
  //   });

  //   it("on successful validation creates a new AP form", async () => {
  //     wrapper.find("form").simulate("submit");

  //     await waitFor(() => {
  //       expect(findById("submitting")).toExist();
  //     });

  //     await waitFor(() => {
  //       wrapper.update();
  //       expect(toast).toHaveBeenCalledWith({
  //         message: mockSuccessMessage,
  //         type: "success"
  //       });
  //       expect(push).toHaveBeenCalledWith("/employee/forms/viewall?page=1");
  //     });
  //   });
  // });
});
