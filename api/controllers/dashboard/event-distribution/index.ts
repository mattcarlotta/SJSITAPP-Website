import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { Event } from "~models";
import { createMemberEventCount, getUsers, moment, sendError } from "~helpers";
import { missingDates } from "~messages/errors";
import type { TActiveMembers } from "~models/user";

/**
 * Retrieves all members event distribution for a bar chart.
 *
 * @function getEventDistribution
 * @returns {Response} - members: { members, memberEventCounts }
 * @throws {ResponseError}
 */
const getEventDistribution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { startDate, endDate } = req.query;
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
            $gte: moment(String(startDate), "MM/DD/YYYY").toDate(),
            $lte: moment(String(endDate), "MM/DD/YYYY").toDate()
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
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getEventDistribution;
