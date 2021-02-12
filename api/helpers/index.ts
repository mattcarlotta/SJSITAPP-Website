import type { Request, Response } from "express";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import random from "lodash.random";
import sortBy from "lodash.sortby";
import mongoose from "mongoose";
import moment from "moment-timezone";
import Event, {
  IEvent,
  IEventDocument,
  TEventAccResponses,
  TEventAggResponses,
  TEventCountForMember,
  TEventEmptySchedule,
  TEventMemberAvailability,
  TEventMemberAvailabilityAvg,
  TEventMemberAvailabilityAvgs,
  TEventSchedule,
  TEventScheduleIds
} from "../models/event";
import User, {
  IUserDocument,
  TActiveMembers,
  TScheduledEventsForMember
} from "../models/user";
import {
  newAuthorizationKeyTemplate,
  newStaffTemplate
} from "../services/templates";

const toMongooseId = mongoose.Types.ObjectId;

moment.tz.setDefault("America/Los_Angeles");

const responseTypes = [
  "I want to work.",
  "Available to work.",
  "Prefer not to work.",
  "Not available to work.",
  "No response."
];

const COLORS = ["#247BA0", "#2A9D8F", "#F4A261", "#FF8060", "#BFBFBF"];

const arraysEqual = (a: Array<any>, b: Array<any>): boolean =>
  // eslint-disable-next-line
  JSON.stringify(a) == JSON.stringify(b);

const toAverage = (num: number, total: number) =>
  parseInt(((num / total) * 100).toFixed(2), 10);

/**
 * Helper function to generate an auth token email.
 *
 * @function createAuthMail
 * @param authorizedEmail
 * @param token
 * @param expiration
 * @param role
 * @returns {object}
 */
const createAuthMail = (
  authorizedEmail: string,
  token: string,
  expiration: moment.Moment,
  role: string
): {
  sendTo: string;
  sendFrom: string;
  sendDate: Date;
  subject: string;
  message: string;
} => {
  const isEmployee = role === "employee";
  return {
    sendTo: `${authorizedEmail}`,
    sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
    sendDate: moment().tz("America/Los_Angeles").toDate(),
    subject: `${
      isEmployee ? "Congratulations" : "Welcome"
    }, you have been invited to join the San Jose Sharks Ice Team!`,
    message: isEmployee
      ? newAuthorizationKeyTemplate(token, expiration.calendar())
      : newStaffTemplate(token, expiration.calendar())
  };
};

const available = Array.from(responseTypes).splice(0, 2);
/**
 * Helper function to generate a user event availability based upon their responses.
 *
 * @function createMemberAvailabilityAverage
 * @param object - eventCounts: number, eventResponses: an array of responses
 * @returns {array}
 */
const createMemberAvailabilityAverage = ({
  eventCounts,
  eventResponses
}: {
  eventCounts: number;
  eventResponses: TEventAggResponses;
}): TEventMemberAvailabilityAvg => {
  let avail = 0;
  let unavail = 0;
  eventResponses.forEach(({ responses }) => {
    responses.forEach(response => {
      if (available.includes(response)) {
        avail += 1;
      } else {
        unavail += 1;
      }
    });
  });

  return [
    {
      id: "available",
      label: "available",
      value: toAverage(avail, eventCounts)
    },
    {
      id: "unavailable",
      label: "unavailable",
      value: toAverage(unavail, eventCounts)
    }
  ];
};

/**
 * Helper function to generate all user event availability based upon their responses and combine the results by their first and last name.
 *
 * @function createMemberAvailabilityAverages
 * @param object -  eventCounts: number, eventResponses: [_id, availability], members: [_id, name]
 * @returns {array}
 */
const createMemberAvailabilityAverages = ({
  eventCounts,
  eventResponses,
  members
}: {
  eventCounts: number;
  eventResponses: TEventMemberAvailability;
  members: TActiveMembers;
}): TEventMemberAvailabilityAvgs =>
  members.reduce((acc, member) => {
    const hasResponse =
      !isEmpty(eventResponses) &&
      eventResponses.find(
        doc => typeof doc._id === "object" && doc._id!.equals(member._id)
      );

    return [
      ...acc,
      {
        id: member.name,
        availability: hasResponse
          ? toAverage(hasResponse.availability, eventCounts)
          : 0
      }
    ];
  }, [] as TEventMemberAvailabilityAvgs);

