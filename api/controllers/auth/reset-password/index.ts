import type { Request, Response } from "express";
import { passwordResetToken } from "~messages/success";
import { missingEmailCreds } from "~messages/errors";
import { createDate, createRandomToken, sendError } from "~helpers";
import { newPasswordTemplate } from "~services/templates";
import { Mail, User } from "~models";

/**
 * Emails a user a new authorization key to reset their password.
 *
 * @function emailResetToken
 * @returns {string} - message
 * @throws {ResponseError}
 */
const sendEmailResetToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
    await existingUser.update({ token });

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

    return res.status(200).json(passwordResetToken(existingUser.email));
  } catch (err) {
    return sendError(err, 404, res);
  }
};

export default sendEmailResetToken;
