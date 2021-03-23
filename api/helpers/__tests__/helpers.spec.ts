import mongoose from "mongoose";
import { connectToDB } from "~database";
import { User } from "~models";
import { IEvent, TEventAggResponses } from "~models/event";
import {
  createDate,
  createColumnSchedule,
  createMemberAvailabilityAverage,
  createMemberEventCount,
  createMemberResponseCount,
  createRandomToken,
  createSignupToken,
  createUniqueName,
  createUserSchedule,
  convertId,
  moment,
  generateFilters,
  getUsers,
  sortScheduledUsersByLastName
} from "~helpers";
import { IUserDocument } from "~models/user";

describe("Helpers", () => {
  let admin: IUserDocument | null;
  let staff: IUserDocument | null;
  let members: any;
  beforeAll(async () => {
    await connectToDB();
    admin = await User.findOne({ role: "admin" });
    staff = await User.findOne({ role: "staff" });
    members = [
      {
        _id: admin!._id,
        firstName: admin!.firstName,
        lastName: admin!.lastName
      },
      {
        _id: staff!._id,
        firstName: staff!.firstName,
        lastName: staff!.lastName
      }
    ];
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("builds a column for scheduling", async () => {
    const format = "MM-DD-YYYY hh:mm a";
    const callTimeId = moment("2001-05-31T19:00:00-07:00", format);

    const event = {
      schedule: [
        {
          _id: callTimeId.format(),
          employeeIds: [staff!._id]
        }
      ],
      scheduledIds: [staff!._id]
    };

    const column = createColumnSchedule({ event: event as IEvent, members });

    expect(column).toEqual([
      {
        _id: "employees",
        title: "Employees",
        employeeIds: [admin!._id]
      },
      {
        _id: callTimeId.format(),
        title: callTimeId.format(format),
        employeeIds: [staff!._id]
      }
    ]);
  });

  it("builds a users response array for scheduling", async () => {
    const event = {
      employeeResponses: [
        {
          _id: admin!._id,
          response: "I want to work.",
          notes: ""
        }
      ]
    };

    const users = createUserSchedule({ event: event as IEvent, members });

    expect(users).toEqual([
      {
        _id: admin!._id,
        firstName: admin!.firstName,
        lastName: admin!.lastName,
        response: "I want to work.",
        notes: ""
      },
      {
        _id: staff!._id,
        firstName: staff!.firstName,
        lastName: staff!.lastName,
        response: "No response.",
        notes: ""
      }
    ]);
  });

  it("creates a member availability average", () => {
    const eventCounts = 3;
    const eventResponses: TEventAggResponses = [
      {
        responses: ["I want to work.", "Available to work.", "Not available."]
      }
    ];

    const averages = createMemberAvailabilityAverage({
      eventCounts,
      eventResponses
    });

    expect(averages).toEqual([
      {
        id: "available",
        value: 66
      },
      {
        id: "unavailable",
        value: 33
      }
    ]);
  });

  it("returns an member's scheduled event count", () => {
    const members = [
      {
        _id: convertId("5d978d372f263f41cc624727"),
        name: "Test Test"
      },
      {
        _id: convertId("5d978d372f263f41cc624728"),
        name: "Test Test"
      }
    ];

    const memberEventCounts = [
      { _id: convertId("5d978d372f263f41cc624727"), eventCount: 2 }
    ];

    const memberEventCount = createMemberEventCount({
      members,
      memberEventCounts
    });

    expect(memberEventCount).toEqual([
      {
        name: members[0].name,
        "Event Count": 2
      },
      {
        name: members[1].name,
        "Event Count": 0
      }
    ]);
  });

  it("returns a members event response count", () => {
    const eventResponses = [
      {
        _id: null,
        responses: [
          "No response.",
          "No response.",
          "No response.",
          "No response.",
          "No response."
        ]
      }
    ];

    const eventResponseCount = createMemberResponseCount(eventResponses);
    expect(eventResponseCount).toEqual([
      {
        id: "I want to work.",
        value: 0
      },
      {
        id: "Available to work.",
        value: 0
      },
      {
        id: "Prefer not to work.",
        value: 0
      },
      {
        id: "Not available to work.",
        value: 0
      },
      {
        id: "No response.",
        value: 5
      }
    ]);
  });

  it("creates a random 64 character string", () => {
    const token = createRandomToken();
    expect(token).toEqual(expect.any(String));
    expect(token.length).toEqual(64);
  });

  it("creates a random 32 character string", () => {
    const signupToken = createSignupToken();
    expect(signupToken).toEqual(expect.any(String));
    expect(signupToken.length).toEqual(64);
  });

  it("creates a unique snake-cased template string", () => {
    const template = createUniqueName("Employee Newsletter");
    expect(template).toEqual("employee-newsletter");
  });

  it("creates a current Date object", () => {
    const date = "2000-08-09T17:45:26-07:00";
    expect(createDate()).toEqual(expect.any(moment));
    expect(createDate(date)).toEqual(expect.any(moment));
  });

  it("generates a list of mongo filters", () => {
    const format = "MM-DD-YYYY";
    const date = "11-05-2020";
    const startOfDay = moment(date, format).startOf("day").format();
    const endOfDay = moment(date, format).endOf("day").format();

    const authorizedEmail = "test@test.com";
    const email = "a@a.com";
    const firstName = "bob";
    const lastName = "smith";
    const opponent = "ducks";
    const seasonId = "20202021";
    const sentEmails = "sent";
    const sentEmailReminders = "sent";
    const status = "active";
    const team = "sharks";
    const type = "game";

    const query = {
      authorizedEmail,
      email,
      endDate: date,
      endMonth: date,
      expirationDate: date,
      firstName,
      lastName,
      opponent,
      seasonId,
      sendDate: date,
      sentEmails,
      sentEmailReminders,
      startDate: date,
      startMonth: date,
      status,
      team,
      type
    };

    const filters = generateFilters(query);

    expect(filters).toEqual({
      authorizedEmail: { $regex: "test@test.com", $options: "i" },
      email: { $regex: "a@a.com", $options: "i" },
      eventDate: {
        $lte: endOfDay,
        $gte: startOfDay
      },
      endMonth: { $lte: endOfDay },
      expirationDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      firstName: { $regex: "bob", $options: "i" },
      lastName: { $regex: "smith", $options: "i" },
      opponent: { $regex: "ducks", $options: "i" },
      seasonId: { $regex: "20202021", $options: "i" },
      sendDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      sentEmails: { $eq: true },
      sentEmailReminders: { $eq: true },
      startMonth: { $gte: startOfDay },
      status: { $eq: "active" },
      team: { $regex: "sharks", $options: "i" },
      eventType: { $regex: "game", $options: "i" }
    });
  });

  it("grabs all members from the database and projects accordingly", async () => {
    const members = await getUsers({
      match: {
        role: { $ne: "admin" },
        status: "active"
      },
      project: {
        email: {
          $concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"]
        }
      }
    });

    expect(members).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(mongoose.Types.ObjectId),
          email: expect.any(String)
        })
      ])
    );
  });

  it("sorts users by last name", () => {
    const unsortedUsers = [
      {
        scheduledIds: [
          {
            _id: "88",
            firstName: "Matt",
            lastName: "Zebra"
          },
          {
            _id: "99",
            firstName: "Bob",
            lastName: "Aardvark"
          }
        ]
      }
    ];

    const sortedUsers = sortScheduledUsersByLastName(unsortedUsers as IEvent[]);
    expect(sortedUsers).toEqual([
      {
        scheduledIds: [
          {
            _id: "99",
            firstName: "Bob",
            lastName: "Aardvark"
          },
          {
            _id: "88",
            firstName: "Matt",
            lastName: "Zebra"
          }
        ]
      }
    ]);

    const noScheduledUsers: Array<any> = [];
    const noSortedUsers = sortScheduledUsersByLastName(noScheduledUsers);
    expect(noSortedUsers).toEqual(noScheduledUsers);
  });
});