/**
 * Helper function to generate a unique token.
 *
 * @function
 * @returns {token}
 */
const tokenGenerator = (str: string, tlen: number): string => {
  const arr = [...str];
  const max = arr.length - 1;
  let token = "";
  for (let i = 0; i < tlen; i += 1) {
    const int = random(max);
    token += arr[int];
  }
  return token;
};

/**
 * Helper function to clear the user session.
 *
 * @function
 * @param {object} res
 * @param {number} status
 * @param {string} err
 * @returns {response}
 */
const clearSession = (
  req: Request,
  res: Response,
  status: number,
  err?: string
): Response => {
  req.session = null;

  return res.status(status).json({ role: "guest", err });
};

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createColumnSchedule
 * @param event - an object containing event details
 * @param members - an array of members
 * @returns {array}
 */
const createColumnSchedule = ({
  event,
  members
}: {
  event: IEvent;
  members: Array<Record<"_id", mongoose.Types.ObjectId>>;
}): TEventSchedule => [
  {
    _id: "employees",
    title: "Employees",
    employeeIds: members.reduce(
      (result, member: Record<"_id", mongoose.Types.ObjectId>) => {
        const isScheduled = event.scheduledIds!.some(
          id => typeof member._id === "object" && member._id.equals(id)
        );

        return !isScheduled ? [...result, member._id] : result;
      },
      [] as Array<mongoose.Types.ObjectId>
    )
  },
  ...event.schedule.map(({ _id, employeeIds }) => ({
    _id,
    title: moment(_id, "hh:mm a").format("hh:mm a"),
    employeeIds
  }))
];

/**
 * Helper function to create a current date.
 *
 * @function
 * @returns {Date}
 */
const createDate = (date?: Date | string): moment.Moment =>
  moment(date || Date.now()).tz("America/Los_Angeles");

/**
 * Helper function to generate a user event count based upon their scheduled events.
 *
 * @function createMemberEventCount
 * @param members - an array of members
 * @param memberEventCounts - an array of members and their eventCount
 * @returns {array}
 */
const createMemberEventCount = ({
  members,
  memberEventCounts
}: {
  members: TActiveMembers;
  memberEventCounts: TScheduledEventsForMember;
}): TEventCountForMember =>
  members.map(member => {
    const hasEventCount =
      !isEmpty(memberEventCounts) &&
      memberEventCounts.find(doc => doc._id.equals(member._id));

    return {
      name: member.name,
      "Event Count": hasEventCount ? hasEventCount.eventCount : 0
    };
  });

/**
 * Helper function to generate a user event count based upon their scheduled events.
 *
 * @function createMemberResponseCount
 * @param eventResponses - an array of responses
 * @returns {array}
 */

const createMemberResponseCount = (
  eventResponses: TEventAggResponses
): TEventAccResponses =>
  eventResponses.reduce((acc, { responses }) => {
    responseTypes.forEach((rspType, index) => {
      acc.push({
        id: rspType,
        label: rspType,
        color: COLORS[index],
        value: responses.filter(rsp => rsp === rspType).length
      });
    });

    return acc;
  }, [] as TEventAccResponses);

/**
 * Helper function to create a 64 length random string.
 *
 * @function createRandomToken
 * @returns {String}
 */
const createRandomToken = (): string =>
  tokenGenerator(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.",
    64
  );

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createSchedule
 * @param callTimes - an array of dates
 * @returns {object}
 */
const createSchedule = (callTimes: Array<string>): TEventEmptySchedule =>
  callTimes.map(time => ({
    _id: time,
    employeeIds: []
  }));

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createUserSchedule
 * @param event - an object containing event details
 * @param members - an array of members
 * @returns {array}
 */
