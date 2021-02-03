import type { Request, Response } from "express";
import Form from "~models/form";
import { createDate, getEventCounts, sendError } from "~helpers";

/**
 * Retrieves an existing A/P form for viewing/editing.
 *
 * @function getAPForm
 * @returns {object} - apform: { existingForm, eventCounts }
 * @throws {string}
 */
const getAPForm = async (_: Request, res: Response): Promise<any> => {
  try {
    const currentDate = createDate().add(1, "months").toDate();

    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate
        },
        endMonth: {
          $gte: currentDate
        }
      },
      {
        __v: 0,
        sentEmails: 0,
        seasonId: 0,
        sendEmailNotificationsDate: 0,
        notes: 0
      }
    ).lean();
    /* istanbul ignore next */
    if (!existingForm) return res.status(200).json({ apform: {} });

    const eventCounts = await getEventCounts(
      existingForm.startMonth,
      existingForm.endMonth
    );

    res.status(200).json({ apform: { ...existingForm, eventCounts } });
  } catch (err) {
    sendError(err, 400, res);
  }
};

export default getAPForm;
