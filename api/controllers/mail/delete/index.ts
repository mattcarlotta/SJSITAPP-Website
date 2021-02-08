import type { Request, Response } from "express";
import { Mail } from "~models";
import { sendError } from "~helpers";
import { missingMailId, unableToDeleteMail } from "~messages/errors";

/**
 * Deletes mail.
 *
 * @function deleteMail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMailId;

    const existingMail = await Mail.findOne({ _id });
    if (!existingMail) throw unableToDeleteMail;

    await existingMail.delete();

    return res.status(200).json({ message: "Successfully deleted the email." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteMail;
