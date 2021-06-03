import { ReactWrapper } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import { defaultFormat } from "~utils/dateFormats";
import EventDistribution from "../index";
import withProviders from "~utils/withProviders";
import { ReactNode } from "~types";

jest.mock("react-resize-detector", () => ({
  __esModule: true,
  default: ({
    children
  }: {
    children: ({
      width,
      targetRef
    }: {
      width: number;
      targetRef: null;
    }) => ReactNode;
  }): ReactNode => children({ width: 600, targetRef: null })
}));

const events = [
  {
    name: "Member 1",
    "Event Count": 1
  },
  {
    name: "Member 2",
    "Event Count": 2
  },
  {
    name: "Member 3",
    "Event Count": 0
  }
];

const startDate = moment().startOf("month").format(defaultFormat);
const endDate = moment().endOf("month").format(defaultFormat);

const previousStartDate = moment().subtract(1, "month").startOf("month");
const previousMonth = previousStartDate.format("MMMM YYYY");
const APIURL = `dashboard/event-distribution?&startDate=${startDate}&endDate=${endDate}`;
const NEXTAPIURL = `dashboard/event-distribution?&startDate=${previousStartDate.format(
  defaultFormat
)}&endDate=${endDate}`;
mockApp
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200, events)
  .onGet(APIURL)
  .replyOnce(200, events)
  .onGet(NEXTAPIURL)
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
      wrapper.update();
      expect(findById("dashboard-event-distribution")).toExist();
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
    });

    // change to previous month
    wrapper
      .find("button.MuiPickersCalendarHeader-iconButton")
      .first()
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("p.MuiTypography-root").first().text()).toEqual(
        previousMonth
      );
    });

    // select first day
    wrapper
      .find(".MuiPickersDay-day")
      .not(".MuiPickersDay-hidden")
      .first()
      .simulate("click");

    // click OK
    wrapper
      .find(".MuiDialogActions-root")
      .find("button")
      .at(1)
      .simulate("click");

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
