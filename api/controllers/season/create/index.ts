import type { Request, Response } from "express";
import { Season } from "~models";
import { moment, sendError } from "~helpers";
import { seasonAlreadyExists, unableToCreateNewSeason } from "~messages/errors";

/**
 * Creates a new season.
 *
 * @function createSeason
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createSeason = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { seasonId, seasonDuration } = req.body;
    if (!seasonId || !seasonDuration) throw unableToCreateNewSeason;

    const seasonExists = await Season.findOne({ seasonId });
    if (seasonExists) throw seasonAlreadyExists;

    const [startMonthDate, endMonthDate] = seasonDuration;
    const startDate = moment(startMonthDate).startOf("day").toDate();
    const endDate = moment(endMonthDate).endOf("day").toDate();

    await Season.create({ seasonId, startDate, endDate });

    return res
      .status(201)
      .json({ message: "Successfully created a new season!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createSeason;
