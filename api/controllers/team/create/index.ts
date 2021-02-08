import type { Request, Response } from "express";
import { Team } from "~models";
import { createUniqueName, sendError } from "~helpers";
import { teamAlreadyExists, unableToCreateTeam } from "~messages/errors";

/**
 * Creates a new team.
 *
 * @function createTeam
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createTeam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { league, team } = req.body;
    if (!league || !team) throw unableToCreateTeam;

    const name = createUniqueName(team);
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) throw teamAlreadyExists;

    await Team.create({
      name,
      league,
      team
    });

    return res.status(201).json({
      message: `Successfully added the ${team} to the ${league}.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createTeam;

//
