import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { Event } from "~models";
import { sendError } from "~helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many events.
 *
 * @function deleteManyEvents
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteManyEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Event.deleteMany({ _id: { $in: ids } });

    return res
      .status(200)
      .json({ message: "Successfully deleted the events." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteManyEvents;
