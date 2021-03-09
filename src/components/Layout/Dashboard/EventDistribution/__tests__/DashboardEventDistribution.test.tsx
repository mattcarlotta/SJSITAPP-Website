import { ReactWrapper } from "enzyme";
import waitFor from "~utils/waitFor";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import EventDistribution, { format } from "../index";
import withProviders from "~utils/withProviders";

const events = [
  {
    id: "Member 1",
    "Event Counts": 1
  },
  {
    id: "Member 2",
    "Event Counts": 2
  }
];

const startDate = moment().startOf("month").format(format);
const endDate = moment().endOf("month").format(format);

const APIURL = `dashboard/event-distribution?&startDate=${startDate}&endDate=${endDate}`;
mockApp
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200, events)
  .onGet(APIURL)
  .replyOnce(200, events)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .reply(200);

describe("Dashboard Event Distribution", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<EventDistribution />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors and displays a placeholder", async () => {
    await waitFor(() => {
      expect(findById("dashboard-event-distribution")).toExist();
      expect(findById("loading-events")).toExist();
    });
  });

  it("displays no events message when no data is returned from API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("no-event-distribution")).toExist();
    });
  });

  it("displays an event distribution chart when data has been retrieved from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("event-distribution-chart")).toExist();
    });
  });

  it("retrieves event distribution data from the API on date change", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("event-distribution-chart")).toExist();
    });

    wrapper.find("input[name='startDate']").simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find(".MuiDialog-container")).toExist();
      wrapper
        .find(".MuiDialogActions-root")
        .find("button")
        .at(1)
        .simulate("click");
    });

    await waitFor(() => {
      wrapper.update();
      expect(findById("no-event-distribution")).toExist();
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
      expect(findById("no-event-distribution")).toExist();
    });
  });
});
