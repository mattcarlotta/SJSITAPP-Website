import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "~models";
import { sendError } from "~helpers";
import { badCredentials, invalidStatus } from "~messages/errors";

/**
 * Middleware function to login in a user (applies user to req.session).
 *
 * @function localLogin
 * @returns {function}
 * @throws {string}
 */
export const localLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw String(badCredentials);

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw badCredentials;
    if (existingUser.status !== "active") throw invalidStatus;

    // compare password to existingUser password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) throw badCredentials;

    req.session!.user = {
      id: existingUser._id,
      avatar: existingUser.avatar,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      role: existingUser.role
    };

    return next();
  } catch (err) {
    return sendError(err, 403, res);
  }
};

export default localLogin;
