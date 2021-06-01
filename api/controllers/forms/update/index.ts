import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Form, Season } from "~models";
import { createDate, moment, sendError } from "~helpers";
import {
  formAlreadyExists,
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateForm
} from "~messages/errors";

/**
 * Updates an form's details.
 *
 * @function updateForm
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateForm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      id: _id,
      expirationDate,
      endMonth,
      notes,
      seasonId,
      sendEmailNotificationsDate,
      startMonth
    } = req.body;

    if (!_id || !seasonId || !endMonth || !expirationDate || !startMonth)
      throw unableToUpdateForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const formStartMonth = moment(startMonth).startOf("day").toDate();
    const formEndMonth = moment(endMonth).endOf("day").toDate();
    const formExpirationDate = moment(expirationDate).endOf("day").toDate();

    const existingForms = await Form.find({
      _id: { $ne: formExists._id },
      startMonth: { $gte: formStartMonth },
      endMonth: { $lte: formEndMonth }
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const format = "MM/DD/YY";
    const { sentEmails } = formExists;

    // incoming email notification date
    const incomingSendEmailsDate = createDate(sendEmailNotificationsDate)
      .endOf("day")
      .format(format);

    // current form email date
    const currentSendEmailsDate = createDate(
      formExists.sendEmailNotificationsDate
    )
      .endOf("day")
      .format(format);

    // resend emails if the dates don't match and they were already sent
    const emailNotificationStatus =
      incomingSendEmailsDate === currentSendEmailsDate && sentEmails;

    await formExists.updateOne({
      seasonId,
      startMonth: formStartMonth,
      endMonth: formEndMonth,
      expirationDate: formExpirationDate,
      notes,
      sendEmailNotificationsDate: incomingSendEmailsDate,
      sentEmails: emailNotificationStatus
    });

    return res
      .status(200)
      .json({ message: "Successfully updated the AP form!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateForm;
