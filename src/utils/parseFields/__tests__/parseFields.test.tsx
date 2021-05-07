import moment from "~utils/momentWithTimezone";
import parsedFields from "../index";

describe("Parse Fields Helper", () => {
  it("throws an error if missing required parameters", () => {
    try {
      parsedFields([]);
    } catch (error) {
      expect(error).toEqual("You must supply an array of fields!");
    }
  });

  it("doesn't parse empty callTime values", () => {
    const date = moment("2019-12-17T01:00:00").format();
    const fields = [
      {
        name: "callTime1",
        label: "Call Time",
        type: "calltime",
        value: date,
        required: true
      },
      {
        name: "callTime2",
        label: "Call Time",
        type: "calltime",
        value: undefined,
        required: true
      }
    ];

    const nextFields = parsedFields(fields);
    expect(nextFields).toEqual(
      expect.objectContaining({
        callTimes: [date]
      })
    );
  });

  it("parses an array of fields", () => {
    const datesRanges = [
      moment("2019-12-17T01:00:00").format(),
      moment("2019-12-17T02:00:00").format()
    ];

    const callTimes = [
      moment("2019-12-17T01:00:00").format(),
      moment("2019-12-17T02:00:00").format(),
      moment("2019-12-17T03:00:00").format()
    ];

    const fields = [
      {
        name: "email",
        label: "Call Time",
        type: "text",
        value: "test@example.com",
        required: true
      },
      {
        name: "password",
        label: "Call Time",
        type: "password",
        value: "12345",
        required: true
      },
      {
        name: "expirationDate",
        label: "Expiration",
        type: "date",
        value: datesRanges[0],
        required: true
      },
      {
        name: "expirationDate2",
        label: "Expiration",
        type: "date",
        value: undefined,
        required: true
      },
      {
        name: "callTime1",
        label: "Call Time",
        type: "calltime",
        value: callTimes[0],
        required: true
      },
      {
        name: "callTime2",
        label: "Call Time",
        type: "calltime",
        value: callTimes[1],
        required: true
      },
      {
        name: "callTime3",
        label: "Call Time",
        type: "calltime",
        value: callTimes[2],
        required: true
      },
      {
        name: "time",
        label: "Time",
        type: "time",
        value: callTimes[2],
        required: true
      },
      {
        name: "0123456789",
        label: "Call Time",
        type: "radiogroup",
        value: "I want to work.",
        required: true,
        updateEvent: true
      },
      {
        name: "1234567891",
        label: "Call Time",
        type: "radiogroup",
        value: "Available to work.",
        required: true,
        updateEvent: false
      }
    ];

    const nextFields = parsedFields(fields);
    expect(nextFields).toEqual(
      expect.objectContaining({
        email: "test@example.com",
        password: "12345",
        expirationDate: datesRanges[0],
        callTimes: [callTimes[0], callTimes[1], callTimes[2]],
        time: "03:00 am",
        responses: [
          {
            id: "0123456789",
            value: "I want to work.",
            updateEvent: true
          },
          {
            id: "1234567891",
            value: "Available to work.",
            updateEvent: false
          }
        ]
      })
    );
  });
});
