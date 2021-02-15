import type { Request, Response } from "express";
import { User } from "~models";
import { parseSession, sendError } from "~helpers";
import { unableToLocateMember } from "~messages/errors";

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

    const existingMember = await User.findOne(
      { _id },
      { password: 0, token: 0, __v: 0 }
    ).lean();
    /* istanbul ignore next */
    if (!existingMember) throw unableToLocateMember;

    return res.status(200).json({ member: existingMember });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getMemberSettings;
