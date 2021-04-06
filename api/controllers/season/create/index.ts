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
    const { endDate, seasonId, startDate } = req.body;
    if (!endDate || !seasonId || !startDate) throw unableToCreateNewSeason;

    const seasonExists = await Season.findOne({ seasonId });
    if (seasonExists) throw seasonAlreadyExists;

    const seasonStartDate = moment(startDate).startOf("day").toDate();
    const seasonEndDate = moment(endDate).endOf("day").toDate();

    await Season.create({
      seasonId,
      startDate: seasonStartDate,
      endDate: seasonEndDate
    });

    return res
      .status(201)
      .json({ message: "Successfully created a new season!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createSeason;
