import get from "lodash.get";
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
 * @function getEventResponses
 * @returns {Response} - events
 * @throws {ResponseError}
 */
const getEventResponses = async (
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

    const responses = get(events[0], ["eventResponses"]) || [];

    return res.status(200).send(responses);
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getEventResponses;