const createUserSchedule = ({
  event,
  members
}: {
  event: IEvent;
  members: Array<Record<"_id", mongoose.Types.ObjectId>>;
}): Array<{
  _id: mongoose.Types.ObjectId;
  response: string;
  notes?: string;
}> => [
  ...members.map(member => {
    const eventResponse = event.employeeResponses!.find(response =>
      response._id.equals(member._id!.toString())
    );

    return {
      ...member,
      response: eventResponse ? eventResponse.response : "No response.",
      notes: eventResponse ? eventResponse.notes : ""
    };
  })
];

/**
 * Helper function to generate a mongo ObjectId.
 *
 * @function convertId
 * @returns {Types.ObjectId}
 */
const convertId = (id: string): mongoose.Types.ObjectId => toMongooseId(id);

/**
 * Helper function to strip and convert template names to snaked lowercase name.
 *
 * @function
 * @returns {string}
 */
const createUniqueName = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-");

/**
 * Helper function to create a 64 length random string.
 *
 * @function createSignupToken
 * @returns {string}
 */
const createSignupToken = (): string =>
  tokenGenerator(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    64
  );

/**
 * Helper function to get 90 days date from current date.
 *
 * @function
 * @returns {month}
 */
const expirationDate = (): moment.Moment =>
  moment().add(90, "days").endOf("day");

/**
 *Helper function to generate table filters.
 *
 * @function generateFilters
 * @param {object} - query
 * @returns {object}
 */

interface Query {
  authorizedEmail?: { $regex: any; $options: string };
  email?: { $regex: any; $options: string };
  endDate?: Date | string;
  eventDate?: Record<string, unknown>;
  endMonth?: Record<string, unknown>;
  eventType?: Record<string, unknown>;
  expirationDate?: Record<string, unknown>;
  firstName?: { $regex: any; $options: string };
  lastName?: { $regex: any; $options: string };
  opponent?: { $regex: any; $options: string };
  seasonId?: { $regex: any; $options: string };
  sendDate?: Record<string, unknown>;
  sentEmails?: any;
  sentEmailReminders?: any;
  startDate?: Record<string, unknown>;
  startMonth?: Record<string, unknown>;
  status?: { $eq: any };
  team?: { $regex: any; $options: string };
  type?: { $regex: any; $options: string };
}
const format = "MM-DD-YYYY";
const generateFilters = (query: Query): Query =>
  !isEmpty(query)
    ? Object.keys(query).reduce((acc, item) => {
        switch (item) {
          case "authorizedEmail": {
            acc.authorizedEmail = { $regex: query[item], $options: "i" };
            break;
          }
          case "email": {
            acc.email = { $regex: query[item], $options: "i" };
            break;
          }
          case "endDate": {
            acc.eventDate = {
              ...acc.eventDate,
              $lte: moment(query[item], format).endOf("day").format()
            };
            break;
          }
          case "endMonth": {
            acc.endMonth = {
              $lte: moment(query[item], format).endOf("day").format()
            };
            break;
          }
          case "expirationDate": {
            acc.expirationDate = {
              $gte: moment(query[item], format).startOf("day").format(),
              $lte: moment(query[item], format).endOf("day").format()
            };
            break;
          }
          case "firstName": {
            acc.firstName = { $regex: query[item], $options: "i" };
            break;
          }
          case "lastName": {
            acc.lastName = { $regex: query[item], $options: "i" };
            break;
          }
          case "opponent": {
            acc.opponent = { $regex: query[item], $options: "i" };
            break;
          }
          case "seasonId": {
            acc.seasonId = { $regex: query[item], $options: "i" };
            break;
          }
          case "sendDate": {
            acc.sendDate = {
              $gte: moment(query[item], format).startOf("day").format(),
              $lte: moment(query[item], format).endOf("day").format()
            };
            break;
          }
          case "sentEmails": {
            acc.sentEmails = { $eq: query[item] === "sent" };
            break;
          }
          case "sentEmailReminders": {
            acc.sentEmailReminders = { $eq: query[item] === "sent" };
            break;
          }
          case "startDate": {
            acc.eventDate = {
              ...acc.eventDate,
              $gte: moment(query[item], format).startOf("day").format()
            };
            break;
          }
          case "startMonth": {
            acc.startMonth = {
              $gte: moment(query[item], format).startOf("day").format()
            };
            break;
          }
          case "status": {
            acc.status = { $eq: query[item] };
            break;
          }
          case "team": {
            acc.team = { $regex: query[item], $options: "i" };
            break;
          }
          case "type": {
            acc.eventType = { $regex: query[item], $options: "i" };
            break;
          }
          default: {
            break;
          }
        }
        return acc;
      }, {} as Query)
    : {};

