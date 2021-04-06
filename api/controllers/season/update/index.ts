import type { Request, Response } from "express";
import { Event, Form, Season } from "~models";
import { moment, sendError } from "~helpers";
import {
  seasonAlreadyExists,
  unableToLocateSeason,
  unableToUpdateSeason
} from "~messages/errors";

/**
 * Updates an season's details.
 *
 * @function updateSeason
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateSeason = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id, endDate, seasonId, startDate } = req.body;
    if (!_id || !endDate || !seasonId || !startDate) throw unableToUpdateSeason;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToLocateSeason;

    if (existingSeason.seasonId !== seasonId) {
      const seasonInUse = await Season.findOne({ seasonId });
      if (seasonInUse) throw seasonAlreadyExists;
    }

    const seasonStartDate = moment(startDate).startOf("day").toDate();
    const seasonEndDate = moment(endDate).endOf("day").toDate();

    await existingSeason.updateOne({
      seasonId,
      startDate: seasonStartDate,
      endDate: seasonEndDate
    });
    await Event.updateMany({ seasonId: existingSeason.seasonId }, { seasonId });
    await Form.updateMany({ seasonId: existingSeason.seasonId }, { seasonId });

    return res
      .status(200)
      .json({ message: "Successfully updated the season." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateSeason;
