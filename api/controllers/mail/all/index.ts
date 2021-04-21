import type { Request, Response } from "express";
import get from "lodash.get";
import { Mail } from "~models";
import { generateFilters, sendError } from "~helpers";

/**
 * Retrieves all events for ViewEvents page.
 *
 * @function getAllMail
 * @returns {Response} - mail and total mail documents
 * @throws {ResponseError}
 */
const getAllMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page } = req.query;

    const filters = generateFilters(req.query);

    const results = await Mail.paginate(
      { ...filters },
      {
        sort: { sendDate: -1 },
        page: parseInt((page as string) || "1", 10),
        limit: 10,
        select: "-notes -__v"
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

export default getAllMail;
