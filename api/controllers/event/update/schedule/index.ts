import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import Event from "~models/event";
import { sendError, updateScheduleIds } from "~helpers";
import {
  invalidUpdateEventRequest,
  unableToLocateEvent
} from "~messages/errors";

/**
 * Updates an event's schedule.
 *
 * @function updateEventSchedule
 * @returns {Response} - message
 * @throws {Error}
 */
const updateEventSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { _id, schedule } = req.body;
    if (!_id || isEmpty(schedule)) throw invalidUpdateEventRequest;

    const existingEvent = await Event.updateOne(
      { _id },
      { $set: { schedule, scheduledIds: updateScheduleIds(schedule) } }
    ).lean();
    if (!existingEvent) throw unableToLocateEvent;

    return res
      .status(201)
      .json({ message: "Successfully updated the event's schedule." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateEventSchedule;
