import type { Request, Response } from "express";
import { Team } from "~models";
import { sendError } from "~helpers";
import { missingTeamId, unableToDeleteTeam } from "~messages/errors";

/**
 * Deletes an event.
 *
 * @function deleteTeam
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteTeam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingTeamId;

    const existingTeam = await Team.findOne({ _id });
    if (!existingTeam) throw unableToDeleteTeam;

    await existingTeam.delete();

    return res.status(200).json({ message: "Successfully deleted the team." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteTeam;
