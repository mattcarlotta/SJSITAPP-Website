import type { Request, Response } from "express";
import get from "lodash.get";
import { Form } from "~models";
import { generateFilters, sendError } from "~helpers";

/**
 * Retrieves all forms for ViewForms page.
 *
 * @function getAllForms
 * @returns {Response} - sorted forms and total form documents
 * @throws {ResponseError}
 */
const getAllForms = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page } = req.query;

    const filters = generateFilters(req.query);

    const results = await Form.paginate(
      { ...filters },
      {
        sort: { seasonId: -1, startMonth: -1 },
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

export default getAllForms;
