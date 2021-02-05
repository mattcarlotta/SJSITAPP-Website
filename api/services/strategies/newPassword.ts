import type { NextFunction, Request, Response } from "express";
import {
  emptyPassword,
  invalidToken,
  notUniquePassword
} from "~messages/errors";
import { sendError } from "~helpers";
import { User } from "~models";

/**
 * Middleware function to update a user's password.
 *
 * @function updatePassword
 * @returns {function}
 * @throws {string}
 */
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { token, password } = req.body;

    if (!token) throw invalidToken;
    if (!password) throw emptyPassword;
    req.body.email = token;

    // check to see if email exists in the db
    const existingUser = await User.findOne({ token });
    if (!existingUser) throw invalidToken;

    // compare newpassword to existingUser password
    const samePassword = await existingUser.comparePassword(password);
    if (samePassword) throw notUniquePassword;

    // hash new password before saving
    const newPassword = await User.createPassword(password);

    // update user's password
    await User.updateOne(
      { _id: existingUser._id },
      { $set: { password: newPassword } }
    );

    // @ts-ignore
    req.user = existingUser;

    return next();
  } catch (err) {
    return sendError(err, 404, res);
  }
};

export default updatePassword;
