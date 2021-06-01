import isEmpty from "lodash.isempty";
import { Types } from "mongoose";
import type { Request, Response } from "express";
import { Event } from "~models";
import {
  createColumnSchedule,
  createUserSchedule,
  isValidObjectId,
  getUsers,
  sendError
} from "~helpers";
import {
  missingEventId,
  unableToLocateEvent,
  unableToLocateMembers
} from "~messages/errors";

/**
 * Retrieves a single event for scheduling form.
 *
 * @function getEventForScheduling
 * @returns {Response}
 * {
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
    if (!isValidObjectId(_id)) throw missingEventId;

    const event = await Event.findOne({ _id }, { __v: 0 }).lean();
    if (!event) throw unableToLocateEvent;

    const members = await getUsers({
      match: { role: { $eq: "member" }, status: "active" },
      project: { avatar: 1, firstName: 1, lastName: 1 }
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    return res.status(200).json({
      columns: createColumnSchedule({
        event,
        members: members as Array<Record<"_id", Types.ObjectId>>
      }),
      event,
      users: createUserSchedule({
        event,
        members: members as Array<Record<"_id", Types.ObjectId>>
      })
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getEventForScheduling;
