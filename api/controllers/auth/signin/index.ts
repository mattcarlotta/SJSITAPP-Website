import type { Request, Response } from "express";
/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns {object}
 */
const signin = (req: Request, res: Response): Response =>
  res.status(200).send(req.session!.user);

export default signin;
