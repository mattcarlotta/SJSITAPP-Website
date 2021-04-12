import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import User from "~models/user";
import { sendError } from "~helpers";
import { unableToLocateMembers } from "~messages/errors";

/**
 * Retrieves all members names.
 *
 * @function getAllMemberNames
 * @returns {object} - members
 * @throws {string}
 */
const getAllMemberEmails = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const members: Array<{ emails: string }> = await User.aggregate([
      {
        $match: {
          role: { $eq: "member" },
          status: "active"
        }
      },
      {
        $project: {
          _id: 0,
          email: {
            $concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"]
          }
        }
      },
      {
        $unwind: {
          path: "$email"
        }
      },
      {
        $group: {
          _id: null,
          emails: {
            $push: "$email"
          }
        }
      },
      {
        $project: {
          _id: 0,
          emails: 1
        }
      }
    ]);
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    return res.status(200).send(members[0].emails);
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getAllMemberEmails;
