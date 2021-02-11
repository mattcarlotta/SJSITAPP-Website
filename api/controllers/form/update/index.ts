import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
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
      _id,
      expirationDate,
      enrollMonth,
      notes,
      seasonId,
      sendEmailNotificationsDate
    } = req.body;

    if (!_id || !seasonId || !expirationDate || !enrollMonth)
      throw unableToUpdateForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const [startMonthDate, endMonthDate] = enrollMonth;
    const startMonth = moment(startMonthDate).startOf("day").toDate();
    const endMonth = moment(endMonthDate).endOf("day").toDate();

    const existingForms = await Form.find({
      _id: { $ne: formExists._id },
      startMonth: { $gte: startMonth },
      endMonth: { $lte: endMonth }
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const format = "MM/DD/YY";
    const { sentEmails } = formExists;

    // incoming email notification date
    const incomingSendEmailsDate = createDate(
      sendEmailNotificationsDate
    ).format(format);

    // current form email date
    const currentSendEmailsDate = createDate(
      formExists.sendEmailNotificationsDate
    ).format(format);

    // resend emails if the dates don't match and they were already sent
    const emailNotificationStatus =
      incomingSendEmailsDate === currentSendEmailsDate && sentEmails;

    await formExists.updateOne({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate: incomingSendEmailsDate,
      sentEmails: emailNotificationStatus
    });

    return res.status(200).json({ message: "Successfully updated the form!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateForm;