/**
 * Helper function to generate a date.
 *
 * @function getEndOfDay
 * @param date
 * @returns {string}
 */
const getEndOfDay = (): string => moment().endOf("day").format();

/**
 * Helper function to get event counts.
 *
 * @function getEndOfDay
 * @param startMonth
 * @param endMonth
 * @returns {object}
 */
const getEventCounts = (
  startMonth: Date | string,
  endMonth: Date | string
): mongoose.Query<number, IEventDocument> =>
  Event.countDocuments({
    eventDate: {
      $gte: moment(startMonth).format(),
      $lte: moment(endMonth).format()
    }
  });

/**
 * Helper function to generate a date range.
 *
 * @function getMonthDateRange
 * @param date
 * @returns {object} The startOfMonth and endOfMonth
 */
const getMonthDateRange = (
  date: Date | string
): { startOfMonth: moment.Moment; endOfMonth: moment.Moment } => {
  const startOfMonth = moment(date).startOf("month");
  const endOfMonth = moment(date).endOf("month");

  return { startOfMonth, endOfMonth };
};

/**
 * Helper function to generate a date.
 *
 * @function getStartOfDay
 * @param date
 * @returns {string}
 */
const getStartOfDay = (): string => moment().startOf("day").format();

/**
 * Helper function to generate a date range.
 *
 * @function getUsers
 * @param match - user role
 * @param project - projected data structure
 * @returns {Promise} An array of members sorted by last name
 */
const getUsers = async ({
  match,
  project
}: {
  match: Record<string, unknown>;
  project: Record<string, unknown>;
}): Promise<Array<Record<string, unknown>>> =>
  User.aggregate([
    {
      $match: match
    },
    { $sort: { lastName: 1 } },
    {
      $project: project
    }
  ]);

/**
 * Helper function to find an event by id.
 *
 * @function findEventById
 * @param _id
 * @returns {(object|undefined)}
 */
// const findEventById = (_id: string): any =>
//   Event.findOne({ _id }, { __v: 0 }).lean();

/**
 * Find a single member.
 *
 * @function findMember
 * @param _id
 * @returns {(object|undefined)}
 */
// const findMember = (_id: string): Record<string, unknown> =>
//   User.findOne({ _id }, { password: 0, token: 0, __v: 0 });

/**
 * Find all member availability between a date range.
 *
 * @function findMemberAvailabilty
 * @returns {object} -
    eventAvailability: { eventCounts, eventResponses }, memberResponseCount, memberScheduleEvents: [
     { id: "scheduled", events: scheduledCount }, { id: "available", events: eventCounts }]
 */
