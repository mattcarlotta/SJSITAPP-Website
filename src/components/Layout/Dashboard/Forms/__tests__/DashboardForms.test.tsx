import { mount, ReactWrapper } from "enzyme";
import waitFor from "~utils/waitFor";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import Forms from "../index";

const apForm = {
  _id: "123456789",
  startMonth: "2019-08-01T00:00:00.000+00:00",
  endMonth: "2019-09-01T00:00:00.000+00:00",
  expirationDate: moment().add(1, "day").format(),
  eventCounts: 1
};

const APIURL = "dashboard/ap-form";
mockApp
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200, apForm)
  .onGet(APIURL)
  .replyOnce(200, {
    ...apForm,
    expirationDate: "2019-08-07T00:00:00.000+00:00"
  })
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .reply(200);

describe("Dashboard Forms", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Forms />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors and displays a placeholder", async () => {
    await waitFor(() => {
      expect(findById("dashboard-forms")).toExist();
      expect(findById("loading-events")).toExist();
    });
  });

  it("displays no forms message when no data is returned from API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("no-forms")).toExist();
    });
  });

  it("displays an AP Form link when data has been retrieved from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("dashboard-ap-form-link")).toExist();
    });
  });

  it("displays an expired form message when old forms data has been retrieved from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("expired-form")).toExist();
    });
  });

  it("displays an error message when the request to the API failed", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("fetch-error")).toExist();
    });
  });

  it("attempts to reload the component when a request to the API failed", async () => {
    await waitFor(async () => {
      wrapper.update();
      expect(findById("fetch-error")).toExist();
      expect(findById("reload-component")).toExist();
    });

    findById("reload-component").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("no-forms")).toExist();
    });
  });
});
