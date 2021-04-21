import type { Request, Response } from "express";
import { User } from "~models";
import { parseSession, sendError } from "~helpers";
import {
  emailAlreadyTaken,
  missingUpdateMemberParams,
  unableToLocateMember,
  usernameAlreadyTaken
} from "~messages/errors";

/**
 * Updates an member's setting details.
 *
 * @function updateMemberSettings
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateMemberSettings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let updatedEmail = false;
    const id = parseSession(req);

    const { email, emailReminders, firstName, lastName } = req.body;
    if (
      !id ||
      !email ||
      typeof emailReminders !== "boolean" ||
      !firstName ||
      !lastName
    )
      throw missingUpdateMemberParams;

    const existingMember = await User.findOne(
      { _id: id },
      { password: 0, token: 0, __v: 0 }
    );
    /* istanbul ignore next */
    if (!existingMember) throw unableToLocateMember;

    if (existingMember.email !== email) {
      updatedEmail = true;
      const emailInUse = await User.findOne({ email });
      if (emailInUse) throw emailAlreadyTaken;
    }

    const existingUser = await User.findOne({
      _id: { $ne: existingMember._id },
      firstName,
      lastName
    });
    if (existingUser) throw usernameAlreadyTaken;

    await existingMember.updateOne({
      email,
      emailReminders,
      firstName,
      lastName
    });

    const user = await User.findOne(
      { _id: existingMember._id },
      { _id: 0, emailReminders: 1, firstName: 1, lastName: 1 }
    ).lean();
    /* istanbul ignore next */
    if (!user) throw unableToLocateMember;

    return res.status(200).json({
      message: updatedEmail
        ? "Your profile has been updated. Please re-log into your account with your new email address."
        : "Successfully updated your settings.",
      user
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateMemberSettings;
