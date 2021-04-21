import type { Request, Response } from "express";
import { User } from "~models";
import { findMemberEvents, sendError } from "~helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Find a single member.
 *
/**
 * Retrieves a single member's scheduled events.
 *
 * @function getMemberEvents
 * @returns {Response} - events
 * @throws {ResponseError}
 */
const getMemberEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id, selectedDate } = req.query;
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    const events = await findMemberEvents(
      existingMember,
      selectedDate as string
    );

    return res.status(200).json({ ...events[0] });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberEvents;
