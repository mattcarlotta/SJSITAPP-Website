import { mount, ReactWrapper } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import Availability from "../index";

const months = [
  moment().startOf("month").format(),
  moment().endOf("month").format()
];

const availability = {
  eventAvailability: [
    {
      id: "123456789",
      label: "Available",
      value: 80
    },
    {
      id: "123456789",
      label: "Unavailable",
      value: 20
    }
  ],
  months
};

const under75Availability = {
  eventAvailability: [
    {
      id: "123456789",
      label: "Available",
      value: 60
    },
    {
      id: "123456789",
      label: "Unavailable",
      value: 40
    }
  ],
  months
};

const emptyAvailability = { eventAvailability: [], months };

const APIURL = "dashboard/availability";
mockApp
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200, emptyAvailability)
  .onGet(APIURL)
  .replyOnce(200, availability)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .reply(200, under75Availability);

describe("Dashboard Availability", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Availability />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors and displays a placeholder", async () => {
    await waitFor(() => {
      expect(findById("dashboard-availability")).toExist();
      expect(findById("loading-events")).toExist();
    });
  });

  it("displays no availability message when no data is returned from API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("no-availability")).toExist();
    });
  });

  it("displays an availability chart when data has been retrieved from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("availability-chart")).toExist();
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
      expect(findById("availability-chart")).toExist();
    });
  });
});
