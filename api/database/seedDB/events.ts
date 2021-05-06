import Event from "../../models/event";
import { createSchedule, moment } from "../../helpers";
import type { IUserDocument } from "../../models/user";

/**
 * Function to seed the testing Mongo database with events.
 *
 * @function
 * @param {currentSeason} string
 * @param {scheduleUser} IUserDocument
 * @returns
 */
export const seedEvents = async (
  currentSeason: string,
  scheduledUser: IUserDocument
): Promise<void> => {
  const newEventCallTimes = [
    "2019-08-09T17:45:26-07:00",
    "2019-08-09T18:15:26-07:00",
    "2019-08-09T18:30:26-07:00",
    "2019-08-09T19:00:26-07:00"
  ];

  const newEvent = {
    team: "San Jose Sharks",
    opponent: "Winnipeg Jets",
    eventType: "Game",
    location: "Test Location",
    callTimes: newEventCallTimes,
    uniform: "Teal Jersey",
    seasonId: currentSeason,
    eventDate: "2019-02-10T02:30:31.834Z",
    scheduledIds: [scheduledUser._id],
    schedule: [
      {
        _id: "2019-02-09T17:45:26-07:00",
        employeeIds: [scheduledUser._id]
      },
      {
        _id: "2019-02-09T18:15:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-02-09T18:30:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-02-09T19:00:26-07:00",
        employeeIds: []
      }
    ],
    sentEmailReminders: false,
    employeeResponses: [
      {
        _id: scheduledUser._id,
        notes: "",
        response: "I want to work."
      }
    ]
  };

  const gameTomorrow = {
    team: "San Jose Sharks",
    opponent: "Detroit Red Wings",
    eventType: "Game",
    location: "Test Location",
    callTimes: newEventCallTimes,
    uniform: "Teal Jersey",
    seasonId: currentSeason,
    eventDate: moment().add(1, "day").format(),
    scheduledIds: [scheduledUser._id],
    schedule: [
      {
        _id: "2019-02-09T17:45:26-07:00",
        employeeIds: [scheduledUser._id]
      },
      {
        _id: "2019-02-09T18:15:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-02-09T18:30:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-02-09T19:00:26-07:00",
        employeeIds: []
      }
    ],
    sentEmailReminders: false,
    employeeResponses: [
      {
        _id: scheduledUser._id,
        notes: "",
        response: "I want to work."
      }
    ]
  };

  const newEventCallTimes2 = ["2019-08-09T19:00:38-07:00"];

  const newEvent2 = {
    team: "San Jose Barracuda",
    opponent: "San Diego Gulls",
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes2,
    uniform: "Barracuda Jacket",
    seasonId: currentSeason,
    eventDate: "2019-08-11T02:30:30.036Z",
    schedule: createSchedule(newEventCallTimes2),
    sentEmailReminders: false
  };

  const newEventCallTimes3 = [
    "2019-08-19T17:15:43-07:00",
    "2019-08-19T17:45:43-07:00",
    "2019-08-19T18:15:43-07:00",
    "2019-08-19T19:00:43-07:00"
  ];

  const newEvent3 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes3,
    uniform: "Sharks Teal Jersey",
    eventDate: "2019-08-21T02:30:36.000Z",
    notes: "",
    opponent: "Vegas Golden Knights",
    seasonId: currentSeason,
    team: "San Jose Sharks",
    employeeResponses: [
      {
        _id: scheduledUser._id,
        response: "I want to work.",
        notes: ""
      }
    ],
    schedule: createSchedule(newEventCallTimes3),
    sentEmailReminders: false
  };

  const newEventCallTimes4 = [
    "2019-10-19T17:15:43-07:00",
    "2019-10-19T17:45:43-07:00",
    "2019-10-19T18:15:43-07:00",
    "2019-10-19T19:00:43-07:00"
  ];

  const newEvent4 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes4,
    uniform: "Sharks Teal Jersey",
    eventDate: "2019-10-21T02:30:36.000Z",
    notes: "",
    opponent: "Dallas Stars",
    seasonId: currentSeason,
    team: "San Jose Sharks",
    employeeResponses: [
      {
        _id: scheduledUser._id,
        response: "I want to work.",
        notes: ""
      }
    ],
    schedule: createSchedule(newEventCallTimes4),
    sentEmailReminders: false
  };

  const newEventCallTimes5 = [
    "2019-10-31T17:15:43-07:00",
    "2019-10-31T17:45:43-07:00",
    "2019-10-31T18:15:43-07:00",
    "2019-10-31T19:00:43-07:00"
  ];

  const newEvent5 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes5,
    uniform: "Sharks Teal Jersey",
    eventDate: "2019-10-31T02:30:36.000Z",
    notes: "",
    opponent: "Arizona Coyotes",
    seasonId: currentSeason,
    team: "San Jose Sharks",
    schedule: createSchedule(newEventCallTimes5),
    sentEmailReminders: false
  };

  const newEventCallTimes6 = ["2019-09-06T16:00:00-07:00"];

  const newEvent6 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes6,
    uniform: "Barracuda Jacket",
    eventDate: "2019-09-06T16:30:36.000Z",
    notes: "",
    opponent: "San Diego Gulls",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: createSchedule(newEventCallTimes6),
    sentEmailReminders: false
  };

  const newEventCallTimes7 = ["2019-09-07T16:00:00-07:00"];

  const newEvent7 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes7,
    uniform: "Barracuda Jacket",
    eventDate: "2019-09-07T16:30:36.000Z",
    notes: "Star Wars night!",
    opponent: "San Diego Gulls",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: createSchedule(newEventCallTimes7),
    sentEmailReminders: false
  };

  const newEventCallTimes8 = ["2019-09-08T16:00:00-07:00"];

  const newEvent8 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes8,
    uniform: "Barracuda Jacket",
    eventDate: "2019-09-08T16:30:36.000Z",
    notes: "Bring a dog!",
    opponent: "San Diego Gulls",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: createSchedule(newEventCallTimes8),
    sentEmailReminders: false
  };

  const newEventCallTimes9 = ["2019-10-08T16:00:00-07:00"];

  const newEvent9 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes9,
    uniform: "Barracuda Jacket",
    eventDate: "2019-10-08T16:30:36.000Z",
    notes: "Star Wars Night!",
    opponent: "Charlotte Checkers",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: createSchedule(newEventCallTimes9),
    sentEmailReminders: true
  };

  const newEvent10 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes9,
    uniform: "Barracuda Jacket",
    eventDate: "2019-07-08T16:30:36.000Z",
    notes: "Unscheduled game.",
    opponent: "Colorado Eagles",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: createSchedule(newEventCallTimes9),
    sentEmailReminders: true
  };

  const newEvent11 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes9,
    uniform: "Barracuda Jacket",
    eventDate: moment().format(),
    notes: "Unscheduled game.",
    opponent: "Binghamton Devils",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: [
      {
        _id: "2019-02-09T17:45:26-07:00",
        employeeIds: [scheduledUser._id]
      },
      {
        _id: "2019-02-09T18:15:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-02-09T18:30:26-07:00",
        employeeIds: []
      },
      {
        _id: "2019-02-09T19:00:26-07:00",
        employeeIds: []
      }
    ],
    scheduledIds: [scheduledUser._id],
    sentEmailReminders: true,
    employeeResponses: [
      {
        _id: scheduledUser._id,
        response: "I want to work.",
        notes: ""
      }
    ]
  };

  const newEvent12 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes9,
    uniform: "Barracuda Jacket",
    eventDate: moment().add(1, "months").format(),
    notes: "Unscheduled game.",
    opponent: "Grand Rapids Griffins",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    schedule: [
      {
        _id: "2019-02-09T17:45:26-07:00",
        employeeIds: [scheduledUser._id]
      }
    ],
    scheduledIds: [scheduledUser._id],
    sentEmailReminders: true,
    employeeResponses: [
      {
        _id: scheduledUser._id,
        response: "I want to work.",
        notes: ""
      }
    ]
  };

  const newEvent13 = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes9,
    uniform: "Barracuda Jacket",
    eventDate: moment().add(1, "months").format(),
    notes: "Delete this game.",
    opponent: "Laval Rocket",
    seasonId: currentSeason,
    team: "San Jose Barracuda",
    scheduledIds: [scheduledUser._id],
    schedule: [
      {
        _id: "2019-02-09T17:45:26-07:00",
        employeeIds: [scheduledUser._id]
      }
    ],
    sentEmailReminders: true,
    employeeResponses: [
      {
        _id: scheduledUser._id,
        response: "I want to work.",
        notes: ""
      }
    ]
  };

  const autoDeletedEvent = {
    eventType: "Game",
    location: "SAP Center at San Jose",
    callTimes: newEventCallTimes9,
    uniform: "Barracuda Jacket",
    eventDate: moment().add(1, "months").format(),
    notes: "Auto deleted event.",
    opponent: "Chicago Wolves",
    seasonId: "19801981",
    team: "San Jose Barracuda",
    schedule: createSchedule(newEventCallTimes9),
    scheduledIds: [scheduledUser._id],
    sentEmailReminders: true,
    employeeResponses: [
      {
        _id: scheduledUser._id,
        response: "I want to work.",
        notes: ""
      }
    ]
  };

  await Event.insertMany([
    newEvent,
    gameTomorrow,
    newEvent2,
    newEvent3,
    newEvent4,
    newEvent5,
    newEvent6,
    newEvent7,
    newEvent8,
    newEvent9,
    newEvent10,
    newEvent11,
    newEvent12,
    newEvent13,
    autoDeletedEvent
  ]);
};

export default seedEvents;
