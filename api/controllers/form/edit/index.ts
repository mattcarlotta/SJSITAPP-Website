import type { Request, Response } from "express";
import { Form } from "~models";
import { sendError } from "~helpers";
import { unableToLocateForm } from "~messages/errors";

/**
 * Retrieves a single form for editing/viewing.
 *
 * @function getFormForViewing
 * @returns {Response} - form
 * @throws {ResponseError}
 */
const getFormForViewing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingForm = await Form.findOne({ _id }, { __v: 0 });
    if (!existingForm) throw unableToLocateForm;

    return res.status(200).json({ form: existingForm });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default getFormForViewing;
