import type { Request, Response } from "express";
import { Event } from "~models";
import { sendError } from "~helpers";
import { unableToLocateEvent } from "~messages/errors";

/**
 * Retrieves a single event for editing/viewing.
 *
 * @function getEventForViewing
 * @returns {Response} - event
 * @throws {ResponseError}
 */
const getEventForViewing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingEvent = await Event.findOne({ _id }, { __v: 0 }).lean();
    if (!existingEvent) throw unableToLocateEvent;

    return res.status(200).send(existingEvent);
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getEventForViewing;
