import type { Request, Response } from "express";
import { Event } from "~models";
import {
  convertId,
  getMonthDateRange,
  sendError,
  parseSession
} from "~helpers";

/**
 * Retrieves all events for Schedule page by filters.
 *
 * @function getScheduledEvents
 * @returns {Response} - events
 * @throws {ResponseError}
 */
const getScheduledEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, selectedDate, selectedGames } = req.query;

    const selected = !selectedGames ? "All Games" : selectedGames;

    const selectedId = id || parseSession(req);

    const { startOfMonth, endOfMonth } = getMonthDateRange(
      String(selectedDate)
    );

    const filters =
      selected === "All Games"
        ? {
            eventDate: {
              $gte: startOfMonth.toString(),
              $lte: endOfMonth.toString()
            }
          }
        : {
            eventDate: {
              $gte: startOfMonth.toString(),
              $lte: endOfMonth.toString()
            },
            scheduledIds: {
              $in: [convertId(String(selectedId))]
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
        __v: 0
      },
      { sort: { eventDate: 1 } }
    ).populate({
      path: "schedule.employeeIds",
      select: "_id firstName lastName"
    });

    return res.status(200).json({ events });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getScheduledEvents;
