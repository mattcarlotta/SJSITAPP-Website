import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import Event from "~models/event";
import Form from "~models/form";
import User from "~models/user";
import {
  createDate,
  createMemberAvailabilityAverages,
  getEventCounts,
  moment,
  sendError
} from "~helpers";

/**
 * Retrieves all members availabilty for a percentage table.
 *
 * @function getAvailability
 * @returns {Response} - membersAvailability: { eventCounts, eventResponses, members }), months (start month, endmonth),
 * @throws {Error}
 */
const getAvailabilityForAllMembers = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const members = await User.aggregate([
      {
        $match: {
          role: { $eq: "employee" },
          status: "active"
        }
      },
      { $sort: { lastName: 1 } },
      {
        $project: {
          id: 1,
          name: {
            $concat: ["$firstName", " ", "$lastName"]
          }
        }
      }
    ]);

    const currentDate = createDate().add(1, "months").toDate();
    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate
        },
        endMonth: {
          $gte: currentDate
        }
      },
      {
        __v: 0,
        sentEmails: 0,
        seasonId: 0,
        sendEmailNotificationsDate: 0
      }
    ).lean();
    /* istanbul ignore next */
    if (isEmpty(members) || !existingForm)
      return res.status(200).json({ membersAvailability: [], months: [] });

    const startOfMonth = moment(existingForm.startMonth).toDate();
    const endOfMonth = moment(existingForm.endMonth).toDate();
    const months = [startOfMonth, endOfMonth];

    const eventCounts = await getEventCounts(startOfMonth, endOfMonth);
    /* istanbul ignore next */
    if (!eventCounts)
      return res.status(200).json({ membersAvailability: [], months });

    const eventResponses = await Event.aggregate([
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
          path: "$employeeResponses"
        }
      },
      {
        $group: {
          _id: "$employeeResponses._id",
          availability: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$employeeResponses.response",
                    ["Available to work.", "I want to work."]
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    return res.status(200).json({
      membersAvailability: createMemberAvailabilityAverages({
        eventCounts,
        eventResponses,
        members
      }),
      months
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getAvailabilityForAllMembers;
