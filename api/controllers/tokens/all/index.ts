import type { Request, Response } from "express";
import get from "lodash.get";
import { Token } from "~models";
import { generateFilters, sendError } from "~helpers";

/**
 * Retrieves all tokens (authorization keys) for ViewAuthorization page.
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
      ? { $regex: String(role), $options: "i" }
      : { $ne: "admin" };

    const results = await Token.paginate(
      { ...filters, ...emailFilter, role: roleFilter },
      {
        sort: { expiration: -1 },
        page: parseInt(String(page), 10),
        limit: 10,
        select: "-__v"
      }
    );

    const tokens = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    return res.status(200).json({ tokens, totalDocs });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getAllTokens;
