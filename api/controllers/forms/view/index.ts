import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { Event, Form } from "~models";
import {
  convertId,
  isValidObjectId,
  parseSession,
  moment,
  sendError
} from "~helpers";
import {
  expiredForm,
  missingFormId,
  unableToLocateEvents,
  unableToLocateForm
} from "~messages/errors";

/**
 * Retrieves an AP form and all events existing within its start and end months.
 *
 * @function viewApForm
 * @returns {Response} - form and events
 * @throws {ResponseError}
 */
const viewApForm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = parseSession(req);
    const { id: _id } = req.params;
    if (!isValidObjectId(_id)) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0, seasonId: 0 });
    if (!existingForm) throw unableToLocateForm;

    const { expirationDate } = existingForm;
    const currentDate = moment().toDate();
    const expiredDate = moment(expirationDate).toDate();
    if (currentDate >= expiredDate) {
      throw expiredForm(
        moment(expirationDate).format("MMMM Do, YYYY @ hh:mma")
      );
    }

    const startMonth = moment(existingForm.startMonth);
    const endMonth = moment(existingForm.endMonth);

    const events = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startMonth.toDate(),
            $lte: endMonth.toDate()
          }
        }
      },
      { $sort: { eventDate: 1 } },
      {
        $project: {
          location: 1,
          team: 1,
          opponent: 1,
          eventDate: 1,
          eventType: 1,
          notes: 1,
          employeeResponse: {
            $filter: {
              input: "$employeeResponses",
              as: "employeeResponse",
              cond: {
                $eq: ["$$employeeResponse._id", convertId(String(userId))]
              }
            }
          }
        }
      }
    ]);
    if (isEmpty(events))
      throw unableToLocateEvents(startMonth.format("L"), endMonth.format("L"));

    return res.status(200).json({
      form: existingForm,
      events
    });
  } catch (err) {
    /* eslint-disable-next-line */
    return sendError(err, 400, res);
  }
};

export default viewApForm;
