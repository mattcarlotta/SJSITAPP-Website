import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Event } from "~models";
import {
  createMemberEventCount,
  getMonthDateRange,
  getUsers,
  sendError
} from "~helpers";
import { unableToLocateEvent } from "~messages/errors";
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

    const activeMembers = await getUsers({
      match: {
        role: { $eq: "member" },
        status: "active"
      },
      project: {
        _id: 1,
        name: { $concat: ["$firstName", " ", "$lastName"] }
      }
    });
    /* istanbul ignore next */
    if (isEmpty(activeMembers)) return res.status(200).json({ members: [] });

    const existingEvent = await Event.findOne({ _id: id }, { __v: 0 }).lean();
    if (!existingEvent) throw unableToLocateEvent;

    const { startOfMonth, endOfMonth } = getMonthDateRange(
      existingEvent.eventDate
    );

    const memberEventCounts = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startOfMonth.toDate(),
            $lte: endOfMonth.toDate()
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

    return res.status(200).send(
      createMemberEventCount({
        members: activeMembers as TActiveMembers,
        memberEventCounts
      })
    );
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberEventCounts;
