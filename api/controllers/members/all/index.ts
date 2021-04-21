import type { Request, Response } from "express";
import get from "lodash.get";
import { User } from "~models";
import { generateFilters, sendError } from "~helpers";
/**
 * Retrieves all members for ViewMembers page.
 *
 * @function getAllMembers
 * @returns {object} - members and total members documents
 * @throws {string}
 */
const getAllMembers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { page, role } = req.query;

    const filters = generateFilters(req.query);

    const roleFilter = role
      ? { $regex: role as string, $options: "i" }
      : { $ne: "admin" };

    const results = await User.paginate(
      { ...filters, role: roleFilter },
      {
        sort: { lastName: 1 },
        page: parseInt((page as string) || "1", 10),
        limit: 10,
        select: "role status registered email emailReminders firstName lastName"
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

export default getAllMembers;
