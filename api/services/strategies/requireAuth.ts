import type { NextFunction, Request, Response } from "express";
import { badCredentials, invalidStatus } from "~messages/errors";
import { parseSession, sendError } from "~helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session.
 *
 * @function requireAuth
 * @returns {function}
 * @throws {Error}
 */
const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const _id = parseSession(req);
    if (!_id) throw String(badCredentials);

    const existingUser = await User.findOne({ _id });
    if (!existingUser) throw String(badCredentials);
    if (existingUser.status === "suspended") throw String(invalidStatus);

    return next();
  } catch (error) {
    return sendError(error, 403, res);
  }
};

export default requireAuth;
