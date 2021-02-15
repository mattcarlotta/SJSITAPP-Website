import type { Request, Response } from "express";
import { Season } from "~models";
import { sendError } from "~helpers";
import { unableToLocateSeason } from "~messages/errors";

/**
 * Retrieves a single season for editing/viewing.
 *
 * @function getSeasonForViewing
 * @returns {Response} - season
 * @throws {ResponseError}
 */
const getSeasonForViewing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingSeason = await Season.findOne({ _id }, { __v: 0 }).lean();
    if (!existingSeason) throw unableToLocateSeason;

    return res.status(200).json({ season: existingSeason });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getSeasonForViewing;