const findMemberAvailabilty = async (
  existingMember: IUserDocument,
  selectedDate: string,
  res: Response
): Promise<Response> => {
  const { startOfMonth, endOfMonth } = getMonthDateRange(selectedDate);

  const eventCounts = await getEventCounts(
    startOfMonth.toDate(),
    endOfMonth.toDate()
  );
  /* instanbul ignore next */
  if (eventCounts === 0) {
    return res.status(200).send({});
  }

  const eventResponses = await Event.aggregate([
    {
      $match: {
        eventDate: {
          $gte: startOfMonth.toDate(),
          $lte: endOfMonth.toDate()
        }
      }
    },
    {
      $addFields: {
        employeeResponses: {
          $map: {
            input: {
              $filter: {
                input: "$employeeResponses",
                cond: {
                  $eq: ["$$this._id", existingMember._id]
                }
              }
            },
            in: "$$this.response"
          }
        }
      }
    },
    {
      $group: {
        _id: null,
        responses: {
          $push: {
            $ifNull: [
              { $arrayElemAt: ["$employeeResponses", 0] },
              "No response."
            ]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        responses: 1
      }
    }
  ]);

  const scheduledCount: number = await Event.countDocuments({
    eventDate: {
      $gte: startOfMonth.toString(),
      $lte: endOfMonth.toString()
    },
    scheduledIds: {
      $in: [existingMember.id]
    }
  });

  return res.status(200).json({
    eventAvailability: createMemberAvailabilityAverage({
      eventCounts,
      eventResponses
    }),
    memberResponseCount: createMemberResponseCount(eventResponses),
    memberScheduleEvents: [
      {
        id: "scheduled",
        events: scheduledCount
      },
      {
        id: "available",
        events: eventCounts
      }
    ]
  });
};

/**
 * Find all events between a date range.
 *
 * @function findMemberEvents
 * @returns {object} - events
 */
const findMemberEvents = async (
  existingMember: IUserDocument,
  selectedDate: Date | string
): Promise<Array<Record<string, unknown>>> => {
  const { startOfMonth, endOfMonth } = getMonthDateRange(selectedDate);

  return Event.aggregate([
    {
      $match: {
        eventDate: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }
    },
    { $unwind: "$employeeResponses" },
    { $match: { "employeeResponses._id": existingMember._id } },
    { $sort: { eventDate: 1 } },
    {
      $group: {
        _id: null,
        eventResponses: {
          $push: {
            _id: "$_id",
            team: "$team",
            opponent: "$opponent",
            eventDate: "$eventDate",
            eventType: "$eventType",
            eventNotes: "$notes",
            location: "$location",
            employeeResponse: "$employeeResponses.response",
            employeeNotes: "$employeeResponses.notes"
          }
        }
      }
    },
    { $project: { _id: 0, eventResponses: 1 } }
  ]);
};

/**
 * Helper function to parse req.session.
 *
 * @function parseSession
 * @returns {string}
 */
const parseSession = (req: Request): string | undefined =>
  get(req, ["session", "user", "id"]);

/**
 * Helper function to send an error to the LOCALHOST.
 *
 * @function
 * @param err - error message
 * @param statusCode - status code error
 * @param res - res object
 * @returns
 */
const sendError = (err: Error, statusCode: number, res: Response): Response =>
  res.status(statusCode).json({ err: err.toString() });

/**
 * Helper function to sort a scheduled ids list based upon last name.
 *
 * @function sortScheduledUsersByLastName
 * @param event - an array containing event details
 * @returns {array}
 */
const sortScheduledUsersByLastName = (events: Array<IEvent>): Array<IEvent> =>
  !isEmpty(events)
    ? events.map(({ scheduledIds, ...rest }) => ({
        ...rest,
        scheduledIds: sortBy(scheduledIds, "lastName")
      }))
    : [];

/**
 * Helper function to check if an array contains duplicate values.
 *
 * @function
 * @returns {boolean}
 */
const uniqueArray = (arr: Array<any>): boolean =>
  arr.length === new Set(arr).size;

/**
 * Helper function to convert stringified ids to objectids.
 *
 * @function updateScheduleIds
 * @param schedule - an array of ids
 * @returns {array}
 */
const updateScheduleIds = (schedule: TEventScheduleIds): TEventSchedule =>
  schedule.reduce(
    (result, { employeeIds }) => [
      ...result,
      ...employeeIds.map(id => toMongooseId(id))
    ],
    [] as any
  );

export {
  arraysEqual,
  clearSession,
  convertId,
  createAuthMail,
  createColumnSchedule,
  createDate,
  createMemberAvailabilityAverage,
  createMemberAvailabilityAverages,
  createMemberEventCount,
  createMemberResponseCount,
  createRandomToken,
  createSchedule,
  createUserSchedule,
  createSignupToken,
  createUniqueName,
  expirationDate,
  // findEventById,
  // findMember,
  findMemberAvailabilty,
  findMemberEvents,
  generateFilters,
  getEndOfDay,
  getEventCounts,
  getMonthDateRange,
  getStartOfDay,
  getUsers,
  moment,
  parseSession,
  sendError,
  sortScheduledUsersByLastName,
  toMongooseId,
  uniqueArray,
  updateScheduleIds
};
