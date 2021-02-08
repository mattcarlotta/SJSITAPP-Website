import type { Request, Response } from "express";
import { Form } from "~models";
import { sendError } from "~helpers";
import { missingFormId, unableToDeleteForm } from "~messages/errors";

/**
 * Deletes a form.
 *
 * @function deleteForm
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const deleteForm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id });
    if (!existingForm) throw unableToDeleteForm;

    await existingForm.delete();

    return res.status(200).json({ message: "Successfully deleted the form." });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default deleteForm;
