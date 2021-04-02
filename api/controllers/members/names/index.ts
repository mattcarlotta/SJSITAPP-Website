import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import { getUsers, sendError } from "~helpers";
import { unableToLocateMembers } from "~messages/errors";

/**
 * Retrieves all members names.
 *
 * @function getAllMemberNames
 * @returns {object} - members
 * @throws {string}
 */
const getAllMemberNames = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const members = await getUsers({
      match: {
        role: { $eq: "member" },
        status: "active"
      },
      project: {
        id: 1,
        email: {
          $concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"]
        }
      }
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    return res.status(200).json({ members });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getAllMemberNames;
