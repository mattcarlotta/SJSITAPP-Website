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
    const _id = parseSession(req);

    const { email, emailReminders, firstName, lastName } = req.body;
    if (
      !email ||
      typeof emailReminders !== "boolean" ||
      !firstName ||
      !lastName
    )
      throw missingUpdateMemberParams;

    const existingMember = await User.findOne({ _id });
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

    return res.status(200).json({
      message: updatedEmail
        ? "Your profile has been updated. Please re-log into your account with your new email address."
        : "Successfully updated your settings."
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateMemberSettings;
