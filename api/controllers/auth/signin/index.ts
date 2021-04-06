import type { Request, Response } from "express";
import { User } from "~models";
import { sendError } from "~helpers";
import { badCredentials, invalidStatus } from "~messages/errors";

/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns - { id: string, avatar: string, email: string, firstName: string, lastName: string, role: string }
 * @throws {ResponseError}
 */
const signin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw badCredentials;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw badCredentials;
    if (existingUser.status !== "active") throw invalidStatus;

    // compare password to existingUser password
    const validPassword = await existingUser.comparePassword(password);
    if (!validPassword) throw badCredentials;

    req.session!.user = {
      id: existingUser._id,
      avatar: existingUser.avatar,
      email: existingUser.email,
      emailReminders: existingUser.emailReminders,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      registered: existingUser.registered,
      role: existingUser.role,
      status: existingUser.status
    };

    return res.status(200).send(req.session!.user);
  } catch (err) {
    return sendError(err, 403, res);
  }
};

export default signin;
