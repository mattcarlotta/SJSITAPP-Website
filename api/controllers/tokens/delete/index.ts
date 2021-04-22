import type { Request, Response } from "express";
import { Token } from "~models";
import { sendError } from "~helpers";
import { invalidDeleteTokenRequest } from "~messages/errors";

/**
 * Deletes an token (authorization token).
 *
 * @function deleteToken
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const token = await Token.findOne({ _id: id });
    if (!token) throw invalidDeleteTokenRequest;

    await token.delete();

    return res
      .status(200)
      .json({ message: "Successfully deleted the authorization token." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteToken;
