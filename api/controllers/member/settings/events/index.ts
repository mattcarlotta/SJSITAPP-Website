import type { Request, Response } from "express";
import { User } from "~models";
import { findMemberEvents, parseSession, sendError } from "~helpers";
import { unableToLocateMember } from "~messages/errors";

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

    const existingMember = await User.findOne({ _id });
    /* istanbul ignore next */
    if (!existingMember) throw unableToLocateMember;

    const events = await findMemberEvents(
      existingMember,
      selectedDate as string
    );

    return res.status(200).json({ ...events[0] });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getMemberSettingsEvents;

//
