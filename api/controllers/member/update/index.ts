import type { Request, Response } from "express";
import { Event, User } from "~models";
import { sendError } from "~helpers";
import {
  emailAlreadyTaken,
  missingUpdateMemberParams,
  unableToLocateMember,
  usernameAlreadyTaken
} from "~messages/errors";

/**
 * Updates an member's details.
 *
 * @function updateMember
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateMember = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id, email, emailReminders, firstName, lastName, role } = req.body;
    if (
      !_id ||
      !email ||
      typeof emailReminders !== "boolean" ||
      !firstName ||
      !lastName ||
      !role
    )
      throw missingUpdateMemberParams;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    if (existingMember.email !== email) {
      const emailInUse = await User.findOne({ email });
      if (emailInUse) throw emailAlreadyTaken;
    }

    const existingUser = await User.findOne({
      _id: { $ne: existingMember._id },
      firstName,
      lastName
    });
    if (existingUser) throw usernameAlreadyTaken;

    if (role === "staff") {
      await Event.updateMany(
        {},
        {
          $pull: {
            scheduledIds: existingMember._id,
            "schedule.$[].employeeIds": existingMember._id
          }
        },
        { multi: true }
      );
    }

    await existingMember.updateOne({
      email,
      emailReminders,
      firstName,
      lastName,
      role
    });

    return res
      .status(200)
      .json({ message: "Successfully updated the member profile." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateMember;
