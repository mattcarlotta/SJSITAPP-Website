import type { Request, Response } from "express";
import get from "lodash.get";
import { Season } from "~models";
import { generateFilters, sendError } from "~helpers";

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

    const filters = generateFilters(req.query);

    const results = await Season.paginate(
      { ...filters },
      {
        sort: { startDate: -1 },
        page: parseInt((page as string) || "1", 10),
        limit: 10,
        select: "seasonId startDate endDate"
      }
    );

    return res.status(200).json({
      docs: get(results, ["docs"]),
      totalDocs: get(results, ["totalDocs"])
    });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getAllSeasons;
