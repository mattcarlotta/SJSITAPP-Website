import type { Request, Response } from "express";
import get from "lodash.get";
import { Token } from "~models";
import { generateFilters, sendError } from "~helpers";

/**
 * Retrieves all tokens (authorization tokens) for ViewAuthorization page.
 *
 * @function getAllTokens
 * @returns {Response} - tokens and total token documents
 * @throws {ResponseError}
 */
const getAllTokens = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, page, role } = req.query;

    const filters = generateFilters(req.query);

    const emailFilter = email
      ? { email: { $exists: email === "registered" } }
      : {};

    const roleFilter = role
      ? { $regex: role as string, $options: "i" }
      : { $ne: "admin" };

    const results = await Token.paginate(
      { ...filters, ...emailFilter, role: roleFilter },
      {
        sort: { expiration: -1 },
        page: parseInt((page as string) || "1", 10),
        limit: 10,
        select: "-__v"
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

export default getAllTokens;
