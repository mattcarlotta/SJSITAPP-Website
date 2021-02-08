import type { Request, Response } from "express";
import { Mail } from "~models";
import { createDate, getStartOfDay, sendError } from "~helpers";
import { invalidSendDate, unableToCreateNewMail } from "~messages/errors";

/**
 * Creates a new mail.
 *
 * @function createMail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { message, sendDate, sendFrom, sendTo, subject } = req.body;
    if (!message || !sendTo || !sendFrom || !subject)
      throw unableToCreateNewMail;

    const currentDay = getStartOfDay();
    const sendEmailDate = createDate(sendDate);
    if (sendEmailDate.format() < currentDay) throw invalidSendDate;

    await Mail.create({
      message,
      sendDate: sendEmailDate.format(),
      sendFrom,
      sendTo,
      subject
    });

    return res.status(201).json({
      message: `An email has been created and will be sent ${
        sendDate ? sendEmailDate.format("MMMM Do YYYY @ hh:mm a") : "shortly"
      }!`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createMail;
