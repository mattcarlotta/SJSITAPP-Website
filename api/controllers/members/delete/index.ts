import type { Request, Response } from "express";
import { Event, Token, User } from "~models";
import { sendError } from "~helpers";
import { unableToDeleteMember } from "~messages/errors";

/**
 * Deletes a member.
 *
 * @function deleteMember
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteMember = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingUser = await User.findOne({ _id });
    if (!existingUser) throw unableToDeleteMember;

    await existingUser.delete();
    await Token.deleteOne({ email: existingUser.email });
    await Event.updateMany(
      {},
      {
        $pull: {
          scheduledIds: existingUser._id,
          "schedule.$[].employeeIds": existingUser._id,
          employeeResponses: { _id: existingUser._id }
        }
      },
      { multi: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully deleted the member." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteMember;
