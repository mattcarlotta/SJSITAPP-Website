import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import Event from "~models/event";
import {
  createMemberEventCount,
  getMonthDateRange,
  getUsers,
  sendError
} from "~helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";
import type { TActiveMembers } from "~models/user";

/**
 * Retrieves members' event counts.
 *
 * @function getMemberEventCounts
 * @returns {object} - members
 * @throws {string}
 */
const getMemberEventCounts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (!id) throw missingEventId;

    const members = await getUsers({
      match: {
        role: { $eq: "employee" },
        status: "active"
      },
      project: {
        _id: 1,
        name: { $concat: ["$firstName", " ", "$lastName"] }
      }
    });
    /* istanbul ignore next */
    if (isEmpty(members)) return res.status(200).json({ members: [] });

    const existingEvent = await Event.findOne({ _id: id }, { __v: 0 }).lean();
    if (!existingEvent) throw unableToLocateEvent;

    const { startOfMonth, endOfMonth } = getMonthDateRange(
      existingEvent.eventDate
    );

    const memberEventCounts = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $unwind: {
          path: "$scheduledIds",
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $group: {
          _id: "$scheduledIds",
          eventCount: { $sum: 1 }
        }
      }
    ]);
    if (isEmpty(memberEventCounts))
      return res.status(200).json({ members: [] });

    return res.status(200).json({
      members: createMemberEventCount({
        members: members as TActiveMembers,
        memberEventCounts
      })
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberEventCounts;
