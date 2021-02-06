import type { Request, Response } from "express";
import { passwordResetSuccess } from "~messages/success";

/**
 * Allows a user to update their password with an authorization key.
 *
 * @function updatePassword
 * @returns {string} - message
 */
const updatePassword = (req: Request, res: Response): Response =>
  // @ts-ignore
  res.status(200).json({ message: passwordResetSuccess(req.user) });

export default updatePassword;
