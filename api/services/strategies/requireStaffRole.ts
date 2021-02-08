import get from "lodash.get";
import type { NextFunction, Request, Response } from "express";
import { accessDenied, badCredentials } from "~messages/errors";
import { sendError } from "~helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is an admin/staff and the session is valid.
 *
 * @function requireStaffRole
 * @returns {Promise}
 * @throws {ResponseError}
 */
const requireStaffRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = get(req, ["session", "user"]);
    const role = get(user, ["role"]);

    if (!user || (role !== "admin" && role !== "staff"))
      throw String(accessDenied);

    const existingUser = await User.findOne({ _id: user.id });
    if (!existingUser || existingUser.status === "suspended")
      throw String(badCredentials);

    return next();
  } catch (err) {
    return sendError(err, 403, res);
  }
};

export default requireStaffRole;
