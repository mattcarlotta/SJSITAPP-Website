import type { Request, Response } from "express";
import { User } from "~models";
import { findMemberEvents, parseSession, sendError } from "~helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's settings events schedule.
 *
 * @function getMemberSettingsEvents
 * @returns {Response} - events
 * @throws {ResponseError}
 */
const getMemberSettingsEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { selectedDate } = req.query;
    const _id = parseSession(req);
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    const events = await findMemberEvents(existingMember, String(selectedDate));

    return res.status(200).json({ ...events[0] });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberSettingsEvents;

//
