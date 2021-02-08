import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { Event, Form, Season } from "~models";
import { sendError } from "~helpers";
import { missingIds, unableToDeleteSeasons } from "~messages/errors";

/**
 * Deletes many seasons.
 *
 * @function deleteManySeasons
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteManySeasons = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    const existingSeasons = await Season.find({ _id: { $in: ids } });
    if (isEmpty(existingSeasons)) throw unableToDeleteSeasons;

    const seasonIds = existingSeasons.map(({ seasonId }) => seasonId);

    await Season.deleteMany({ _id: { $in: ids } });
    await Event.deleteMany({ seasonId: { $in: seasonIds } });
    await Form.deleteMany({ seasonId: { $in: seasonIds } });

    return res
      .status(200)
      .json({ message: "Successfully deleted the seasons." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteManySeasons;
