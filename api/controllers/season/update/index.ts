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
    const { _id, seasonId, seasonDuration } = req.body;
    if (!_id || !seasonId || !seasonDuration) throw unableToUpdateSeason;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToLocateSeason;

    if (existingSeason.seasonId !== seasonId) {
      const seasonInUse = await Season.findOne({ seasonId });
      if (seasonInUse) throw seasonAlreadyExists;
    }

    const [startMonthDate, endMonthDate] = seasonDuration;
    const startDate = moment(startMonthDate).startOf("day").toDate();
    const endDate = moment(endMonthDate).endOf("day").toDate();

    await existingSeason.updateOne({ seasonId, startDate, endDate });
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
