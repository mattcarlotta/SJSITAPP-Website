import type { Request, Response } from "express";
import get from "lodash.get";
import { Season } from "~models";
import { sendError } from "~helpers";

/**
 * Retrieves all seasons for ViewSeason page.
 *
 * @function getAllSeasons
 * @returns {Response} - seasons and total season documents
 * @throws {ResponseError}
 */
const getAllSeasons = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { page } = req.query;

    const results = await Season.paginate(
      {},
      {
        sort: { startDate: -1 },
        page: parseInt(String(page), 10),
        limit: 10,
        select: "seasonId startDate endDate"
      }
    );

    const seasons = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    return res.status(200).json({ seasons, totalDocs });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getAllSeasons;
