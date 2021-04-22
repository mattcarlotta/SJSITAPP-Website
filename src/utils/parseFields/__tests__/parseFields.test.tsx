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
    const date = moment(new Date("2019-12-17T01:00:00")).format();
    const fields = [
      {
        name: "callTime1",
        label: "Call Time",
        type: "time",
        value: date,
        required: true
      },
      {
        name: "callTime2",
        label: "Call Time",
        type: "time",
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
      moment(new Date("2019-12-17T01:00:00")),
      moment(new Date("2019-12-17T02:00:00"))
    ];

    const callTimes = [
      moment(new Date("2019-12-17T01:00:00")).format(),
      moment(new Date("2019-12-17T02:00:00")).format(),
      moment(new Date("2019-12-17T03:00:00")).format()
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
      // {
      //   name: "seasonDuration",
      //   label: "Call Time",
      //   type: "range",
      //   value: datesRanges,
      //   required: true
      // },
      {
        name: "expirationDate",
        label: "Expiration",
        type: "date",
        value: datesRanges[0].toString(),
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
        type: "time",
        value: callTimes[0],
        required: true
      },
      {
        name: "callTime2",
        label: "Call Time",
        type: "time",
        value: callTimes[1],
        required: true
      },
      {
        name: "callTime3",
        label: "Call Time",
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
        // seasonDuration: [datesRanges[0].format(), datesRanges[1].format()],
        expirationDate: datesRanges[0].toString(),
        callTimes: [callTimes[0], callTimes[1], callTimes[2]],
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
