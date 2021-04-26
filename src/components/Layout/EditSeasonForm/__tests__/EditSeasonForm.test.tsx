import { ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import { standardFormat, fullyearFormat } from "~utils/dateFormats";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import withProviders from "~utils/withProviders";
import waitFor from "~utils/waitFor";
import EditSeasonForm from "../index";

const startDate = moment().startOf("day");

jest.mock("~components/App/Toast");

const id = "88";
const mockPush = jest.fn();
const mockReplace = jest.fn();

const season = {
  id,
  startDate: startDate.format(),
  endDate: startDate.format()
};

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: {
      id
    },
    asPath: "",
    push: mockPush,
    replace: mockReplace
  })
}));

const FETCHURL = `seasons/edit/${id}`;
const SAVESEASONURL = "seasons/update";

mockApp
  .onGet(FETCHURL)
  .replyOnce(200, season) // renders without errors
  .onGet(FETCHURL)
  .replyOnce(404) // throws error
  .onGet(FETCHURL)
  .reply(200, season); // successfully fetches season by id

mockApp
  .onPut(SAVESEASONURL)
  .replyOnce(404) // fails to submit form
  .onPut(SAVESEASONURL)
  .reply(201, { message: "Successfully updated season!" }); // successfully submits form

describe("EditSeasonForm", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<EditSeasonForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
    (toast as jest.Mock).mockClear();
  });

  it("initially renders a loading placeholder and then renders a form", async () => {
    expect(findById("loading-season")).toExist();

    await waitFor(() => {
      wrapper.update();
      expect(findById("season-form")).toExist();
    });
  });

  it("fails to fetch season by id and pushes back to viewall seasons", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(mockReplace).toHaveBeenCalledWith(
        "/employee/seasons/viewall?page=1"
      );
    });
  });

  it("successfully fetches the season by id and populates the form field values", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("season-form")).toExist();
      expect(findById("seasonId").prop("value")).toEqual(
        `${startDate.format(fullyearFormat)} - ${startDate.format(
          fullyearFormat
        )}`
      );
      expect(wrapper.find("input[name='startDate']").prop("value")).toEqual(
        startDate.format(standardFormat)
      );
      expect(wrapper.find("input[name='endDate']").prop("value")).toEqual(
        startDate.format(standardFormat)
      );
    });
  });

  it("handles failing to submit the Update Season form", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("season-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successfully submitting the Create Season form", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("season-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: "Successfully updated season!"
      });
      expect(mockPush).toHaveBeenCalledWith("/employee/seasons/viewall?page=1");
    });
  });
});
