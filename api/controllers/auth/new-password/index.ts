import type { Request, Response } from "express";
import { passwordResetSuccess } from "~messages/success";
import {
  emptyPassword,
  invalidToken,
  notUniquePassword
} from "~messages/errors";
import { sendError } from "~helpers";
import { User } from "~models";

/**
 * Allows a user to update their password with an authorization key.
 *
 * @function updatePassword
 * @returns {string} - message
 * @throws {ResponseError}
 */
const updatePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { token, password } = req.body;
    if (!token) throw invalidToken;
    if (!password) throw emptyPassword;

    // check to see if email exists in the db
    const existingUser = await User.findOne({ token });
    if (!existingUser) throw invalidToken;

    // compare newpassword to existingUser password
    const samePassword = await existingUser.comparePassword(password);
    if (samePassword) throw notUniquePassword;

    // hash new password before saving
    const newPassword = await User.createPassword(password);

    // update user's password
    await existingUser.updateOne({ $set: { password: newPassword } });

    return res
      .status(200)
      .json({ message: passwordResetSuccess(existingUser.email) });
  } catch (err) {
    return sendError(err, 404, res);
  }
};

export default updatePassword;
