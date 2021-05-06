import { ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import withProviders from "~utils/withProviders";
import ComposeMailForm from "../index";

jest.mock("~components/App/Toast");

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

const APIURL = "members/emails";
const mockSuccessMessage = "Successfully created AP form!";
mockApp
  .onGet(APIURL)
  .replyOnce(404) // loading
  .onGet(APIURL)
  .replyOnce(404) // error fetching member emails
  .onGet(APIURL)
  .reply(200, [
    "Bob Dole<bobdole@example.com>",
    "Jane Doe<janedoe@example.com>"
  ]);

const CREATEAPIURL = "mail/create";
mockApp
  .onPost(CREATEAPIURL)
  .replyOnce(404)
  .onPost(CREATEAPIURL)
  .reply(200, { message: mockSuccessMessage });

describe("Compose Mail Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<ComposeMailForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockPush.mockClear();
    mockReplace.mockClear();
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
      expect(mockReplace).toHaveBeenCalledWith("/employee/mail/viewall?page=1");
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

  it("closes the preview modal", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("compose-mail-form")).toExist();
    });

    findById("preview-email-button").simulate("click");

    expect(findById("email-preview")).toExist();

    findById("close-modal").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("email-preview")).not.toExist();
    });
  });

  describe("Form Submission", () => {
    beforeEach(async () => {
      await waitFor(() => {
        wrapper.update();
        expect(findById("compose-mail-form")).toExist();
      });

      findById("Bob Dole<bobdole@example.com>").first().simulate("click");

      findById("move-items-down").first().simulate("click");

      findById("subject")
        .first()
        .simulate("change", {
          target: { name: "subject", value: "test" }
        });

      findById("message")
        .first()
        .simulate("change", {
          target: { name: "message", value: "test" }
        });
    });

    it("on submission error, falls back to the form", async () => {
      wrapper.find("form").simulate("submit");

      await waitFor(() => {
        expect(findById("submitting")).toExist();
      });

      await waitFor(() => {
        wrapper.update();
        expect(toast).toHaveBeenCalledWith({
          message: "Request failed with status code 404",
          type: "error"
        });
        expect(findById("submitting")).not.toExist();
      });
    });

    it("on successful validation creates a new email", async () => {
      wrapper.find("form").simulate("submit");

      await waitFor(() => {
        expect(findById("submitting")).toExist();
      });

      await waitFor(() => {
        wrapper.update();
        expect(toast).toHaveBeenCalledWith({
          message: mockSuccessMessage,
          type: "success"
        });
        expect(mockPush).toHaveBeenCalledWith("/employee/mail/viewall?page=1");
      });
    });
  });
});
