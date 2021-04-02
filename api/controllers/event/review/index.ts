import type { Request, Response } from "express";
import { Types } from "mongoose";
import isEmpty from "lodash.isempty";
import { Event } from "~models";
import {
  createColumnSchedule,
  createUserSchedule,
  getUsers,
  sendError
} from "~helpers";
import { unableToLocateEvent, unableToLocateMembers } from "~messages/errors";

/**
 * Retrieves a single event for scheduling form.
 *
 * @function getEventForScheduling
 * @returns {Response}
 * schedule: {
 *  columns: { _id: "employees", title: "Employees", employeeIds: array },
 *  event,
 *  users: { ...member, response: string, notes: string }
 * }
 * @throws {ResponseError}
 */
const getEventForScheduling = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const event = await Event.findOne({ _id }, { __v: 0 }).lean();
    if (!event) throw unableToLocateEvent;

    const members = await getUsers({
      match: { role: { $eq: "member" }, status: "active" },
      project: { avatar: 1, firstName: 1, lastName: 1 }
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    return res.status(200).json({
      schedule: {
        columns: createColumnSchedule({
          event,
          members: members as Array<Record<"_id", Types.ObjectId>>
        }),
        event,
        users: createUserSchedule({
          event,
          members: members as Array<Record<"_id", Types.ObjectId>>
        })
      }
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getEventForScheduling;
