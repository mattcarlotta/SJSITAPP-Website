import type { Request, Response } from "express";
import { Mail } from "~models";
import { sendError } from "~helpers";
import { unableToLocateMail } from "~messages/errors";

/**
 * Retrieves a single email for editing/viewing.
 *
 * @function getMailForViewing
 * @returns {Response} - email
 * @throws {ResponseError}
 */
const getMailForViewing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
    if (!existingEmail) throw unableToLocateMail;

    return res.status(200).send(existingEmail);
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getMailForViewing;
