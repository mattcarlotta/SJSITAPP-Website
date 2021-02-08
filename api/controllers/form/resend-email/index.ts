import type { Request, Response } from "express";
import { Form } from "~models";
import { createDate, sendError } from "~helpers";
import { missingFormId, unableToLocateForm } from "~messages/errors";

/**
 * Resend all form reminder emails.
 *
 * @function resendFormEmail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const resendFormEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0 });
    if (!existingForm) throw unableToLocateForm;

    await existingForm.updateOne({
      sendEmailNotificationsDate: createDate().toDate(),
      sentEmails: false
    });

    return res.status(200).json({
      message: "Email notifications for that form will be resent shortly."
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default resendFormEmail;
