import type { Request, Response } from "express";
import { Event } from "~models";
import { sendError } from "~helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Resend event reminder emails.
 *
 * @function resendEventEmail
 * @arg req - Request
 * @arg res - Response
 * @returns {Response} message
 * @throws {ResponseError}
 */
const resendEventEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.update({ sentEmailReminders: false });

    return res.status(200).json({
      message:
        "Email notifications for that event will be resent within 24 hours of the event date."
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default resendEventEmail;
