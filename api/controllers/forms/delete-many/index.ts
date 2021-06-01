import isEmpty from "lodash.isempty";
import type { Request, Response } from "express";
import { Form } from "~models";
import { sendError } from "~helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many events.
 *
 * @function deleteManyForms
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteManyForms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Form.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({ message: "Successfully deleted the forms." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteManyForms;
