import type { Request, Response } from "express";
import { Mail } from "~models";
import { createDate, getStartOfDay, sendError } from "~helpers";
import { unableToLocateMail, unableToUpdateMail } from "~messages/errors";

/**
 * Updates an email's details.
 *
 * @function updateMail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id, message, sendDate, sendFrom, sendTo, subject } = req.body;
    if (!_id || !message || !sendFrom || !sendTo || !subject)
      throw unableToUpdateMail;

    const emailExists = await Mail.findOne({ _id });
    if (!emailExists) throw unableToLocateMail;

    const currentDay = getStartOfDay();
    const sendEmailDate = createDate(sendDate);

    await emailExists.updateOne({
      message,
      sendDate: sendEmailDate.format(),
      sendFrom,
      sendTo,
      subject,
      sent: false,
      sendError: ""
    });

    return res.status(200).json({
      message: `Successfully updated the email and it will be sent ${
        sendEmailDate.format() >= currentDay
          ? sendEmailDate.format("MMMM Do YYYY @ hh:mm a")
          : "shortly"
      }!`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateMail;
