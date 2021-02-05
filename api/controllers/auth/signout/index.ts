import type { Request, Response } from "express";
import { clearSession } from "~helpers";

/**
 * Allows a user to log out of the application (removes cookie).
 *
 * @function signout
 * @returns {string}
 */
const signout = (req: Request, res: Response): Response =>
  clearSession(req, res, 200);

export default signout;
