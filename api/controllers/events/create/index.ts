import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Event, Season } from "~models";
import { moment, sendError, uniqueArray } from "~helpers";
import {
  invalidCreateEventRequest,
  invalidEventDate,
  mustContainUniqueCallTimes,
  unableToLocateSeason
} from "~messages/errors";

/**
 * Creates a new event.
 *
 * @function createEvent
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
      uniform
    } = req.body;
    if (
      isEmpty(callTimes) ||
      !eventDate ||
      !eventType ||
      !location ||
      !seasonId ||
      !team ||
      !uniform
    )
      throw invalidCreateEventRequest;

    const uniqueCallTimes = uniqueArray(callTimes);
    if (!uniqueCallTimes) throw mustContainUniqueCallTimes;

    const existingSeason = await Season.findOne({ seasonId });
    if (!existingSeason) throw unableToLocateSeason;

    const eventDateStartTime = moment(eventDate);
    const seasonStart = moment(existingSeason.startDate);
    const seasonEnd = moment(existingSeason.endDate);

    if (eventDateStartTime < seasonStart || eventDateStartTime > seasonEnd) {
      throw invalidEventDate(
        seasonId,
        seasonStart.format("L"),
        seasonEnd.format("L")
      );
    }

    await Event.create({
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
      uniform
    });

    return res.status(201).json({
      message: `Successfully added a new event to the ${seasonId} season.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createEvent;
