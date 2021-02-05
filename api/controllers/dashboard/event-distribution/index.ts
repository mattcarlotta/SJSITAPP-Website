import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import Event from "~models/event";
import { createMemberEventCount, getUsers, moment, sendError } from "~helpers";
import { missingDates } from "~messages/errors";
import type { TActiveMembers } from "~models/user";

/**
 * Retrieves all members event distribution for a bar chart.
 *
 * @function getEventDistribution
 * @returns {Response} - members: { members, memberEventCounts }
 * @throws {Error}
 */
const getEventDistribution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { startDate, endDate } = req.params;
    if (!startDate || !endDate) throw String(missingDates);

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

    const memberEventCounts = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: moment(startDate as string).toDate(),
            $lte: moment(endDate as string).toDate()
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

export default getEventDistribution;
