import type { Request, Response } from "express";
import { Event } from "~models";
import { sendError } from "~helpers";
import { unableToLocateEvent } from "~messages/errors";
import { resentEventEmail } from "~messages/success";

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

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.updateOne({ sentEmailReminders: false });

    return res.status(200).json({
      message: resentEventEmail
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default resendEventEmail;
