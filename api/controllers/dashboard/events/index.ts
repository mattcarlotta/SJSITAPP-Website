import type { Request, Response } from "express";
import { Event } from "~models";
import {
  convertId,
  getEndOfDay,
  getStartOfDay,
  moment,
  parseSession,
  sendError
} from "~helpers";
import { missingMemberId } from "~messages/errors";

/**
 * Retrieves today or upcoming events.
 *
 * @function getSelectedEvents
 * @returns {Response} - populated events
 * @throws {string}
 */
const getSelectedEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const _id = parseSession(req);
    if (!_id) throw String(missingMemberId);
    const { selectedEvent } = req.params;

    const isEventToday = selectedEvent === "today";
    const currentDate = getStartOfDay();
    const endOfDay = getEndOfDay();
    const withinAWeek = moment().add(7, "days").endOf("day").format();

    const filters = isEventToday
      ? {
          eventDate: {
            $gte: currentDate,
            $lte: endOfDay
          }
        }
      : {
          eventDate: {
            $gte: endOfDay,
            $lte: withinAWeek
          },
          scheduledIds: {
            $in: [convertId(_id)]
          }
        };

    const events = await Event.find(
      {
        ...filters
      },
      {
        seasonId: 0,
        callTimes: 0,
        employeeResponses: 0,
        sentEmailReminders: 0,
        scheduledIds: 0,
        __v: 0
      },
      { sort: { eventDate: 1 } }
    )
      .populate({
        path: "schedule.employeeIds",
        select: "_id firstName lastName"
      })
      .limit(2)
      .lean();

    return res.status(200).json({ events });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getSelectedEvents;
