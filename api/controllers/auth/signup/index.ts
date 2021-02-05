import type { Request, Response } from "express";
import { thanksForReg } from "~messages/success";

/**
 * Creates a new user.
 *
 * @function createUser
 * @returns {string} - message
 */
const createUser = (req: Request, res: Response): Response =>
  // @ts-ignore
  res.status(201).json(thanksForReg(req.user.firstName, req.user.lastName));

export default createUser;
