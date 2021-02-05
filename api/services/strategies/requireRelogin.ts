import type { NextFunction, Request, Response } from "express";
import { parseSession, clearSession } from "~helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function requireAuth
 * @returns {function}
 * @throws {Error}
 */
const requireRelogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const _id = parseSession(req);
    if (!_id) throw String("No previous session detected.");

    const existingUser = await User.findOne(
      { _id },
      { _v: 0, password: 0, token: 0 }
    );
    if (!existingUser || existingUser.status === "suspended")
      throw String("Not a valid user.");

    // @ts-ignore
    req.user = {
      id: existingUser._id,
      avatar: existingUser.avatar,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      role: existingUser.role
    };

    return next();
  } catch (err) {
    return clearSession(req, res, 200);
  }
};

export default requireRelogin;
