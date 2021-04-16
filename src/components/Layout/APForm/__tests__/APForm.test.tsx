import { ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import moment from "~utils/momentWithTimezone";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import withProviders from "~utils/withProviders";
import APForm from "../index";

const startMonth = moment().startOf("month").startOf("day").format();
const endMonth = moment().startOf("month").endOf("day").format();
const expirationDate = moment()
  .startOf("month")
  .add(7, "days")
  .startOf("day")
  .format();

const form = {
  seasonId: "20202021",
  startMonth,
  endMonth,
  expirationDate,
  sendEmailNotificationsDate: startMonth,
  notes: "Test",
  sentEmails: false
};

jest.mock("~components/App/Toast");

const apiQuery = jest.fn();

const initProps = {
  apiQuery,
  id: "",
  submitText: "Create"
};

const APIURL = "seasons/all/ids";
const mockErrorMessage = "Unable to reach API";
const mockSuccessMessage = "Successfully created AP form!";
mockApp
  .onGet(APIURL)
  .replyOnce(404) // loading
  .onGet(APIURL)
  .replyOnce(404) // error fetching season ids
  .onGet(APIURL)
  .reply(200, { seasonIds: ["20202021", "20192020"] });

const { push, replace } = useRouter();

apiQuery
  .mockImplementationOnce(() => Promise.reject(mockErrorMessage))
  .mockImplementationOnce(() =>
    Promise.resolve({ data: { message: mockSuccessMessage } })
  );

describe("Contact Us Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<APForm {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    (push as jest.Mock).mockClear();
    (replace as jest.Mock).mockClear();
  });

  it("renders a loading icon", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("loading-ap-form")).toExist();
    });
  });

  it("pushes back to viewall forms page on failing to fetch season ids", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(replace).toHaveBeenCalledWith("/employee/forms/viewall?page=1");
    });
  });

  it("doesn't submit the form if form fields have errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("Errors")).toHaveLength(4);
    });
  });

  it("initializes form fields with 'form' data", async () => {
    wrapper = withProviders(<APForm {...initProps} form={form} />);

    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
      expect(
        findById("seasonId-selected-value").first().prop("value")
      ).toBeDefined();
      expect(findById("notes").first().prop("value")).toBeDefined();
      [
        "startMonth",
        "endMonth",
        "expirationDate",
        "sendEmailNotificationsDate"
      ].forEach(field => {
        expect(
          wrapper.find(`input[name='${field}']`).prop("value")
        ).toBeDefined();
      });
    });
  });

  describe("Form Submission", () => {
    beforeEach(async () => {
      await waitFor(() => {
        wrapper.update();
        expect(findById("ap-form")).toExist();
      });

      findById("seasonId")
        .find("[data-testid='select-text']")
        .first()
        .simulate("click");

      findById("20202021").first().simulate("click");

      const setMUIDateField = async (
        field: string,
        index: number
      ): Promise<void> => {
        wrapper.find(`input[name='${field}']`).simulate("click");

        await waitFor(() => {
          wrapper.update();
          expect(wrapper.find(".MuiDialog-container")).toExist();
          expect(wrapper.find(".MuiDialog-root")).toExist();
        });

        wrapper
          .find(".MuiDialog-root")
          .at(index)
          .find(".MuiDialogActions-root")
          .find("button")
          .at(1)
          .simulate("click");

        await waitFor(() => {
          wrapper.update();
          expect(wrapper.find(".MuiDialog-container")).not.toExist();
        });

        await waitFor(() => {
          wrapper.update();
          expect(
            wrapper.find(`input[name='${field}']`).prop("value")
          ).toBeDefined();
        });
      };

      await setMUIDateField("startMonth", 0);
      await setMUIDateField("endMonth", 1);
      await setMUIDateField("expirationDate", 2);
    });

    it("on submission error, falls back to the form", async () => {
      wrapper.find("form").simulate("submit");

      await waitFor(() => {
        expect(findById("submitting")).toExist();
      });

      await waitFor(() => {
        wrapper.update();
        expect(toast).toHaveBeenCalledWith({
          message: mockErrorMessage,
          type: "error"
        });
        expect(findById("submitting")).not.toExist();
      });
    });

    it("on successful validation creates a new AP form", async () => {
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
        expect(push).toHaveBeenCalledWith("/employee/forms/viewall?page=1");
      });
    });
  });
});
