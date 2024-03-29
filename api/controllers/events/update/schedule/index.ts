import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Event } from "~models";
import { isValidObjectId, sendError, updateScheduleIds } from "~helpers";
import {
  invalidUpdateEventRequest,
  unableToLocateEvent
} from "~messages/errors";

/**
 * Updates an event's schedule.
 *
 * @function updateEventSchedule
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateEventSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id, schedule } = req.body;
    if (!isValidObjectId(_id) || isEmpty(schedule))
      throw invalidUpdateEventRequest;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.updateOne({
      $set: { schedule, scheduledIds: updateScheduleIds(schedule) }
    });

    return res
      .status(200)
      .json({ message: "Successfully updated the event's schedule." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateEventSchedule;
