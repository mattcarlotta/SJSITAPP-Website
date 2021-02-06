import type { Request, Response } from "express";
import { passwordResetToken } from "~messages/success";

/**
 * Emails a user a new authorization key to reset their password.
 *
 * @function emailResetToken
 * @returns {string} - message
 */
const sendEmailResetToken = (req: Request, res: Response): Response =>
  // @ts-ignore
  res.status(200).json(passwordResetToken(req.user));

export default sendEmailResetToken;
