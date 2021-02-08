import type { Request, Response } from "express";
import { Event, Form } from "~models";
import {
  createDate,
  createMemberAvailabilityAverage,
  convertId,
  getEventCounts,
  parseSession,
  sendError,
  moment
} from "~helpers";
import { missingMemberId } from "~messages/errors";

/**
 * Retrieves a members availabilty for a percentage chart.
 *
 * @function getAvailability
 * @returns {Response} - eventAvailability: { eventCounts, eventResponses }), months (start month, endmonth) }
 * @throws {ResponseError}
 */
const getAvailability = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const _id = parseSession(req);
    if (!_id) throw missingMemberId;

    const currentDate = createDate().add(1, "months").toDate();
    const eventAvailability: Array<Record<string, unknown>> = [];

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
    if (!existingForm)
      return res.status(200).json({ eventAvailability, months: [] });

    const startOfMonth = moment(existingForm.startMonth).toDate();
    const endOfMonth = moment(existingForm.endMonth).toDate();
    const months = [startOfMonth, endOfMonth];

    const eventCounts = await getEventCounts(startOfMonth, endOfMonth);
    /* istanbul ignore next */
    if (eventCounts === 0)
      return res.status(200).json({ eventAvailability, months });

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
        $addFields: {
          employeeResponses: {
            $map: {
              input: {
                $filter: {
                  input: "$employeeResponses",
                  cond: {
                    $eq: ["$$this._id", convertId(_id)]
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

    return res.status(200).json({
      eventAvailability: createMemberAvailabilityAverage({
        eventCounts,
        eventResponses
      }),
      months
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getAvailability;
