import isEmpty from "lodash.isempty";
import isEqual from "lodash.isequal";
import type { Request, Response } from "express";
import { Event, Season } from "~models";
import { createSchedule, moment, sendError, uniqueArray } from "~helpers";
import {
  invalidEventDate,
  invalidUpdateEventRequest,
  mustContainUniqueCallTimes,
  unableToLocateEvent,
  unableToLocateSeason
} from "~messages/errors";

/**
 * Updates an event's details.
 *
 * @function updateEvent
 * @returns {string} - message
 * @throws {ResponseError}
 */
const updateEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      id: _id,
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
      !_id ||
      isEmpty(callTimes) ||
      !eventDate ||
      !eventType ||
      !location ||
      !seasonId ||
      !team ||
      !uniform
    )
      throw invalidUpdateEventRequest;

    const uniqueCallTimes = uniqueArray(callTimes);
    if (!uniqueCallTimes) throw mustContainUniqueCallTimes;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

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

    const schedule = createSchedule(callTimes);
    const scheduleUnchanged = isEqual(existingEvent.callTimes, callTimes);

    await existingEvent.updateOne({
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
      uniform,
      schedule: scheduleUnchanged ? existingEvent.schedule : schedule,
      scheduledIds: scheduleUnchanged ? existingEvent.scheduledIds : []
    });

    return res.status(200).json({
      message: `Successfully updated the event.${
        scheduleUnchanged
          ? ""
          : " Please note that the call times were changed; therefore, any previous scheduling for the event has been removed and will need to be rescheduled."
      }`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateEvent;
