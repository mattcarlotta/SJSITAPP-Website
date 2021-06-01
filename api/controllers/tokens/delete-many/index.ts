import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Token } from "~models";
import { sendError } from "~helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many tokens.
 *
 * @function deleteManyTokens
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteManyTokens = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Token.deleteMany({ _id: { $in: ids } });

    return res
      .status(200)
      .json({ message: "Successfully deleted the authorization tokens." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteManyTokens;
