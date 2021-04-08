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
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate,
      seasonId,
      startMonth
    } = req.body;

    if (!seasonId || !endMonth || !expirationDate || !startMonth)
      throw unableToCreateNewForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const formStartMonth = moment(startMonth).startOf("day").toDate();
    const formEndMonth = moment(endMonth).endOf("day").toDate();
    const formExpirationDate = moment(expirationDate).endOf("day").format();

    const existingForms = await Form.find({
      startMonth: { $gte: formStartMonth },
      endMonth: { $lte: formEndMonth }
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
    const currentDay = getStartOfDay();

    if (formExpirationDate < currentDay) throw invalidExpirationDate;
    if (sendEmailsDate < currentDay) throw invalidSendEmailNoteDate;

    await Form.create({
      seasonId,
      startMonth: formStartMonth,
      endMonth: formEndMonth,
      expirationDate: formExpirationDate,
      notes,
      sendEmailNotificationsDate: sendEmailsDate
    });

    return res
      .status(201)
      .json({ message: "Successfully created a new AP form!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createForm;
