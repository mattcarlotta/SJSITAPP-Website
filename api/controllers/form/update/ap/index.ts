import type { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { Form } from "~models";
import Event, { TEventResponse } from "~models/event";
import { parseSession, sendError } from "~helpers";
import { unableToLocateForm, unableToUpdateApForm } from "~messages/errors";

/**
 * Updates an event's 'eventResponses' property.
 *
 * @function updateApForm
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateApForm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      id: _id,
      responses
    }: { id: string; responses: Array<TEventResponse> } = req.body;
    if (!_id || !responses) throw unableToUpdateApForm;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const userId = parseSession(req);

    await Event.bulkWrite(
      responses.map((response): {
        updateOne: {
          update: FilterQuery<any>;
          filter: {
            _id: string;
            "employeeResponses._id"?: string;
          };
        };
      } => {
        const { id: eventId, value, notes, updateEvent } = response;

        const filter = updateEvent
          ? {
              _id: eventId,
              "employeeResponses._id": userId
            }
          : {
              _id: eventId
            };

        const update = updateEvent
          ? {
              $set: {
                "employeeResponses.$.response": value,
                "employeeResponses.$.notes": notes
              }
            }
          : {
              $push: {
                employeeResponses: {
                  _id: userId,
                  response: value,
                  notes
                }
              }
            };

        return {
          updateOne: {
            filter,
            update
          }
        };
      })
    );

    return res
      .status(201)
      .json({ message: "Successfully added your responses to the A/P form!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateApForm;
