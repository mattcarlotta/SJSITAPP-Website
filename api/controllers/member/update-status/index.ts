import type { Request, Response } from "express";
import { Event, User } from "~models";
import { sendError } from "~helpers";
import {
  missingUpdateMemberStatusParams,
  unableToLocateMember
} from "~messages/errors";

/**
 * Updates an member's status (active/suspended).
 *
 * @function updateMemberStatus
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateMemberStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { _id, status } = req.body;
    if (!_id || !status) throw missingUpdateMemberStatusParams;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    const wasSuspended = status === "active";
    await existingMember.updateOne({
      status: wasSuspended ? "suspended" : "active"
    });

    if (wasSuspended) {
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

    return res.status(201).json({
      message: `Member has been ${wasSuspended ? "suspended" : "reactivated"}.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateMemberStatus;
