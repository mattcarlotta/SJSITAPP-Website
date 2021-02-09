import type { Request, Response } from "express";
import { User } from "~models";
import { findMemberAvailabilty, parseSession, sendError } from "~helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's settings availability.
 *
 * @function getMemberSettingsAvailability
 * @returns {Response} - memberAvailablity
 * @throws {ResponseError}
 */
const getMemberSettingsAvailability = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { selectedDate } = req.query;
    const _id = parseSession(req);
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    await findMemberAvailabilty(existingMember, String(selectedDate), res);
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberSettingsAvailability;
