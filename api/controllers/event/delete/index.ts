import type { Request, Response } from "express";
import Event from "~models/event";
import { sendError } from "~helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Deletes an event.
 *
 * @function deleteEvent
 * @returns {Response} - message
 * @throws {Error}
 */
const deleteEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await Event.deleteOne({ _id }).lean();
    if (!existingEvent) throw unableToLocateEvent;

    return res.status(200).json({ message: "Successfully deleted the event." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteEvent;
