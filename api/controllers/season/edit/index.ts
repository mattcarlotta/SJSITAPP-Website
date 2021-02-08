import type { Request, Response } from "express";
import { Season } from "~models";
import { sendError } from "~helpers";
import { missingSeasonId, unableToLocateSeason } from "~messages/errors";

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
    const { id: _id } = req.query;
    if (!_id) throw missingSeasonId;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToLocateSeason;

    return res.status(200).json({ season: existingSeason });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getSeasonForViewing;
