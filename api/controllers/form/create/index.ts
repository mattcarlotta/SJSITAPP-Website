import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { Form, Season } from "~models";
import { createDate, getStartOfDay, moment, sendError } from "~helpers";
import {
  formAlreadyExists,
  invalidExpirationDate,
  invalidSendEmailNoteDate,
  unableToCreateNewForm,
  unableToLocateSeason
} from "~messages/errors";

/**
 * Creates a new form.
 *
 * @function createForm
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createForm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      expirationDate,
      enrollMonth,
      notes,
      sendEmailNotificationsDate,
      seasonId
    } = req.body;

    if (!seasonId || !expirationDate || !enrollMonth)
      throw unableToCreateNewForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const [startMonthDate, endMonthDate] = enrollMonth;
    const startMonth = moment(startMonthDate).startOf("day").toDate();
    const endMonth = moment(endMonthDate).endOf("day").toDate();

    const existingForms = await Form.find({
      startMonth: { $gte: startMonth },
      endMonth: { $lte: endMonth }
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
    const currentDay = getStartOfDay();

    if (expirationDate < currentDay) throw invalidExpirationDate;
    if (sendEmailsDate < currentDay) throw invalidSendEmailNoteDate;

    await Form.create({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate: sendEmailsDate
    });

    return res
      .status(201)
      .json({ message: "Successfully created a new form!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createForm;
