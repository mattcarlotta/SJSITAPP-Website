import type { Request, Response } from "express";
import { Token } from "~models";
import { sendError } from "~helpers";
import { unableToLocateToken, unableToUpdateToken } from "~messages/errors";

/**
 * Retrieves a single token (authorization token) for editing/viewing.
 *
 * @function getTokenForViewing
 * @returns {Response} - token
 * @throws {ResponseError}
 */
const getTokenForViewing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    return res.status(200).json({ token: existingToken });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getTokenForViewing;
