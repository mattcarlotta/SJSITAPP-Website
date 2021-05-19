import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Team } from "~models";
import { sendError } from "~helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many events.
 *
 * @function deleteManyTeams
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteManyTeams = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Team.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({ message: "Successfully deleted the teams." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteManyTeams;
