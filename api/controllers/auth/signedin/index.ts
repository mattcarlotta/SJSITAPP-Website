import type { Request, Response } from "express";

/**
 * Allows a user to log in to the application on refresh.
 *
 * @function signedin
 * @returns {object}
 */
const signin = (req: Request, res: Response): Response =>
  // @ts-ignore
  res.status(200).send(req.user);

export default signin;
