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

    const selected = !selectedGames ? "All Events" : selectedGames;

    const selectedId = id || parseSession(req);

    const { startOfMonth, endOfMonth } = getMonthDateRange(
      selectedDate as string
    );

    const filters =
      selected === "All Events"
        ? {
            eventDate: {
              $gte: startOfMonth.format(),
              $lte: endOfMonth.format()
            }
          }
        : {
            eventDate: {
              $gte: startOfMonth.format(),
              $lte: endOfMonth.format()
            },
            scheduledIds: {
              $in: [convertId(selectedId as string)]
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

    return res.status(200).send(events);
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getScheduledEvents;
