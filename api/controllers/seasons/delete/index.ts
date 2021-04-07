import type { Request, Response } from "express";
import { Event, Form, Season } from "~models";
import { sendError } from "~helpers";
import { unableToDeleteSeason } from "~messages/errors";

/**
 * Deletes a season.
 *
 * @function deleteSeason
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteSeason = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToDeleteSeason;

    await existingSeason.delete();
    await Event.deleteMany({ seasonId: existingSeason.seasonId });
    await Form.deleteMany({ seasonId: existingSeason.seasonId });

    return res
      .status(200)
      .json({ message: "Successfully deleted the season." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteSeason;
