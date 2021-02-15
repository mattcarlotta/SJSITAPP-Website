import type { Request, Response } from "express";
import { Mail } from "~models";
import { createDate, sendError } from "~helpers";
import { unableToLocateMail } from "~messages/errors";

/**
 * Resends an email.
 *
 * @function resendMail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const resendMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
    if (!existingEmail) throw unableToLocateMail;

    await existingEmail.updateOne({
      sendDate: createDate().format(),
      status: "unsent"
    });

    return res
      .status(200)
      .json({ message: "That email will be resent shortly." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default resendMail;
