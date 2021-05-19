import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Mail } from "~models";
import { sendError } from "~helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many emails.
 *
 * @function deleteMail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteManyMails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Mail.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({ message: "Successfully deleted the mail." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteManyMails;
