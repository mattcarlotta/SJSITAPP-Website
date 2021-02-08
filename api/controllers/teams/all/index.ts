import type { Request, Response } from "express";
import { Team } from "~models";

/**
 * Retrieves all teams names.
 *
 * @function getAllTeamNames
 * @returns {Response} - names
 */
const getAllTeamNames = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const teams = await Team.aggregate([
    { $group: { _id: null, names: { $addToSet: "$team" } } },
    { $unwind: "$names" },
    { $sort: { names: 1 } },
    { $group: { _id: null, names: { $push: "$names" } } },
    { $project: { _id: 0, names: 1 } }
  ]);

  return res.status(200).json({ names: teams[0].names });
};

export default getAllTeamNames;
