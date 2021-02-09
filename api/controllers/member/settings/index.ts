import type { Request, Response } from "express";
import { User } from "~models";
import { parseSession, sendError } from "~helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's settings.
 *
 * @function getMemberSettings
 * @returns {Response} - member
 * @throws {ResponseError}
 */
const getMemberSettings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const _id = parseSession(req);
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    return res.status(200).json({ member: existingMember });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMemberSettings;
