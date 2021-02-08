import type { Request, Response } from "express";
import { Event } from "~models";
import { sendError } from "~helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Deletes an event.
 *
 * @function deleteEvent
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.delete();

    return res.status(200).json({ message: "Successfully deleted the event." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteEvent;
