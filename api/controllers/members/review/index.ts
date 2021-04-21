import type { Request, Response } from "express";
import { User } from "~models";
import { sendError } from "~helpers";
import { unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member for editing/viewing.
 *
 * @function getMember
 * @returns {Response} - member
 * @throws {ResponseError}
 */
const getMember = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingMember = await User.findOne(
      { _id },
      { password: 0, token: 0, __v: 0 }
    ).lean();
    if (!existingMember) throw unableToLocateMember;

    return res.status(200).json({ member: existingMember });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMember;
