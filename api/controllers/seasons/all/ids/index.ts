import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { Season } from "~models";
import { sendError } from "~helpers";
import { needToCreateSeasonFirst } from "~messages/errors";

/**
 * Retrieves all seasonsIds.
 *
 * @function getAllSeasonIds
 * @returns {Response} - seasonsIds
 * @throws {ResponseError}
 */
const getAllSeasonIds = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const seasons = await Season.aggregate([
      { $sort: { startDate: -1 } },
      { $group: { _id: null, seasonIds: { $push: "$seasonId" } } },
      { $project: { _id: 0, seasonIds: 1 } }
    ]);
    /* istanbul ignore next */
    if (isEmpty(seasons)) throw needToCreateSeasonFirst;

    return res.status(200).json({ seasonIds: seasons[0].seasonIds });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getAllSeasonIds;

//
