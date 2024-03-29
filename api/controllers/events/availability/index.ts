import type { Request, Response } from "express";
import { User } from "~models";
import { findMemberAvailabilty, parseSession, sendError } from "~helpers";
import { unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's availability.
 *
 * @function getMemberEventsAvailability
 * @returns {Response} - memberAvailablity
 * @throws {ResponseError}
 */
const getMemberEventsAvailability = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id, selectedDate } = req.query;

    const _id = id || parseSession(req);

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    await findMemberAvailabilty(existingMember, selectedDate as string, res);
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberEventsAvailability;
