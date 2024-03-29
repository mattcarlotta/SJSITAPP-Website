import type { Request, Response } from "express";
import { clearSession, parseSession } from "~helpers";
import { User } from "~models";

/**
 * Allows a user to log in to the application on refresh.
 *
 * @function signedin
 * @returns - { id: string, avatar: string, email: string, firstName: string, lastName: string, role: string }
 * @return {ResponseError}
 */
const signedin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const _id = parseSession(req);
    if (!_id) throw String("No previous session detected.");

    const existingUser = await User.findOne({ _id }).lean();
    if (!existingUser || existingUser.status === "suspended")
      throw String("Not a valid user.");

    return res.status(200).send({
      id: existingUser._id,
      avatar: existingUser.avatar,
      email: existingUser.email,
      emailReminders: existingUser.emailReminders,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      registered: existingUser.registered,
      role: existingUser.role,
      status: existingUser.status
    });
  } catch (err) {
    return clearSession(req, res, 200);
  }
};

export default signedin;
