import type { NextFunction, Request, Response } from "express";
import { missingEmailCreds } from "~messages/errors";
import { createDate, createRandomToken, sendError } from "~helpers";
import { newPasswordTemplate } from "~services/templates";
import { Mail, User } from "~models";

/**
 * Middleware function to send a new token (authorization key) to a user.
 *
 * @function resetToken
 * @returns {function}
 */
export const resetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email } = req.body;
    req.body.password = "reset-password";

    if (!email) throw missingEmailCreds;

    // create a new token for email reset
    const token = createRandomToken();

    // check to see if email exists in the db
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw missingEmailCreds;

    // add token to user
    await User.updateOne({ email }, { token });

    // creates an email template for a password reset
    await Mail.create({
      sendTo: `${existingUser.firstName} ${existingUser.lastName} <${existingUser.email}>`,
      sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
      sendDate: createDate().toDate(),
      subject: "Password Reset Confirmation",
      message: newPasswordTemplate(
        existingUser.firstName,
        existingUser.lastName,
        token
      )
    });

    // @ts-ignore
    req.user = existingUser;

    return next();
  } catch (err) {
    return sendError(err, 404, res);
  }
};

export default resetToken;
